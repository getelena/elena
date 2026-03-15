import { collapseWhitespace, isRaw, resolveValue, toPlainText } from "./utils.js";

const stringsCache = new WeakMap();
const markerKey = "e" + Math.random().toString(36).slice(2, 6);

/**
 * Render a tagged template into an Elena Element with DOM diffing.
 * Returns true if the DOM was fully rebuilt, false if only text
 * nodes were patched in place.
 *
 * @param {HTMLElement} element
 * @param {TemplateStringsArray} strings - Static parts of the tagged template
 * @param {Array} values - Dynamic interpolated values
 * @returns {boolean}
 */
export function renderTemplate(element, strings, values) {
  if (patchTextNodes(element, strings, values)) {
    return false;
  }
  fullRender(element, strings, values);
  return true;
}

/**
 * Fast path: patch only the text nodes whose values changed.
 *
 * @param {HTMLElement} element - The host element with cached template state
 * @param {TemplateStringsArray} strings - Static parts of the tagged template
 * @param {Array} values - Dynamic interpolated values
 * @returns {boolean} Whether patching was sufficient (false = full render)
 */
function patchTextNodes(element, strings, values) {
  // Only works when re-rendering the same template shape
  if (element._tplStrings !== strings || !element._tplParts) {
    return false;
  }

  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    const comparable = Array.isArray(v) ? toPlainText(v) : v;

    if (comparable === element._tplValues[i]) {
      continue;
    }

    if (isRaw(v) || !element._tplParts[i]) {
      return false;
    }

    element._tplValues[i] = comparable;
    element._tplParts[i].textContent = toPlainText(v);
  }

  return true;
}

/**
 * Cold path: clone a cached <template> and patch in values.
 *
 * @param {HTMLElement} element - The host element to render into
 * @param {TemplateStringsArray} strings - Static parts of the tagged template
 * @param {Array} values - Dynamic interpolated values
 */
function fullRender(element, strings, values) {
  let entry = stringsCache.get(strings);

  if (!entry) {
    const processedStrings = Array.from(strings, collapseWhitespace);
    entry = {
      processedStrings,
      template: values.length > 0 ? createTemplate(processedStrings, values.length) : null,
    };
    stringsCache.set(strings, entry);
  }

  if (entry.template) {
    element._tplParts = cloneAndPatch(element, entry.template, values);
  } else {
    // Fallback for attribute-position values or static templates.
    // White space collapsing here protects against Vue SSR mismatches.
    const renderedValues = values.map(value => resolveValue(value));
    const markup = entry.processedStrings
      .reduce((out, str, i) => out + str + (renderedValues[i] ?? ""), "")
      .replace(/>\s+</g, "><")
      .trim();

    element.innerHTML = markup;
    element._tplParts = new Array(values.length);
  }

  element._tplStrings = strings;
  element._tplValues = values.map(v => (Array.isArray(v) ? toPlainText(v) : v));
}

/**
 * Build a <template> element with comment markers.
 *
 * @param {string[]} processedStrings - Whitespace-collapsed static parts
 * @param {number} valueCount - Number of dynamic values
 * @returns {HTMLTemplateElement | null}
 */
function createTemplate(processedStrings, valueCount) {
  const marker = `<!--${markerKey}-->`;
  const markup = processedStrings
    .reduce((out, str, i) => {
      const collapsed = str.replace(/>\s+</g, "><");
      return out + collapsed + (i < valueCount ? marker : "");
    }, "")
    .trim();

  const tpl = document.createElement("template");
  tpl.innerHTML = markup;

  // Mismatch means this template shape cannot use the clone path.
  const walker = document.createTreeWalker(tpl.content, NodeFilter.SHOW_COMMENT);
  let count = 0;

  while (walker.nextNode()) {
    if (walker.currentNode.data === markerKey) {
      count++;
    }
  }

  return count === valueCount ? tpl : null;
}

/**
 * Clone a cached template and replace comment markers
 * with actual content.
 *
 * @param {HTMLElement} element - The host element to render into
 * @param {HTMLTemplateElement} template - Cached template with markers
 * @param {Array} values - Raw interpolated values
 * @param {string[]} renderedValues - HTML-escaped rendered values
 * @returns {Array<Text | undefined>} Text node map for fast-path patching
 */
function cloneAndPatch(element, template, values) {
  const clone = template.content.cloneNode(true);
  const walker = document.createTreeWalker(clone, NodeFilter.SHOW_COMMENT);
  const parts = new Array(values.length);
  const markers = [];
  let node;

  // Collect markers before modifying the tree
  while ((node = walker.nextNode())) {
    if (node.data === markerKey) {
      markers.push(node);
    }
  }

  for (let i = 0; i < markers.length; i++) {
    const value = values[i];

    if (isRaw(value)) {
      // Raw HTML: parse and insert as fragment
      const tmp = document.createElement("template");
      tmp.innerHTML = resolveValue(value);
      markers[i].parentNode.replaceChild(tmp.content, markers[i]);

      // Raw values can't be fast-patched; leave parts undefined
    } else {
      // Create text node with unescaped content
      const textNode = document.createTextNode(toPlainText(value));
      markers[i].parentNode.replaceChild(textNode, markers[i]);
      parts[i] = textNode;
    }
  }

  element.replaceChildren(clone);
  return parts;
}

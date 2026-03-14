import { collapseWhitespace, processValue } from "./utils.js";

const cache = new WeakMap();
const commentMarker = `e${Math.random().toString(36).slice(2, 8)}`;

/**
 * Convert a raw interpolated value to its text content string.
 *
 * @param {*} v
 * @returns {string}
 */
function toTextContent(v) {
  return Array.isArray(v) ? v.map(item => String(item ?? "")).join("") : String(v ?? "");
}

/**
 * Render a tagged <template> into an Elena Element with DOM diffing.
 *
 * On first render, builds the full HTML markup and renders it.
 * On re-renders, patches only the text nodes whose values changed,
 * avoiding a full DOM rebuild.
 *
 * Cache state is stored on the element instance:
 * - _templateStrings: reference to the <template>’s static strings array
 * - _templateValues:  array of escaped values from the last render
 * - _templateParts:   array mapping each value index to its DOM text node (or undefined)
 *
 * @param {HTMLElement} element
 * @param {TemplateStringsArray} strings - Static parts of the tagged <template>
 * @param {Array} values - Dynamic interpolated values
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
 * Returns true if all changes were handled (no full render needed).
 *
 * @param {HTMLElement} element - The host element with cached <template> state
 * @param {TemplateStringsArray} strings - Static parts of the tagged <template>
 * @param {Array} values - Dynamic interpolated values
 * @returns {boolean} Whether patching was sufficient (false = full render)
 */
function patchTextNodes(element, strings, values) {
  // Only works when re-rendering the same <template> shape
  if (element._templateStrings !== strings || !element._templateParts) {
    return false;
  }

  let needsFullRender = false;

  for (let i = 0; i < values.length; i++) {
    const { result: newRendered, isRaw } = processValue(values[i]);
    const oldRendered = element._templateValues[i];

    if (newRendered === oldRendered) {
      continue;
    }

    element._templateValues[i] = newRendered;

    // Raw HTML values require a full render
    if (isRaw) {
      needsFullRender = true;
    } else {
      const textNode = element._templateParts[i];
      if (textNode) {
        // Value is in a text position, update the DOM node directly
        textNode.textContent = toTextContent(values[i]);
      } else {
        // No mapped text node for this value, need full render
        needsFullRender = true;
      }
    }
  }

  return !needsFullRender;
}

/**
 * Cold path: render a <template> into an element.
 *
 * @param {HTMLElement} element - The host element to render into
 * @param {TemplateStringsArray} strings - Static parts of the tagged <template>
 * @param {Array} values - Dynamic interpolated values
 */
function fullRender(element, strings, values) {
  const processed = values.map(v => processValue(v));
  const renderedValues = processed.map(p => p.result);

  // The JS engine reuses the same `strings` object for every call
  // from the same <template> literal, so cache the cleaned-up parts.
  let entry = cache.get(strings);
  if (!entry) {
    const processedStrings = Array.from(strings, collapseWhitespace);
    entry = { processedStrings, template: buildTemplate(processedStrings, values.length) };
    cache.set(strings, entry);
  }

  if (entry.template) {
    // Clone cached <template>, replace markers with content
    element._templateParts = cloneAndPatch(
      element,
      entry.template,
      values,
      renderedValues,
      processed
    );
  } else {
    // Fallback: attribute-position values require renderHTML
    const markup = entry.processedStrings
      .reduce((out, str, i) => out + str + (renderedValues[i] ?? ""), "")
      .trim();
    renderHtml(element, markup);
    element._templateParts = mapTextNodes(element, renderedValues);
  }

  element._templateStrings = strings;
  element._templateValues = renderedValues;
}

/**
 * Build a <template> element with markers in place of values. Returns
 * null if any value is in an attribute position (comments are only
 * valid in text positions).
 *
 * @param {string[]} processedStrings - Whitespace-collapsed static parts
 * @param {number} valueCount - Number of dynamic values
 * @returns {HTMLTemplateElement | null}
 */
function buildTemplate(processedStrings, valueCount) {
  const template = document.createElement("template");

  if (valueCount === 0) {
    template.innerHTML = processedStrings[0].trim();
    return template;
  }

  const marker = `<!--${commentMarker}-->`;
  const markerMarkup = processedStrings
    .reduce((out, str, i) => out + str + (i < valueCount ? marker : ""), "")
    .trim();

  template.innerHTML = markerMarkup;

  // Verify all markers survived as comment nodes.
  const walker = document.createTreeWalker(template.content, NodeFilter.SHOW_COMMENT);
  let count = 0;
  while (walker.nextNode()) {
    if (walker.currentNode.data === commentMarker) {
      count++;
    }
  }

  return count === valueCount ? template : null;
}

/**
 * Clone a cached <template> and replace markers with actual content.
 *
 * @param {HTMLElement} element - The host element to render into
 * @param {HTMLTemplateElement} cached - The cached <template> with markers
 * @param {Array} values - Raw interpolated values
 * @param {string[]} renderedValues - HTML-escaped rendered values
 * @param {Array<{ result: string, isRaw: boolean }>} processed - Pre-computed processValue results
 * @returns {Array<Text | undefined>} Text node map for fast-path patching
 */
function cloneAndPatch(element, cached, values, renderedValues, processed) {
  const clone = cached.content.cloneNode(true);

  // Collect all markers before modifying the tree
  const walker = document.createTreeWalker(clone, NodeFilter.SHOW_COMMENT);
  const markers = [];
  let node;
  while ((node = walker.nextNode())) {
    if (node.data === commentMarker) {
      markers.push(node);
    }
  }

  // Replace each marker with actual content
  const textParts = new Array(values.length);

  for (let i = 0; i < markers.length; i++) {
    if (processed[i].isRaw) {
      // Raw HTML: parse and insert as fragment
      const range = document.createRange();
      range.selectNodeContents(clone);

      const frag = range.createContextualFragment(renderedValues[i]);
      markers[i].parentNode.replaceChild(frag, markers[i]);

      // Can't fast-patch raw HTML, leave textParts[i] as undefined
    } else {
      const textNode = document.createTextNode(toTextContent(values[i]));
      markers[i].parentNode.replaceChild(textNode, markers[i]);
      textParts[i] = textNode;
    }
  }

  // Move cloned content into element
  element.replaceChildren(clone);

  return textParts;
}

/**
 * Walk the Elena Element’s text nodes and map each escaped value
 * to its corresponding DOM text node. Values without a matching
 * text node will be undefined.
 *
 * @param {HTMLElement} element - The host element to walk
 * @param {string[]} escapedValues - HTML-escaped interpolated values
 * @returns {Array<Text | undefined>} Array mapping each value index to its text node
 */
function mapTextNodes(element, escapedValues) {
  const parts = new Array(escapedValues.length);
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);

  let valueIndex = 0;
  let node;

  while ((node = walker.nextNode()) && valueIndex < escapedValues.length) {
    if (node.textContent === escapedValues[valueIndex]) {
      parts[valueIndex] = node;
      valueIndex++;
    }
  }

  return parts;
}

/**
 * Render an HTML string into an element.
 *
 * @param {HTMLElement} element
 * @param {string} markup
 */
export function renderHtml(element, markup) {
  if (!element) {
    console.warn("░█ [ELENA]: Cannot render to a null element.");
    return;
  }
  element.innerHTML = markup;
}

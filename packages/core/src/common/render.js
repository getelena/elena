import { escapeHtml } from "./utils.js";

/** @type {WeakMap<TemplateStringsArray, string[]>} */
const _stringsCache = new WeakMap();

/**
 * Render a tagged template into an Elena Element with DOM diffing.
 *
 * On first render, builds the full HTML markup and renders it.
 * On re-renders, patches only the text nodes whose values changed,
 * avoiding a full DOM rebuild.
 *
 * Cache state is stored on the element instance:
 * - _tplStrings: reference to the template’s static strings array
 * - _tplValues:  array of escaped values from the last render
 * - _tplParts:   array mapping each value index to its DOM text node (or undefined)
 *
 * @param {HTMLElement} element
 * @param {TemplateStringsArray} strings - Static parts of the tagged template
 * @param {Array} values - Dynamic interpolated values
 */
export function renderTemplate(element, strings, values) {
  if (patchTextNodes(element, strings, values)) {
    return;
  }
  fullRender(element, strings, values);
}

/**
 * Fast path: patch only the text nodes whose values changed.
 * Returns true if all changes were handled (no full render needed).
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

  let needsFullRender = false;

  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    // Check if this value is a trusted HTML fragment (isRaw),
    // created via the `html` tag, which bypasses escaping
    const isRaw = v && v.__raw;
    const newRendered = isRaw ? String(v) : escapeHtml(String(v ?? ""));
    const oldRendered = element._tplValues[i];

    if (newRendered === oldRendered) {
      continue;
    }

    element._tplValues[i] = newRendered;

    // Raw HTML values require a full render
    if (isRaw) {
      needsFullRender = true;
    } else {
      const textNode = element._tplParts[i];
      if (textNode) {
        // Value is in a text position, update the DOM node directly
        textNode.textContent = String(v ?? "");
      } else {
        // No mapped text node for this value, need full render
        needsFullRender = true;
      }
    }
  }

  return !needsFullRender;
}

/**
 * Cold path: build full HTML markup, render it via DocumentFragment,
 * and map each interpolated value to its corresponding DOM text node
 * for future fast-path patching.
 *
 * @param {HTMLElement} element - The host element to render into
 * @param {TemplateStringsArray} strings - Static parts of the tagged template
 * @param {Array} values - Dynamic interpolated values
 */
function fullRender(element, strings, values) {
  const renderedValues = values.map(v => (v && v.__raw ? String(v) : escapeHtml(String(v ?? ""))));

  // The JS engine reuses the same `strings` object for every call from the same template
  // literal, so cache the cleaned-up parts and run the regex only once per template.
  let processedStrings = _stringsCache.get(strings);
  if (!processedStrings) {
    processedStrings = Array.from(strings, s => s.replace(/\n\s*/g, " "));
    _stringsCache.set(strings, processedStrings);
  }

  // Build the complete HTML markup
  const markup = processedStrings
    .reduce((out, str, i) => out + str + (renderedValues[i] ?? ""), "")
    .replace(/>\s+</g, "><")
    .replace(/>\s+/g, ">")
    .replace(/\s+</g, "<")
    .trim();

  renderHtml(element, markup);

  // Cache template identity and rendered values
  element._tplStrings = strings;
  element._tplValues = renderedValues;

  // Walk text nodes to map each value index to its DOM node
  element._tplParts = mapTextNodes(element, renderedValues);
}

/**
 * Walk the Elena Element’s text nodes and map each escaped value
 * to its corresponding DOM text node. Values without a matching
 * text node will be undefined.
 *
 * Known limitation: text nodes are matched by content. This could
 * cause the wrong node to be patched if a static part of the template
 * contains text that exactly matches a dynamic value with no surrounding
 * tag. In practice this is extremely rare, static template parts should
 * be HTML structure (tags, attributes, punctuation), not raw text.
 *
 * Example: `<span>Elena</span>${name}` with `name = "Elena"`. The
 * walker matches the static "Elena" inside the span first, so when
 * `name` later changes to "Bob", the span text is patched instead
 * of the trailing text node.
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
 * Render an HTML string into an element by parsing it into a
 * DocumentFragment via createContextualFragment and swapping
 * the element’s children in a single replaceChildren call.
 *
 * Uses element.ownerDocument.createRange() so that elements
 * in e.g. iframes parse HTML correctly.
 *
 * @param {HTMLElement} element
 * @param {string} markup
 */
export function renderHtml(element, markup) {
  if (!element) {
    console.warn("░█ [ELENA]: Cannot render to a null element.");
    return;
  }
  element.replaceChildren(element.ownerDocument.createRange().createContextualFragment(markup));
}

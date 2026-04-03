import { collapseWhitespace, isArray, isRaw, resolveValue, toPlainText } from "./utils.js";

const stringsCache = new WeakMap();
const markerKey = "e" + Math.random().toString(36).slice(2);
const SHOW_COMMENT = 128;
const ELEMENT_NODE = 1;
const TEXT_NODE = 3;

const newTemplate = () => document.createElement("template");
const treeWalker = node => document.createTreeWalker(node, SHOW_COMMENT);
const toComparable = v => (isArray(v) || isRaw(v) ? toPlainText(v) : v);

/**
 * Parse an HTML string into a DocumentFragment.
 *
 * @param {string} markup
 * @returns {DocumentFragment}
 */
const parseHTML = markup => {
  const t = newTemplate();
  t.innerHTML = markup;
  return t.content;
};

/**
 * Collect live DOM nodes between two boundary comment markers.
 *
 * @param {Comment} start
 * @param {Comment} end
 * @returns {Node[]}
 */
const collectNodes = (start, end) => {
  const nodes = [];
  let node = start.nextSibling;
  while (node && node !== end) {
    nodes.push(node);
    node = node.nextSibling;
  }
  return nodes;
};

/**
 * Render a tagged template into an Elena Element with DOM diffing.
 * Returns true if the DOM was fully rebuilt, false if parts were
 * patched in place.
 *
 * @param {HTMLElement} element
 * @param {TemplateStringsArray} strings - Static parts of the tagged template
 * @param {Array} values - Dynamic interpolated values
 * @returns {boolean}
 */
export function renderTemplate(element, strings, values) {
  if (patchParts(element, strings, values)) {
    return false;
  }
  fullRender(element, strings, values);
  return true;
}

/**
 * Patch only changed text nodes, attribute values, and raw ranges.
 *
 * @param {HTMLElement} element - The host element with cached template state
 * @param {TemplateStringsArray} strings - Static parts of the tagged template
 * @param {Array} values - Dynamic interpolated values
 * @returns {boolean} Whether patching was sufficient (false = full render)
 */
function patchParts(element, strings, values) {
  if (element._templateStrings !== strings || !element._templateParts) {
    return false;
  }

  const parts = element._templateParts;
  const cached = element._templateValues;

  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    const part = parts[i];

    if (!part) {
      return false;
    }

    // HTML content (nested templates, arrays)
    if (part._start) {
      if (isArray(value) && isRaw(value)) {
        patchRawArray(part, cached, i, value);
      } else if (isRaw(value)) {
        const comparable = toComparable(value);

        if (comparable !== cached[i]) {
          morphRange(
            part._start.parentNode,
            part._start,
            part._end,
            parseHTML(resolveValue(value)).childNodes
          );
          cached[i] = comparable;
        }
      } else {
        return false;
      }
      continue;
    }

    // Text node or attribute
    const comparable = toComparable(value);
    if (comparable === cached[i]) {
      continue;
    }

    // Text node or attribute, but value is HTML
    if (isRaw(value)) {
      return false;
    }

    cached[i] = comparable;
    const str = String(comparable ?? "");

    if (part.nodeType) {
      part.textContent = str;
    } else {
      part[0].setAttribute(part[1], str);
    }
  }

  return true;
}

/**
 * Per-item diff for raw arrays using preferenceix/suffix scanning.
 * Finds the common head and tail, then only processes the dirty range.
 *
 * @param {{ _start: Comment, _end: Comment }} part - Boundary markers
 * @param {Array} cached - The element's cached template values
 * @param {number} i - The value index in the template
 * @param {Array} items - The new array of raw values
 */
function patchRawArray(part, cached, i, items) {
  const parent = part._start.parentNode;
  const prev = cached[i];
  const next = items.map(item => String(item));
  const nodes = collectNodes(part._start, part._end);

  // Fall back to full morph if tracking isn't viable
  if (!isArray(prev) || nodes.length !== prev.length) {
    const fragment = parseHTML(next.join("")).childNodes;

    morphRange(parent, part._start, part._end, fragment);
    cached[i] = next;

    return;
  }

  // Skip matching items from the start
  let start = 0;
  while (start < prev.length && start < next.length) {
    if (next[start] !== prev[start]) {
      break;
    }
    start++;
  }

  // Skip matching items from the end (without overlapping start)
  let prevEnd = prev.length;
  let nextEnd = next.length;
  while (prevEnd > start && nextEnd > start) {
    if (next[nextEnd - 1] !== prev[prevEnd - 1]) {
      break;
    }
    prevEnd--;
    nextEnd--;
  }

  // Everything between start and end is the changed range
  const overlap = Math.min(prevEnd - start, nextEnd - start);
  const reference = nodes[prevEnd] || part._end;

  // Morph items that exist in both old and new
  for (let j = 0; j < overlap; j++) {
    const idx = start + j;
    if (next[idx] !== prev[idx]) {
      const frag = parseHTML(next[idx]);
      const after = nodes[idx + 1] || reference;

      morphNodeList(parent, [nodes[idx]], Array.from(frag.childNodes), after);
    }
  }

  // Insert items that are entirely new
  for (let j = overlap; j < nextEnd - start; j++) {
    parent.insertBefore(parseHTML(next[start + j]), reference);
  }

  // Remove items that are gone
  for (let j = prevEnd - start - 1; j >= overlap; j--) {
    parent.removeChild(nodes[start + j]);
  }

  cached[i] = next;
}

/**
 * Clone a cached <template> and patch in values.
 *
 * @param {HTMLElement} element - The host element to render into
 * @param {TemplateStringsArray} strings - Static parts of the tagged template
 * @param {Array} values - Dynamic interpolated values
 */
function fullRender(element, strings, values) {
  let entry = stringsCache.get(strings);

  if (!entry) {
    const _strings = strings.map(collapseWhitespace);
    entry = {
      _strings,
      _template: values.length > 0 ? createTemplate(_strings, values.length) : null,
    };
    stringsCache.set(strings, entry);
  }

  if (entry._template) {
    element._templateParts = cloneAndPatch(element, entry._template, values);
  } else {
    // Fallback for static templates or templates where marker detection failed.
    // White space collapsing here protects against Vue SSR mismatches.
    const renderedValues = values.map(resolveValue);
    const markup = entry._strings
      .reduce((out, str, i) => out + str + (renderedValues[i] ?? ""), "")
      .replace(/>\s+</g, "><")
      .trim();

    // Morph existing DOM to match new markup instead of replacing it.
    morphNodeList(
      element,
      Array.from(element.childNodes),
      Array.from(parseHTML(markup).childNodes),
      null
    );

    element._templateParts = null;
  }

  element._templateStrings = strings;
  element._templateValues = values.map(v =>
    isArray(v) && isRaw(v) ? v.map(item => String(item)) : toComparable(v)
  );
}

/**
 * Build a <template> element with comment markers and string placeholders.
 *
 * @param {string[]} _strings - Whitespace-collapsed static parts
 * @param {number} valueCount - Number of dynamic values
 * @returns {{ _tpl: HTMLTemplateElement, _attrs: (string|null)[] } | null}
 */
function createTemplate(_strings, valueCount) {
  const marker = `<!--${markerKey}-->`;
  const attrs = [];
  let markup = "";

  for (let i = 0; i < _strings.length; i++) {
    markup += _strings[i];

    if (i < valueCount) {
      const match = _strings[i].match(/([^\s"'>/=]+)\s*=\s*["']$/);

      if (match) {
        attrs.push(match[1]);
        markup += markerKey + "_" + i;
      } else {
        attrs.push(null);
        markup += marker;
      }
    }
  }

  const template = newTemplate();
  template.innerHTML = markup.trim();

  // Mismatch means this template shape cannot use the clone path.
  const walker = treeWalker(template.content);
  let commentCount = 0;

  while (walker.nextNode()) {
    if (walker.currentNode.data === markerKey) {
      commentCount++;
    }
  }

  if (commentCount !== attrs.filter(n => n === null).length) {
    return null;
  }

  return { _tpl: template, _attrs: attrs };
}

/**
 * Clone a cached template and replace markers with actual content.
 *
 * @param {HTMLElement} element - The host element to render into
 * @param {{ _tpl: HTMLTemplateElement, _attrs: (string|null)[] }} templateInfo
 * @param {Array} values - Raw interpolated values
 * @returns {Array<Text | [Element, string] | undefined>}
 */
function cloneAndPatch(element, templateInfo, values) {
  const { _tpl, _attrs } = templateInfo;
  const clone = _tpl.content.cloneNode(true);
  const walker = treeWalker(clone);
  const parts = Array(values.length);
  const markers = [];
  let node;

  // Collect markers before modifying the tree
  while ((node = walker.nextNode())) {
    if (node.data === markerKey) {
      markers.push(node);
    }
  }

  let contentIdx = 0;

  for (let i = 0; i < values.length; i++) {
    const attr = _attrs[i];

    if (attr) {
      // Find the element with the placeholder value
      const placeholder = markerKey + "_" + i;
      const el = clone.querySelector(`[${attr}="${placeholder}"]`);

      if (el) {
        const value = values[i];
        const str = String((isArray(value) ? toPlainText(value) : value) ?? "");
        el.setAttribute(attr, str);
        parts[i] = [el, attr];
      }
    } else {
      // Replace comment marker with value
      const marker = markers[contentIdx++];
      const value = values[i];
      const parent = marker.parentNode;

      if (isRaw(value)) {
        const start = document.createComment("s");
        const end = document.createComment("/s");
        const reference = marker.nextSibling;
        parent.replaceChild(start, marker);
        parent.insertBefore(parseHTML(resolveValue(value)), reference);
        parent.insertBefore(end, reference);
        parts[i] = { _start: start, _end: end };
      } else {
        const textNode = document.createTextNode(toPlainText(value));
        parent.replaceChild(textNode, marker);
        parts[i] = textNode;
      }
    }
  }

  element.replaceChildren(clone);
  return parts;
}

/**
 * Morph the nodes between two boundary markers against new nodes.
 *
 * @param {Node} parent
 * @param {Comment} start - Start boundary marker
 * @param {Comment} end - End boundary marker
 * @param {NodeList} nextNodes - The desired child nodes from the new render
 */
function morphRange(parent, start, end, nextNodes) {
  morphNodeList(parent, collectNodes(start, end), Array.from(nextNodes), end);
}

/**
 * Diff current nodes against next nodes in place.
 *
 * @param {Node} parent
 * @param {Node[]} current - Existing child nodes
 * @param {Node[]} next - Desired child nodes
 * @param {Node|null} reference - Insert new nodes before this node (null = append)
 */
function morphNodeList(parent, current, next, reference) {
  const len = Math.max(current.length, next.length);

  for (let i = 0; i < len; i++) {
    const cur = current[i];
    const nxt = next[i];

    // New node added
    if (!cur) {
      parent.insertBefore(nxt, reference);

      // Old node removed
    } else if (!nxt) {
      parent.removeChild(cur);

      // Different node type or tag, replace entirely
    } else if (
      cur.nodeType !== nxt.nodeType ||
      (cur.nodeType === ELEMENT_NODE && cur.tagName !== nxt.tagName)
    ) {
      parent.replaceChild(nxt, cur);

      // Same text node, update content
    } else if (cur.nodeType === TEXT_NODE) {
      if (cur.textContent !== nxt.textContent) {
        cur.textContent = nxt.textContent;
      }

      // Same element, recurse into attributes and children
    } else if (cur.nodeType === ELEMENT_NODE) {
      morphAttributes(cur, nxt);
      morphNodeList(cur, Array.from(cur.childNodes), Array.from(nxt.childNodes), null);
    }
  }
}

/**
 * Morph element’s attributes without rebuilding the DOM.
 *
 * @param {Element} current - The current existing DOM element
 * @param {Element} next - The desired element from the new render
 */
function morphAttributes(current, next) {
  for (let i = current.attributes.length - 1; i >= 0; i--) {
    const { name } = current.attributes[i];

    if (!next.hasAttribute(name)) {
      current.removeAttribute(name);
    }
  }

  for (let i = 0; i < next.attributes.length; i++) {
    const { name, value } = next.attributes[i];

    if (current.getAttribute(name) !== value) {
      current.setAttribute(name, value);
    }
  }
}

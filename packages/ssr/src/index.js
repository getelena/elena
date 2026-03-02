/**
 *  ██████████ ████
 * ░░███░░░░░█░░███
 *  ░███  █ ░  ███   ██████  ████████    ██████
 *  ░██████    ███  ███░░███░░███░░███  ░░░░░███
 *  ░███░░█    ███ ░███████  ░███ ░███   ███████
 *  ░███ ░   █ ███ ░███░░░   ░███ ░███  ███░░███
 *  ██████████ █████░░██████  ████ █████░░████████
 * ░░░░░░░░░░ ░░░░░  ░░░░░░  ░░░░ ░░░░░  ░░░░░░░░
 *
 * Elena SSR
 * https://elenajs.com
 */

import { parseDocument, ElementType } from "htmlparser2";
import { normalizeWhitespace, escapeHtml } from "./common/utils.js";

/**
 * Render Elena Primitive Components to HTML strings.
 *
 * Parses an HTML string, expands registered Elena primitive
 * components by calling their render() methods, and returns
 * the fully rendered HTML. Works in Node.js with no browser
 * DOM APIs required.
 *
 * @param {string} html - HTML string containing Elena components.
 * @returns {string} The rendered HTML with components expanded.
 *
 * @example
 * import { ssr, register } from "@elenajs/ssr";
 * import Button from "./button.js";
 * import Stack from "./stack.js";
 *
 * register(Button, Stack);
 *
 * const html = ssr(`
 *   <elena-stack>
 *     <elena-button>Send</elena-button>
 *   </elena-stack>
 * `);
 */
export function ssr(html) {
  const doc = parseDocument(html.trim());
  return walk(doc.children);
}

/** @type {Map<string, Function>} */
const registry = new Map();

/**
 * Register one or more Elena component classes for SSR.
 * Each class must have `_tagName` set (via Elena options).
 *
 * @param {...Function} components - Elena component classes.
 *
 * @example
 * import { register } from "@elenajs/ssr";
 * import Button from "./button.js";
 * import Stack from "./stack.js";
 *
 * register(Button, Stack);
 */
export function register(...components) {
  for (const Comp of components) {
    const tagName = Comp._tagName;
    if (!tagName) {
      throw new Error(
        "░█ [ELENA]: Component must have a tagName defined in Elena options. " +
          "Ensure the class was created with Elena(HTMLElement, { tagName: '...' })."
      );
    }
    registry.set(tagName, Comp);
  }
}

/** Tags that are self-closing in HTML. */
const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

/**
 * Create a lightweight component instance and
 * call render().
 *
 * @param {Function} ComponentClass
 * @param {Record<string, string>} attrs - Attributes from the HTML tag.
 * @param {string} textContent - Text content from children.
 * @returns {string} The inner HTML produced by render().
 */
function renderComponent(ComponentClass, attrs, textContent) {
  const instance = Object.create(ComponentClass.prototype);
  instance._text = textContent;

  for (const [key, value] of Object.entries(attrs)) {
    // htmlparser2 represents boolean attributes (e.g. `active`) as empty
    // strings. Convert to `true` to match Elena's client-side prop handling.
    instance[key] = value === "" ? true : value;
  }

  const result = instance.render();
  return result ? normalizeWhitespace(result.toString()) : "";
}

/**
 * Extract plain text content from an htmlparser2
 * children array.
 *
 * @param {Array} children
 * @returns {string}
 */
function getTextContent(children) {
  return children
    .map(c => (c.type === ElementType.Text ? c.data : ""))
    .join("")
    .trim();
}

/**
 * Serialize an attribute map back to an HTML
 * attribute string.
 *
 * @param {Record<string, string>} attrs
 * @returns {string}
 */
function serializeAttrs(attrs) {
  let result = "";
  for (const [key, value] of Object.entries(attrs)) {
    if (value === "") {
      result += ` ${key}`;
    } else {
      result += ` ${key}="${escapeHtml(value)}"`;
    }
  }
  return result;
}

/**
 * Walk the parsed tree, expand Elena components,
 * and serialize to HTML.
 *
 * @param {Array} nodes - htmlparser2 DOM nodes.
 * @returns {string}
 */
function walk(nodes) {
  let out = "";

  for (const node of nodes) {
    if (node.type === ElementType.Text) {
      // Collapse whitespace-only text between tags to avoid
      // preserving template literal indentation in output.
      const trimmed = node.data.replace(/\n\s*/g, "");
      if (trimmed) {
        out += trimmed;
      }
      continue;
    }

    if (node.type === ElementType.Comment) {
      out += `<!--${node.data}-->`;
      continue;
    }

    if (node.type !== ElementType.Tag) {
      continue;
    }

    const tag = node.name;
    const attrs = node.attribs;
    const children = node.children || [];

    if (VOID_ELEMENTS.has(tag.toLowerCase())) {
      out += `<${tag}${serializeAttrs(attrs)}>`;
    } else {
      const ComponentClass = tag.includes("-") ? registry.get(tag) : null;
      const isPrimitive = ComponentClass && Object.hasOwn(ComponentClass.prototype, "render");
      const innerHTML = isPrimitive
        ? renderComponent(ComponentClass, attrs, getTextContent(children))
        : walk(children);
      out += `<${tag}${serializeAttrs(attrs)}>${innerHTML}</${tag}>`;
    }
  }

  return out;
}

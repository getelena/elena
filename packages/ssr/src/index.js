/**
 *  ██████████ ████
 * ░░███░░░░░█░░███
 *  ░███  █ ░  ░███   ██████  ████████    ██████
 *  ░██████    ░███  ███░░███░░███░░███  ░░░░░███
 *  ░███░░█    ░███ ░███████  ░███ ░███   ███████
 *  ░███ ░   █ ░███ ░███░░░   ░███ ░███  ███░░███
 *  ██████████ █████░░██████  ████ █████░░████████
 * ░░░░░░░░░░ ░░░░░  ░░░░░░  ░░░░ ░░░░░  ░░░░░░░░
 *
 * Elena SSR
 * https://elenajs.com
 */

import { parseDocument, ElementType } from "htmlparser2";
import { normalizeWhitespace, escapeHtml } from "./common/utils.js";

/**
 * Render Elena Progressive Web Components to HTML strings.
 *
 * Parses an HTML string, expands registered Elena components
 * by calling their render() methods, and returns the fully
 * rendered HTML. Works in Node.js with no browser DOM APIs
 * required.
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
    const tagName = Comp.tagName;
    if (!tagName) {
      throw new Error(
        "░█ [ELENA]: Component must have a tagName defined. " +
          "Set `static tagName = 'your-tag-name'` as a static field on your component class."
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
 * Convert an HTML attribute string to the right JavaScript value based on
 * what type the prop’s default value is. This makes SSR output match what
 * the component would produce in the browser.
 *
 * HTML attributes are always strings, but props can be booleans, numbers,
 * arrays, or objects. Without this conversion, a number prop would receive
 * the string "5" instead of the number 5.
 *
 * @param {string} type - The JavaScript type of the prop’s default value
 *   (from `typeof defaultValue`).
 * @param {string} value - The raw attribute string from the HTML parser.
 *   Bare boolean attributes like `disabled` arrive as an empty string `""`.
 * @returns {boolean | number | string | Array | object | null}
 */
function convertAttrValue(type, value) {
  switch (type) {
    case "boolean":
      // A bare attribute with no value (e.g. `disabled`) means true.
      return value === "" || value === true;
    case "number":
      return value === null ? null : +value;
    case "object":
    case "array":
      if (!value) {
        return value;
      }
      try {
        return JSON.parse(value);
      } catch {
        return null;
      }
    default:
      // String (and any other type): use the value as-is.
      return value;
  }
}

/**
 * Create a component instance, apply props from HTML attributes,
 * and call render() to get the inner HTML string.
 *
 * @param {Function} ComponentClass
 * @param {Record<string, string>} attrs - Attributes from the HTML tag.
 * @param {string} textContent - Text content from the element’s children.
 * @returns {string} The inner HTML produced by render().
 */
function renderComponent(ComponentClass, attrs, textContent) {
  const instance = new ComponentClass();
  instance._text = textContent;

  // Read each declared prop’s default value type so we know how to convert
  // the incoming attribute strings (e.g. "5" → 5 for a number prop).
  const propDefaultTypes = {};
  for (const p of ComponentClass.props || []) {
    const name = typeof p === "string" ? p : p.name;
    propDefaultTypes[name] = typeof instance[name];
    if (Object.prototype.hasOwnProperty.call(instance, name)) {
      delete instance[name];
    }
  }

  // Write HTML attribute values into the internal props store, converting
  // each value to the right type based on the prop’s default.
  if (!instance._props) {
    instance._props = new Map();
  }
  for (const [key, value] of Object.entries(attrs)) {
    const type = propDefaultTypes[key];
    if (type !== undefined) {
      // Declared prop: convert the attribute string to the right JS type.
      instance._props.set(key, convertAttrValue(type, value));
    } else {
      // No type info available: treat bare attributes (empty string) as true,
      // and pass everything else through as a string.
      instance._props.set(key, value === "" ? true : value);
    }
  }

  // Call willUpdate() before render() so components can compute derived
  // values from their props, same as Elena does in the browser.
  instance.willUpdate?.();

  const result = instance.render();
  if (!result) {
    return "";
  }

  return normalizeWhitespace(result.toString());
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
function walk(nodes, preserveWhitespace = false) {
  let out = "";

  for (const node of nodes) {
    if (node.type === ElementType.Text) {
      if (preserveWhitespace) {
        // Inside <pre>: keep whitespace intact, but re-encode entities
        // that htmlparser2 decoded during parsing.
        out += escapeHtml(node.data);
      } else {
        // Collapse whitespace-only text between tags to avoid
        // preserving template literal indentation in output.
        const trimmed = node.data.replace(/\n\s*/g, "");
        if (trimmed) {
          out += escapeHtml(trimmed);
        }
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
      const hasRender = ComponentClass && Object.hasOwn(ComponentClass.prototype, "render");
      const pre = preserveWhitespace || tag === "pre";
      if (hasRender) {
        const innerHTML = renderComponent(ComponentClass, attrs, getTextContent(children));
        // Mark as hydrated so CSS targeting :scope:not([hydrated]) doesn’t
        // double-style the host alongside the already-rendered inner element.
        attrs.hydrated = "";
        out += `<${tag}${serializeAttrs(attrs)}>${innerHTML}</${tag}>`;
      } else {
        out += `<${tag}${serializeAttrs(attrs)}>${walk(children, pre)}</${tag}>`;
      }
    }
  }

  return out;
}

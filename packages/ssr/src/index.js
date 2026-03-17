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

import "./shim.js";
import { parseDocument, ElementType } from "htmlparser2";
import { normalizeWhitespace, escapeHtml } from "./common/utils.js";

/**
 * Render Elena Progressive Web Components to HTML strings.
 *
 * Parses an HTML string, expands registered Elena components
 * by calling their render() methods, and returns the fully
 * rendered HTML.
 *
 * @param {string} html - HTML string containing Elena components.
 * @returns {string} The rendered HTML with components expanded.
 */
export function ssr(html) {
  const doc = parseDocument(html.trim());
  return walk(doc.children);
}

/** @type {Map<string, Function>} */
const registry = new Map();

/** Tracks which classes already have SSR prop getters installed. */
const _initialized = new WeakSet();

/**
 * Install simplified prop getters on a component prototype so that
 * renderComponent() can read prop values from the _props Map.
 *
 * @param {Function} ComponentClass
 */
function installPropGetters(ComponentClass) {
  if (_initialized.has(ComponentClass)) {
    return;
  }
  _initialized.add(ComponentClass);

  const props = ComponentClass.props;
  if (!props) {
    return;
  }

  for (const p of props) {
    const name = typeof p === "string" ? p : p.name;
    const descriptor = Object.getOwnPropertyDescriptor(ComponentClass.prototype, name);

    if (descriptor && typeof descriptor.get === "function") {
      continue;
    }

    Object.defineProperty(ComponentClass.prototype, name, {
      configurable: true,
      enumerable: true,
      get() {
        return this._props ? this._props.get(name) : undefined;
      },
      set(value) {
        if (!this._props) {
          this._props = new Map();
        }
        this._props.set(name, value);
      },
    });
  }
}

/**
 * Register one or more Elena component classes for SSR.
 * Each class must have `_tagName` set (via Elena options).
 *
 * @param {...Function} components - Elena component classes.
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
    installPropGetters(Comp);
    registry.set(tagName, Comp);
  }
}

/** Tags whose whitespace is significant and must not be collapsed. */
const WHITESPACE_SENSITIVE = new Set([
  "pre",
  "textarea",
  "listing", // deprecated, behaves like <pre>
  "xmp", // deprecated, behaves like <pre>
]);

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
 * Convert an HTML attribute string to the right JavaScript
 * value based on what type the prop’s default value is.
 * This makes SSR output match what the component would
 * produce in the browser.
 *
 * @param {string} type - Type of the prop’s default value.
 * @param {string} value - Raw attribute string from the parser.
 * @returns {boolean | number | string | Array | object | null}
 */
function convertAttrValue(type, value) {
  switch (type) {
    case "boolean":
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
  const propDefaultTypes = {};

  instance._text = textContent;

  // Read each prop’s default value type so we know how
  // to convert the incoming attribute strings.
  for (const p of ComponentClass.props || []) {
    const name = typeof p === "string" ? p : p.name;
    const value = instance[name];

    propDefaultTypes[name] = typeof value;

    if (Object.prototype.hasOwnProperty.call(instance, name)) {
      delete instance[name];

      if (!instance._props) {
        instance._props = new Map();
      }

      instance._props.set(name, value);
    }
  }

  // Write HTML attributes into the internal store.
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
 * HTML whitespace characters: TAB, LF, CR, SPACE.
 * Intentionally excludes \u00A0 (non-breaking space) and other Unicode
 * whitespace that JavaScript's \s would match.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Text/Whitespace
 */
const WS = /[\t\n\r ]+/g;
const ALL_WS = /[^\t\n\r ]/;

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
        // Inside <pre>, <textarea>, etc.: keep whitespace intact,
        // but re-encode entities that htmlparser2 decoded during parsing.
        out += escapeHtml(node.data);
      } else {
        // Collapse all runs of HTML whitespace into a single space,
        // matching browser behavior. Whitespace-only text nodes are
        // preserved as a single space to maintain word boundaries
        // between inline elements (e.g. <span>a</span> <span>b</span>).
        if (ALL_WS.test(node.data)) {
          out += escapeHtml(node.data.replace(WS, " "));
        } else {
          out += " ";
        }
      }
      continue;
    }

    if (node.type === ElementType.Comment) {
      out += `<!--${node.data}-->`;
      continue;
    }

    if (node.type === ElementType.Script || node.type === ElementType.Style) {
      const raw = node.children.map(c => c.data).join("");
      out += `<${node.name}${serializeAttrs(node.attribs)}>${raw}</${node.name}>`;
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
      const pre = preserveWhitespace || WHITESPACE_SENSITIVE.has(tag);
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

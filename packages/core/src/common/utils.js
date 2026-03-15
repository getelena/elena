/**
 * Register the Elena Element if the browser supports it.
 *
 * @param {string} tagName
 * @param {Function} Element
 */
export function defineElement(tagName, Element) {
  if (typeof window !== "undefined" && "customElements" in window) {
    if (!window.customElements.get(tagName)) {
      window.customElements.define(tagName, Element);
    }
  }
}

/**
 * Escape a string for safe insertion into HTML.
 *
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  const Escape = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(str).replace(/[&<>"']/g, c => Escape[c]);
}

/**
 * Resolve an interpolated template value to its
 * HTML string representation.
 *
 * @param {*} value
 * @returns {string}
 */
export function resolveValue(value) {
  if (Array.isArray(value)) {
    return value.map(item => resolveItem(item)).join("");
  }
  return resolveItem(value);
}

/**
 * Resolve a single value to its HTML string
 * representation.
 *
 * @param {*} value
 * @returns {string}
 */
function resolveItem(value) {
  return value?.__raw ? String(value) : escapeHtml(String(value ?? ""));
}

/**
 * Tagged template for trusted HTML. Use as the return value
 * of render(), or for sub-fragments inside render methods.
 *
 * @param {TemplateStringsArray} strings
 * @param {...*} values
 * @returns {{ __raw: true, strings: TemplateStringsArray, values: Array, toString(): string }}
 */
export function html(strings, ...values) {
  let str;
  return {
    __raw: true,
    strings,
    values,
    toString: () => {
      if (str === undefined) {
        str = strings.reduce((acc, s, i) => {
          return acc + s + resolveValue(values[i]);
        }, "");
      }
      return str;
    },
  };
}

/**
 * Renders a string as HTML rather than text.
 *
 * @param {string} str - The raw HTML string to trust.
 * @returns {{ __raw: true, toString(): string }}
 */
export function unsafeHTML(str) {
  return { __raw: true, toString: () => str ?? "" };
}

/**
 * A placeholder you can return from a conditional expression
 * inside a template to render nothing.
 *
 * @type {{ __raw: true, toString(): string }}
 */
export const nothing = { __raw: true, toString: () => "" };

/**
 * Check if a value contains trusted HTML fragments.
 *
 * @param {*} value
 * @returns {boolean}
 */
export const isRaw = value =>
  Array.isArray(value) ? value.some(item => item?.__raw) : value?.__raw;

/**
 * Convert a value to its plain text string.
 *
 * @param {*} value
 * @returns {string}
 */
export const toPlainText = value =>
  Array.isArray(value) ? value.map(item => String(item ?? "")).join("") : String(value ?? "");

/**
 * Collapse whitespace from a static string part.
 *
 * @param {string} string
 * @returns {string}
 */
export function collapseWhitespace(string) {
  return string
    .replace(/>\n\s*/g, ">") // newline after tag close
    .replace(/\n\s*</g, "<") // newline before tag open
    .replace(/\n\s*/g, " "); // newline in text content, preserve word boundary
}

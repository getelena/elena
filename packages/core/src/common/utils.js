const prefix = "░█ [ELENA]: ";
const isArray = Array.isArray;
const RAW = Symbol("elena.raw");

/**
 * @param {string} msg
 * @internal
 */
export const warn = msg => console.warn(prefix + msg);
export { prefix, isArray };

/**
 * Register the Elena Element if the browser supports it.
 *
 * @param {string} tagName
 * @param {Function} Element
 */
export function defineElement(tagName, Element) {
  const customElements = globalThis.customElements;
  customElements?.get(tagName) || customElements?.define(tagName, Element);
}

/**
 * Escape a string for safe insertion into HTML.
 *
 * @param {string} str
 * @returns {string}
 */
const Escape = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export function escapeHtml(str) {
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
  if (isArray(value)) {
    return value.map(resolveItem).join("");
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
  return value?.[RAW] ? String(value) : escapeHtml(value ?? "");
}

/**
 * Lightweight template result.
 *
 * @internal
 */
class HtmlResult {
  constructor(strings, values) {
    this.strings = strings;
    this.values = values;
  }
  toString() {
    if (this._str == null) {
      this._str = this.strings.reduce((acc, s, i) => {
        return acc + s + resolveValue(this.values[i]);
      }, "");
    }
    return this._str;
  }
}
HtmlResult.prototype[RAW] = true;

/**
 * Tagged template for trusted HTML. Use as the return value
 * of render(), or for sub-fragments inside render methods.
 *
 * @param {TemplateStringsArray} strings
 * @param {...*} values
 * @returns {{ strings: TemplateStringsArray, values: Array, toString(): string }}
 */
export function html(strings, ...values) {
  return new HtmlResult(strings, values);
}

/**
 * Renders a string as HTML rather than text.
 *
 * @param {string} str - The raw HTML string to trust.
 * @returns {{ toString(): string }}
 */
export function unsafeHTML(str) {
  return { [RAW]: true, toString: () => str ?? "" };
}

/**
 * A placeholder you can return from a conditional expression
 * inside a template to render nothing.
 *
 * @type {{ toString(): string }}
 */
export const nothing = { [RAW]: true, toString: () => "" };

/**
 * Check if a value contains trusted HTML fragments.
 *
 * @param {*} value
 * @returns {boolean}
 */
export const isRaw = value => (isArray(value) ? value.some(item => item?.[RAW]) : !!value?.[RAW]);

/**
 * Convert a value to its plain text string.
 *
 * @param {*} value
 * @returns {string}
 */
export const toPlainText = value => (isArray(value) ? value.join("") : String(value ?? ""));

/**
 * Collapse whitespace from a static string part.
 *
 * @param {string} string
 * @returns {string}
 */
export function collapseWhitespace(string) {
  return string
    .replace(/(>)\n\s*|\n\s*(<)/g, "$1$2") // newlines adjacent to tags
    .replace(/\n\s*/g, " ") // newline in text content, preserve word boundary
    .replace(/>\s+</g, "><"); // whitespace between tags
}

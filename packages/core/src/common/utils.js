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
    return value
      .map(item => {
        if (item && item.__raw) {
          return String(item);
        }
        return escapeHtml(String(item ?? ""));
      })
      .join("");
  }
  if (value && value.__raw) {
    return String(value);
  }
  return escapeHtml(String(value ?? ""));
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
  const result = strings.reduce((acc, str, i) => {
    return acc + str + resolveValue(values[i]);
  }, "");
  return { __raw: true, strings, values, toString: () => result };
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

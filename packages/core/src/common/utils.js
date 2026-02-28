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
 * Tagged template for trusted HTML. Use as the return value of render(), or for
 * sub-fragments inside render methods. Interpolated values are auto-escaped;
 * nested `html` fragments are passed through without double-escaping.
 *
 * @param {TemplateStringsArray} strings
 * @param {...*} values
 * @returns {{ __raw: true, strings: TemplateStringsArray, values: Array, toString(): string }}
 */
export function html(strings, ...values) {
  const result = strings.reduce((acc, str, i) => {
    const v = values[i];
    return acc + str + (v && v.__raw ? String(v) : escapeHtml(String(v ?? "")));
  }, "");
  return { __raw: true, strings, values, toString: () => result };
}

/**
 * A placeholder you can return from a conditional expression inside a template
 * to render nothing. Always produces an empty string; signals to the template
 * engine that no further processing is needed.
 *
 * @type {{ __raw: true, toString(): string }}
 */
export const nothing = { __raw: true, toString: () => "" };

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
 * Process a template interpolated value into an HTML string.
 * Arrays are flattened, with each element processed individually.
 *
 * @param {*} v
 * @returns {{ result: string, isRaw: boolean }}
 */
export function processValue(v) {
  if (Array.isArray(v)) {
    let hasRaw = false;
    const result = v
      .map(item => {
        if (item && item.__raw) {
          hasRaw = true;
          return String(item);
        }
        return escapeHtml(String(item ?? ""));
      })
      .join("");
    return { result, isRaw: hasRaw };
  }
  if (v && v.__raw) {
    return { result: String(v), isRaw: true };
  }
  return { result: escapeHtml(String(v ?? "")), isRaw: false };
}

/**
 * Collapse template indentation whitespace from a static string part.
 * Only whitespace that originated from newlines is collapsed; inline spaces are preserved.
 *
 * @param {string} s
 * @returns {string}
 */
export function collapseWhitespace(s) {
  return s
    .replace(/>\n\s*/g, ">") // newline after tag close: pure indentation
    .replace(/\n\s*</g, "<") // newline before tag open: pure indentation
    .replace(/\n\s*/g, " "); // newline in text content: preserve word boundary
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
  const result = strings
    .reduce((acc, str, i) => {
      return acc + collapseWhitespace(str) + processValue(values[i]).result;
    }, "")
    .trim();
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
 * A placeholder you can return from a conditional expression inside a template
 * to render nothing. Always produces an empty string; signals to the template
 * engine that no further processing is needed.
 *
 * @type {{ __raw: true, toString(): string }}
 */
export const nothing = { __raw: true, toString: () => "" };

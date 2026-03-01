const Escape = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/**
 * Replaces HTML special characters with their entity equivalents.
 *
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => Escape[c]);
}

/**
 * Normalize whitespace to match Elena's client-side fullRender output.
 *
 * @param {string} markup
 * @returns {string}
 */
export function normalizeWhitespace(markup) {
  return markup
    .replace(/\n\s*/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/>\s+/g, ">")
    .replace(/\s+</g, "<")
    .trim();
}

const Escape = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

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

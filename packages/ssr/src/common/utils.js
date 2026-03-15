const Escape = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/**
 * Escape a string for safe insertion into HTML.
 *
 * @param {string} str
 * @returns {string}
 */
export function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => Escape[c]);
}

/**
 * Normalize whitespace to match Elena’s client-side
 * rendering output.
 *
 * Mirrors the core’s collapseWhitespace() pipeline:
 * 1. Strip newline+indent after tag close
 * 2. Strip newline+indent before tag open
 * 3. Collapse remaining newlines to a space (word boundary)
 * 4. Remove whitespace-only gaps between adjacent tags
 *
 * @param {string} markup
 * @returns {string}
 */
export function normalizeWhitespace(markup) {
  return markup
    .replace(/>\n\s*/g, ">")
    .replace(/\n\s*</g, "<")
    .replace(/\n\s*/g, " ")
    .replace(/>\s+</g, "><")
    .trim();
}

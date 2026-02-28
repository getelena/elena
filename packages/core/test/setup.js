import { afterEach } from "vitest";

/**
 * Create an element and append it to the document
 */
export function createElement(tag, attrs = {}) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

/**
 * Remove all test elements from the body.
 */
export function cleanup() {
  document.body.innerHTML = "";
}

afterEach(() => {
  cleanup();
});

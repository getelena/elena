import { afterEach } from "vitest";

export function createElement(tag, attrs = {}) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  document.body.appendChild(el);
  return el;
}

export function cleanup() {
  document.body.innerHTML = "";
}

afterEach(() => {
  cleanup();
});

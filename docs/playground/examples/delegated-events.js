const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "delegated-events",
  title: "Delegated Events",
  js: `import { Elena, html } from "${CDN}";

export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static props = ["variant"];
  // static events delegates these events from the inner element to the host
  static events = ["click", "focus", "blur"];

  /** @attribute @type {"default" | "primary"} */
  variant = "default";

  render() {
    return html\`<button class="my-button">\${this.text}</button>\`;
  }
}
MyButton.define();

// Now we can listen on the host element
document.querySelectorAll("my-button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("log").textContent +=
      "Clicked: " + btn.text + "\\n";
  });
});`,
  css: `@scope (my-button) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    --my-button-bg: #e2e8f0;
    display: inline-block;
    cursor: pointer;
  }

  :scope:not([hydrated]),
  .my-button:is(button) {
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background: var(--my-button-bg);
    display: inline-flex;
  }

  :scope[variant="primary"] {
    --my-button-bg: #3182ce;
    color: white;
  }
}

#log {
  font-family: ui-monospace, monospace;
  font-size: 0.8rem;
  background: #f7fafc;
  padding: 0.75rem;
  border-radius: 4px;
  margin-top: 1rem;
  min-height: 3rem;
  white-space: pre;
}`,
  html: `<my-button>Say Hello</my-button>
<my-button variant="primary">Say World</my-button>
<pre id="log"></pre>`,
};

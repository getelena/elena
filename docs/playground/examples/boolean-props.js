const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "boolean-props",
  title: "Boolean Props",
  js: `import { Elena, html } from "${CDN}";

export default class MyToggle extends Elena(HTMLElement) {
  static tagName = "my-toggle";
  static props = ["checked", "disabled"];
  static events = ["click"];

  /** @attribute @type {Boolean} */
  checked = false;

  /** @attribute @type {Boolean} */
  disabled = false;

  render() {
    return html\`<button
      class="my-toggle"
      aria-pressed="\${this.checked}"
      \${this.disabled ? "disabled" : ""}
    >\${this.checked ? "ON" : "OFF"}</button>\`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("click", () => {
      if (!this.disabled) {
        this.checked = !this.checked;
      }
    });
  }
}
MyToggle.define();`,
  css: `@scope (my-toggle) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    --my-toggle-bg: #cbd5e0;
    display: inline-block;
    cursor: pointer;
  }

  :scope:not([hydrated]),
  .my-toggle:is(button) {
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    background: var(--my-toggle-bg);
    color: #1a202c;
    min-width: 4rem;
    text-align: center;
    display: inline-flex;
    justify-content: center;
  }

  :scope[checked] {
    --my-toggle-bg: #48bb78;
    color: white;
  }

  :scope[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
}`,
  html: `<my-toggle></my-toggle>
<my-toggle checked></my-toggle>
<my-toggle disabled>OFF</my-toggle>`,
};

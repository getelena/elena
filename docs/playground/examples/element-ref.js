const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "element-ref",
  title: "Element Ref",
  js: `import { Elena, html } from "${CDN}";

export default class MyInput extends Elena(HTMLElement) {
  static tagName = "my-input";
  static props = ["label", "value"];
  // static element tells Elena which inner element to expose as this.element
  static element = "input";

  /** @attribute @type {String} */
  label = "";

  /** @attribute @type {String} */
  value = "";

  render() {
    return html\`<div class="my-input">
      <label>\${this.label}</label>
      <input type="text" value="\${this.value}" />
      <small class="hint">Character count: \${this.value.length}</small>
    </div>\`;
  }

  firstUpdated() {
    // this.element is the <input> because of static element = "input"
    this.element.addEventListener("input", e => {
      this.value = e.target.value;
    });
  }
}
MyInput.define();`,
  css: `@scope (my-input) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: block;
    margin-bottom: 0.75rem;
  }

  .my-input:is(div) {
    font-family: system-ui, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #4a5568;
    display: block;
  }

  input {
    font-size: 0.875rem;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    display: block;
  }

  input:focus {
    outline: 2px solid #3182ce;
    outline-offset: -1px;
  }

  .hint:is(small) {
    font-size: 0.7rem;
    color: #a0aec0;
    display: block;
  }
}`,
  html: `<my-input label="Your name" value="Elena"></my-input>`,
};

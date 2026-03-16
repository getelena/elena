export default {
  id: "element-ref",
  title: "Element Ref",
  js: `import { Elena, html } from "@elenajs/core";

export default class MyInput extends Elena(HTMLElement) {
  static tagName = "my-input";
  static props = ["label"];
  static element = "input";

  /** @attribute @type {String} */
  label = "";

  firstUpdated() {
    this.element.addEventListener("input", () => {
      this.querySelector(".hint").textContent =
        "Character count: " + this.element.value.length;
    });
  }

  render() {
    return html\`
      <div class="my-input">
        <label for="input">\${this.label}</label>
        <input id="input" type="text" placeholder="Start typing..." />
        <small class="hint">Character count: 0</small>
      </div>
    \`;
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

  .my-input {
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
    border: 1px solid #a5a9af;
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
  html: `<my-input label="Your name"></my-input>`,
};

const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "first-updated",
  title: "firstUpdated",
  js: `import { Elena, html } from "${CDN}";

export default class MyAutofocus extends Elena(HTMLElement) {
  static tagName = "my-autofocus";
  static element = "input";

  render() {
    return html\`<div class="my-autofocus">
      <label>Auto-focused input:</label>
      <input type="text" placeholder="I get focus on mount..." />
      <small class="status">Waiting...</small>
    </div>\`;
  }

  // firstUpdated runs once after the first render
  firstUpdated() {
    // this.element is the <input> (via static element)
    this.element.focus();
    this.querySelector(".status").textContent = "Input focused!";
  }
}
MyAutofocus.define();`,
  css: `@scope (my-autofocus) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope { display: block; }

  .my-autofocus:is(div) {
    font-family: system-ui, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
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

  .status:is(small) {
    font-size: 0.7rem;
    color: #48bb78;
    display: block;
  }
}`,
  html: `<my-autofocus></my-autofocus>`,
};

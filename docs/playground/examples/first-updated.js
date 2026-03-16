export default {
  id: "first-updated",
  title: "firstUpdated",
  js: `import { Elena, html } from "@elenajs/core";

export default class MyAutofocus extends Elena(HTMLElement) {
  static tagName = "my-autofocus";
  static element = "input";

  firstUpdated() {
    requestAnimationFrame(() => {
      this.element.focus();
      this.querySelector(".status").textContent = "Input focused!";
    });
  }

  render() {
    return html\`
      <div class="my-autofocus">
        <label for="input">Auto-focused input</label>
        <input id="input" type="text" placeholder="Focus on mount" />
        <small class="status">Waiting...</small>
      </div>
    \`;
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

  .my-autofocus {
    font-family: system-ui, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  label {
    font-weight: 600;
    color: #4a5568;
    display: block;
  }

  .status {
    color: #00963e;
  }
}

input {
  all: unset;
  padding: 0.5rem;
  border: 1px solid #a5a9af;;
  border-radius: 4px;
  display: block;
}

input:focus {
  outline: 2px solid #3182ce;
  outline-offset: -1px;
}`,
  html: `<my-autofocus></my-autofocus>`,
};

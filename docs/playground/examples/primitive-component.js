export default {
  id: "primitive-component",
  title: "Primitive Component",
  js: `import { Elena, html } from "@elenajs/core";

export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static props = ["variant"];
  static events = ["click"];

  /** @attribute @type {"default" | "primary" | "danger"} */
  variant = "default";

  render() {
    return html\`
      <button class="my-button">
        \${this.text}
      </button>
    \`;
  }
}

MyButton.define();`,
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
    --my-button-text: #1a202c;
    display: inline-block;
    border-radius: 6px;
    cursor: pointer;
  }

  :scope:not([hydrated]),
  .my-button:is(button) {
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background: var(--my-button-bg);
    color: var(--my-button-text);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  :scope:hover {
    filter: brightness(0.95);
  }

  :scope:active {
    opacity: 0.7;
  }

  :scope:focus-within {
    outline: 2px solid #3182ce;
    outline-offset: 1px;
  }

  :scope[variant="primary"] {
    --my-button-bg: #3182ce;
    --my-button-text: white;
  }

  :scope[variant="danger"] {
    --my-button-bg: #e53e3e;
    --my-button-text: white;
  }
}`,
  html: `<my-button>Default</my-button>
<my-button variant="primary">Primary</my-button>
<my-button variant="danger">Danger</my-button>`,
};

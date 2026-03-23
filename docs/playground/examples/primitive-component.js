export default {
  id: "primitive-component",
  title: "Primitive Component",
  js: `import { Elena, html } from "@elenajs/core";

/**
 * Button component is used for interface actions.
 *
 * @displayName Button
 * @status alpha
 *
 * @cssprop [--my-button-text] - Overrides the default text color.
 * @cssprop [--my-button-bg] - Overrides the default background color.
 */
export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static props = ["variant"];
  static events = ["click"];

  /**
   * The style variant of the button.
   *
   * @property
   * @type {"default" | "primary" | "danger"}
   */
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
  css: `/* Scope makes sure styles don’t leak out */
@scope (my-button) {

  /* Reset makes sure styles don’t leak in */
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  /* Targets the host element */
  :scope {
    /* Public theming API (with default values set) */
    --_my-button-bg: var(--my-button-bg, #eaecf0);
    --_my-button-text: var(--my-button-text, #172b4d);

    display: inline-block;
    border-radius: 6px;
    cursor: pointer;
  }

  /* Elena SSR Pattern to avoid layout shift */
  :scope:not([hydrated]),
  .my-button:is(button) {
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background: var(--_my-button-bg);
    color: var(--_my-button-text);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* States */
  :scope:hover {
    filter: brightness(0.95);
  }
  .my-button:active {
    opacity: 0.7;
  }
  .my-button:focus {
    outline: 2px solid #5a44d4;
    outline-offset: 1px;
  }

  /* Variants */
  :scope[variant="primary"] {
    --_my-button-bg: var(--my-button-bg, #5a44d4);
    --_my-button-text: var(--my-button-text, #fff);
  }
  :scope[variant="danger"] {
    --_my-button-bg: var(--my-button-bg, #d44444);
    --_my-button-text: var(--my-button-text, #fff);
  }
}`,
  html: `<my-button>Default</my-button>
<my-button variant="primary">Primary</my-button>
<my-button variant="danger">Danger</my-button>`,
};

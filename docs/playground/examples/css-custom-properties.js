const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "css-custom-properties",
  title: "CSS Custom Properties",
  js: `import { Elena, html } from "${CDN}";

/**
 * @cssprop [--my-button-bg] - Background color.
 * @cssprop [--my-button-text] - Text color.
 * @cssprop [--my-button-radius] - Border radius.
 * @cssprop [--my-button-font] - Font family.
 */
export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static events = ["click"];

  render() {
    return html\`<button class="my-button">\${this.text}</button>\`;
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

  /* Define public CSS custom properties with defaults */
  :scope {
    --my-button-bg: #e2e8f0;
    --my-button-text: #1a202c;
    --my-button-radius: 6px;
    --my-button-font: system-ui, sans-serif;
    display: inline-block;
    cursor: pointer;
  }

  :scope:not([hydrated]),
  .my-button:is(button) {
    font-family: var(--my-button-font);
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: var(--my-button-radius);
    background: var(--my-button-bg);
    color: var(--my-button-text);
    display: inline-flex;
  }
}`,
  html: `<!-- Default styling -->
<my-button>Default</my-button>

<!-- Override CSS custom properties from the consumer side -->
<my-button style="--my-button-bg: #3182ce; --my-button-text: white">Blue</my-button>

<my-button style="--my-button-bg: #805ad5; --my-button-text: white; --my-button-radius: 9999px">
  Rounded Purple
</my-button>

<!-- Or override via a CSS class -->
<style>
  .brand-theme {
    --my-button-bg: #f95b1f;
    --my-button-text: white;
    --my-button-font: Georgia, serif;
  }
</style>
<my-button class="brand-theme">Brand Theme</my-button>`,
};

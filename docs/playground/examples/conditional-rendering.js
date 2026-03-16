export default {
  id: "conditional-rendering",
  title: "Conditional Rendering",
  js: `import { Elena, html, nothing } from "@elenajs/core";

export default class MyAlert extends Elena(HTMLElement) {
  static tagName = "my-alert";
  static props = ["variant", "dismissible"];

  /** @attribute @type {"info" | "warning" | "error"} */
  variant = "info";

  /** @attribute @type {Boolean} */
  dismissible = false;

  render() {
    const close = this.dismissible
      ? html\`<button onclick="this.closest('my-alert').remove()">x</button>\`
      : nothing;

    const icon = html\`<span class="icon">&#9888;</span>\`;

    return html\`
      <div class="my-alert" role="alert">
        \${icon}
        <span class="message">\${this.text}</span>
        \${close}
      </div>
    \`;
  }
}

MyAlert.define();`,
  css: `@scope (my-alert) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    --my-alert-bg: #bee3f8;
    --my-alert-border: #3182ce;
  }

  :scope:not([hydrated]),
  .my-alert {
    margin-bottom: 0.5rem;
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
    min-height: 1.5rem;
    border-left: 3px solid var(--my-alert-border);
    background: var(--my-alert-bg);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  :scope:not([hydrated]) {
    padding-left: 2.5rem;
  }

  .icon {
    font-size: 1rem;
    width: 1rem;
  }

  .message { flex: 1; }

  button {
    cursor: pointer;
    font-size: 1rem;
    opacity: 0.6;
  }

  button:hover { opacity: 1; }

  :scope[variant="warning"] {
    --my-alert-bg: #fefcbf;
    --my-alert-border: #d69e2e;
  }

  :scope[variant="error"] {
    --my-alert-bg: #fed7d7;
    --my-alert-border: #e53e3e;
  }
}`,
  html: `<my-alert variant="info">This is an informational message.</my-alert>
<my-alert variant="warning" dismissible>This warning can be dismissed.</my-alert>
<my-alert variant="error">Something went wrong!</my-alert>`,
};

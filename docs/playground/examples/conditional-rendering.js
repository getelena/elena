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
      ? html\`<button onclick="this.closest('my-alert').remove()">×</button>\`
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
    --my-alert-bg: #cdedff;
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

  .message {
    flex: 1;
  }

  button {
    cursor: pointer;
    font-size: 1rem;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    opacity: 0.6;
  }

  button:hover {
    opacity: 1;
  }

  button:focus {
    outline: 2px solid #5a44d4;
  }

  :scope[variant="warning"] {
    --my-alert-bg: #ffedc2;
    --my-alert-border: #e7af20;
  }

  :scope[variant="error"] {
    --my-alert-bg: #fed7d7;
    --my-alert-border: #e53e3e;
  }
}`,
  html: `<my-alert variant="error">Something went wrong!</my-alert>
<my-alert variant="info">This is an informational message.</my-alert>
<my-alert variant="warning" dismissible>This warning can be dismissed.</my-alert>`,
};

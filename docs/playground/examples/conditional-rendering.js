const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "conditional-rendering",
  title: "Conditional Rendering",
  js: `import { Elena, html, nothing } from "${CDN}";

export default class MyAlert extends Elena(HTMLElement) {
  static tagName = "my-alert";
  static props = ["type", "dismissible"];

  /** @attribute @type {"info" | "warning" | "error"} */
  type = "info";

  /** @attribute @type {Boolean} */
  dismissible = false;

  render() {
    // Use \`nothing\` instead of empty strings for conditional rendering
    const closeBtn = this.dismissible
      ? html\`<button class="close" onclick="this.closest('my-alert').remove()">x</button>\`
      : nothing;

    const icon = this.type === "error"
      ? html\`<span class="icon">&#9888;</span>\`
      : this.type === "warning"
        ? html\`<span class="icon">&#9888;</span>\`
        : html\`<span class="icon">&#8505;</span>\`;

    return html\`<div class="my-alert" role="alert">
      \${icon}
      <span class="message">\${this.text}</span>
      \${closeBtn}
    </div>\`;
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
    display: block;
    margin-bottom: 0.5rem;
  }

  .my-alert:is(div) {
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    border-left: 3px solid var(--my-alert-border);
    background: var(--my-alert-bg);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .icon:is(span) { font-size: 1rem; }
  .message:is(span) { flex: 1; }

  .close:is(button) {
    cursor: pointer;
    font-size: 1rem;
    opacity: 0.6;
  }

  .close:is(button):hover { opacity: 1; }

  :scope[type="warning"] {
    --my-alert-bg: #fefcbf;
    --my-alert-border: #d69e2e;
  }

  :scope[type="error"] {
    --my-alert-bg: #fed7d7;
    --my-alert-border: #e53e3e;
  }
}`,
  html: `<my-alert type="info">This is an informational message.</my-alert>
<my-alert type="warning" dismissible>This warning can be dismissed.</my-alert>
<my-alert type="error">Something went wrong!</my-alert>`,
};

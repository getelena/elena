const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "shadow-dom",
  title: "Shadow DOM",
  js: `import { Elena, html } from "${CDN}";

export default class MyBadge extends Elena(HTMLElement) {
  static tagName = "my-badge";
  static props = ["variant"];

  // Shadow DOM styles are fully isolated
  static shadow = "open";
  static styles = \`
    :host {
      display: inline-block;
    }
    .badge {
      font-family: system-ui, sans-serif;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      background: var(--badge-bg, #e2e8f0);
      color: var(--badge-text, #1a202c);
    }
    :host([variant="success"]) {
      --badge-bg: #c6f6d5;
      --badge-text: #22543d;
    }
    :host([variant="error"]) {
      --badge-bg: #fed7d7;
      --badge-text: #742a2a;
    }
  \`;

  /** @attribute @type {"default" | "success" | "error"} */
  variant = "default";

  render() {
    return html\`
      <span class="badge">
        \${this.text}
      </span>
    \`;
  }
}
MyBadge.define();`,
  css: `/* Most external styles cannot reach into Shadow DOM.
   CSS custom properties still pierce the boundary for theming. */

/* This will NOT affect the badge (Shadow DOM blocks it) */
* {
  color: red !important;
}`,
  html: `<span>This span IS affected by the global style (color: red !important;)</span>

<br/><br/>

<my-badge>Default</my-badge>
<my-badge variant="success">Success</my-badge>
<my-badge variant="error">Error</my-badge>

<br/>

<p>
  The badges above are protected by Shadow DOM. The global style has no effect on them.
</p>`,
};

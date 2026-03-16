export default {
  id: "manual-listeners",
  title: "Manual Listeners",
  js: `import { Elena, html } from "@elenajs/core";

export default class MyKeyLogger extends Elena(HTMLElement) {
  static tagName = "my-key-logger";
  static props = [{ name: "keys", reflect: false }];

  /** @type {Array} */
  keys = [];

  connectedCallback() {
    super.connectedCallback();
    this._onKeyDown = e => {
      this.keys = [...this.keys.slice(-9), e.key];
    };
    this.setAttribute("tabindex", "0");
    this.addEventListener("keydown", this._onKeyDown);
    this.focus();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._onKeyDown);
  }

  clear() {
    this.keys = [];
  }

  render() {
    return html\`
      <div class="my-key-logger">
        <p class="hint">Press any key while focused here:</p>
        <div class="keys">
          \${this.keys.length
            ? this.keys.map(k => html\`<kbd>\${k}</kbd>\`)
            : html\`<span class="empty">No keys pressed yet</span>\`
          }
        </div>
        <button class="clear" onclick="this.closest('my-key-logger').clear()">Clear</button>
      </div>
    \`;
  }
}

MyKeyLogger.define();`,
  css: `@scope (my-key-logger) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: block;
    outline: none;
  }

  :scope:focus-within .my-key-logger {
    border-color: #3182ce;
  }

  .my-key-logger {
    font-family: system-ui, sans-serif;
    border: 2px dashed #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    display: block;
  }

  .hint {
    font-size: 0.8rem;
    color: #718096;
    margin: 0 0 0.75rem;
    display: block;
  }

  .keys {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    min-height: 2rem;
    align-items: center;
  }

  kbd {
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: #edf2f7;
    border: 1px solid #e2e8f0;
    border-radius: 3px;
    display: inline-flex;
  }

  .empty {
    font-size: 0.8rem;
    color: #a0aec0;
  }

  button.clear {
    margin-top: 0.75rem;
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    cursor: pointer;
    display: inline-flex;
  }

  button.clear:hover {
    background: #f7fafc;
  }

  button.clear:active {
    opacity: 0.7;
  }
}`,
  html: `<my-key-logger></my-key-logger>`,
};

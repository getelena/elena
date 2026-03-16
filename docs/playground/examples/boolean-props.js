export default {
  id: "boolean-props",
  title: "Boolean Props",
  js: `import { Elena, html } from "@elenajs/core";

export default class MyCheckbox extends Elena(HTMLElement) {
  static tagName = "my-checkbox";
  static props = ["checked", "disabled", "label"];
  static events = ["change"];

  /** @attribute @type {Boolean} */
  checked = false;

  /** @attribute @type {Boolean} */
  disabled = false;

  /** @attribute @type {String} */
  label = "";

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("change", () => {
      this.checked = !this.checked;
    });
  }

  render() {
    return html\`
      <label>
        <input type="checkbox"
          \${this.checked ? "checked" : ""}
          \${this.disabled ? "disabled" : ""}
        />
          \${this.label}
      </label>
    \`;
  }
}

MyCheckbox.define();`,
  css: `@scope (my-checkbox) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: block;
    user-select: none;
  }

  label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9375rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
  }

  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 1.125rem;
    height: 1.125rem;
    border: 2px solid #a5a9af;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    display: grid;
    place-content: center;
    flex-shrink: 0;
    transition: background 0.15s, border-color 0.15s;
  }

  input[type="checkbox"]::before {
    content: "";
    width: 0.75rem;
    height: 0.75rem;
    clip-path: polygon(10% 50%, 0 63%, 48% 100%, 100% 14%, 88% 0%, 48% 74%);
    background: #fff;
    transform: scale(0);
    transition: transform 0.1s ease-in-out;
  }

  input[type="checkbox"]:checked {
    background: #3182ce;
    border-color: #3182ce;
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }

  input[type="checkbox"]:focus {
    outline: 2px solid #3182ce;
    outline-offset: 1px;
  }

  input[type="checkbox"]:disabled {
    opacity: 0.5;
    background: #a5a9af;
    color: #a5a9af;
  }

  :scope[disabled] {
    color: #a5a9af;
  }
}`,
  html: `<my-checkbox label="Unchecked"></my-checkbox>
<my-checkbox checked label="Checked"></my-checkbox>
<my-checkbox disabled label="Disabled"></my-checkbox>`,
};

const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "boolean-props",
  title: "Boolean Props",
  js: `import { Elena, html } from "${CDN}";

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
  :scope {
    display: block;

    -webkit-user-select: none;
    user-select: none;
  }
}`,
  html: `<my-checkbox label="Unchecked"></my-checkbox>
<my-checkbox checked label="Checked"></my-checkbox>
<my-checkbox disabled label="Disabled"></my-checkbox>`,
};

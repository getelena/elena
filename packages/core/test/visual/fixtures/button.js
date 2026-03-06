import { Elena, html, unsafeHTML, nothing } from "../../../src/elena.js";
export default class Button extends Elena(HTMLElement) {
  static tagName = "elena-button";
  static events = ["click", "focus", "blur"];
  static props = [
    "variant",
    "size",
    "expand",
    "disabled",
    "label",
    "href",
    "target",
    "download",
    "name",
    "value",
    "type",
    { name: "icon", reflect: false },
  ];
  variant = "default";
  size = "md";
  expand = false;
  disabled = false;
  label = "";
  href = "";
  target = "_self";
  download = false;
  name = "";
  value = "";
  type = "button";
  icon = "";
  renderButton(template) {
    return html`
      <button
        class="elena-button"
        type="${this.type}"
        ${this.name ? html`name="${this.name}"` : nothing}
        ${this.value ? html`value="${this.value}"` : nothing}
        ${this.disabled ? "disabled" : nothing}
        ${this.label ? html`aria-label="${this.label}"` : nothing}
      >
        ${template}
      </button>
    `;
  }
  renderLink(template) {
    return html`
      <a
        class="elena-button"
        href="${this.href}"
        target="${this.target}"
        ${this.download ? "download" : nothing}
        ${this.label ? html`aria-label="${this.label}"` : nothing}
      >
        ${template}
      </a>
    `;
  }
  render() {
    const icon = this.icon ? unsafeHTML(`<span class="elena-icon">${this.icon}</span>`) : nothing;
    const markup = html`
      ${this.text ? html`<span>${this.text}</span>` : nothing}
      ${icon}
    `;
    return this.href ? this.renderLink(markup) : this.renderButton(markup);
  }
}
Button.define();

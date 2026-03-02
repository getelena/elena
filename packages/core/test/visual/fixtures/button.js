import { Elena, html, unsafeHTML, nothing } from "../../../src/elena.js";
const options = {
  tagName: "elena-button",
  props: [
    "variant",
    "size",
    "fit-container",
    "disabled",
    "name",
    "value",
    "type",
    { name: "icon", reflect: false },
  ],
  events: ["click", "focus", "blur"],
};
export default class Button extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.variant = "default";
    this.size = "md";
    this.expand = false;
    this.disabled = false;
    this.name = "";
    this.value = "";
    this.type = "button";
    this.icon = "";
  }
  render() {
    const icon = this.icon ? unsafeHTML(`<span class="elena-icon">${this.icon}</span>`) : nothing;
    return html`
      <button class="elena-button">
        ${this.text ? html`<span>${this.text}</span>` : nothing}
        ${icon}
      </button>
    `;
  }
}
Button.define();

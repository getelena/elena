import { Elena, html } from "../../src/elena.js";

const options = {
  tagName: "complex-element",
  props: ["label", "description", "error", "type", "name", "disabled", "value"],
  events: [],
  element: ".elena-input",
};

/**
 * Test fixture with a complex template containing conditional
 * HTML blocks, conditional attributes, and multiple interpolation types.
 */
export default class ComplexElement extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.label = "";
    this.description = "";
    this.error = "";
    this.type = "text";
    this.name = "";
    this.disabled = false;
    this.value = "";
  }

  render() {
    return html`
      <label for="input">${this.label}</label>
      ${this.description ? html`<div class="elena-desc">${this.description}</div>` : ""}
      <div class="elena-input-container">
        <input
          id="input"
          class="elena-input"
          type="${this.type}"
          ${this.name ? `name="${this.name}"` : ""}
          ${this.disabled ? "disabled" : ""}
        />
      </div>
      ${this.error ? html`<div class="elena-error" role="alert">${this.error}</div>` : ""}
    `;
  }
}
ComplexElement.define();

import { Elena, html } from "../../src/elena.js";

/**
 * Test fixture with a complex template containing conditional
 * HTML blocks, conditional attributes, and multiple interpolation types.
 */
export default class ComplexElement extends Elena(HTMLElement) {
  static tagName = "complex-element";
  static props = ["label", "description", "error", "type", "name", "disabled", "value"];
  static element = ".elena-input";

  label = "";
  description = "";
  error = "";
  type = "text";
  name = "";
  disabled = false;
  value = "";

  render() {
    return html`
      <label for="input">${this.label}</label>
      ${this.description ? html`<div class="elena-desc">${this.description}</div>` : ""}
      <div class="elena-input-container">
        <input
          id="input"
          class="elena-input"
          type=${this.type}
          ${this.name ? `name=${this.name}` : ""}
          ${this.disabled ? "disabled" : ""}
        />
      </div>
      ${this.error ? html`<div class="elena-error" role="alert">${this.error}</div>` : ""}
    `;
  }
}
ComplexElement.define();

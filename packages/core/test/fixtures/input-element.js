import { Elena, html, nothing } from "../../src/elena.js";

export default class InputElement extends Elena(HTMLElement) {
  static tagName = "input-element";
  static props = ["label", "type", "name", "value", "disabled", "error"];
  static events = ["input", "focus", "blur"];
  static element = "input";

  label = "";
  type = "text";
  name = "";
  value = "";
  disabled = false;
  error = "";

  render() {
    return html`<div class="input-container">
      <label for="test">${this.label}</label>
      <input
        id="test"
        type="${this.type}"
        ${this.name ? html`name="${this.name}"` : nothing}
        ${this.value ? `value="${this.value}"` : nothing}
        ${this.disabled ? "disabled" : nothing}
      />
      ${this.error ? html`<span class="error">${this.error}</span>` : nothing}
    </div>`;
  }
}
InputElement.define();

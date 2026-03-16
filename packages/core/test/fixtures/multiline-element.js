import { Elena, html } from "../../src/elena.js";

export default class MultilineElement extends Elena(HTMLElement) {
  static tagName = "multiline-element";
  static props = ["label", "type", "name", "disabled"];
  static element = ".btn";

  label = "";
  type = "button";
  name = "";
  disabled = false;

  render() {
    return html`
      <button
        class="btn"
        type="${this.type}"
        ${this.name ? `name="${this.name}"` : ""}
        ${this.disabled ? "disabled" : ""}>
          ${this.label}
      </button>
    `;
  }
}
MultilineElement.define();

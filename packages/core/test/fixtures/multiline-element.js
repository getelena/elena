import { Elena, html } from "../../src/elena.js";

const options = {
  tagName: "multiline-element",
  props: ["label", "type", "name", "disabled"],
  events: [],
  element: ".btn",
};

/**
 * Test fixture with a multiline template to verify
 * whitespace stripping from template indentation.
 */
export default class MultilineElement extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.label = "";
    this.type = "button";
    this.name = "";
    this.disabled = false;
  }

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

import { Elena, html } from "../../../src/elena.js";
const options = {
  tagName: "elena-button",
  props: ["label", "variant", "disabled", "name", "value", "type"],
  events: ["click", "focus", "blur"],
};
export default class Button extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.variant = "default";
    this.disabled = false;
    this.name = "";
    this.value = "";
    this.type = "button";
  }
  render() {
    return html`<button>${this.text}</button>`;
  }
}
Button.define();

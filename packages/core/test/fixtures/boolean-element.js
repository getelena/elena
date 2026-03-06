import { Elena, html } from "../../src/elena.js";

export default class BooleanElement extends Elena(HTMLElement) {
  static tagName = "boolean-element";
  static props = ["disabled", "checked"];
  static element = ".inner";

  disabled = false;
  checked = false;

  render() {
    return html`<input class="inner" type="checkbox" />`;
  }
}
BooleanElement.define();

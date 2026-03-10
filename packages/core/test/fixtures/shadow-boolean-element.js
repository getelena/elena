import { Elena, html } from "../../src/elena.js";

export default class ShadowBooleanElement extends Elena(HTMLElement) {
  static tagName = "shadow-boolean-element";
  static shadow = "open";
  static props = ["disabled", "checked"];
  static element = ".inner";

  disabled = false;
  checked = false;

  render() {
    return html`<input class="inner" type="checkbox" />`;
  }
}
ShadowBooleanElement.define();

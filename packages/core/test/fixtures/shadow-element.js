import { Elena, html } from "../../src/elena.js";

export default class ShadowElement extends Elena(HTMLElement) {
  static tagName = "shadow-element";
  static shadow = "open";
  static props = ["label"];
  static events = ["click"];

  label = "";

  render() {
    return html`<button>${this.label}</button>`;
  }
}
ShadowElement.define();

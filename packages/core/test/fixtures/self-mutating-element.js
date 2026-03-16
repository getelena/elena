import { Elena, html } from "../../src/elena.js";

export default class SelfMutatingElement extends Elena(HTMLElement) {
  static tagName = "self-mutating-element";
  static props = ["label"];

  label = "";

  render() {
    const upper = (this.label || "").toUpperCase();
    if (this.label !== upper) {
      this.setAttribute("label", upper);
    }
    return html`<span class="inner">${this.label}</span>`;
  }
}
SelfMutatingElement.define();

import { Elena, html } from "../../src/elena.js";

export default class BasicElement extends Elena(HTMLElement) {
  static tagName = "basic-element";
  static props = ["variant"];

  variant = "";

  render() {
    return html`<span>${this.variant}</span>`;
  }
}
BasicElement.define();

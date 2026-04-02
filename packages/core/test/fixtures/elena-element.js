import { Elena, html } from "../../src/elena.js";

export default class BasicElement extends Elena(HTMLElement) {
  static tagName = "basic-element";
  static props = ["variant"];

  variant = "";

  render() {
    return html`<span variant="${this.variant}">${this.text}</span>`;
  }
}
BasicElement.define();

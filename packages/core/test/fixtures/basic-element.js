import { Elena, html } from "../../src/elena.js";

export default class BasicElement extends Elena(HTMLElement) {
  static tagName = "basic-element";
  static props = ["label"];
  static element = ".inner";

  label = "";

  render() {
    return html`<span class="inner">${this.label}</span>`;
  }
}
BasicElement.define();

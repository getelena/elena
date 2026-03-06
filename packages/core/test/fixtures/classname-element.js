import { Elena, html } from "../../src/elena.js";

export default class ClassnameElement extends Elena(HTMLElement) {
  static tagName = "classname-element";
  static props = ["label"];
  static element = "inner";

  label = "";

  render() {
    return html`<span class="inner">${this.label}</span>`;
  }
}
ClassnameElement.define();

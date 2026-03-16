import { Elena, html } from "../../src/elena.js";

export default class NoTemplateElement extends Elena(HTMLElement) {
  static tagName = "no-template-element";
  static props = ["label"];
  static element = ".missing";

  label = "";

  render() {
    return html`<div></div>`;
  }
}
NoTemplateElement.define();

import { Elena, html } from "../../src/elena.js";

export default class NoElementOption extends Elena(HTMLElement) {
  static tagName = "no-element-option";
  static props = ["label"];

  label = "";

  render() {
    return html`<span>${this.label || ""}</span>`;
  }
}
NoElementOption.define();

import { Elena, html } from "../../src/elena.js";

export default class NoReflectElement extends Elena(HTMLElement) {
  static tagName = "no-reflect-element";
  static props = [{ name: "label" }, { name: "content", reflect: false }];
  static element = ".inner";

  label = "";
  content = "";

  render() {
    return html`<span class="inner">${this.label} ${this.content}</span>`;
  }
}
NoReflectElement.define();

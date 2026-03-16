import { Elena, html } from "../../src/elena.js";

export default class AttrElement extends Elena(HTMLElement) {
  static tagName = "attr-element";
  static props = ["label", "variant"];
  static element = ".inner";

  label = "";
  variant = "default";

  render() {
    return html`<span class="inner">${this.label}</span>`;
  }
}
AttrElement.define();

import { Elena, html } from "../../src/elena.js";

export default class ShadowStylesElement extends Elena(HTMLElement) {
  static tagName = "shadow-styles-element";
  static shadow = "open";
  static styles = ["button { color: red; }", "button { font-size: 14px; }"];

  render() {
    return html`<button>test</button>`;
  }
}
ShadowStylesElement.define();

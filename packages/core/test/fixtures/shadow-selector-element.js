import { Elena, html } from "../../src/elena.js";

export default class ShadowSelectorElement extends Elena(HTMLElement) {
  static tagName = "shadow-selector-element";
  static shadow = "open";
  static element = "button";

  render() {
    return html`<div><button>inner</button></div>`;
  }
}
ShadowSelectorElement.define();

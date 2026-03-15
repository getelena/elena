import { Elena, html } from "../../src/elena.js";

export default class ShadowClosedElement extends Elena(HTMLElement) {
  static tagName = "shadow-closed-element";
  static shadow = "closed";
  static props = ["label"];
  static events = ["click"];
  static styles = ["button { color: blue; }"];

  label = "";

  render() {
    return html`<button>${this.label}</button>`;
  }
}
ShadowClosedElement.define();

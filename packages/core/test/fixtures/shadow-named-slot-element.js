import { Elena, html } from "../../src/elena.js";

export default class ShadowNamedSlotElement extends Elena(HTMLElement) {
  static tagName = "shadow-named-slot-element";
  static shadow = "open";

  render() {
    return html`<div>
      <header><slot name="header"></slot></header>
      <main><slot></slot></main>
      <footer><slot name="footer"></slot></footer>
    </div>`;
  }
}
ShadowNamedSlotElement.define();

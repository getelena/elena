import { Elena, html } from "../../src/elena.js";

export default class ShadowSlotElement extends Elena(HTMLElement) {
  static tagName = "shadow-slot-element";
  static shadow = "open";
  static props = ["label"];
  static styles = ["::slotted(span) { color: red; }"];

  label = "";

  render() {
    return html`<div>
      <header>${this.label}</header>
      <slot></slot>
    </div>`;
  }
}
ShadowSlotElement.define();

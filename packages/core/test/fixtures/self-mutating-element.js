import { Elena, html } from "../../src/elena.js";

/**
 * Test fixture whose render() normalizes its own observed prop.
 * Without the _isRendering guard this would recurse infinitely.
 */
export default class SelfMutatingElement extends Elena(HTMLElement) {
  static tagName = "self-mutating-element";
  static props = ["label"];

  label = "";

  render() {
    // Uppercase the label: this setAttribute call fires attributeChangedCallback
    // while render() is still on the stack; the guard must prevent re-entry.
    const upper = (this.label || "").toUpperCase();
    if (this.label !== upper) {
      this.setAttribute("label", upper);
    }
    return html`<span class="inner">${this.label}</span>`;
  }
}
SelfMutatingElement.define();

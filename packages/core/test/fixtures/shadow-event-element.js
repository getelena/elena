import { Elena, html } from "../../src/elena.js";

export default class ShadowEventElement extends Elena(HTMLElement) {
  static tagName = "shadow-event-element";
  static shadow = "open";
  static props = ["label"];
  static events = ["click", "focus"];
  static element = ".inner-btn";

  label = "Click me";

  render() {
    return html`<button class="inner-btn">${this.label}</button>`;
  }
}
ShadowEventElement.define();

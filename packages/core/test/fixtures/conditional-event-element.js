import { Elena, html, nothing } from "../../src/elena.js";

export default class ConditionalEventElement extends Elena(HTMLElement) {
  static tagName = "conditional-event-element";
  static props = ["active"];
  static events = ["click"];

  active = true;

  render() {
    return html`<button>${this.active ? this.text : nothing}</button>`;
  }
}
ConditionalEventElement.define();

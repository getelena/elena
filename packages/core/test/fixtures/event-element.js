import { Elena, html } from "../../src/elena.js";

export default class EventElement extends Elena(HTMLElement) {
  static tagName = "event-element";
  static props = ["label"];
  static events = ["click", "focus"];
  static element = ".inner-btn";

  label = "Click me";

  render() {
    return html`<button class="inner-btn">${this.label}</button>`;
  }
}
EventElement.define();

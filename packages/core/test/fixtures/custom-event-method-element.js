import { Elena, html } from "../../src/elena.js";

export default class CustomEventMethodElement extends Elena(HTMLElement) {
  static tagName = "custom-event-method-element";
  static props = ["label"];
  static events = ["click", "focus"];
  static element = "button";

  label = "Click me";

  click() {
    return "custom";
  }

  render() {
    return html`<button>${this.label}</button>`;
  }
}
CustomEventMethodElement.define();

import { Elena, html } from "../../src/elena.js";

const options = {
  tagName: "event-element",
  props: ["label"],
  events: ["click", "focus"],
  element: ".inner-btn",
};

export default class EventElement extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.label = "Click me";
  }

  render() {
    return html`<button class="inner-btn">${this.label}</button>`;
  }
}
EventElement.define();

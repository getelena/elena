import { Elena, html } from "../../src/elena.js";

const options = {
  tagName: "no-template-element",
  props: ["label"],
  events: [],
  element: ".missing",
};

export default class NoTemplateElement extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.label = "";
  }

  render() {
    // Intentionally renders nothing.
    return html`<div></div>`;
  }
}
NoTemplateElement.define();

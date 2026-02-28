import { Elena, html } from "../../src/elena.js";

const options = {
  tagName: "object-element",
  props: ["config", "items"],
  events: [],
  element: ".inner",
};

export default class ObjectElement extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.config = {};
    this.items = [];
  }

  render() {
    return html`<span class="inner">${JSON.stringify(this.config)}</span>`;
  }
}
ObjectElement.define();

import { Elena, html } from "../../src/elena.js";

const options = {
  tagName: "number-element",
  props: ["count", "max"],
  events: [],
  element: ".inner",
};

export default class NumberElement extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.count = 0;
    this.max = 100;
  }

  render() {
    return html`<span class="inner">${this.count} / ${this.max}</span>`;
  }
}
NumberElement.define();

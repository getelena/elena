import { Elena, html } from "../../src/elena.js";

export default class NumberElement extends Elena(HTMLElement) {
  static tagName = "number-element";
  static props = ["count", "max"];
  static element = ".inner";

  count = 0;
  max = 100;

  render() {
    return html`<span class="inner">${this.count} / ${this.max}</span>`;
  }
}
NumberElement.define();

import { Elena, html } from "../../src/elena.js";

export default class ObservedElement extends Elena(HTMLElement) {
  static tagName = "observed-element";
  static observe = true;
  static element = ".inner";

  render() {
    return html`<span class="inner">${this.text}</span>`;
  }
}
ObservedElement.define();

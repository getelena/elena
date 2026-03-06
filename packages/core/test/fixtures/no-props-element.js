import { Elena, html } from "../../src/elena.js";

export default class NoPropsElement extends Elena(HTMLElement) {
  static tagName = "no-props-element";
  static element = ".inner";

  render() {
    return html`<span class="inner">static content</span>`;
  }
}
NoPropsElement.define();

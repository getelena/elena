import { Elena, html } from "../../src/elena.js";

export default class ContentElement extends Elena(HTMLElement) {
  static tagName = "content-element";
  static element = ".inner";

  render() {
    return html`<span class="inner">${this.text}</span>`;
  }
}
ContentElement.define();

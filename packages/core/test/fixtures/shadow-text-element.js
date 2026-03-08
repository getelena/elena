import { Elena, html } from "../../src/elena.js";

export default class ShadowTextElement extends Elena(HTMLElement) {
  static tagName = "shadow-text-element";
  static shadow = "open";

  render() {
    return html`<span>${this.text}</span>`;
  }
}
ShadowTextElement.define();

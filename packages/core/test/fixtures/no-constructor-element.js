import { Elena, html } from "../../src/elena.js";

export default class NoConstructorElement extends Elena(HTMLElement) {
  static tagName = "no-constructor-element";

  render() {
    return html`<span>no constructor</span>`;
  }
}
NoConstructorElement.define();

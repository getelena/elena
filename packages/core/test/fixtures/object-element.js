import { Elena, html } from "../../src/elena.js";

export default class ObjectElement extends Elena(HTMLElement) {
  static tagName = "object-element";
  static props = ["config", "items"];
  static element = ".inner";

  config = {};
  items = [];

  render() {
    return html`<span class="inner">${JSON.stringify(this.config)}</span>`;
  }
}
ObjectElement.define();

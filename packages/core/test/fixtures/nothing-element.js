import { Elena, html, nothing } from "../../src/elena.js";

export default class NothingElement extends Elena(HTMLElement) {
  static tagName = "nothing-element";
  static props = ["label", "active"];
  static element = ".btn";

  label = "Click";
  active = true;

  render() {
    return html`<button class="btn">${this.active ? this.label : nothing}</button>`;
  }
}
NothingElement.define();

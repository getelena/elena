import { Elena, html } from "../../src/elena.js";

export default class TagSwitchElement extends Elena(HTMLElement) {
  static tagName = "tag-switch-element";
  static props = ["variant"];
  static events = ["click"];

  variant = "button";

  render() {
    if (this.variant === "link") {
      return html`<a href="#">link</a>`;
    }
    return html`<button>button</button>`;
  }
}
TagSwitchElement.define();

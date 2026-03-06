import { Elena, html } from "../../src/elena.js";

/**
 * Primitive Component fixture: renders its own inner template.
 * Used to test Primitive Components nested inside Composite Components.
 */
export default class ChildElement extends Elena(HTMLElement) {
  static tagName = "child-element";
  static props = ["variant"];
  static element = ".child-inner";

  variant = "default";

  render() {
    return html`<span class="child-inner">${this.variant}</span>`;
  }
}
ChildElement.define();

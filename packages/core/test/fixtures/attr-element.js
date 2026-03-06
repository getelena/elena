import { Elena, html } from "../../src/elena.js";

/**
 * Test fixture with values in both text and attribute positions.
 * Used to test DOM diffing fallback for attribute-position values.
 */
export default class AttrElement extends Elena(HTMLElement) {
  static tagName = "attr-element";
  static props = ["label", "variant"];
  static element = ".inner";

  label = "";
  variant = "default";

  render() {
    return html`<span class="inner">${this.label}</span>`;
  }
}
AttrElement.define();

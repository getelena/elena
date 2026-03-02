import { Elena, html } from "../../src/elena.js";

const options = {
  tagName: "attr-element",
  props: ["label", "variant"],
  events: [],
  element: ".inner",
};

/**
 * Test fixture with values in both text and attribute positions.
 * Used to test DOM diffing fallback for attribute-position values.
 */
export default class AttrElement extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.label = "";
    this.variant = "default";
  }

  render() {
    return html`<span class="inner">${this.label}</span>`;
  }
}
AttrElement.define();

import { Elena, html } from "../../src/elena.js";

const options = {
  tagName: "child-element",
  props: ["variant"],
  element: ".child-inner",
};

/**
 * Primitive Component fixture: renders its own inner template.
 * Used to test Primitive Components nested inside Composite Components.
 */
export default class ChildElement extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.variant = "default";
  }

  render() {
    return html`<span class="child-inner">${this.variant}</span>`;
  }
}
ChildElement.define();

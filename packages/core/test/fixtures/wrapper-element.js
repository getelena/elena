import { Elena } from "../../src/elena.js";

const options = {
  tagName: "wrapper-element",
  props: ["direction"],
};

/**
 * Composite Component fixture: accepts slotted children, no render method.
 * Models the same pattern as a Stack/layout Composite Component.
 */
export default class WrapperElement extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.direction = "column";
  }
}
WrapperElement.define();

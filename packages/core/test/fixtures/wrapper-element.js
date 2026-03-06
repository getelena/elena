import { Elena } from "../../src/elena.js";

/**
 * Composite Component fixture: accepts slotted children, no render method.
 * Models the same pattern as a Stack/layout Composite Component.
 */
export default class WrapperElement extends Elena(HTMLElement) {
  static tagName = "wrapper-element";
  static props = ["direction"];

  direction = "column";
}
WrapperElement.define();

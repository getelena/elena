import { Elena } from "../../src/elena.js";

/**
 * HTML Web Component fixture: accepts slotted children, no render method.
 * Models a Stack layout pattern.
 */
export default class WrapperElement extends Elena(HTMLElement) {
  static tagName = "wrapper-element";
  static props = ["direction"];

  direction = "column";
}
WrapperElement.define();

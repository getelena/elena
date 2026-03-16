import { Elena } from "../../src/elena.js";

export default class WrapperElement extends Elena(HTMLElement) {
  static tagName = "wrapper-element";
  static props = ["direction"];

  direction = "column";
}
WrapperElement.define();

import { Elena } from "../../src/elena.js";

export default class DsdElement extends Elena(HTMLElement) {
  static tagName = "dsd-element";
  static shadow = "open";
  static styles = ["button { color: red; }"];
}
DsdElement.define();

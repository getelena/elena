import { Elena } from "../../../src/elena.js";
export default class Stack extends Elena(HTMLElement) {
  static tagName = "elena-stack";
  static props = ["direction"];
  direction = "column";
}
Stack.define();

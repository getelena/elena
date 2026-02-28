import { Elena } from "../../../src/elena.js";
const options = {
  tagName: "elena-stack",
  props: ["direction"],
};
export default class Stack extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.direction = "column";
  }
}
Stack.define();

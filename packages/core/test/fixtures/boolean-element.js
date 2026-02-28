import { Elena, html } from "../../src/elena.js";

const options = {
  tagName: "boolean-element",
  props: ["disabled", "checked"],
  events: [],
  element: ".inner",
};

export default class BooleanElement extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.disabled = false;
    this.checked = false;
  }

  render() {
    return html`<input class="inner" type="checkbox" ${this.disabled ? "disabled" : ""} ${this.checked ? "checked" : ""} />`;
  }
}
BooleanElement.define();

import { Elena, html } from "../../src/elena.js";

const options = {
  tagName: "classname-element",
  props: ["label"],
  element: "inner",
};

export default class ClassnameElement extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.label = "";
  }

  render() {
    return html`<span class="inner">${this.label || ""}</span>`;
  }
}
ClassnameElement.define();

import { Elena, html } from "../../src/elena.js";
const options = {
  tagName: "basic-element",
  props: ["label"],
  element: ".inner",
};
export default class BasicElement extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.label = "";
  }
  render() {
    return html`<span class="inner">${this.label || ""}</span>`;
  }
}
BasicElement.define();

import { Elena, html } from "../../src/elena.js";
const options = {
  tagName: "no-reflect-element",
  props: ["label", { name: "content", reflect: false }],
  element: ".inner",
};
export default class NoReflectElement extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.label = "";
    this.content = "";
  }
  render() {
    return html`<span class="inner">${this.label} ${this.content}</span>`;
  }
}
NoReflectElement.define();

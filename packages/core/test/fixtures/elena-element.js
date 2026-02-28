import { Elena, html } from "../../src/elena.js";
export default class BasicElement extends Elena(HTMLElement, {
  tagName: "basic-element",
  props: ["variant"],
}) {
  constructor() {
    super();
    this.variant = "";
  }
  render() {
    return html`<span>${this.text}</span>`;
  }
}
BasicElement.define();

import { Elena, html } from "../../src/elena.js";

const options = {
  tagName: "no-element-option",
  props: ["label"],
};

export default class NoElementOption extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.label = "";
  }

  render() {
    return html`<span>${this.label || ""}</span>`;
  }
}
NoElementOption.define();

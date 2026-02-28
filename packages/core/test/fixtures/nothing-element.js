import { Elena, html, nothing } from "../../src/elena.js";

const options = {
  tagName: "nothing-element",
  props: ["label", "active"],
  element: ".btn",
};

export default class NothingElement extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.label = "Click";
    this.active = true;
  }

  render() {
    return html`<button class="btn">${this.active ? this.label : nothing}</button>`;
  }
}

NothingElement.define();

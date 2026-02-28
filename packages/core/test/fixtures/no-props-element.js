import { Elena, html } from "../../src/elena.js";

const options = {
  tagName: "no-props-element",
  events: [],
  element: ".inner",
};

export default class NoPropsElement extends Elena(HTMLElement, options) {
  constructor() {
    super();
  }

  render() {
    return html`<span class="inner">static content</span>`;
  }
}
NoPropsElement.define();

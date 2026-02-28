import { Elena, html } from "../../src/elena.js";
const options = {
  tagName: "content-element",
  element: ".inner",
};
export default class ContentElement extends Elena(HTMLElement, options) {
  render() {
    return html`<span class="inner">${this.text}</span>`;
  }
}
ContentElement.define();

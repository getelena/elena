import { Elena, html } from "../../src/elena.js";

export default class TemplateNoOptions extends Elena(HTMLElement, { tagName: "template-no-options" }) {
  constructor() {
    super();
  }

  render() {
    return html`<div></div>`;
  }
}
TemplateNoOptions.define();

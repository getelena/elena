import { Elena, html } from "../../src/elena.js";

export default class TemplateNoOptions extends Elena(HTMLElement) {
  static tagName = "template-no-options";

  render() {
    return html`<div></div>`;
  }
}
TemplateNoOptions.define();

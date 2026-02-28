import { Elena, html } from "../../src/elena.js";

const options = {
  tagName: "extended-element",
  props: ["label"],
  events: [],
  element: ".inner",
};

export default class ExtendedElement extends Elena(HTMLElement, options) {
  constructor() {
    super();
    this.label = "";
    this._updateCount = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-connected", "true");
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.setAttribute("data-disconnected", "true");
  }

  updated() {
    super.updated();
    this._updateCount++;
    this.setAttribute("data-updated", "true");
    this.setAttribute("data-update-count", String(this._updateCount));
  }

  render() {
    return html`<span class="inner">${this.label || ""}</span>`;
  }
}
ExtendedElement.define();

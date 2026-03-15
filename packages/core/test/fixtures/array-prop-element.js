import { Elena, html, nothing } from "../../src/elena.js";

export default class ArrayPropElement extends Elena(HTMLElement) {
  static tagName = "array-prop-element";
  static props = ["links", "label", "href", "disabled"];

  /** @attribute @type {Array} */
  links = [];

  /** @attribute @type {string} */
  label = "";

  /** @attribute @type {string} */
  href = "";

  /** @attribute @type {boolean} */
  disabled = false;

  render() {
    return html`
      <div>
        <a
          class="inner"
          href="${this.href}"
          ${this.label ? html`aria-label="${this.label}"` : nothing}
        >
          Link
        </a>
        <nav>
          ${this.links.map(link =>
            link.visible ? html`<a href="${link.url}">${link.label}</a>` : nothing
          )}
        </nav>
      </div>
    `;
  }
}
ArrayPropElement.define();

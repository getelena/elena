import { Elena, html } from "../../src/elena.js";

export default class ThrowingElement extends Elena(HTMLElement) {
  static tagName = "throwing-element";
  static props = ["label"];

  label = "";

  /** @internal */
  _throwInWillUpdate = false;
  /** @internal */
  _throwInRender = false;
  /** @internal */
  _throwInFirstUpdated = false;
  /** @internal */
  _throwInUpdated = false;

  willUpdate() {
    if (this._throwInWillUpdate) {
      throw new Error("willUpdate error");
    }
  }

  render() {
    if (this._throwInRender) {
      throw new Error("render error");
    }
    return html`<span class="inner">${this.label}</span>`;
  }

  firstUpdated() {
    if (this._throwInFirstUpdated) {
      throw new Error("firstUpdated error");
    }
  }

  updated() {
    if (this._throwInUpdated) {
      throw new Error("updated error");
    }
  }
}
ThrowingElement.define();

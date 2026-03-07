import { LitElement, html } from "lit";

/**
 * Lit element used as a comparison in benchmarks.
 */
class LitBenchElement extends LitElement {
  static properties = {
    variant: { type: String },
  };

  constructor() {
    super();
    this.variant = "";
  }

  /**
   * If you don't want to use shadow DOM, you can overwrite the
   * `createRenderRoot` method. By default, LitElement sets the
   * render root to the shadowDom.
   * This is usually used for small leaf-components.
   */

  createRenderRoot() {
    return this;
  }

  render() {
    return html`<span>${this.variant}</span>`;
  }

  firstUpdated() {
    this.setAttribute("hydrated", "");
  }
}

customElements.define("lit-bench-element", LitBenchElement);

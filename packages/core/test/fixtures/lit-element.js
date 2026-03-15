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

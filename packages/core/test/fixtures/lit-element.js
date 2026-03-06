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

  render() {
    return html`<span>${this.variant}</span>`;
  }
}

if (typeof window !== "undefined" && "customElements" in window) {
  if (!window.customElements.get("lit-bench-element")) {
    window.customElements.define("lit-bench-element", LitBenchElement);
  }
}

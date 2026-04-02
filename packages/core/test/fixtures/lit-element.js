import { LitElement, html } from "lit";

class LitBenchElement extends LitElement {
  static properties = {
    variant: { type: String },
  };

  constructor() {
    super();
    this.variant = "";
  }

  render() {
    return html`<span variant="${this.variant}"><slot></slot></span>`;
  }
}

customElements.define("lit-bench-element", LitBenchElement);

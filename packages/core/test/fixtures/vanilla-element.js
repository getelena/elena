/**
 * Vanilla custom element with no framework.
 * Used as a performance baseline in benchmarks.
 */
class VanillaElement extends HTMLElement {
  static get observedAttributes() {
    return ["variant"];
  }

  constructor() {
    super();
    this._variant = "";
  }

  get variant() {
    return this._variant;
  }

  set variant(val) {
    this._variant = val;
    this.setAttribute("variant", val);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "variant" && oldValue !== newValue) {
      this._variant = newValue;
      if (this._connected) {
        this._render();
      }
    }
  }

  connectedCallback() {
    this._connected = true;
    this._render();

    // To mimic similar functionality
    const elementRef = this.querySelector("span");
    this._updated(elementRef);
  }

  _updated() {
    if (!this._hydrated) {
      this._hydrated = true;
      this.setAttribute("hydrated", "");
    }
  }

  _render() {
    this.innerHTML = `<span>${this._variant}</span>`;
  }
}

customElements.define("vanilla-element", VanillaElement);

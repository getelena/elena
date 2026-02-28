/**
 * Vanilla custom element with no framework.
 * Used as a performance baseline in benchmarks.
 */
class VanillaElement extends HTMLElement {
  static get observedAttributes() {
    return ["label"];
  }

  constructor() {
    super();
    this._label = "";
  }

  get label() {
    return this._label;
  }

  set label(val) {
    this._label = val;
    this.setAttribute("label", val);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "label" && oldValue !== newValue) {
      this._label = newValue;
      if (this._connected) {
        this._render();
      }
    }
  }

  connectedCallback() {
    this._connected = true;
    this._render();

    // To mimic similar functionality
    const elementRef = this.querySelector(".inner");
    this._updated(elementRef);
  }

  _updated() {
    if (!this._hydrated) {
      this._hydrated = true;
      this.setAttribute("hydrated", "");
    }
  }

  _render() {
    this.innerHTML = `<span class="inner">${this._label}</span>`;
  }
}

if (typeof window !== "undefined" && "customElements" in window) {
  if (!window.customElements.get("vanilla-element")) {
    window.customElements.define("vanilla-element", VanillaElement);
  }
}

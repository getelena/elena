/**
 * Minimal Elena-like component classes for SSR testing.
 *
 * These mirror the structure that Elena(HTMLElement, options) produces
 * but without requiring a DOM environment. They test that ssr()
 * works with the same prototype shape Elena components have.
 */
import { html, nothing } from "../../core/src/common/utils.js";

/**
 * Helper to create a minimal Elena-like class with the same
 * prototype shape as real Elena components.
 */
function createComponent(tagName, props, renderFn) {
  class Component {
    _text = "";
    get text() {
      return this._text ?? "";
    }
    set text(value) {
      this._text = value;
    }
    render() {
      return renderFn.call(this);
    }
  }

  Component._tagName = tagName;
  Component.observedAttributes = [...(props || []), "text"];

  // Simulate Elena's setProps: define getters/setters backed by _props Map
  for (const prop of props || []) {
    Object.defineProperty(Component.prototype, prop, {
      configurable: true,
      enumerable: true,
      get() {
        return this._props ? this._props.get(prop) : undefined;
      },
      set(value) {
        if (!this._props) {
          this._props = new Map();
        }
        this._props.set(prop, value);
      },
    });
  }

  return Component;
}

export const ButtonComponent = createComponent(
  "elena-button",
  ["variant", "disabled"],
  function () {
    return html`<button>${this.text}</button>`;
  }
);

export const InputComponent = createComponent("elena-input", ["type", "placeholder"], function () {
  return html`<input type="${this.type}" placeholder="${this.placeholder}" />`;
});

export const ConditionalComponent = createComponent(
  "elena-conditional",
  ["label", "active"],
  function () {
    return html`<button>${this.active ? this.label : nothing}</button>`;
  }
);

export const NestedHtmlComponent = createComponent("elena-nested", ["description"], function () {
  return html`<div>${this.description ? html`<p>${this.description}</p>` : nothing}</div>`;
});

export const XssComponent = createComponent("elena-xss", ["label"], function () {
  return html`<span>${this.label}</span>`;
});

export const NoRenderComponent = createComponent("elena-empty", [], function () {
  return undefined;
});

/**
 * Create a minimal composite Elena-like class (no render method).
 */
function createComposite(tagName, props) {
  class Component {
    render() {}
  }

  Component._tagName = tagName;

  for (const prop of props || []) {
    Object.defineProperty(Component.prototype, prop, {
      configurable: true,
      enumerable: true,
      get() {
        return this._props ? this._props.get(prop) : undefined;
      },
      set(value) {
        if (!this._props) {
          this._props = new Map();
        }
        this._props.set(prop, value);
      },
    });
  }

  return Component;
}

export const StackComponent = createComposite("elena-stack", ["direction"]);
export const CardComponent = createComposite("elena-card", ["variant"]);
export const SectionComponent = createComposite("elena-section", ["title"]);

export const BadgeComponent = createComponent("elena-badge", ["variant"], function () {
  return html`<span class="badge badge-${this.variant}">${this.text}</span>`;
});

export const LinkComponent = createComponent("elena-link", ["href", "target"], function () {
  return html`<a href="${this.href}" target="${this.target}">${this.text}</a>`;
});

export const ComplexInputComponent = createComponent(
  "elena-complex-input",
  ["identifier", "label", "type", "start", "error"],
  function () {
    return html`
      <label for="${this.identifier}">${this.label}</label>
      <div class="elena-input-wrapper">
        ${this.start ? html`<div class="elena-input-start">${this.start}</div>` : nothing}
        <input
          id="${this.identifier}"
          class="elena-input ${this.start ? "elena-input-has-start" : nothing}"
        />
      </div>
      ${this.error ? html`<div class="elena-input-error">${this.error}</div>` : nothing}
    `;
  }
);

/**
 * Minimal Elena-like component classes for SSR testing.
 *
 * These mirror the structure that Elena(HTMLElement, options) produces
 * but without requiring a DOM environment. They test that ssr()
 * works with the same prototype shape Elena components have.
 */
import { html, nothing } from "../../core/src/common/utils.js";

/**
 * Base class that simulates native HTMLElement property behavior.
 * Native DOM properties like `style`, `className`, and `id` have
 * getters/setters that throw "Illegal invocation" when accessed on
 * objects created via Object.create() instead of real DOM nodes.
 */
class FakeHTMLElement {}
Object.defineProperty(FakeHTMLElement.prototype, "style", {
  get() {
    throw new TypeError("Illegal invocation");
  },
  set() {
    throw new TypeError("Illegal invocation");
  },
});
Object.defineProperty(FakeHTMLElement.prototype, "className", {
  get() {
    throw new TypeError("Illegal invocation");
  },
  set() {
    throw new TypeError("Illegal invocation");
  },
});
Object.defineProperty(FakeHTMLElement.prototype, "isConnected", {
  get() {
    throw new TypeError("Illegal invocation");
  },
});

/**
 * Helper to create a minimal Elena-like class with the same
 * prototype shape as real Elena components.
 */
function createComponent(tagName, props, renderFn, noReflect) {
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

  const propNames = props || [];
  const noReflectSet = new Set(noReflect || []);

  Component._tagName = tagName;
  Component.observedAttributes = [...propNames, "text"];
  Component._reflectProps = propNames.filter(p => !noReflectSet.has(p));

  // Simulate Elena's setProps: define getters/setters backed by _props Map
  for (const prop of propNames) {
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
  ["variant", "size", "expand", "disabled", "label", "name", "value", "type", "icon"],
  function () {
    const icon = this.icon ? html`<span class="elena-icon">${this.icon}</span>` : nothing;
    return html`<button>${this.text ? html`<span>${this.text}</span>` : nothing}${icon}</button>`;
  },
  ["label", "icon"]
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
  class Component {}

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

/**
 * Component extending FakeHTMLElement to test that SSR handles
 * native DOM properties (style, className, isConnected) without crashing.
 */
export const NativePropComponent = (() => {
  class Component extends FakeHTMLElement {
    _text = "";
    get text() {
      return this._text ?? "";
    }
    set text(value) {
      this._text = value;
    }
    render() {
      return html`<button>${this.text}</button>`;
    }
  }
  Component._tagName = "elena-native-test";
  Component.observedAttributes = ["variant", "text"];
  for (const prop of ["variant"]) {
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
        // Simulates Elena's prop setter accessing isConnected
        if (!this.isConnected) {
          return;
        }
      },
    });
  }
  return Component;
})();

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

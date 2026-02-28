/**
 * Get the value of the Elena Element property.
 *
 * @param {string} type
 * @param {any} value
 * @param {"toAttribute" | "toProp"} [transform]
 */
export function getPropValue(type, value, transform) {
  value = type === "boolean" && typeof value !== "boolean" ? value !== null : value;

  if (!transform) {
    return value;
  } else if (transform === "toAttribute") {
    switch (type) {
      case "object":
      case "array":
        return value === null ? null : JSON.stringify(value);
      case "boolean":
        return value ? "" : null;
      case "number":
        return value === null ? null : value;
      default:
        return value === "" ? null : value;
    }
  } else {
    switch (type) {
      case "object":
      case "array":
        if (!value) {
          return value;
        }
        try {
          return JSON.parse(value);
        } catch {
          console.warn("░█ [ELENA]: Invalid JSON for prop, received: " + value);
          return null;
        }
      case "boolean":
        return value; // conversion already handled above
      case "number":
        return value !== null ? +value : value;
      default:
        return value;
    }
  }
}

/**
 * Set or remove an attribute on an Elena Element.
 *
 * @param {Element} element - Target element
 * @param {string} name - Attribute name
 * @param {string | null} value - Attribute value, or null to remove
 */
export function syncAttribute(element, name, value) {
  if (!element) {
    console.warn("░█ [ELENA]: Cannot sync attributes to a null element.");
    return;
  }
  if (value === null) {
    element.removeAttribute(name);
  } else {
    element.setAttribute(name, value);
  }
}

/**
 * Define prop getters/setters on the prototype once
 * at class-creation time. Values are stored per-instance
 * via a `_props` Map that is lazily created.
 *
 * @param {Function} proto - The class prototype
 * @param {string[]} properties - Prop names to define
 * @param {boolean} [syncToElement=true] - Whether to also sync prop attributes to the
 *   inner element ref. Pass false for Composite Components that have no explicit inner
 *   element selector, so props are not leaked onto slotted children.
 */
export function setProps(proto, properties, syncToElement = true) {
  for (const prop of properties) {
    Object.defineProperty(proto, prop, {
      configurable: true,
      enumerable: true,
      get() {
        return this._props ? this._props.get(prop) : undefined;
      },
      set(value) {
        if (!this._props) {
          this._props = new Map();
        }
        if (value === this._props.get(prop)) {
          return;
        }

        this._props.set(prop, value);
        if (!this.isConnected) {
          return;
        }

        const attrValue = getPropValue(typeof value, value, "toAttribute");
        syncAttribute(this, prop, attrValue);
        if (syncToElement && this.element) {
          syncAttribute(this.element, prop, attrValue);
        }
      },
    });
  }
}

/**
 * We need to update the internals of the Elena Element
 * when props on the host element are changed.
 *
 * @param {object} context
 * @param {string} name
 * @param {any} oldValue
 * @param {any} newValue
 */
export function getProps(context, name, oldValue, newValue) {
  if (oldValue !== newValue) {
    const type = typeof context[name];
    if (type === "undefined") {
      console.warn(
        `░█ [ELENA]: Prop "${name}" has no default value. ` +
          "Set a default in the constructor so Elena can infer the correct type."
      );
    }
    const newAttr = getPropValue(type, newValue, "toProp");
    context[name] = newAttr;
  }
}

/**
 *  ██████████ ████
 * ░░███░░░░░█░░███
 *  ░███  █ ░  ░███   ██████  ████████    ██████
 *  ░██████    ░███  ███░░███░░███░░███  ░░░░░███
 *  ░███░░█    ░███ ░███████  ░███ ░███   ███████
 *  ░███ ░   █ ░███ ░███░░░   ░███ ░███  ███░░███
 *  ██████████ █████░░██████  ████ █████░░████████
 * ░░░░░░░░░░ ░░░░░  ░░░░░░  ░░░░ ░░░░░  ░░░░░░░░
 *
 * Elena Progressive Web Components
 * https://elenajs.com
 */

import { setProps, getProps, getPropValue, syncAttribute } from "./common/props.js";
import { defineElement, html, unsafeHTML, nothing, warn, prefix } from "./common/utils.js";
import { renderTemplate } from "./common/render.js";

export { html, unsafeHTML, nothing };

/**
 * Returns a function that finds the inner element using the given selector.
 * Built once per component class to avoid repeated work.
 *
 * - No selector: uses firstElementChild
 * - Any string: uses querySelector
 *
 * @param {string | undefined} selector
 * @returns {(host: HTMLElement) => HTMLElement | null}
 */
function elementResolver(selector) {
  if (!selector) {
    return host => host.firstElementChild;
  }
  return host => host.querySelector(selector);
}

/**
 * @typedef {new (...args: any[]) => HTMLElement} ElenaConstructor
 */

/**
 * @typedef {{ text: string, element: HTMLElement | null, updateComplete: Promise<void>, render(): void, willUpdate(): void, firstUpdated(): void, updated(): void, requestUpdate(): void, connectedCallback(): void, disconnectedCallback(): void }} ElenaInstanceMembers
 */

/**
 * @typedef {{ name: string, reflect?: boolean }} ElenaPropObject
 */

/**
 * @typedef {(new (...args: any[]) => HTMLElement & ElenaInstanceMembers) & {
 *   define(registry?: CustomElementRegistry): void,
 *   readonly observedAttributes: string[],
 *   tagName?: string,
 *   props?: (string | ElenaPropObject)[],
 *   events?: string[],
 *   element?: string,
 *   shadow?: "open" | "closed",
 *   styles?: CSSStyleSheet | string | (CSSStyleSheet | string)[],
 *   registry?: CustomElementRegistry,
 * }} ElenaElementConstructor
 */

// Tracks which component classes have already been set up.
const setupRegistry = new WeakSet();
const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

/**
 * Creates an Elena component class by extending `superClass`.
 *
 * Adds rendering, props, and event handling to your component.
 * Configure it using static class fields: `static tagName`,
 * `static props`, `static events`, and `static element`.
 *
 * @param {ElenaConstructor} superClass - The base class to extend (usually `HTMLElement`).
 * @returns {ElenaElementConstructor} A class ready to be defined as a custom element.
 */
export function Elena(superClass) {
  /**
   * The base Elena element class with all built-in behavior.
   */
  class ElenaElement extends superClass {
    /**
     * The inner element rendered by this component.
     *
     * @type {HTMLElement | null}
     */
    element = null;

    /**
     * Called by the browser when an observed attribute changes.
     * Updates the matching prop and re-renders if needed.
     *
     * @param {string} prop
     * @param {string} oldValue
     * @param {string} newValue
     */
    attributeChangedCallback(prop, oldValue, newValue) {
      super.attributeChangedCallback?.(prop, oldValue, newValue);

      if (prop === "text") {
        this.text = newValue ?? "";
        return;
      }

      if (oldValue === newValue) {
        return;
      }

      if (this._hydrated && !this._isRendering) {
        // The attribute is already set and we just need the coerced
        // prop value stored for the next render.
        const current = this._props.get(prop);
        const type = typeof current;
        const coerced =
          type === "string" ? (newValue ?? "") : getPropValue(type, newValue, "toProp");

        if (coerced !== current) {
          this._props.set(prop, coerced);
        }
        this._safeRender();

        // Runs pre-hydration or during render.
        // Goes through the setter so _props is initialized correctly.
      } else {
        this._syncing = true;
        getProps(this, prop, oldValue, newValue);
        this._syncing = false;
      }
    }

    /**
     * Lists the attributes Elena watches for changes.
     * Reads from the subclass’s `static props` field.
     */
    static get observedAttributes() {
      if (this._observedAttrs) {
        return this._observedAttrs;
      }

      const propNames = (this.props || []).map(p => (typeof p === "string" ? p : p.name));
      this._observedAttrs = [...propNames, "text"];
      return this._observedAttrs;
    }

    /**
     * Called by the browser each time the element is added to the page.
     */
    connectedCallback() {
      super.connectedCallback?.();
      this._setupStaticProps();
      this._captureClassFieldDefaults();
      if (!this._hydrated && this._text === undefined) {
        this.text = this.textContent.trim();
      }
      this._attachShadow();
      this._root = this._shadow ?? this.shadowRoot ?? this;

      this._runUpdate ??= () => {
        try {
          this._performUpdate();
        } catch (e) {
          console.error(prefix, e);
        }
      };

      this.willUpdate();
      this._applyRender();
      this._syncProps();
      this._delegateEvents();
      if (!this._hydrated) {
        this._hydrated = true;
        this.setAttribute("hydrated", "");
        this.firstUpdated();
      }
      this.updated();
    }

    /**
     * Sets up props, events, and the element selector once per component class.
     * Runs the first time an instance of a given class connects to the page.
     *
     * @internal
     */
    _setupStaticProps() {
      const component = this.constructor;

      if (setupRegistry.has(component)) {
        return;
      }

      // Props with reflect: false
      const noRef = new Set();
      const names = [];

      if (component.props) {
        for (const p of component.props) {
          if (typeof p === "string") {
            names.push(p);
          } else {
            names.push(p.name);

            if (p.reflect === false) {
              noRef.add(p.name);
            }
          }
        }

        if (names.includes("text")) {
          warn('"text" is reserved.');
        }

        setProps(component.prototype, names, noRef);
      }

      component._propNames = names;
      component._noReflect = noRef;
      component._elenaEvents = component.events || null;

      if (component._elenaEvents) {
        for (const e of component._elenaEvents) {
          if (!hasOwn(component.prototype, e)) {
            component.prototype[e] = function (...args) {
              return this.element[e](...args);
            };
          }
        }
      }

      component._resolver = elementResolver(component.element);
      setupRegistry.add(component);
    }

    /**
     * Moves class field defaults into Elena’s internal props store
     * so that getters and setters work correctly.
     *
     * @internal
     */
    _captureClassFieldDefaults() {
      this._syncing = true;

      for (const name of this.constructor._propNames) {
        if (hasOwn(this, name)) {
          const value = this[name];
          delete this[name];
          this[name] = value;
        }
      }

      this._syncing = false;
    }

    /**
     * Attaches a shadow root and adopts styles on first connect.
     * Only runs when `static shadow` is set on the component class.
     *
     * @internal
     */
    _attachShadow() {
      const component = this.constructor;

      if (!component.shadow) {
        return;
      }

      // A shadow root may already exist if Declarative Shadow DOM was used.
      // In that case skip attachShadow() but still adopt styles below.
      // Store the reference so closed shadow roots remain accessible.
      if (!this._shadow && !this.shadowRoot) {
        const options = { mode: component.shadow };
        if (component.registry) {
          options.customElementRegistry = component.registry;
        }
        this._shadow = this.attachShadow(options);
      }

      const shadowRoot = this._shadow ?? this.shadowRoot;

      if (!component.styles) {
        return;
      }

      // Normalize to array and cache converted CSSStyleSheet instances on the class.
      // Avoids re-parsing CSS strings on every element instance.
      if (!component._adoptedSheets) {
        const stylesList = [component.styles].flat();

        component._adoptedSheets = stylesList.map(s => {
          if (typeof s === "string") {
            const sheet = new CSSStyleSheet();
            sheet.replaceSync(s);
            return sheet;
          }
          return s;
        });
      }

      shadowRoot.adoptedStyleSheets = component._adoptedSheets;
    }

    /**
     * Calls render() and updates the DOM with the result.
     * Also resolves the inner element reference.
     *
     * @internal
     */
    _applyRender() {
      const constructor = this.constructor;
      const root = this._root;
      const result = this.render();

      if (result && result.strings) {
        const rebuilt = renderTemplate(root, result.strings, result.values);

        // Re-resolve element ref when the DOM was fully rebuilt.
        // Fast-path text node patching leaves the DOM structure intact,
        // so the existing ref is still valid.
        if (rebuilt) {
          const oldElement = this.element;
          this.element = constructor._resolver(root);

          // Re-bind event listeners when the inner element was replaced.
          if (this._events && oldElement && this.element !== oldElement) {
            const events = constructor._elenaEvents;

            for (const e of events) {
              oldElement.removeEventListener(e, this);
              this.element.addEventListener(e, this);
            }
          }
        }
      }

      // Resolve inner element on first render
      if (!this.element) {
        this.element = constructor._resolver(root);

        if (!this.element) {
          if (constructor.element) {
            warn("Element not found.");
          }
          this.element = root.firstElementChild;
        }
      }
    }

    /**
     * Syncs any props that were set before the element
     * connected to the page.
     *
     * @internal
     */
    _syncProps() {
      if (this._props) {
        const noReflect = this.constructor._noReflect;

        for (const [prop, value] of this._props) {
          if (noReflect.has(prop)) {
            continue;
          }

          const attrValue = getPropValue(typeof value, value, "toAttribute");

          if (attrValue === null && !this.hasAttribute(prop)) {
            continue;
          }

          syncAttribute(this, prop, attrValue);
        }
      }
    }

    /**
     * Forwards events from the inner element
     * up to the host element.
     *
     * @internal
     */
    _delegateEvents() {
      const events = this.constructor._elenaEvents;

      if (!this._events && events?.length) {
        if (!this.element) {
          warn("Cannot add events.");
        } else {
          this._events = true;

          for (const e of events) {
            this.element.addEventListener(e, this);
          }
        }
      }
    }

    /**
     * Define the element’s HTML here. Return an `html`
     * tagged template. If not overridden, the element connects
     * to the page without rendering anything.
     */
    render() {}

    /**
     * Called before every render.
     * Override to prepare state before the template runs.
     */
    willUpdate() {}

    /**
     * Called once after the element’s first render.
     * Override to run setup that needs the DOM.
     */
    firstUpdated() {}

    /**
     * Called after every render.
     * Override to react to changes.
     */
    updated() {}

    /**
     * Called by the browser when the element is moved
     * to a new document via `adoptNode()`.
     */
    adoptedCallback() {
      super.adoptedCallback?.();
    }

    /**
     * Called by the browser each time the element
     * is removed from the page.
     */
    disconnectedCallback() {
      super.disconnectedCallback?.();
      if (this._events) {
        this._events = false;

        for (const e of this.constructor._elenaEvents) {
          this.element?.removeEventListener(e, this);
        }
      }
    }

    /**
     * Forwards events that cannot reach the host naturally:
     * non-bubbling events (focus, blur) and non-composed
     * events in Shadow DOM (change, submit, reset).
     * Composed bubbling events (click, input) pass through on their own.
     *
     * @internal
     */
    handleEvent(event) {
      if (!this.constructor._elenaEvents?.includes(event.type)) {
        return;
      }

      if (!event.bubbles || (!event.composed && this._root !== this)) {
        /** @internal */
        this.dispatchEvent(new Event(event.type, { bubbles: event.bubbles }));
      }
    }

    /**
     * The text content of the element. Elena reads this
     * from the element’s children before the first render.
     * Updating it triggers a re-render.
     *
     * @type {string}
     */
    get text() {
      return this._text ?? "";
    }

    set text(value) {
      const old = this._text;
      this._text = value;

      if (this._hydrated && old !== value && !this._isRendering) {
        this._safeRender();
      }
    }

    /**
     * Registers the component as a custom element using `static tagName`.
     * Call this on your component class after the class body is defined,
     * not on the Elena mixin itself.
     *
     * @param {CustomElementRegistry} [registry] - A scoped registry to register in.
     *   When omitted, registers in the global `customElements` registry.
     */
    static define(registry) {
      const tag = this.tagName;
      if (tag) {
        defineElement(tag, this, registry);
      } else {
        warn("define() without a tagName.");
      }
    }

    /**
     * Schedules a re-render via microtask. If called multiple times
     * before the microtask fires, only one render runs.
     *
     * @internal
     */
    _safeRender() {
      if (this._isRendering) {
        return;
      }
      if (!this._renderPending) {
        this._renderPending = true;
        queueMicrotask(this._runUpdate);
      }
    }

    /**
     * Runs the batched update cycle.
     * Called by the microtask in _safeRender().
     *
     * @internal
     */
    _performUpdate() {
      this._renderPending = false;
      const resolve = this._resolveUpdate;
      this._resolveUpdate = null;
      try {
        try {
          this.willUpdate();
          this._isRendering = true;
          this._applyRender();
        } finally {
          this._isRendering = false;
        }
        this.updated();
      } finally {
        this._updateComplete = null;
        resolve?.();
      }
    }

    /**
     * A Promise that resolves after the render completes.
     * Resolves immediately if no render is scheduled.
     *
     * @type {Promise<void>}
     */
    get updateComplete() {
      if (!this._renderPending) {
        return Promise.resolve();
      }
      if (!this._updateComplete) {
        this._updateComplete = new Promise(resolve => {
          this._resolveUpdate = resolve;
        });
      }
      return this._updateComplete;
    }

    /**
     * Schedules a re-render. Use this to manually trigger an
     * update when Elena cannot detect the change automatically.
     */
    requestUpdate() {
      if (this._hydrated && !this._isRendering) {
        this._safeRender();
      }
    }
  }

  return ElenaElement;
}

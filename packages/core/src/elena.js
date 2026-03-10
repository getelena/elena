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
import { defineElement, html, unsafeHTML, nothing } from "./common/utils.js";
import { renderTemplate } from "./common/render.js";
import { ElenaEvent } from "./common/events.js";

export { html, unsafeHTML, nothing, ElenaEvent };

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
 * @typedef {{ text: string, element: HTMLElement | null, render(): void, willUpdate(): void, firstUpdated(): void, updated(): void, connectedCallback(): void, disconnectedCallback(): void }} ElenaInstanceMembers
 */

/**
 * @typedef {{ name: string, reflect?: boolean }} ElenaPropObject
 */

/**
 * @typedef {(new (...args: any[]) => HTMLElement & ElenaInstanceMembers) & {
 *   define(): void,
 *   readonly observedAttributes: string[],
 *   tagName?: string,
 *   props?: (string | ElenaPropObject)[],
 *   events?: string[],
 *   element?: string,
 *   shadow?: "open" | "closed",
 *   styles?: CSSStyleSheet | string | (CSSStyleSheet | string)[],
 * }} ElenaElementConstructor
 */

/** @type {WeakSet<Function>} Tracks which component classes have already been set up. */
const _setupRegistry = new WeakSet();

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
      if (prop === "text") {
        this.text = newValue ?? "";
        return;
      }

      // Set flag so the property setter skips redundant attribute reflection:
      // the attribute is already at the new value, no need to set it again.
      this._syncing = true;
      getProps(this, prop, oldValue, newValue);
      this._syncing = false;

      // Re-render when attributes change (after initial render).
      // Guard against re-entrant renders: if render() itself mutates an observed
      // attribute, skip the recursive call to prevent an infinite loop.
      if (this._hydrated && oldValue !== newValue && !this._isRendering) {
        this._safeRender();
      }
    }

    /**
     * Lists the attributes Elena watches for changes.
     * Reads from the subclass’s `static props` field.
     */
    static get observedAttributes() {
      const propNames = (this.props || []).map(p => (typeof p === "string" ? p : p.name));

      return [...propNames, "text"];
    }

    /**
     * Called by the browser each time the element is added to the page.
     */
    connectedCallback() {
      this._setupStaticProps();
      this._captureClassFieldDefaults();
      this._captureText();
      this._attachShadow();
      this.willUpdate();
      this._applyRender();
      this._resolveInnerElement();
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

      if (_setupRegistry.has(component)) {
        return;
      }

      // Props with reflect: false
      const noRef = new Set();

      if (component.props) {
        const names = [];

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
          console.warn('░█ [ELENA]: "text" is a reserved prop.');
        }

        setProps(component.prototype, names, noRef);
      }

      component._noReflect = noRef;
      component._elenaEvents = component.events || null;
      component._resolver = elementResolver(component.element);
      _setupRegistry.add(component);
    }

    /**
     * Moves class field defaults into Elena’s internal props store
     * so that getters and setters work correctly.
     *
     * @internal
     */
    _captureClassFieldDefaults() {
      const propNames = (this.constructor.props || []).map(p =>
        typeof p === "string" ? p : p.name
      );

      for (const name of propNames) {
        if (Object.prototype.hasOwnProperty.call(this, name)) {
          const value = this[name];
          delete this[name];

          this[name] = value;
        }
      }
    }

    /**
     * Saves any text inside the element before the first render.
     *
     * @internal
     */
    _captureText() {
      if (!this._hydrated && !this._text) {
        this.text = this.textContent.trim();
      }
    }

    /**
     * The root node to render into. Returns the shadow root when shadow mode
     * is enabled, otherwise the host element itself.
     *
     * @type {ShadowRoot | HTMLElement}
     */
    get _renderRoot() {
      return this.shadowRoot ?? this;
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
      if (!this.shadowRoot) {
        this.attachShadow({ mode: component.shadow });
      }

      if (!component.styles) {
        return;
      }

      // Normalize to array and cache converted CSSStyleSheet instances on the class.
      // Avoids re-parsing CSS strings on every element instance.
      if (!component._adoptedSheets) {
        const stylesList = Array.isArray(component.styles) ? component.styles : [component.styles];

        component._adoptedSheets = stylesList.map(s => {
          if (typeof s === "string") {
            const sheet = new CSSStyleSheet();
            sheet.replaceSync(s);
            return sheet;
          }
          return s;
        });
      }

      this.shadowRoot.adoptedStyleSheets = component._adoptedSheets;
    }

    /**
     * Calls render() and updates the DOM with the result.
     *
     * @internal
     */
    _applyRender() {
      const result = this.render();

      if (result && result.strings) {
        const root = this._renderRoot;
        const rebuilt = renderTemplate(root, result.strings, result.values);

        // Re-resolve element ref only when the DOM was fully rebuilt.
        // Fast-path text node patching leaves the DOM structure intact,
        // so the existing ref is still valid.
        if (this._hydrated && rebuilt) {
          this.element = this.constructor._resolver(root);
        }
      }
    }

    /**
     * Finds and stores a reference to the inner element.
     *
     * @internal
     */
    _resolveInnerElement() {
      if (!this.element) {
        const root = this._renderRoot;
        this.element = this.constructor._resolver(root);

        if (!this.element) {
          if (this.constructor.element) {
            console.warn("░█ [ELENA]: Passed element not found.");
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
          console.warn("░█ [ELENA]: Cannot add events, no element found.");
        } else {
          this._events = true;

          events.forEach(e => {
            this.element.addEventListener(e, this);
            this[e] = (...args) => this.element[e](...args);
          });
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
     * Called before every render. Override to prepare state
     * before the template runs.
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
     * Called by the browser each time the element
     * is removed from the page.
     */
    disconnectedCallback() {
      if (this._events) {
        this._events = false;

        this.constructor._elenaEvents?.forEach(e => {
          this.element?.removeEventListener(e, this);
        });
      }
    }

    /**
     * Receives events from the inner element and
     * re-fires them on the host.
     *
     * @internal
     */
    handleEvent(event) {
      if (this.constructor._elenaEvents?.includes(event.type)) {
        event.stopPropagation();

        /** @internal */
        this.dispatchEvent(new ElenaEvent(event.type, { cancelable: true }));
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
     */
    static define() {
      if (this.tagName) {
        defineElement(this.tagName, this);
      } else {
        console.warn("░█ [ELENA]: define() called without a tagName.");
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
        this._updateComplete = new Promise(resolve => {
          this._resolveUpdate = resolve;
        });
        queueMicrotask(() => this._performUpdate());
      }
    }

    /**
     * Runs the batched update cycle: willUpdate → render → updated.
     * Called by the microtask scheduled in _safeRender().
     *
     * @internal
     */
    _performUpdate() {
      this._renderPending = false;
      const resolve = this._resolveUpdate;
      this._resolveUpdate = null;
      this._updateComplete = null;
      try {
        this.willUpdate();
        this._isRendering = true;
        this._applyRender();
      } finally {
        this._isRendering = false;
      }
      try {
        this.updated();
      } finally {
        resolve();
      }
    }

    /**
     * A Promise that resolves after the next pending render completes.
     * Resolves immediately if no render is scheduled.
     *
     * @type {Promise<void>}
     */
    get updateComplete() {
      if (this._updateComplete) {
        return this._updateComplete;
      }
      return Promise.resolve();
    }

    /**
     * Schedules a re-render. Use this to manually trigger an
     * update when Elena cannot detect the change automatically
     * (e.g. deep object mutation).
     */
    requestUpdate() {
      if (this._hydrated && !this._isRendering) {
        this._safeRender();
      }
    }
  }

  return ElenaElement;
}

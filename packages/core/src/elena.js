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
 * @typedef {{ text: string, element: HTMLElement | null, render(): void, updated(): void, connectedCallback(): void, disconnectedCallback(): void }} ElenaInstanceMembers
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
 * }} ElenaElementConstructor
 */

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

      getProps(this, prop, oldValue, newValue);

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
      this._applyRender();
      this._resolveInnerElement();
      this._syncProps();
      this._delegateEvents();
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

      if (Object.prototype.hasOwnProperty.call(component, "_elenaSetup")) {
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
          console.warn(
            '░█ [ELENA]: "text" is a reserved property. ' +
              "Rename your prop to avoid overriding the built-in text content feature."
          );
        }

        setProps(component.prototype, names, noRef);
      }

      component._noReflect = noRef;
      component._elenaEvents = component.events || null;
      component._resolver = elementResolver(component.element);
      component._elenaSetup = true;
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
        const text = this.textContent.trim();

        if (text) {
          this.text = text;
        } else {
          // Angular sets textContent after the element connects,
          // so we defer capture to the next microtask to pick it up.
          queueMicrotask(() => {
            if (!this._text) {
              this.text = this.textContent.trim();
            }
          });
        }
      }
    }

    /**
     * Calls render() and updates the DOM with the result.
     *
     * @internal
     */
    _applyRender() {
      const result = this.render();

      if (result && result.strings) {
        renderTemplate(this, result.strings, result.values);

        // Re-resolve element ref after render in case the DOM was rebuilt.
        if (this._hydrated) {
          this.element = this.constructor._resolver(this);
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
        this.element = this.constructor._resolver(this);

        if (!this.element) {
          // Only warn when an explicit element selector was provided but didn't match.
          // Composite Components (no element option) intentionally have no inner ref.
          if (this.constructor.element) {
            console.warn("░█ [ELENA]: No element found, using firstElementChild as fallback.");
          }
          this.element = this.firstElementChild;
        }
      }
    }

    /**
     * Syncs any props that were set before the element connected to the page.
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
     * Forwards events from the inner element up to the host element.
     *
     * @internal
     */
    _delegateEvents() {
      const events = this.constructor._elenaEvents;

      if (!this._events && events?.length) {
        if (!this.element) {
          console.warn(
            "░█ [ELENA]: Cannot delegate events, no inner element found. " +
              "Ensure the component renders an element or check your element selector."
          );
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
     * Define the element's HTML here. Return an `html` tagged template.
     * If not overridden, the element connects to the page without rendering anything.
     */
    render() {}

    /**
     * Called once after the element's first render.
     * Marks the element as hydrated.
     *
     * @internal
     */
    updated() {
      if (!this._hydrated) {
        this._hydrated = true;
        this.setAttribute("hydrated", "");
      }
    }

    /**
     * Called by the browser each time the element is removed from the page.
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
     * Receives events from the inner element and re-fires them on the host.
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
     * The text content of the element. Elena reads this from the element's
     * children before the first render. Updating it triggers a re-render.
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
        console.warn(
          "░█ [ELENA]: define() called without a tagName. " +
            "Set tagName as a static field on your component class."
        );
      }
    }

    /**
     * Re-renders the component, guarding against re-entrant renders.
     *
     * @internal
     */
    _safeRender() {
      this._isRendering = true;
      this._applyRender();
      this._isRendering = false;
    }
  }

  return ElenaElement;
}

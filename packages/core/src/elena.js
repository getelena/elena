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
import { ElenaEvent } from "./common/events.js";
import { defineElement, html, unsafeHTML, nothing } from "./common/utils.js";
import { renderTemplate } from "./common/render.js";

export { html, unsafeHTML, nothing };

/**
 * Build an element resolver function from a selector string.
 * Pre-compiled once per class for performance.
 *
 * 1. no selector: firstElementChild (property access)
 * 2. className:   getElementsByClassName (skips full selector parser)
 * 3. any other:   querySelector (full parser, only when needed)
 *
 * @param {string | undefined} selector
 * @returns {(host: HTMLElement) => HTMLElement | null}
 */
function buildResolver(selector) {
  if (!selector) {
    return host => host.firstElementChild;
  }
  if (/^[a-z][a-z0-9-]*$/i.test(selector)) {
    return host => host.getElementsByClassName(selector)[0];
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
 * Factory that creates an Elena mixin class.
 *
 * Wraps `superClass` with Elena’s lifecycle, templating, props,
 * and events features. Configure the component using static class
 * fields: `static tagName`, `static props`, `static events`, and
 * `static element`.
 *
 * @param {ElenaConstructor} superClass - Base class to extend.
 * @returns {ElenaElementConstructor} A class ready to be registered.
 */
export function Elena(superClass) {
  /**
   * Set up the initial state and default values for Elena Element.
   */
  class ElenaElement extends superClass {
    /**
     * Reference to the base element in the provided template.
     *
     * @type {HTMLElement | null}
     */
    element = null;

    /**
     * This method is called when the Elena Element’s
     * props are changed, added, removed or replaced.
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
      // Use _hydrated (set at end of connectedCallback) rather than this.element
      // so Composite Components without an inner element ref also re-render correctly.
      if (this._hydrated && oldValue !== newValue && !this._isRendering) {
        this._isRendering = true;
        this._applyRender();
        this._isRendering = false;
      }
    }

    /**
     * Returns the names of the props to observe. Reads the subclass’s
     * static `props` field so the list is always up to date.
     */
    static get observedAttributes() {
      return [...(this.props || []).map(p => (typeof p === "string" ? p : p.name)), "text"];
    }

    /**
     * This method is called each time the Elena Element
     * is added to the document.
     */
    connectedCallback() {
      this._setupStaticProps();
      this._captureClassFieldDefaults();
      this._captureText();
      this._applyRender();
      this._resolveInnerElement();
      this._flushProps();
      this._delegateEvents();
      this.updated();
    }

    /**
     * Perform one-time per-class setup: process static props, events,
     * and element selector. Runs on first connectedCallback for a given class.
     *
     * @internal
     */
    _setupStaticProps() {
      const component = this.constructor;
      if (Object.prototype.hasOwnProperty.call(component, "_elenaSetup")) {
        return;
      }

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
      component._resolver = buildResolver(component.element);
      component._elenaSetup = true;
    }

    /**
     * Migrate class field own properties into the _props Map so Elena’s
     * prototype getter/setter handles them.
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
          if (!this._props || !this._props.has(name)) {
            this[name] = value;
          }
        }
      }
    }

    /**
     * Capture textContent from the light DOM before
     * the first render.
     *
     * @internal
     */
    _captureText() {
      if (!this._hydrated) {
        if (!this._text) {
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
    }

    /**
     * Calls render() and applies the result to
     * the DOM via renderTemplate().
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
     * Resolve the inner element reference via
     * the pre-compiled class resolver.
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
     * Flush props set before connection to host attributes.
     *
     * @internal
     */
    _flushProps() {
      if (this._props) {
        const noReflect = this.constructor._noReflect || new Set();
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
     * Set up event delegation from inner element to host.
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
     * Override in a subclass to define the element's HTML structure.
     * Return an `html` tagged template literal.
     * No-op by default: elements without a render method connect safely.
     */
    render() {}

    /**
     * Perform post-update after each render().
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
     * This method is called each time the Elena Element
     * is removed from the document.
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
     * Handles events on the Elena Element.
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
     * The text content of the element, captured from light DOM
     * before the first render. Setting this property triggers
     * a re-render.
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
        this._isRendering = true;
        this._applyRender();
        this._isRendering = false;
      }
    }
  }

  /**
   * Register this class as a custom element using the `tagName`
   * static field. Must be called on the final subclass, not
   * on the Elena mixin directly.
   *
   * @this {CustomElementConstructor}
   */
  ElenaElement.define = function () {
    if (this.tagName) {
      defineElement(this.tagName, this);
    } else {
      console.warn(
        "░█ [ELENA]: define() called without a tagName. " +
          "Set tagName as a static field on your component class."
      );
    }
  };

  return ElenaElement;
}

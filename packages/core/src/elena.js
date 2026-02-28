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
 * Elena: Progressive Web Components
 * https://elenajs.com
 */

import { setProps, getProps, getPropValue, syncAttribute } from "./common/props.js";
import { ElenaEvent } from "./common/events.js";
import { defineElement, html, nothing } from "./common/utils.js";
import { renderTemplate } from "./common/render.js";

export { html, nothing };

/**
 * @typedef {Object} ElenaOptions
 * @property {string} [tagName] - Custom element tag name to register (e.g. "elena-button").
 * @property {string[]} [props] - Props observed and synced as attributes.
 * @property {string[]} [events] - Events to delegate from the inner element.
 * @property {string} [element] - CSS selector for the inner element.
 */

/**
 * @typedef {new (...args: any[]) => HTMLElement} ElenaConstructor
 */

/**
 * Factory that creates Elena mixin class.
 *
 * Wraps `superClass` with Elena’s lifecycle, templating, props,
 * and events features. The `options` argument is optional.
 *
 * @param {ElenaConstructor} superClass - Base class to extend.
 * @param {ElenaOptions} [options] - Optional configuration options.
 * @returns {CustomElementConstructor} A class ready to be registered.
 */
export function Elena(superClass, options) {
  /**
   * Pre-compile element resolver once at class definition
   * time to improve performance:
   *
   * 1. no selector: firstElementChild (property access)
   * 2. className:   getElementsByClassName (skips full selector parser)
   * 3. any other:   querySelector (full parser, only when needed)
   */
  const resolveElement = !(options && options.element)
    ? host => host.firstElementChild
    : /^[a-z][a-z0-9-]*$/i.test(options.element)
      ? host => host.getElementsByClassName(options.element)[0]
      : host => host.querySelector(options.element);

  /**
   * Set up the initial state and default values for Elena Element.
   */
  class ElenaElement extends superClass {
    /**
     * Reference to the base element in the provided template.
     *
     * @type {Object}
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
     * This static method returns an array containing the
     * names of the props we want to observe.
     */
    static get observedAttributes() {
      const props = options && options.props ? options.props : [];
      return [...props, "text"];
    }

    /**
     * Override in a subclass to define the element's HTML structure.
     * Return an `html` tagged template literal.
     * No-op by default: elements without a render method connect safely.
     */
    render() {}

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
      }
    }

    /**
     * This method is called each time the Elena Element
     * is added to the document.
     */
    connectedCallback() {
      this._captureText();
      this._applyRender();
      this._resolveInnerElement();
      this._flushProps();
      this._delegateEvents();
      this.updated();
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
     * Resolve the inner element reference via
     * the pre-compiled selector.
     *
     * @internal
     */
    _resolveInnerElement() {
      if (!this.element) {
        this.element = resolveElement(this);

        if (!this.element) {
          // Only warn when an explicit element selector was provided but didn't match.
          // Composite Components (no element option) intentionally have no inner ref.
          if (options && options.element) {
            console.warn("░█ [ELENA]: No element found, using firstElementChild as fallback.");
          }
          this.element = this.firstElementChild;
        }
      }
    }

    /**
     * Flush props set before connection to host and
     * the inner element attributes.
     *
     * @internal
     */
    _flushProps() {
      if (this._props) {
        const hasElementSelector = !!(options && options.element);
        for (const [prop, value] of this._props) {
          const attrValue = getPropValue(typeof value, value, "toAttribute");
          syncAttribute(this, prop, attrValue);
          if (hasElementSelector && this.element) {
            syncAttribute(this.element, prop, attrValue);
          }
        }
      }
    }

    /**
     * Set up event delegation from inner element to host.
     *
     * @internal
     */
    _delegateEvents() {
      if (!this._events && options && options.events) {
        if (!this.element) {
          console.warn(
            "░█ [ELENA]: Cannot delegate events, no inner element found. " +
              "Ensure the component renders an element or check your element selector."
          );
        } else {
          this._events = true;
          options.events?.forEach(e => {
            this.element.addEventListener(e, this);
            this[e] = (...args) => this.element[e](...args);
          });
        }
      }
    }

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
        options.events?.forEach(e => {
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
      if (options.events?.includes(event.type)) {
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

  if (options && options.props?.length) {
    if (options.props.includes("text")) {
      console.warn(
        '░█ [ELENA]: "text" is a reserved property. ' +
          "Rename your prop to avoid overriding the built-in text content feature."
      );
    }
    setProps(ElenaElement.prototype, options.props, !!(options && options.element));
  }

  if (options && options.tagName) {
    /** @type {string} */
    ElenaElement._tagName = options.tagName;
  }

  /**
   * Register this class as a custom element using the `tagName`
   * set in options. Must be called on the final subclass, not
   * on the Elena mixin directly.
   *
   * @this {CustomElementConstructor}
   */
  ElenaElement.define = function () {
    if (this._tagName) {
      defineElement(this._tagName, this);
    } else {
      console.warn(
        "░█ [ELENA]: define() called without a tagName. " +
          "Set tagName in your Elena options to register the element."
      );
    }
  };

  return ElenaElement;
}

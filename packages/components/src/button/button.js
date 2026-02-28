import { Elena, html } from "@elenajs/core";

const options = {
  tagName: "elena-button",
  props: ["variant", "disabled", "name", "value", "type"],
  events: ["click", "focus", "blur"],
};

/**
 * Button component is used for interface actions.
 *
 * @displayName Button
 * @status alpha
 *
 * @event click - Programmatically fire click on the component.
 * @event focus - Programmatically move focus to the component.
 * @event blur - Programmatically remove focus from the component.
 *
 * @cssprop [--elena-button-text] - Overrides the default text color.
 * @cssprop [--elena-button-bg] - Overrides the default background color.
 * @cssprop [--elena-button-font] - Overrides the default font family.
 * @cssprop [--elena-button-radius] - Overrides the default border radius.
 */
export default class Button extends Elena(HTMLElement, options) {
  constructor() {
    super();

    /**
     * The style variant of the button.
     *
     * @attribute
     * @type {"default" | "primary" | "danger"}
     */
    this.variant = "default";

    /**
     * Makes the component disabled.
     *
     * @attribute
     * @type {boolean}
     */
    this.disabled = false;

    /**
     * The name used to identify the button in forms.
     *
     * @attribute
     * @type {string}
     */
    this.name = "";

    /**
     * The value used to identify the button in forms.
     *
     * @attribute
     * @type {string}
     */
    this.value = "";

    /**
     * The type of the button.
     *
     * @attribute
     * @type {"submit" | "reset" | "button"}
     */
    this.type = "button";
  }

  /**
   * Renders the template.
   *
   * @internal
   */
  render() {
    return html`<button>${this.text}</button>`;
  }
}

/**
 * Register the web component
 */
Button.define();

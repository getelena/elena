import { Elena, html, unsafeHTML, nothing } from "@elenajs/core";

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
export default class Button extends Elena(HTMLElement) {
  static tagName = "elena-button";
  static events = ["click", "focus", "blur"];
  static props = [
    "variant",
    "size",
    "expand",
    "disabled",
    "label",
    "href",
    "target",
    "download",
    "name",
    "value",
    "type",
    { name: "icon", reflect: false },
  ];

  /**
   * The style variant of the button.
   *
   * @attribute
   * @type {"default" | "primary" | "danger" | "outline"}
   */
  variant = "default";

  /**
   * The size of the button.
   *
   * @attribute
   * @type {"sm" | "md" | "lg"}
   */
  size = "md";

  /**
   * Makes the button fit its container.
   *
   * @attribute
   * @type {boolean}
   */
  expand = false;

  /**
   * Makes the component disabled.
   *
   * @attribute
   * @type {boolean}
   */
  disabled = false;

  /**
   * Sets aria-label for the inner button.
   *
   * @attribute
   * @type {string}
   */
  label = "";

  /**
   * Renders the button as a link and sets a href for it.
   *
   * @attribute
   * @type {string}
   */
  href = "";

  /**
   * Defines where to open the linked URL.
   *
   * @attribute
   * @type {"_self" | "_blank" | "_parent" | "_top"}
   */
  target = "_self";

  /**
   * Trigger a file download instead of a page visit.
   *
   * @attribute
   * @type {boolean}
   */
  download = false;

  /**
   * The name used to identify the button in forms.
   *
   * @attribute
   * @type {string}
   */
  name = "";

  /**
   * The value used to identify the button in forms.
   *
   * @attribute
   * @type {string}
   */
  value = "";

  /**
   * The type of the button.
   *
   * @attribute
   * @type {"submit" | "reset" | "button"}
   */
  type = "button";

  /**
   * An SVG icon to display inside the button.
   *
   * @attribute
   * @type {string}
   */
  icon = "";

  /**
   * Renders a button: <button>.
   *
   * @internal
   */
  renderButton(template) {
    return html`
      <button
        class="elena-button"
        type="${this.type}"
        ${this.name ? html`name="${this.name}"` : nothing}
        ${this.value ? html`value="${this.value}"` : nothing}
        ${this.disabled ? "disabled" : nothing}
        ${this.label ? html`aria-label="${this.label}"` : nothing}
      >
        ${template}
      </button>
    `;
  }

  /**
   * Renders a link: <a href="#">.
   *
   * @internal
   */
  renderLink(template) {
    return html`
      <a
        class="elena-button"
        href="${this.href}"
        target="${this.target}"
        ${this.download ? "download" : nothing}
        ${this.label ? html`aria-label="${this.label}"` : nothing}
      >
        ${template}
      </a>
    `;
  }

  /**
   * Renders the template.
   *
   * @internal
   */
  render() {
    const icon = this.icon ? unsafeHTML(`<span class="elena-icon">${this.icon}</span>`) : nothing;
    const markup = html`
      ${this.text ? html`<span>${this.text}</span>` : nothing}
      ${icon}
    `;

    return this.href ? this.renderLink(markup) : this.renderButton(markup);
  }
}

/**
 * Register the web component
 */
Button.define();

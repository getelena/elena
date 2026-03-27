import { Elena, html, unsafeHTML, nothing } from "@elenajs/core";
import "../spinner/spinner.js";

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
 * @cssprop [--elena-button-border] - Overrides the default border color.
 * @cssprop [--elena-button-font] - Overrides the default font family.
 * @cssprop [--elena-button-font-size] - Overrides the default font size.
 * @cssprop [--elena-button-font-weight] - Overrides the default font weight.
 * @cssprop [--elena-button-radius] - Overrides the default border radius.
 * @cssprop [--elena-button-focus] - Overrides the default focus ring color.
 */
export default class Button extends Elena(HTMLElement) {
  static tagName = "elena-button";
  static events = ["click", "focus", "blur"];
  static observe = true;
  static props = [
    "variant",
    "size",
    "expand",
    "disabled",
    "loading",
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
   * @property
   * @type {"default" | "primary" | "danger" | "outline"}
   */
  variant = "default";

  /**
   * The size of the button.
   *
   * @property
   * @type {"sm" | "md" | "lg"}
   */
  size = "md";

  /**
   * Makes the button fit its container.
   *
   * @property
   * @type {boolean}
   */
  expand = false;

  /**
   * Makes the component disabled.
   *
   * @property
   * @type {boolean}
   */
  disabled = false;

  /**
   * Sets aria-label for the inner button.
   *
   * @property
   * @type {string}
   */
  label = "";

  /**
   * Renders the button as a link and sets a href for it.
   *
   * @property
   * @type {string}
   */
  href = "";

  /**
   * Defines where to open the linked URL.
   *
   * @property
   * @type {"_self" | "_blank" | "_parent" | "_top"}
   */
  target = "_self";

  /**
   * Trigger a file download instead of a page visit.
   *
   * @property
   * @type {boolean}
   */
  download = false;

  /**
   * Show loading state
   *
   * @property
   * @type {boolean}
   */
  loading = false;

  /**
   * The name used to identify the button in forms.
   *
   * @property
   * @type {string}
   */
  name = "";

  /**
   * The value used to identify the button in forms.
   *
   * @property
   * @type {string}
   */
  value = "";

  /**
   * The type of the button.
   *
   * @property
   * @type {"submit" | "reset" | "button"}
   */
  type = "button";

  /**
   * An SVG icon to display inside the button.
   *
   * @property
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
        ${this.loading ? html`aria-disabled="true"` : nothing}
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
      ${this.loading ? html`<elena-spinner></elena-spinner>` : nothing}
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

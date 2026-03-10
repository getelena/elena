import { Elena } from "@elenajs/core";

/**
 * Visually hidden hides the element visually while
 * keeping it available for assistive technologies.
 *
 * @displayName Spinner
 * @status alpha
 *
 * @cssprop [--elena-spinner-size] - Overrides the default spinner size.
 * @cssprop [--elena-spinner-border] - Overrides the default spinner border width.
 */
export default class Spinner extends Elena(HTMLElement) {
  static tagName = "elena-spinner";

  /**
   * Spinner connects to the page without
   * rendering anything.
   *
   * @internal
   */
  render() {}
}

/**
 * Register the web component
 */
Spinner.define();

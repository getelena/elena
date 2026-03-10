import { Elena } from "@elenajs/core";

/**
 * Visually hidden hides the element visually while
 * keeping it available for assistive technologies.
 *
 * @displayName Visually Hidden
 * @slot - The hidden content
 * @status alpha
 */
export default class VisuallyHidden extends Elena(HTMLElement) {
  static tagName = "elena-visually-hidden";
}

/**
 * Register the web component
 */
VisuallyHidden.define();

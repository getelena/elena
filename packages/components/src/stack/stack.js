import { Elena } from "@elenajs/core";

/**
 * Stack component manages layout of immediate children
 * with optional spacing between each child.
 *
 * @displayName Stack
 * @slot - The stacked content
 * @status alpha
 */
export default class Stack extends Elena(HTMLElement) {
  static tagName = "elena-stack";
  static props = ["direction"];

  /**
   * The direction of the stack.
   *
   * @attribute
   * @type {"column" | "row"}
   */
  direction = "column";
}

/**
 * Register the web component
 */
Stack.define();

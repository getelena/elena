import { Elena } from "@elenajs/core";

const options = {
  tagName: "elena-stack",
  props: ["direction"],
};

/**
 * Stack component manages layout of immediate children
 * with optional spacing between each child.
 *
 * @displayName Stack
 * @slot - The stacked content
 * @status alpha
 */
export default class Stack extends Elena(HTMLElement, options) {
  constructor() {
    super();

    /**
     * The direction of the stack.
     *
     * @attribute
     * @type {"column" | "row"}
     */
    this.direction = "column";
  }
}

/**
 * Register the web component
 */
Stack.define();

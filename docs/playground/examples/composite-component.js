export default {
  id: "composite-component",
  title: "Composite Component",
  js: `import { Elena } from "@elenajs/core";

/**
 * Stack component manages layout of immediate children
 * with optional spacing between each child.
 *
 * @displayName Stack
 * @slot - The stacked content
 * @status alpha
 */
export default class MyStack extends Elena(HTMLElement) {
  static tagName = "my-stack";
  static props = ["direction"];

  /**
   * The direction of the stack.
   *
   * @property
   * @type {"column" | "row"}
   */
  direction = "column";
}

MyStack.define();`,
  css: `/* Scope makes sure styles don’t leak out */
@scope (my-stack) {

  /* Targets the host element */
  :scope {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 0.5rem;
  }

  /* Direction */
  :scope[direction="row"] {
    flex-direction: row;
  }
}`,
  html: `<my-stack>
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</my-stack>

<br/>

<my-stack direction="row">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</my-stack>`,
};

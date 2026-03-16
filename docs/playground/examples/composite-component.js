export default {
  id: "composite-component",
  title: "Composite Component",
  js: `import { Elena } from "@elenajs/core";

export default class MyStack extends Elena(HTMLElement) {
  static tagName = "my-stack";
  static props = ["direction"];

  /** @attribute @type {"column" | "row"} */
  direction = "column";
}

MyStack.define();`,
  css: `@scope (my-stack) {
  :scope {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 0.5rem;
  }

  :scope[direction="row"] {
    flex-direction: row;
  }
}`,
  html: `<my-stack direction="column">
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

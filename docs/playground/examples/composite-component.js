const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "composite-component",
  title: "Composite Component",
  js: `import { Elena } from "${CDN}";

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
  html: `<my-stack direction="row">
  <div style="padding: 1rem; background: #fef3cd; border-radius: 4px;">First</div>
  <div style="padding: 1rem; background: #d1ecf1; border-radius: 4px;">Second</div>
  <div style="padding: 1rem; background: #d4edda; border-radius: 4px;">Third</div>
</my-stack>`,
};

export default {
  id: "array-object-props",
  title: "Array/Object Props",
  js: `import { Elena, html } from "@elenajs/core";

export default class MyList extends Elena(HTMLElement) {
  static tagName = "my-list";
  static props = ["items", "heading"];

  /** @property @type {Array} */
  items = [];

  /** @property @type {String} */
  heading = "List";

  render() {
    return html\`
      <div class="my-list">
        <h3>\${this.heading}</h3>
        <ul>
          \${this.items.map(item => html\`<li>\${item}</li>\`)}
        </ul>
      </div>
    \`;
  }
}

MyList.define();`,
  html: `<my-list
  heading="Fruits"
  items='["Apple", "Banana", "Cherry", "Date"]'
></my-list>`,
};

const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "array-object-props",
  title: "Array/Object Props",
  js: `import { Elena, html } from "${CDN}";

export default class MyList extends Elena(HTMLElement) {
  static tagName = "my-list";
  static props = ["items", "heading"];

  /** @attribute @type {Array} */
  items = [];

  /** @attribute @type {String} */
  heading = "List";

  render() {
    return html\`<div class="my-list">
      <h3>\${this.heading}</h3>
      <ul>
        \${this.items.map(item => html\`<li>\${item}</li>\`)}
      </ul>
    </div>\`;
  }
}
MyList.define();`,
  css: `@scope (my-list) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: block;
  }

  .my-list:is(div) {
    font-family: system-ui, sans-serif;
  }

  h3 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
    display: block;
  }

  ul {
    display: block;
    margin: 0;
    padding: 0 0 0 1.25rem;
    list-style: disc;
  }

  li {
    display: list-item;
    padding: 0.125rem 0;
    font-size: 0.875rem;
  }
}`,
  html: `<my-list
  heading="Fruits"
  items='["Apple", "Banana", "Cherry", "Date"]'
></my-list>`,
};

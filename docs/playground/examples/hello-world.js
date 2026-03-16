const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "hello-world",
  title: "Hello World",
  js: `import { Elena, html } from "${CDN}";

export default class MyGreeting extends Elena(HTMLElement) {
  static tagName = "my-greeting";
  static props = ["name"];

  /** @attribute @type {String} */
  name = "World";

  render() {
    return html\`<p>Hello, \${this.name}!</p>\`;
  }
}
MyGreeting.define();`,
  css: `@scope (my-greeting) {
  :scope {
    display: block;
  }

  p {
    font-size: 1.5rem;
    font-family: system-ui, sans-serif;
    margin: 0;
  }
}`,
  html: `<my-greeting name="World"></my-greeting>
<my-greeting name="Elena"></my-greeting>`,
};

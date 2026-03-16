export default {
  id: "hello-world",
  title: "Hello World",
  js: `import { Elena, html } from "@elenajs/core";

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
    display: inline-block;
  }
}`,
  html: `<my-greeting name="Elena"></my-greeting>`,
};

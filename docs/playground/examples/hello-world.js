export default {
  id: "hello-world",
  title: "Hello World",
  js: `import { Elena, html } from "@elenajs/core";

export default class MyGreeting extends Elena(HTMLElement) {
  static tagName = "my-greeting";
  static props = ["name"];

  /**
   * The name of the person to greet.
   *
   * @property
   * @type {String}
   */
  name = "World";

  render() {
    return html\`<p>Hello, \${this.name}!</p>\`;
  }
}

MyGreeting.define();`,
  html: `<my-greeting name="Elena"></my-greeting>`,
};

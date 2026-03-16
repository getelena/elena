const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "html-templates",
  title: "HTML Templates",
  js: `import { Elena, html } from "${CDN}";

export default class MyCard extends Elena(HTMLElement) {
  static tagName = "my-card";
  static props = ["heading"];

  /** @attribute @type {String} */
  heading = "";

  render() {
    // Nested html fragments pass through without double-escaping
    const header = this.heading
      ? html\`<h3 class="heading">\${this.heading}</h3>\`
      : html\`<h3 class="heading">Untitled</h3>\`;

    return html\`<div class="my-card">
      \${header}
      <p class="body">\${this.text}</p>
    </div>\`;
  }
}
MyCard.define();`,
  css: `@scope (my-card) {
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

  .my-card:is(div) {
    font-family: system-ui, sans-serif;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    display: block;
  }

  .heading:is(h3) {
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
    display: block;
  }

  .body:is(p) {
    font-size: 0.875rem;
    color: #4a5568;
    margin: 0;
    display: block;
  }
}`,
  html: `<my-card heading="Welcome">This is a card with a heading and body text.</my-card>
<br><br>
<my-card>A card without an explicit heading uses the default.</my-card>`,
};

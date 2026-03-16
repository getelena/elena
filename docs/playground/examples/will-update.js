export default {
  id: "will-update",
  title: "willUpdate",
  js: `import { Elena, html } from "@elenajs/core";

export default class MyFilter extends Elena(HTMLElement) {
  static tagName = "my-filter";
  static props = [
    { name: "items", reflect: false },
    { name: "search", reflect: false }
  ];
  static element = "input";

  /** @type {Array} */
  items = ["Apple", "Banana", "Cherry", "Fig", "Grape"];

  /** @attribute @type {String} */
  search = "";

  willUpdate() {
    this.filtered = this.items.filter(item =>
      item.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  updated() {
    this.element.value = this.search;
    this.element.focus();
    this.element.selectionStart = this.element.selectionEnd = this.search.length;
  }

  render() {
    return html\`
      <div class="my-filter">
        <input
          type="text"
          placeholder="Filter fruits"
          oninput="this.closest('my-filter').search = this.value"
        />
        <ul>
          \${this.filtered.map(item => html\`<li>\${item}</li>\`)}
        </ul>
        <small>\${this.filtered.length} of \${this.items.length} shown</small>
      </div>
    \`;
  }
}

MyFilter.define();`,
  css: `@scope (my-filter) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope { display: block; }

  .my-filter {
    font-family: system-ui, sans-serif;
    max-width: 250px;
  }

  input {
    font-size: 0.875rem;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #a5a9af;
    border-radius: 4px;
    box-sizing: border-box;
    display: block;
    margin-bottom: 0.5rem;
  }

  input:focus {
    outline: 2px solid #3182ce;
    outline-offset: -1px;
  }

  ul {
    display: block;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li {
    display: block;
    padding: 0.375rem 0.5rem;
    font-size: 0.875rem;
    border-bottom: 1px solid #f7fafc;
  }

  small {
    font-size: 0.7rem;
    color: #a0aec0;
    margin-top: 0.25rem;
    display: block;
  }
}`,
  html: `<my-filter></my-filter>`,
};

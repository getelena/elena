const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "will-update",
  title: "willUpdate",
  js: `import { Elena, html } from "${CDN}";

export default class MyFilter extends Elena(HTMLElement) {
  static tagName = "my-filter";
  static props = [{ name: "items", reflect: false }, "search"];

  /** @type {Array} */
  items = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"];

  /** @attribute @type {String} */
  search = "";

  // willUpdate runs before every render: compute derived state here
  willUpdate() {
    this.filtered = this.items.filter(item =>
      item.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  render() {
    return html\`<div class="my-filter">
      <input type="text" placeholder="Filter fruits..."
        value="\${this.search}"
        oninput="this.closest('my-filter').search = this.value" />
      <ul>
        \${this.filtered.map(item => html\`<li>\${item}</li>\`)}
      </ul>
      <small>\${this.filtered.length} of \${this.items.length} shown</small>
    </div>\`;
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

  .my-filter:is(div) {
    font-family: system-ui, sans-serif;
    max-width: 250px;
  }

  input {
    font-size: 0.875rem;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
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

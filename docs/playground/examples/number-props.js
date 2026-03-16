const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "number-props",
  title: "Number Props",
  js: `import { Elena, html } from "${CDN}";

export default class MyCounter extends Elena(HTMLElement) {
  static tagName = "my-counter";
  static props = ["count", "step"];

  /** @attribute @type {Number} */
  count = 0;

  /** @attribute @type {Number} */
  step = 1;

  render() {
    return html\`<div class="my-counter">
      <button class="decrement" onclick="this.getRootNode().host.decrement()">-</button>
      <span class="value">\${this.count}</span>
      <button class="increment" onclick="this.getRootNode().host.increment()">+</button>
    </div>\`;
  }

  increment() {
    this.count += this.step;
  }

  decrement() {
    this.count -= this.step;
  }
}
MyCounter.define();`,
  css: `@scope (my-counter) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: inline-block;
  }

  .my-counter:is(div) {
    display: inline-flex;
    align-items: center;
    gap: 0;
    font-family: system-ui, sans-serif;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    overflow: hidden;
  }

  .decrement:is(button),
  .increment:is(button) {
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    background: #f7fafc;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .decrement:is(button):hover,
  .increment:is(button):hover {
    background: #edf2f7;
  }

  .value:is(span) {
    padding: 0.5rem 1rem;
    font-size: 1.125rem;
    font-weight: 600;
    min-width: 2.5rem;
    text-align: center;
    display: inline-flex;
    justify-content: center;
  }
}`,
  html: `<my-counter></my-counter>
<my-counter count="10" step="5"></my-counter>`,
};

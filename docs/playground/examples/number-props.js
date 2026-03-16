export default {
  id: "number-props",
  title: "Number Props",
  js: `import { Elena, html } from "@elenajs/core";

export default class MyCounter extends Elena(HTMLElement) {
  static tagName = "my-counter";
  static props = ["count", "step"];

  /** @attribute @type {Number} */
  count = 0;

  /** @attribute @type {Number} */
  step = 1;

  increment() {
    this.count += this.step;
  }

  decrement() {
    this.count -= this.step;
  }

  render() {
    return html\`
      <!-- Please note this isn’t accessible! -->
      <div class="my-counter">
        <button 
          class="decrement"
          onclick="this.closest('my-counter').decrement()">
            -
        </button>
        <span class="value">\${this.count}</span>
        <button
          class="increment"
          onclick="this.closest('my-counter').increment()">
            +
        </button>
      </div>
    \`;
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

  .my-counter {
    display: inline-flex;
    align-items: center;
    gap: 0;
    font-family: system-ui, sans-serif;
    border: 1px solid #a5a9af;
    border-radius: 6px;
    overflow: hidden;
  }

  .my-counter button {
    padding: 0.6rem 0.75rem;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    background: #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .my-counter button:hover {
    filter: brightness(0.95);
  }

  .my-counter button:active {
    opacity: 0.7;
  }

  .my-counter .value {
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

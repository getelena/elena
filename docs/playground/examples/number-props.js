export default {
  id: "number-props",
  title: "Number Props",
  js: `import { Elena, html } from "@elenajs/core";

export default class MyCounter extends Elena(HTMLElement) {
  static tagName = "my-counter";
  static props = ["count", "step", "max"];

  /** @attribute @type {Number} */
  count = 0;

  /** @attribute @type {Number} */
  step = 1;

  /** @attribute @type {Number} */
  max = Infinity;

  increment() {
    this.count = Math.min(this.max, this.count + this.step);
  }

  decrement() {
    this.count = Math.max(0, this.count - this.step);
  }

  render() {
    return html\`
      <!-- Please note this isn’t accessible! -->
      <div class="my-counter">
        <button 
          class="decrement"
          onclick="this.closest('my-counter').decrement()">
            –
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
    box-shadow: inset 0 0 0 2px #e2e8f0;
    border-radius: 6px;
  }

  .my-counter button {
    padding: 0.6rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    cursor: pointer;
    background: #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .my-counter button:first-of-type {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  .my-counter button:last-of-type {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .my-counter button:hover {
    filter: brightness(0.95);
  }

  .my-counter button:active {
    opacity: 0.7;
  }

  .my-counter button:focus {
    outline: 2px solid #5a44d4;
    outline-offset: 1px;
  }

  .my-counter .value {
    padding: 0.5rem 0.75rem;
    min-width: 1.5rem;
    text-align: center;
    display: inline-flex;
    justify-content: center;
  }
}`,
  html: `<my-counter></my-counter>
<my-counter count="10" step="5" max="95"></my-counter>`,
};

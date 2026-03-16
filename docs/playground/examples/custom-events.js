const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "custom-events",
  title: "Custom Events",
  js: `import { Elena, html, ElenaEvent } from "${CDN}";

export default class MyRating extends Elena(HTMLElement) {
  static tagName = "my-rating";
  static props = [{ name: "value", reflect: false }];

  /** @type {Number} */
  value = 0;

  render() {
    return html\`<div class="my-rating">
      \${[1, 2, 3, 4, 5].map(
        n => html\`<button
          class="star \${n <= this.value ? "active" : ""}"
          onclick="this.closest('my-rating').rate(\${n})"
        >\${n <= this.value ? "&#9733;" : "&#9734;"}</button>\`
      )}
    </div>\`;
  }

  rate(n) {
    this.value = n;
    // Dispatch a custom event with ElenaEvent (bubbles + composed by default)
    this.dispatchEvent(new ElenaEvent("rate", { detail: { value: n } }));
  }
}
MyRating.define();

document.querySelector("my-rating").addEventListener("rate", e => {
  document.getElementById("output").textContent =
    "You rated: " + e.detail.value + " star(s)";
});`,
  css: `@scope (my-rating) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope { display: inline-block; }

  .my-rating:is(div) {
    display: inline-flex;
    gap: 0.125rem;
  }

  .star:is(button) {
    font-size: 1.5rem;
    cursor: pointer;
    color: #cbd5e0;
    padding: 0.125rem;
    display: inline-flex;
  }

  .star.active:is(button),
  .star:is(button):hover {
    color: #ecc94b;
  }
}

#output {
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  margin-top: 0.75rem;
  color: #4a5568;
}`,
  html: `<my-rating></my-rating>
<p id="output">Click a star to rate.</p>`,
};

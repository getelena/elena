const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "css-scoping",
  title: "CSS Scoping",
  js: `import { Elena, html } from "${CDN}";

export default class MyBox extends Elena(HTMLElement) {
  static tagName = "my-box";
  static props = ["color"];

  /** @attribute @type {"blue" | "green" | "purple"} */
  color = "blue";

  render() {
    return html\`<div class="my-box">
      <h4>Scoped styles</h4>
      <p>\${this.text || "Styles inside @scope don't leak to the outer page."}</p>
    </div>\`;
  }
}
MyBox.define();`,
  css: `/* Styles here are SCOPED: they can't affect elements outside my-box */
@scope (my-box) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    --my-box-accent: #3182ce;
    display: block;
  }

  .my-box:is(div) {
    font-family: system-ui, sans-serif;
    border: 2px solid var(--my-box-accent);
    border-radius: 8px;
    padding: 1rem;
    display: block;
  }

  /* These h4 and p styles only apply inside my-box */
  h4 {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--my-box-accent);
    margin: 0 0 0.5rem;
    display: block;
  }

  p {
    font-size: 0.8rem;
    color: #4a5568;
    margin: 0;
    display: block;
  }

  :scope[color="green"] { --my-box-accent: #38a169; }
  :scope[color="purple"] { --my-box-accent: #805ad5; }
}

/* This proves scoping works: these global styles don't affect my-box internals */
h4 { color: red; font-size: 3rem; }
p { color: red; }`,
  html: `<h4>This h4 is red (global style)</h4>
<p>This paragraph is red (global style)</p>
<br>
<my-box color="blue">These elements inside are styled by @scope, not by the global styles above.</my-box>
<br>
<my-box color="green">Green variant.</my-box>`,
};

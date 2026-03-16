const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "css-encapsulation",
  title: "CSS Encapsulation",
  js: `import { Elena, html } from "${CDN}";

export default class MyChip extends Elena(HTMLElement) {
  static tagName = "my-chip";
  static props = ["removable"];

  /** @attribute @type {Boolean} */
  removable = false;

  render() {
    return html\`<span class="my-chip">
      \${this.text}
      \${this.removable
        ? '<button class="remove" onclick="this.closest(\\\'my-chip\\\').remove()">x</button>'
        : ""}
    </span>\`;
  }
}
MyChip.define();`,
  css: `/* Even with aggressive global styles, the encapsulation reset protects my-chip */
@scope (my-chip) {
  /* The reset: prevents global styles from leaking IN */
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

  :scope:not([hydrated]),
  .my-chip:is(span) {
    font-family: system-ui, sans-serif;
    font-size: 0.8rem;
    padding: 0.25rem 0.75rem;
    background: #edf2f7;
    border-radius: 9999px;
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
  }

  .remove:is(button) {
    font-size: 0.65rem;
    cursor: pointer;
    opacity: 0.6;
  }

  .remove:is(button):hover { opacity: 1; }
}

/* Aggressive global styles that would normally break components */
* { color: red !important; font-size: 40px !important; }`,
  html: `<p>This text is affected by the aggressive global <code>*</code> rule.</p>
<br>
<my-chip>Protected chip</my-chip>
<my-chip removable>Removable</my-chip>`,
};

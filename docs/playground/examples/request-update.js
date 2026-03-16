const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "request-update",
  title: "requestUpdate",
  js: `import { Elena, html } from "${CDN}";

export default class MyTags extends Elena(HTMLElement) {
  static tagName = "my-tags";
  static props = [{ name: "tags", reflect: false }];

  /** @type {Array} */
  tags = ["Elena", "Web Components"];

  render() {
    return html\`<div class="my-tags">
      <div class="list">
        \${this.tags.map(
          (tag, i) => html\`<span class="tag">
            \${tag}
            <button class="remove" onclick="this.closest('my-tags').removeTag(\${i})">x</button>
          </span>\`
        )}
      </div>
      <input type="text" placeholder="Add tag + Enter"
        onkeydown="if(event.key==='Enter'){this.closest('my-tags').addTag(this.value);this.value='';}" />
    </div>\`;
  }

  addTag(value) {
    if (value.trim()) {
      // Mutating the array in place: Elena can't detect this automatically
      this.tags.push(value.trim());
      // So we call requestUpdate() to trigger a re-render
      this.requestUpdate();
    }
  }

  removeTag(index) {
    this.tags.splice(index, 1);
    this.requestUpdate();
  }
}
MyTags.define();`,
  css: `@scope (my-tags) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope { display: block; }

  .my-tags:is(div) {
    font-family: system-ui, sans-serif;
  }

  .list:is(div) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin-bottom: 0.5rem;
    min-height: 1.75rem;
  }

  .tag:is(span) {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: #ebf4ff;
    color: #2b6cb0;
    border-radius: 4px;
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

  input {
    font-size: 0.875rem;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    box-sizing: border-box;
    display: block;
  }
}`,
  html: `<my-tags></my-tags>`,
};

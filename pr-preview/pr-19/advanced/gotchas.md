---
url: /pr-preview/pr-19/advanced/gotchas.md
description: >-
  Known browser compatibility issues and workarounds for Elena, including bugs
  with CSS @scope in Firefox and Safari.
---

# Known issues

## Browser compatibility

As a baseline, Elena’s progressive approach supports any web browser that’s capable of rendering Custom Elements. After that, it’s up to you to determine what is appropriate for your project when authoring CSS styles and JavaScript interactivity.

Elena, the JavaScript library, supports the following browser versions: Chrome 71+, Firefox 69+, Safari 12.1+, Edge 79+, and Opera 58+.

**Firefox 148:** When using CSS `@scope` together with `attr[value]` selectors, the resulting behaviour can be buggy. This is fixed in [Firefox 149](https://www.firefox.com/en-US/firefox/149.0/releasenotes/) and newer. When necessary, you can [omit `@scope`](/components/styles#styles-without-scope) and use class based approach instead to go around this issue.

**Safari 26.3:** `@scope` rules are not applied to `<input>` and `<textarea>` elements. This is fixed in [Safari 26.4](https://webkit.org/blog/17862/webkit-features-for-safari-26-4/) and newer. When necessary, you can [omit `@scope`](/components/styles#styles-without-scope) and use class based approach instead to go around this issue.

## URIs in templates

Elena’s `html` tagged template auto-escapes interpolated values to prevent XSS, but it does not block JavaScript URIs. If you interpolate user input into an `href` or other URL attribute, a value like `javascript:alert(1)` will pass through escaping unchanged:

```js
// Dangerous: user-controlled URL
render() {
  return html`<a href="${this.url}">Click</a>`;
}
```

Always validate or sanitize URLs before interpolating them into templates. A simple safeguard is to check the protocol:

```js
const safeUrl = /^https?:\/\//.test(this.url) ? this.url : "#";
```

## JavaScript frameworks

Avoid a JavaScript framework and Elena both mutating the same attribute on the same component. A framework’s reconciler would overwrite Elena’s changes on next reconcile, triggering many re-renders. Treat framework-controlled props as read-only inputs inside your Elena element's `render()`:

```js
// Good: framework passes text, Elena renders it
<elena-button text={state.text} />

render() {
  // Good: only reads, never writes back
  return html`<button>${this.text}</button>`;
}
// Good: Elena communicates back via events, framework updates state
<elena-button text={state.text} onclick={e => setState(...)} />
```

```js
// Bad: Elena writes back to a framework-controlled prop
render() {
  this.setAttribute("label", this.label.toUpperCase());
}
```

You can’t pass dynamic text content as children. Use the `text` property instead if you need to update the text content later:

```html
<!-- React -->
<elena-button text={buttonText} />

<!-- Angular -->
<elena-button [text]="buttonText"></elena-button>

<!-- Vue -->
<elena-button :text="buttonText"></elena-button>
```

> \[!WARNING]
> Angular inserts text children *after* `connectedCallback` fires, by which point Elena has already replaced the host’s inner DOM. The text ends up as a sibling to the element rather than inside it. Always use `text` as a property binding or attribute in Angular, never as a child node:

```html
<elena-button [text]="label"></elena-button>
```

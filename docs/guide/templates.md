# Templates

Elena uses an HTML-based template syntax built on JavaScript [tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). Return an `html` tagged template from `render()`:

```js
import { Elena, html } from "@elenajs/core";

// ...later:
render() {
  return html`
    <button variant="${this.variant || "default"}">
      ${this.text}
    </button>
  `;
}
```

The content of the `html` method is passed as tagged template literals, which Elena then compiles on the fly.

## `nothing`

A placeholder you can use in conditional template expressions when there is nothing to render. It always produces an empty string and signals to the template engine that no processing is needed.

```js
import { Elena, html, nothing } from "@elenajs/core";

// ...later:
render() {
  return html`
    <button>
      ${this.icon ? html`<span class="icon">${this.icon}</span>` : nothing}
      ${this.text}
    </button>
  `;
}
```

## `unsafeHTML`

Values interpolated into Elena's `html` tagged template are auto-escaped to prevent XSS. `unsafeHTML` allows you to bypass this and render a trusted HTML string without escaping, for example an SVG icon or markup from a database.

```js
import { Elena, html, unsafeHTML, nothing } from "@elenajs/core";

// ...later:
render() {
  const icon = this.icon ? unsafeHTML(`<span>${this.icon}</span>`) : nothing;
  const text = this.text ? html`<span>${this.text}</span>` : nothing;

  return html`
    <button>
      ${text}
      ${icon}
    </button>
  `;
}
```

## Element ref

Elena provides a special **Ref** to the `element` you pass as a DOM selector:

```js
export default class Button extends Elena(HTMLElement, {
  element: ".my-button",
})
```

This allows you direct access to the underlying DOM element:

```js
console.log(this.element);
```

## Text content

Every Elena element has a built-in reactive `text` property. On first connect, Elena automatically captures the element's `textContent` from the light DOM before rendering. This lets you pass text content naturally as children:

```html
<elena-button>Click me</elena-button>
```

Use `this.text` in your component's `render()` method to reference the captured text:

```js
render() {
  return html`<button class="elena-button">${this.text}</button>`;
}
```

The `text` property is reactive — setting it programmatically triggers a re-render:

```js
const button = document.querySelector("elena-button");
button.text = "Save changes";
```

When used with JavaScript frameworks, passing text as children works for static text:

```jsx
// Works for static text
<elena-button>Click me</elena-button>
```

For dynamic text that changes over time, use the `text` property instead, since **Primitive Components** own their internal DOM and frameworks cannot update children after Elena has hydrated the element:

```jsx
// React
<elena-button text={buttonText} />

// Angular
<elena-button [text]="buttonText"></elena-button>

// Vue
<elena-button :text="buttonText"></elena-button>
```

> [!TIP]
> **Composite Components** don't need the above — they preserve children naturally since they have no `render()` method. This feature is for **Primitive Components** only, which own their internal DOM and would otherwise destroy any children passed to them.

## Advanced template example

```js
import { Elena, html, nothing } from "@elenajs/core";

// ...later:
render() {
  return html`
    <label for="${this.identifier}">${this.label}</label>
    <div class="elena-input-wrapper">
      ${this.start ? html`<div class="elena-input-start">${this.start}</div>` : nothing}
      <input
        id="${this.identifier}"
        class="elena-input ${this.start ? "elena-input-has-start" : nothing}"
      />
    </div>
    ${this.error ? html`<div class="elena-input-error">${this.error}</div>` : nothing}
  `;
}
```

# Methods

Elena ships with the following built-in lifecycle methods that follow the standard [custom elements lifecycle](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks) while adding optional `render()` and `updated()` methods:

- **`connectedCallback()`:** Called each time the element is added to the DOM.
- **`disconnectedCallback()`:** Called each time the element is removed from the DOM.
- **`attributeChangedCallback()`:** Called when Elena's props are changed, added, removed or replaced.
- **`render()`:** Called whenever there's an update that needs rendering.
- **`updated()`:** Called once after the element's first connect. Adds the `hydrated` attribute to the host element.

## Utility methods

### `ClassName.define()`

Register the web component with SSR guards. Call this on your subclass after the class body is defined. The tag name is read from the `static tagName` class field.

```js
MyElement.define();
```

### `html`

Tagged template for defining an Elena web component's HTML structure. Return it from `render()`. Dynamic values are auto-escaped, and nested `html` sub-templates pass through as trusted HTML without double-escaping:

```js
import { Elena, html } from "@elenajs/core";

// ...later:
render() {
  return html`
    <button class="elena-button">
      ${this.text}
    </button>
  `;
}
```

### `nothing`

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

### `unsafeHTML`

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

## Custom methods

You can also define your own custom methods:

```js
export default class Button extends Elena(HTMLElement) {
  /**
   * Renders a link: <a href="#">.
   * @internal
   */
  renderLink(template) {
    return html`
      <a
        class="elena-button"
        href="${this.href}"
        target="${this.target}"
        ${this.download ? "download" : nothing}
        ${this.label ? html`aria-label="${this.label}"` : nothing}>
          ${template}
      </a>
    `;
  }
}
```

Elena also allows you to extend the lifecycle methods by calling `super`:

```js
export default class Button extends Elena(HTMLElement) {

  connectedCallback() {
    super.connectedCallback();
    console.log("Element was added to the DOM.");
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log("Element was removed from the DOM.");
  }
}
```

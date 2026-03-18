---
url: /elena/components/methods.md
description: >-
  Learn about Elena’s lifecycle methods, utility methods, and how to define
  custom methods on your Progressive Web Components.
---

# Methods

Elena extends the standard [custom elements lifecycle](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks) with a reactive update cycle. All lifecycle methods can be extended by calling `super`.

## Lifecycle methods

### `connectedCallback()`

Runs when the element is added to the page. Sets up props, captures text content, renders, and wires up events.

```js
connectedCallback() {
  super.connectedCallback();
  console.log("Element was added to the DOM.");
}
```

### `willUpdate()`

Runs before every render, including the first. Use this to compute derived values before the template evaluates:

```js
willUpdate() {
  this.label = `${this.firstName} ${this.lastName}`;
}
```

### `render()`

Returns the component’s HTML as an `html` template. Called on connect and on every re-render. Composite Components that don’t own their inner HTML don’t use this method. See [Templates](./templates) for full details.

```js
render() {
  return html`<button>${this.text}</button>`;
}
```

### `firstUpdated()`

Runs once after the first render. `this.element` is available here. Use it for one-time setup that needs the DOM:

```js
firstUpdated() {
  console.log("DOM first updated.");
}
```

### `updated()`

Runs after every render, including the first. `this.element` is available here. On first connect, `firstUpdated()` runs before `updated()`:

```js
updated() {
  console.log("DOM updated, current value:", this.element.textContent);
}
```

### `disconnectedCallback()`

Runs when the element is removed from the page. Cleans up event listeners.

```js
disconnectedCallback() {
  super.disconnectedCallback();
  console.log("Element was removed from the DOM.");
}
```

### `attributeChangedCallback()`

Runs when an observed attribute changes. Updates the matching JavaScript property and triggers a re-render. Override to react to attribute changes directly:

```js
attributeChangedCallback(prop, oldValue, newValue) {
  super.attributeChangedCallback(prop, oldValue, newValue);
  console.log(`${prop} changed from ${oldValue} to ${newValue}`);
}
```

## Utility methods

### `requestUpdate()`

Manually schedules a re-render. Use this when Elena can’t detect a change automatically, for example when mutating an object or array in place:

```js
this.items.push("new item");
this.requestUpdate();
```

### `updateComplete`

A `Promise` that resolves after the next pending render finishes. Use it to wait for the DOM to settle before reading it:

```js
this.label = "Updated";
await this.updateComplete;
console.log(this.element.textContent); // "Updated"
```

### `ClassName.define()`

Registers the component with the browser using the `static tagName` field. Call this once after defining the class. Does nothing in non-browser environments.

```js
MyElement.define();
```

## Custom methods

You can define your own methods on any Elena component:

```js
export default class Button extends Elena(HTMLElement) {
  focus() {
    this.element?.focus();
  }
}
```

Use `@internal` in JSDoc to mark methods that are implementation details and should not be part of the public API:

```js
/** @internal */
_buildLabel() {
  return `${this.firstName} ${this.lastName}`;
}
```

# Known Issues

## Browser compatibility

- Firefox 148 has an open issue regarding CSS `@scope` and `attr[value]` selector that we've [documented here](https://codepen.io/arielsalminen/full/raMazZV). This is already fixed in the pre-release build though and that should be out soon.

## JavaScript frameworks

Rules that apply to **Primitive Components** when used with a framework:

- Never render a framework component _inside_ a Primitive Component (e.g. via `ReactDOM.createRoot(elenaElement)`). Elena calls `replaceChildren()` on render, which would destroy the framework's fiber tree and cause DOM corruption.
- Avoid a JavaScript framework and Elena both mutating the same attribute on a Primitive Component. A framework's reconciler would overwrite Elena's changes on next reconcile, triggering many re-renders. Treat framework-controlled props as read-only inputs inside your Elena element's `render()`:

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
    this.setAttribute("label", this.label.toUpperCase()); // ← don't do this
  }
  ```

- You can't pass dynamic text content as children. Instead use the `text` property, since **Primitive Components** own their internal DOM and frameworks cannot update children after the initial Elena render:

  ```jsx
  // React
  <elena-button text={buttonText} />

  // Angular
  <elena-button [text]="buttonText"></elena-button>

  // Vue
  <elena-button :text="buttonText"></elena-button>
  ```

> [!WARNING]
> React 17 does not pass `Array` or `Object` type props or event handlers to custom elements correctly. Use React 18+ for proper Elena support, or pass all props as string attributes.

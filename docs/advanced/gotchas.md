# Known issues

## Browser compatibility

- As a baseline, Elena’s progressive approach supports any web browser that’s capable of rendering Custom Elements. After that, it’s up to you to determine what is appropriate for your project when authoring CSS styles and JavaScript interactivity.
- Elena, the JavaScript library, supports the following browser versions:
  - Chrome 71+ (Dec 2018)
  - Firefox 69+ (Sep 2019)
  - Safari 12.1+ (Mar 2019)
  - Edge 79+ (Jan 2020)
  - Opera 58+ (Jan 2019)
- If your component uses `@scope` styles, the baseline support is:
  - Chrome 118+ (Oct 2023)
  - Firefox 128+ (Jul 2024)
  - Safari 17.4+ (Mar 2024)
  - Edge 118+ (Oct 2023)
  - Opera 104+ (Oct 2023)
- When using CSS `@scope` and `attr[value]` selectors, be aware that Firefox 148 had an open issue regarding this that we’ve [documented here](https://codepen.io/arielsalminen/full/raMazZV). This is already fixed in the newer releases though. When necessary, you can improve the support for older Firefox version by [omitting `@scope`](/components/styles#styles-without-scope).

## JavaScript frameworks

- Avoid a JavaScript framework and Elena both mutating the same attribute on the same component. A framework’s reconciler would overwrite Elena’s changes on next reconcile, triggering many re-renders. Treat framework-controlled props as read-only inputs inside your Elena element's `render()`:

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

- You can’t pass dynamic text content as children. Use the `text` property instead if you need to update the text content later:

  ```html
  <!-- React -->
  <elena-button text={buttonText} />

  <!-- Angular -->
  <elena-button [text]="buttonText"></elena-button>

  <!-- Vue -->
  <elena-button :text="buttonText"></elena-button>
  ```

> [!WARNING]
> Angular inserts text children _after_ `connectedCallback` fires, by which point Elena has already replaced the host’s inner DOM. The text ends up as a sibling to the element rather than inside it. Always use `text` as a property binding or attribute in Angular, never as a child node:
>
> ```html
> <elena-button [text]="label"></elena-button>
> ```

> [!WARNING]
> React 17 does not pass `Array` or `Object` type props or event handlers to custom elements correctly. Use React 18+ for proper Elena support, or pass all props as string attributes.

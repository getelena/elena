# Server-Side Rendering

Elena's recommended approach to Server Side Rendering (SSR) is simple & straightforward. Since [Progressive Web Components](/components/terminology) are primarily HTML & CSS, you don't need any special logic on the server to render them. The **[Composite Components](/components/terminology)** provide full support for SSR by default, while the **[Primitive Components](/components/terminology)** provide partial support and do the rest of the hydration on the client side.

Partial SSR support for the _Primitive Components_ means that the component’s base HTML & CSS lives in the Light DOM. The JavaScript lifecycle is then used to progressively enhance the functionality and markup once the element is registered.

The benefit of Elena’s approach is that it doesn't need any extra logic on the server while still allowing you to ship all your layout components _(the Composite Components!)_ with full SSR support.

## Avoiding layout shifts

For the **[Primitive Components](/components/terminology)** specifically, our recommendation is to ship them with CSS styles that visually match the `loading` and `hydrated` states without causing layout shift, FOUC, or FOIC _(Flash Of Unstyled Content, Flash Of Invisible Content)._ This can be achieved utilizing the provided `hydrated` attribute in your component styles:

```css
/* Elena SSR Pattern to avoid layout shift */
:scope:not([hydrated]),
.inner-element {
  color: var(--elena-button-text);
}
```

Since **[Primitive Components](/components/terminology)** are self-contained and render their own HTML markup, you may sometimes need access to more than just the initial text content pre-hydration for better SSR support to avoid layout shifts. This can be achieved with pseudo elements in CSS by referencing the attributes set on the element itself:

```css
:scope:not([hydrated])::before {
  content: attr(label);
  /* etc */
}

:scope:not([hydrated])::after {
  content: attr(placeholder);
  /* etc */
}
```

> [!TIP]
> You can skip this section entirely for [Composite Components](/components/terminology), when you plan to [hide components until loaded](/reference/misc#hide-until-loaded), or when the rest of your app renders client side only.

## Rendering Primitive Components to HTML strings

When you don't want to handle the pre-hydration state with CSS, you can expand the **[Primitive Component](/components/terminology)** templates inline by using the provided utility package called [@elenajs/ssr](https://github.com/getelena/elena/tree/main/packages/ssr) that renders the Elena [Primitive Components](/components/terminology) to HTML strings for full SSR support.

Please see the [SSR package's readme](https://github.com/getelena/elena/tree/main/packages/ssr) for full usage guidelines.

> [!WARNING]
> Please note that `@elenajs/ssr` is an experimental package and not yet ready for production use. APIs may change without notice.

## Framework examples

Elena currently provides SSR examples for the following frameworks:

- **[Eleventy](https://github.com/getelena/eleventy-example-project)**
- **[Plain HTML](https://github.com/getelena/html-example-project)**
- **[Next.js](https://github.com/getelena/next-example-project)** _(Elena can even be used inside React Server Components, see [src/app/page.tsx](https://github.com/getelena/next-example-project/blob/main/src/app/page.tsx))_

## React compatibility

**[Primitive Components](/components/terminology)** (e.g. `button`, `input`) render their own internal DOM via `render()`. Frameworks must treat these as leaf nodes — the framework renders the custom element host, Elena owns everything inside it via `replaceChildren()`.

**[Composite Components](/components/terminology)** (e.g. `stack`, `card`) wrap and enhance composed children. The framework renders both the wrapper and its children; Elena only manages props/attributes on the host without touching the light DOM children.

### React-specific notes

- React sets attributes → `attributeChangedCallback` → Elena re-renders internally ✓
- React adds/removes Elena elements → `connected/disconnectedCallback` fires ✓
- React StrictMode double-mount is handled correctly ✓
- React 17 SSR hydration + Elena can conflict: Elena's `connectedCallback` fires `replaceChildren()` while React is reconciling its hydration tree, causing mismatch errors. Use React 18+ or ensure Elena elements render only client-side.

> [!WARNING]
> React 17 does not pass `Array` or `Object` type props or event handlers to custom elements correctly. Use React 18+ for proper Elena support, or pass all props as string attributes.

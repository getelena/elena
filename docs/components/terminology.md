# Terminology

## Progressive Web Components

A _"Progressive Web Component"_ is a native Custom Element designed in two layers: a base layer of HTML and CSS that renders immediately, without JavaScript, and an enhancement layer of JavaScript that adds reactivity, event handling, and more advanced templating. 

There are two types of Progressive Web Components:

### 1. Composite Components

- Components that wrap and enhance the HTML composed inside them, including other components. What you would also call _“HTML Web Components.”_
- Provide styling, layout, and behavior around the composed content.
-  No `render()` method. Full SSR support out of the box.
- Examples: `stack`, `table`, `layout`, `card`, `banner`, `visually-hidden`, `fieldset`.

### 2. Primitive Components

- Self-contained components that own and render their own HTML markup.
- All content is controlled through `props`, nothing is composed into them except `text` content.
- Require a `render()` method returning an `html` tagged template. Partial SSR support out of the box without `@elenajs/ssr`.
- Examples: `button`, `input`, `checkbox`, `radio`, `textarea`, `icon`, `spinner`, `switch`.

> [!TIP] NOTE
> You may wonder: why are they called **Progressive Web Components** and not **Progressive Custom Elements**? _Web Component_ is the more widely recognized term today, and many of Elena’s concepts align closely with what are now called [HTML Web Components](https://adactio.com/journal/20618).
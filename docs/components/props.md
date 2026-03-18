---
title: Props
description: Learn how to declare, type, and use props in Elena components, including attribute syncing, reflection, and supported types.
---

# Props

Props are values you pass to an Elena component. Declare them in `static props` and Elena will keep them in sync with HTML attributes, and re-render the components whenever they&nbsp;change.

## Declaring props

List prop names in `static props`, and give each one a default value as a class field:

```js
/**
 * ░█ [ELENA]: Props
 */
export default class Button extends Elena(HTMLElement) {
  static props = ["variant", "disabled", "value", "type"];

  variant = "default";
  disabled = false;
  value = "";
  type = "button";
}
```

The default value also tells Elena what type the prop is. A default of `false` means it’s a boolean, `0` means a number, `[]` means an array, and so on. Elena uses this to convert the incoming attribute string to the right type.

> [!TIP]
> When naming props, try to keep them simple and a maximum of one word (e.g. `variant`).

## Built-in props

Every Elena element has a built-in `text` prop. On first connect, Elena automatically captures this text content from the light DOM, so you can pass text naturally as children:

```html
<my-button>Click me</my-button>
```

Use `this.text` in `render()` to reference it. Elena trims leading and trailing whitespace when capturing text content, so `<my-button>  Click me  </my-button>` gives `this.text === "Click me"`.

```js
render() {
  return html`<button>${this.text}</button>`;
}
```

Setting `text` programmatically also triggers a re-render:

```js
document.querySelector("my-button").text = "Save changes";
```

## Non-reflected props

By default, Elena writes all props back to the host element as HTML attributes. To turn this off for a specific prop, use the object form:

```js
export default class Button extends Elena(HTMLElement) {
  static props = [
    "variant",
    { name: "icon", reflect: false },
  ];

  variant = "default";
  icon = "";
}
```

`icon` still works as `this.icon` in JavaScript and updates the component when changed, but Elena won’t add it as an attribute on the element.

## Documenting props

Document each prop with JSDoc annotations. `@attribute` marks the field as a reflected HTML attribute, and `@type` describes the expected value.

::: code-group

```js [JavaScript]
/**
 * The style variant of the button.
 * @attribute
 * @type {"default" | "primary" | "danger"}
 */
variant = "default";

/**
 * Makes the component disabled.
 * @attribute
 * @type {Boolean}
 */
disabled = false;

/**
 * The value used to identify the button in forms.
 * @attribute
 * @type {string}
 */
value = "";
```

```ts [TypeScript]
/**
 * The style variant of the button.
 * @attribute
 */
variant: "default" | "primary" | "danger" = "default";

/**
 * Makes the component disabled.
 * @attribute
 */
disabled: boolean = false;

/**
 * The value used to identify the button in forms.
 * @attribute
 */
value: string = "";
```

:::


> [!TIP]
> **`@elenajs/bundler`** transforms these annotations into TypeScript types and a Custom Elements Manifest, giving IDEs and documentation tools rich information about your components.

## Prop types

Elena supports the following prop types. These are also picked up by `@elenajs/bundler` and included in the Custom Elements Manifest:

::: code-group

```js [JavaScript]
/** @type {string} */
/** @type {Number} */
/** @type {Array} */
/** @type {Boolean} */
/** @type {Object} */
/** @type {"default" | "primary" | "danger"} */
```

```ts [TypeScript]
// Use inline type annotations instead of @type in TypeScript:
variant: "default" | "primary" | "danger" = "default";
disabled: boolean = false;
value: string = "";
count: number = 0;
items: string[] = [];
```

:::

## Naming props

Keep prop names short and single-word where possible (e.g. `variant`). Avoid names that conflict with existing DOM prototype members. Reserved names include:

`align`, `title`, `lang`, `translate`, `dir`, `dataset`, `hidden`, `tabIndex`, `accessKey`, `draggable`, `spellcheck`, `autocapitalize`, `contentEditable`, `isContentEditable`, `inputMode`, `offsetParent`, `offsetTop`, `offsetLeft`, `offsetWidth`, `offsetHeight`, `style`, `innerText`, `outerText`, `oncopy`, `oncut`, `onpaste`, `onabort`, `onblur`, `oncancel`, `oncanplay`, `oncanplaythrough`, `onchange`, `onclick`, `onclose`, `oncontextmenu`, `oncuechange`, `ondblclick`, `ondrag`, `ondragend`, `ondragenter`, `ondragleave`, `ondragover`, `ondragstart`, `ondrop`, `ondurationchange`, `onemptied`, `onended`, `onerror`, `onfocus`, `onfocusin`, `onfocusout`, `oninput`, `oninvalid`, `onkeydown`, `onkeypress`, `onkeyup`, `onload`, `onloadeddata`, `onloadedmetadata`, `onloadstart`, `onmousedown`, `onmouseenter`, `onmouseleave`, `onmousemove`, `onmouseout`, `onmouseover`, `onmouseup`, `onmousewheel`, `onpause`, `onplay`, `onplaying`, `onprogress`, `onratechange`, `onreset`, `onresize`, `onscroll`, `onseeked`, `onseeking`, `onselect`, `onstalled`, `onsubmit`, `onsuspend`, `ontimeupdate`, `ontoggle`, `onvolumechange`, `onwaiting`, `onwheel`, `onauxclick`, `ongotpointercapture`, `onlostpointercapture`, `onpointerdown`, `onpointermove`, `onpointerup`, `onpointercancel`, `onpointerover`, `onpointerout`, `onpointerenter`, `onpointerleave`, `onselectstart`, `onselectionchange`, `nonce`, `click`, `focus`, `blur`, `namespaceURI`, `prefix`, `localName`, `tagName`, `id`, `className`, `classList`, `slot`, `attributes`, `shadowRoot`, `assignedSlot`, `innerHTML`, `outerHTML`, `scrollTop`, `scrollLeft`, `scrollWidth`, `scrollHeight`, `clientTop`, `clientLeft`, `clientWidth`, `clientHeight`, `attributeStyleMap`, `onbeforecopy`, `onbeforecut`, `onbeforepaste`, `onsearch`, `previousElementSibling`, `nextElementSibling`, `children`, `firstElementChild`, `lastElementChild`, `childElementCount`, `onfullscreenchange`, `onfullscreenerror`, `onwebkitfullscreenchange`, `onwebkitfullscreenerror`, `setPointerCapture`, `releasePointerCapture`, `hasPointerCapture`, `hasAttributes`, `getAttributeNames`, `getAttribute`, `getAttributeNS`, `setAttribute`, `setAttributeNS`, `removeAttribute`, `removeAttributeNS`, `hasAttribute`, `hasAttributeNS`, `toggleAttribute`, `getAttributeNode`, `getAttributeNodeNS`, `setAttributeNode`, `setAttributeNodeNS`, `removeAttributeNode`, `closest`, `matches`, `webkitMatchesSelector`, `attachShadow`, `getElementsByTagName`, `getElementsByTagNameNS`, `getElementsByClassName`, `insertAdjacentElement`, `insertAdjacentText`, `insertAdjacentHTML`, `requestPointerLock`, `getClientRects`, `getBoundingClientRect`, `scrollIntoView`, `scroll`, `scrollTo`, `scrollBy`, `scrollIntoViewIfNeeded`, `animate`, `computedStyleMap`, `before`, `after`, `replaceWith`, `remove`, `prepend`, `append`, `querySelector`, `querySelectorAll`, `requestFullscreen`, `webkitRequestFullScreen`, `webkitRequestFullscreen`, `part`, `createShadowRoot`, `getDestinationInsertionPoints`, `nodeType`, `nodeName`, `baseURI`, `isConnected`, `ownerDocument`, `parentNode`, `parentElement`, `childNodes`, `firstChild`, `lastChild`, `previousSibling`, `nextSibling`, `nodeValue`, `textContent`, `hasChildNodes`, `getRootNode`, `normalize`, `cloneNode`, `isEqualNode`, `isSameNode`, `compareDocumentPosition`, `contains`, `lookupPrefix`, `lookupNamespaceURI`, `isDefaultNamespace`, `insertBefore`, `appendChild`, `replaceChild`, `removeChild`.
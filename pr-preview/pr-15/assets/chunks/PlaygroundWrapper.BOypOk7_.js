const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/Playground.CffthhGu.js","assets/chunks/framework.CHRjkDA5.js"])))=>i.map(i=>d[i]);
import{_ as D,o as d,c as p,ae as U,j as l,n as x,F as C,z as $,t as j,Z as F,v as W,x as V,C as N,k as J,b as B,E as Z,e as _,w as Y,T as X,L as K,p as h,S as A,D as G,h as Q}from"./framework.CHRjkDA5.js";const ee={},te={class:"pg-loading-skeleton"};function se(e,t){return d(),p("div",te,[...t[0]||(t[0]=[U('<div class="pg-editor pg-editor-loading"><div class="pg-editor-tabs"><button class="pg-editor-tab active">HTML</button><button class="pg-editor-tab">CSS</button><button class="pg-editor-tab">JS</button></div><div class="pg-editor-container"></div></div><div class="pg-preview"><div class="pg-preview-header"><span class="pg-preview-title">Preview</span></div><div class="pg-preview-iframe"></div></div>',2)])])}const I=D(ee,[["render",se]]),ne={class:"pg-sidebar-nav"},ae={class:"pg-sidebar-heading"},ie={class:"pg-sidebar-items"},oe={class:"item"},re=["href","onClick"],le={class:"text"},ce={__name:"PlaygroundSidebar",props:{examples:{type:Array,required:!0},currentId:{type:String,default:""},open:{type:Boolean,default:!1}},emits:["select","toggle"],setup(e,{emit:t}){const s=t;return(o,n)=>(d(),p(C,null,[l("div",{class:x(["pg-sidebar-backdrop",{open:e.open}]),onClick:n[0]||(n[0]=r=>s("toggle"))},null,2),l("aside",{class:x(["pg-sidebar",{open:e.open}])},[l("nav",ne,[(d(!0),p(C,null,$(e.examples,r=>(d(),p("div",{key:r.category,class:"pg-sidebar-group"},[l("p",ae,j(r.category),1),l("div",ie,[(d(!0),p(C,null,$(r.items,c=>(d(),p("div",{key:c.id,class:x(["pg-sidebar-item",{"is-active":e.currentId===c.id}])},[l("div",oe,[n[1]||(n[1]=l("div",{class:"indicator"},null,-1)),l("a",{class:"link",href:"#"+c.id,onClick:F(u=>s("select",c.id),["prevent"])},[l("p",le,j(c.title),1)],8,re)])],2))),128))])]))),128))])],2)],64))}},de={id:"hello-world",title:"Hello World",js:`import { Elena, html } from "@elenajs/core";

export default class MyGreeting extends Elena(HTMLElement) {
  static tagName = "my-greeting";
  static props = ["name"];

  /**
   * The name of the person to greet.
   *
   * @property
   * @type {String}
   */
  name = "World";

  render() {
    return html\`<p>Hello, \${this.name}!</p>\`;
  }
}

MyGreeting.define();`,html:'<my-greeting name="Elena"></my-greeting>'},pe={id:"composite-component",title:"Composite Component",js:`import { Elena } from "@elenajs/core";

/**
 * Stack component manages layout of immediate children
 * with optional spacing between each child.
 *
 * @displayName Stack
 * @slot - The stacked content
 * @status alpha
 */
export default class MyStack extends Elena(HTMLElement) {
  static tagName = "my-stack";
  static props = ["direction"];

  /**
   * The direction of the stack.
   *
   * @property
   * @type {"column" | "row"}
   */
  direction = "column";
}

MyStack.define();`,css:`/* Scope makes sure styles don’t leak out */
@scope (my-stack) {

  /* Targets the host element */
  :scope {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 0.5rem;
  }

  /* Direction */
  :scope[direction="row"] {
    flex-direction: row;
  }
}`,html:`<my-stack>
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</my-stack>

<br/>

<my-stack direction="row">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</my-stack>`},me={id:"primitive-component",title:"Primitive Component",js:`import { Elena, html } from "@elenajs/core";

/**
 * Button component is used for interface actions.
 *
 * @displayName Button
 * @status alpha
 *
 * @cssprop [--my-button-text] - Overrides the default text color.
 * @cssprop [--my-button-bg] - Overrides the default background color.
 */
export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static props = ["variant"];
  static events = ["click"];

  /**
   * The style variant of the button.
   *
   * @property
   * @type {"default" | "primary" | "danger"}
   */
  variant = "default";

  render() {
    return html\`
      <button class="my-button">
        \${this.text}
      </button>
    \`;
  }
}

MyButton.define();`,css:`/* Scope makes sure styles don’t leak out */
@scope (my-button) {

  /* Reset makes sure styles don’t leak in */
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  /* Targets the host element */
  :scope {
    /* Public theming API (with default values set) */
    --_my-button-bg: var(--my-button-bg, #eaecf0);
    --_my-button-text: var(--my-button-text, #172b4d);

    display: inline-block;
    border-radius: 6px;
    cursor: pointer;
  }

  /* CSS pre-hydration styles */
  :scope:not([hydrated]),
  .my-button:is(button) {
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background: var(--_my-button-bg);
    color: var(--_my-button-text);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* States */
  :scope:hover {
    filter: brightness(0.95);
  }
  .my-button:active {
    opacity: 0.7;
  }
  .my-button:focus {
    outline: 2px solid #5a44d4;
    outline-offset: 1px;
  }

  /* Variants */
  :scope[variant="primary"] {
    --_my-button-bg: var(--my-button-bg, #5a44d4);
    --_my-button-text: var(--my-button-text, #fff);
  }
  :scope[variant="danger"] {
    --_my-button-bg: var(--my-button-bg, #d44444);
    --_my-button-text: var(--my-button-text, #fff);
  }
}`,html:`<my-button>Default</my-button>
<my-button variant="primary">Primary</my-button>
<my-button variant="danger">Danger</my-button>`},ue={id:"declarative-component",title:"Declarative Component",js:`import { Elena } from "@elenajs/core";

/**
 * Button component is used for interface actions.
 *
 * @displayName Button
 * @slot - The button content
 * @status alpha
 */
export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static shadow = "open";
}

MyButton.define();`,html:`<my-button>
  <template shadowrootmode="open">
    <style>
      /* In production, these would live in a separate 
         stylesheet loaded via <link> in the template. */
      button {
        font-family: system-ui, sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        border: none;
        background: #5a44d4;
        color: #fff;
        cursor: pointer;
      }
      button:hover {
        filter: brightness(0.9);
      }
      button:active {
        opacity: 0.7;
      }
      button:focus {
        outline: 2px solid #5a44d4;
        outline-offset: 1px;
      }
    </style>
    <button><slot></slot></button>
  </template>
  Click me
</my-button>

<my-button>
  <template shadowrootmode="open">
    <style>
      /* In production, these would live in a separate 
         stylesheet loaded via <link> in the template. */
      button {
        font-family: system-ui, sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        border: none;
        background: #eaecf0;
        color: #172b4d;
        cursor: pointer;
      }
      button:hover {
        filter: brightness(0.95);
      }
      button:active {
        opacity: 0.7;
      }
      button:focus {
        outline: 2px solid #5a44d4;
        outline-offset: 1px;
      }
    </style>
    <button><slot></slot></button>
  </template>
  Cancel
</my-button>`},he={id:"string-props",title:"String Props",js:`import { Elena, html } from "@elenajs/core";

export default class MyBadge extends Elena(HTMLElement) {
  static tagName = "my-badge";
  static props = ["variant"];

  /** @property @type {"info" | "success" | "warning" | "error"} */
  variant = "info";

  render() {
    return html\`
      <span class="my-badge">
        \${this.text}
      </span>
    \`;
  }
}

MyBadge.define();`,css:`@scope (my-badge) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    --my-badge-bg: #5a44d4;
    --my-badge-text: #fff;
    display: inline-block;
  }

  :scope:not([hydrated]),
  .my-badge:is(span) {
    font-family: system-ui, sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.75rem 0.3rem;
    border-radius: 9999px;
    background: var(--my-badge-bg);
    color: var(--my-badge-text);
    display: inline-flex;
  }

  :scope[variant="success"] {
    --my-badge-bg: #5B7F24;
    --my-badge-text: #fff;
  }

  :scope[variant="warning"] {
    --my-badge-bg: #FBC828;
    --my-badge-text: #292A2E;
  }

  :scope[variant="error"] {
    --my-badge-bg: #d44444;
    --my-badge-text: #fff;
  }
}`,html:`<my-badge variant="info">Info</my-badge>
<my-badge variant="success">Success</my-badge>
<my-badge variant="warning">Warning</my-badge>
<my-badge variant="error">Error</my-badge>`},fe={id:"boolean-props",title:"Boolean Props",js:`import { Elena, html } from "@elenajs/core";

export default class MyCheckbox extends Elena(HTMLElement) {
  static tagName = "my-checkbox";
  static props = ["checked", "disabled", "label"];
  static events = ["change"];

  /** @property @type {Boolean} */
  checked = false;

  /** @property @type {Boolean} */
  disabled = false;

  /** @property @type {String} */
  label = "";

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("change", () => {
      this.checked = !this.checked;
    });
  }

  render() {
    return html\`
      <label>
        <input type="checkbox"
          \${this.checked ? "checked" : ""}
          \${this.disabled ? "disabled" : ""}
        />
          \${this.label}
      </label>
    \`;
  }
}

MyCheckbox.define();`,css:`@scope (my-checkbox) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: block;
    user-select: none;
  }

  label {
    -webkit-user-select: none;
    user-select: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9375rem;
    margin-block-end: 0.5rem;
    cursor: pointer;
  }

  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    inline-size: 1.125rem;
    block-size: 1.125rem;
    border: 2px solid #929396;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    display: grid;
    place-content: center;
    flex-shrink: 0;
    transition: background 0.05s, border-color 0.05s;
  }

  input[type="checkbox"]::before {
    content: "";
    inline-size: 0.75rem;
    block-size: 0.75rem;
    clip-path: polygon(10% 50%, 0 63%, 48% 100%, 100% 14%, 88% 0%, 48% 74%);
    background: #fff;
    transform: scale(0);
    transition: transform 0.1s ease-in-out;
  }

  input[type="checkbox"]:checked {
    background: #5a44d4;
    border-color: #5a44d4
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }

  input[type="checkbox"]:focus {
    outline: 2px solid #5a44d4;
    outline-offset: 1px;
  }

  input[type="checkbox"]:disabled {
    opacity: 0.5;
    background: #a5a9af;
    color: #a5a9af;
  }

  :scope[disabled] {
    color: #a5a9af;
  }
}`,html:`<my-checkbox label="Unchecked"></my-checkbox>
<my-checkbox checked label="Checked"></my-checkbox>
<my-checkbox disabled label="Disabled"></my-checkbox>`},ye={id:"number-props",title:"Number Props",js:`import { Elena, html } from "@elenajs/core";

export default class MyCounter extends Elena(HTMLElement) {
  static tagName = "my-counter";
  static props = ["count", "step", "max"];

  /** @property @type {Number} */
  count = 0;

  /** @property @type {Number} */
  step = 1;

  /** @property @type {Number} */
  max = Infinity;

  increment() {
    this.count = Math.min(this.max, this.count + this.step);
  }

  decrement() {
    this.count = Math.max(0, this.count - this.step);
  }

  render() {
    return html\`
      <!-- Please note this isn’t accessible! -->
      <div class="my-counter">
        <button 
          class="decrement"
          onclick="this.closest('my-counter').decrement()">
            –
        </button>
        <span class="value">\${this.count}</span>
        <button
          class="increment"
          onclick="this.closest('my-counter').increment()">
            +
        </button>
      </div>
    \`;
  }
}
MyCounter.define();`,css:`@scope (my-counter) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: inline-block;
  }

  .my-counter {
    display: inline-flex;
    align-items: center;
    gap: 0;
    font-family: system-ui, sans-serif;
    border: 2px solid #929396;
    background: #fdfeff;
    color: #172b4d;
    border-radius: 6px;
  }

  .my-counter button {
    padding: 0.5rem 0.7rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    color: #75767A;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .my-counter button:first-of-type {
    border-inline-end: 1px solid #c2c4c9;
    border-start-start-radius: 6px;
    border-end-start-radius: 6px;
  }

  .my-counter button:last-of-type {
    border-inline-start: 1px solid #c2c4c9;
    border-start-end-radius: 6px;
    border-end-end-radius: 6px;
  }

  .my-counter button:hover {
    filter: brightness(0.95);
  }

  .my-counter button:active {
    opacity: 0.7;
  }

  .my-counter button:focus {
    outline: 2px solid #5a44d4;
  }

  .my-counter .value {
    padding: 0.5rem 0.75rem;
    min-inline-size: 1.5rem;
    text-align: center;
    display: inline-flex;
    justify-content: center;
  }
}`,html:`<my-counter></my-counter>
<my-counter count="10" step="5" max="95"></my-counter>`},be={id:"array-object-props",title:"Array/Object Props",js:`import { Elena, html } from "@elenajs/core";

export default class MyList extends Elena(HTMLElement) {
  static tagName = "my-list";
  static props = ["items", "heading"];

  /** @property @type {Array} */
  items = [];

  /** @property @type {String} */
  heading = "List";

  render() {
    return html\`
      <div class="my-list">
        <h3>\${this.heading}</h3>
        <ul>
          \${this.items.map(item => html\`<li>\${item}</li>\`)}
        </ul>
      </div>
    \`;
  }
}

MyList.define();`,html:`<my-list
  heading="Fruits"
  items='["Apple", "Banana", "Cherry", "Date"]'
></my-list>`},ge={id:"conditional-rendering",title:"Conditional Rendering",js:`import { Elena, html, nothing } from "@elenajs/core";

export default class MyAlert extends Elena(HTMLElement) {
  static tagName = "my-alert";
  static props = ["variant", "dismissible"];

  /** @property @type {"info" | "warning" | "error"} */
  variant = "info";

  /** @property @type {Boolean} */
  dismissible = false;

  render() {
    const close = this.dismissible
      ? html\`<button onclick="this.closest('my-alert').remove()">×</button>\`
      : nothing;

    const icon = html\`<span class="icon">&#9888;</span>\`;

    return html\`
      <div class="my-alert" role="alert">
        \${icon}
        <span class="message">\${this.text}</span>
        \${close}
      </div>
    \`;
  }
}

MyAlert.define();`,css:`@scope (my-alert) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    --my-alert-bg: #cdedff;
    --my-alert-border: #3182ce;
  }

  :scope:not([hydrated]),
  .my-alert {
    margin-block-end: 0.5rem;
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
    min-block-size: 1.5rem;
    border-inline-start: 3px solid var(--my-alert-border);
    background: var(--my-alert-bg);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  :scope:not([hydrated]) {
    padding-inline-start: 2.5rem;
  }

  .icon {
    font-size: 1rem;
    inline-size: 1rem;
  }

  .message {
    flex: 1;
  }

  button {
    cursor: pointer;
    font-size: 1rem;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    opacity: 0.6;
  }

  button:hover {
    opacity: 1;
  }

  button:focus {
    outline: 2px solid #5a44d4;
  }

  :scope[variant="warning"] {
    --my-alert-bg: #ffedc2;
    --my-alert-border: #e7af20;
  }

  :scope[variant="error"] {
    --my-alert-bg: #fed7d7;
    --my-alert-border: #e53e3e;
  }
}`,html:`<my-alert variant="error">Something went wrong!</my-alert>
<my-alert variant="info">This is an informational message.</my-alert>
<my-alert variant="warning" dismissible>This warning can be dismissed.</my-alert>`},ve={id:"list-rendering",title:"List Rendering",js:`import { Elena, html } from "@elenajs/core";

export default class MyList extends Elena(HTMLElement) {
  static tagName = "my-list";
  static props = [{ name: "todos", reflect: false }];

  /** @type {Array} */
  todos = [
    { text: "Learn Elena", done: true },
    { text: "Build a component", done: false },
    { text: "Ship it", done: false },
  ];

  toggle(index) {
    this.todos[index].done = !this.todos[index].done;
    this.requestUpdate();
  }

  render() {
    const total = this.todos.length;
    const done = this.todos.filter(t => t.done).length;

    return html\`
      <div class="my-list">
        <p class="summary">\${done} of \${total} completed</p>
        <ul>
          \${this.todos.map(
            (todo, i) => html\`
              <li class="\${todo.done ? "done" : ""}">
                \${todo.text}
              </li>
          \`)}
        </ul>
      </div>
    \`;
  }
}

MyList.define();`,css:`@scope (my-list) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: block;
  }

  .my-list {
    font-family: system-ui, sans-serif;
    max-inline-size: 300px;
  }

  .summary {
    font-size: 0.875rem;
    color: #718096;
    margin: 0 0 0.5rem;
    display: block;
  }

  ul {
    display: block;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0;
    border-block-end: 1px solid #edf2f7;
  }

  li.done {
    text-decoration: line-through;
    color: #a0aec0;
  }
}`,html:"<my-list></my-list>"},xe={id:"unsafe-html",title:"unsafeHTML",js:`import { Elena, html, unsafeHTML } from "@elenajs/core";

export default class MyIcon extends Elena(HTMLElement) {
  static tagName = "my-icon";
  static props = ["name"];

  /** @property @type {String} */
  name = "star";

  get icons() {
    return {
      star: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>',
      heart: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"/></svg>',
      check: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><path d="M4 13l5 5L20 7"/></svg>',
    };
  }

  render() {
    const svg = this.icons[this.name] || this.icons.star;

    return html\`
      <span class="my-icon">\${unsafeHTML(svg)}</span>
    \`;
  }
}

MyIcon.define();`,css:`@scope (my-icon) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: inline-flex;
    vertical-align: middle;
    color: #4a5568;
  }

  .my-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    inline-size: 3rem;
  }

  svg {
    inline-size: 100%;
    block-size: 100%;
  }
}`,html:`<my-icon name="heart" style="color: #e53e3e"></my-icon>
<my-icon name="star" style="color: #ecc94b"></my-icon>
<my-icon name="check" style="color: #48bb78"></my-icon>`},we={id:"element-ref",title:"Element Ref",js:`import { Elena, html } from "@elenajs/core";

export default class MyInput extends Elena(HTMLElement) {
  static tagName = "my-input";
  static props = ["label"];
  static element = "input";

  /** @property @type {String} */
  label = "";

  firstUpdated() {
    this.element.addEventListener("input", () => {
      this.querySelector(".hint").textContent =
        "Characters: " + this.element.value.length;
    });
  }

  updated() {
    this.element.focus();
  }

  render() {
    return html\`
      <div class="my-input">
        <label for="input">\${this.label}</label>
        <input id="input" type="text" placeholder="Start typing..." />
        <small class="hint">Characters: 0</small>
      </div>
    \`;
  }
}

MyInput.define();`,css:`@scope (my-input) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: block;
    margin-block-end: 0.75rem;
  }

  .my-input {
    font-family: system-ui, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  label {
    font-weight: 600;
    color: #4a5568;
    display: block;
  }

  .hint {
    color: #898f97;
  }
}

/* See https://elenajs.com/advanced/gotchas#browser-compatibility */
my-input input {
  all: unset;
  padding: 0.5rem;
  border: 1px solid #a5a9af;
  border-radius: 4px;
  display: block;
}

my-input input:focus {
  outline: 2px solid #5a44d4;
  outline-offset: -1px;
}`,html:'<my-input label="Character counter"></my-input>'},ke={id:"delegated-events",title:"Delegated Events",js:`import { Elena, html } from "@elenajs/core";

export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static props = ["variant"];
  static events = ["click", "focus", "blur"];

  /** @property @type {"default" | "primary"} */
  variant = "default";

  render() {
    return html\`
      <button class="my-button">
        \${this.text}
      </button>
    \`;
  }
}

MyButton.define();

// Now we can listen on the host element
document.querySelectorAll("my-button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("log").textContent +=
      "Clicked: " + btn.text + "\\n";
  });
});`,css:`@scope (my-button) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    --my-button-bg: #eaecf0;
    display: inline-block;
    cursor: pointer;
    color: #172b4d;
  }

  :scope:not([hydrated]),
  .my-button:is(button) {
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background: var(--my-button-bg);
    display: inline-flex;
  }

  .my-button:hover {
    filter: brightness(0.95);
  }

  .my-button:active {
    opacity: 0.7;
  }

  .my-button:focus {
    outline: 2px solid #5a44d4;
    outline-offset: 1px;
  }

  :scope[variant="primary"] {
    --my-button-bg: #5a44d4;
    color: #fff;
  }
}

#log {
  font-family: ui-monospace, monospace;
  background: #f7fafc;
  padding: 0.75rem;
  border-radius: 4px;
  margin-block-start: 1rem;
  min-block-size: 3rem;
  white-space: pre;
}`,html:`<my-button>Say Hello</my-button>
<my-button variant="primary">Say World</my-button>

<pre id="log"></pre>`},Ce={id:"custom-events",title:"Custom Events",js:`import { Elena, html } from "@elenajs/core";

export default class MyRating extends Elena(HTMLElement) {
  static tagName = "my-rating";
  static props = [{ name: "value", reflect: false }];

  /** @type {Number} */
  value = 0;

  rate(stars) {
    this.value = stars;
    this.dispatchEvent(new CustomEvent("rate", {
      bubbles: true,
      composed: true,
      detail: { value: stars }
    }));
  }

  render() {
    return html\`
      <div class="my-rating">
        \${[1, 2, 3, 4, 5].map(
          stars => html\`
          <button
            class="star \${stars <= this.value ? "active" : ""}"
            onclick="this.closest('my-rating').rate(\${stars})">
              \${stars <= this.value ? "★" : "☆"}
          </button>\`
        )}
      </div>
    \`;
  }
}

MyRating.define();

// Now we can listen on the host element
document.querySelector("my-rating").addEventListener("rate", e => {
  document.getElementById("output").textContent =
    "You rated: " + e.detail.value + " star(s)";
});`,css:`@scope (my-rating) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope { display: inline-block; }

  .my-rating {
    display: inline-flex;
    gap: 0.125rem;
  }

  .star {
    font-size: 2rem;
    cursor: pointer;
    color: #b9c3ce;
    padding: 0.125rem;
    display: inline-flex;
  }

  .star.active,
  .star:hover,
  .star:focus {
    color: #ffb300;
  }
}`,html:`<my-rating></my-rating>

<p id="output">Click a star to rate.</p>`},_e={id:"manual-listeners",title:"Manual Listeners",js:`import { Elena, html } from "@elenajs/core";

export default class MyKeyLogger extends Elena(HTMLElement) {
  static tagName = "my-key-logger";
  static props = [{ name: "keys", reflect: false }];

  /** @type {Array} */
  keys = [];

  connectedCallback() {
    super.connectedCallback();
    this._onKeyDown = e => {
      this.keys = [...this.keys.slice(-100), e.key];
    };
    this.setAttribute("tabindex", "0");
    this.addEventListener("keydown", this._onKeyDown);
    this.focus();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._onKeyDown);
  }

  clear() {
    this.keys = [];
  }

  render() {
    return html\`
      <div class="my-key-logger">
        <p class="hint">Press any key while focused here:</p>
        <div class="keys">
          \${this.keys.length
            ? this.keys.map(k => html\`<kbd>\${k}</kbd>\`)
            : html\`<span class="empty">No keys pressed yet</span>\`
          }
        </div>
        <button class="clear" onclick="this.closest('my-key-logger').clear()">Clear</button>
      </div>
    \`;
  }
}

MyKeyLogger.define();`,css:`@scope (my-key-logger) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: block;
    outline: none;
  }

  :scope:focus-within .my-key-logger {
    border-color: #5a44d4;
  }

  .my-key-logger {
    font-family: system-ui, sans-serif;
    border: 2px dashed #e2e8f0;
    border-radius: 8px;
    padding: 1rem;
    display: block;
  }

  .hint {
    color: #718096;
    margin: 0 0 0.75rem;
    display: block;
  }

  .keys {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    min-block-size: 2rem;
    align-items: center;
  }

  kbd {
    font-family: ui-monospace, monospace;
    padding: 0.25rem 0.5rem;
    background: #edf2f7;
    border: 1px solid #e2e8f0;
    border-radius: 3px;
    display: inline-flex;
  }

  .empty {
    color: #a0aec0;
  }

  button.clear {
    margin-block-start: 0.75rem;
    padding: 0.5rem 0.75rem;
    background: #eaecf0;
    color: #172b4d;
    border-radius: 4px;
    cursor: pointer;
    display: inline-flex;
  }

  button.clear:hover {
    filter: brightness(0.95);
  }

  button.clear:active {
    opacity: 0.7;
  }
}`,html:"<my-key-logger></my-key-logger>"},Ee={id:"will-update",title:"willUpdate",js:`import { Elena, html } from "@elenajs/core";

export default class MyFilter extends Elena(HTMLElement) {
  static tagName = "my-filter";
  static props = [
    { name: "items", reflect: false },
    { name: "search", reflect: false }
  ];
  static element = "input";

  /** @type {Array} */
  items = ["Apple", "Banana", "Cherry", "Date", "Fig", "Grape", "Tomato"];

  /** @property @type {String} */
  search = "";

  willUpdate() {
    this.filtered = this.items.filter(item =>
      item.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  updated() {
    this.element.value = this.search;
    this.element.focus();
    this.element.selectionStart = this.element.selectionEnd = this.search.length;
  }

  render() {
    return html\`
      <div class="my-filter">
        <input type="text" placeholder="Filter fruits" oninput="this.closest('my-filter').search = this.value" />
        <ul>
          \${this.filtered.length > 0
            ? this.filtered.map(item => html\`<li>\${item}</li>\`)
            : html\`<li class="empty">No results</li>\`}
        </ul>
        <small>\${this.filtered.length} of \${this.items.length} shown</small>
      </div>
    \`;
  }
}

MyFilter.define();`,css:`@scope (my-filter) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope { display: block; }

  .my-filter {
    font-family: system-ui, sans-serif;
    max-inline-size: 250px;
  }

  ul {
    display: block;
    padding: 0.5rem 0;
    margin: 0;
    list-style: none;
    background: #f7fafc;
    border: 1px solid #e9ecee;
    border-block-start: 0;
    border-end-start-radius: 4px;
    border-end-end-radius: 4px;
  }

  li {
    display: block;
    padding: 0.5rem 1rem;
  }

  li.empty {
    color: #718096;
  }

  small {
    margin-block-start: 1rem;
    display: block;
  }
}

/* See https://elenajs.com/advanced/gotchas#browser-compatibility */
my-filter input {
  all: unset;
  inline-size: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #a5a9af;
  border-radius: 4px;
  box-sizing: border-box;
  display: block;
}

my-filter input:focus {
  outline: 2px solid #5a44d4;
  outline-offset: -1px;
}`,html:"<my-filter></my-filter>"},Se={id:"first-updated",title:"firstUpdated",js:`import { Elena, html } from "@elenajs/core";

export default class MyCard extends Elena(HTMLElement) {
  static tagName = "my-card";
  static element = ".card";

  firstUpdated() {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      this.querySelector(".size").textContent =
        \`\${Math.round(width)} × \${Math.round(height)}px\`;
    });
    observer.observe(this.element);
  }

  render() {
    return html\`
      <div class="card">
        <h2>Hello, Elena</h2>
        <p>firstUpdated() runs once after the first render. Use it to set up observers, third-party libraries, or anything that needs a real DOM element.</p>
        <small class="size">Measuring...</small>
      </div>
    \`;
  }
}

MyCard.define();`,css:`@scope (my-card) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope { display: block; }

  .card {
    font-family: system-ui, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #f8fafc;
  }

  h2 {
    font-size: 1rem;
    font-weight: 700;
    color: #1a202c;
    display: block;
  }

  p {
    color: #4a5568;
    line-height: 1.5;
    display: block;
  }

  .size {
    color: #00963e;
  }
}`,html:"<my-card></my-card>"},Me={id:"request-update",title:"requestUpdate",js:`import { Elena, html } from "@elenajs/core";

export default class MyTags extends Elena(HTMLElement) {
  static element = "input"
  static tagName = "my-tags";
  static props = [{ name: "tags", reflect: false }];

  /** @type {Array} */
  tags = ["Elena", "Web Components"];

  async addTag(value) {
    if (value.trim()) {
      this.tags.push(value.trim());
      this.requestUpdate();
      await this.updateComplete;
      this.querySelector("input").focus();
    }
  }

  removeTag(index) {
    this.tags.splice(index, 1);
    this.requestUpdate();
  }

  updated() {
    this.element.focus();
  }

  render() {
    return html\`
      <div class="my-tags">
        <input 
          type="text"
          placeholder="Add tag + Enter"
          onkeydown="if(event.key==='Enter'){this.closest('my-tags').addTag(this.value);this.value='';}"
        />
        <div class="list">
          \${this.tags.map(
            (tag, i) => html\`
              <span class="tag">
                \${tag}
                <button
                  class="remove"
                  onclick="this.closest('my-tags').removeTag(\${i})">
                    ×
                </button>
              </span>
            \`
          )}
        </div>
      </div>
    \`;
  }
}

MyTags.define();`,css:`@scope (my-tags) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope { display: block; }

  .list {
    font-family: ui-monospace, monospace;
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin-block-start: 0.5rem;
    min-block-size: 1.75rem;
  }

  .tag {
    padding: 0.35rem 0.45rem 0.35rem 0.75rem;
    background: #ede9ff;
    color: #5a44d4;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
  }

  .remove {
    cursor: pointer;
    border-radius: 6px;
    padding: 0.1rem 0.3rem;
    opacity: 0.6;
  }

  .remove:hover {
    opacity: 1;
  }

  .remove:active {
    transform: translateY(1px);
  }

  .remove:focus {
    outline: 2px solid #5a44d4;
  }
}

/* See https://elenajs.com/advanced/gotchas#browser-compatibility */
my-tags input {
  all: unset;
  inline-size: 100%;
  padding: 0.5rem;
  border: 1px solid #a5a9af;
  font-family: system-ui, sans-serif;
  border-radius: 4px;
  box-sizing: border-box;
  display: block;
}

my-tags input:focus {
  outline: 2px solid #5a44d4;
  outline-offset: -1px;
}`,html:"<my-tags></my-tags>"},Le={id:"css-custom-properties",title:"CSS Custom Properties",js:`import { Elena, html } from "@elenajs/core";

/**
 * @cssprop [--my-button-bg] - Background color.
 * @cssprop [--my-button-text] - Text color.
 * @cssprop [--my-button-radius] - Border radius.
 * @cssprop [--my-button-font] - Font family.
 */
export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static events = ["click"];

  render() {
    return html\`
      <button class="my-button">\${this.text}</button>
    \`;
  }
}

MyButton.define();`,css:`@scope (my-button) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    /* Public theming API (with default values set) */
    --_my-button-font: var(--my-button-font, system-ui, sans-serif);
    --_my-button-radius: var(--my-button-radius, 6px);
    --_my-button-text: var(--my-button-text, #172b4d);
    --_my-button-bg: var(--my-button-bg, #eaecf0);

    border-radius: var(--_my-button-radius);
    display: inline-block;
    cursor: pointer;
  }

  :scope:not([hydrated]),
  .my-button:is(button) {

    /* Internal theming API references (usage) */
    border-radius: var(--_my-button-radius);
    background: var(--_my-button-bg);
    color: var(--_my-button-text);
    font-family: var(--_my-button-font);

    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    display: inline-flex;
  }

  :scope:hover {
    filter: brightness(0.9);
  }

  :scope:active {
    transform: translateY(1px);
    opacity: 0.9;
  }

  :scope:focus-within {
    outline: 2px solid #5a44d4;
    outline-offset: 1px;
  }
}`,html:`<!-- Default styling -->
<my-button>Default</my-button>

<!-- Override CSS custom properties from the consumer side -->
<my-button style="--my-button-bg: #5a44d4; --my-button-text: white">Purple</my-button>

<my-button style="--my-button-bg: #d44444; --my-button-text: white; --my-button-radius: 9999px">
  Rounded Red
</my-button>

<!-- Or override via a CSS class -->
<style>
  .brand-theme {
    --my-button-bg: #f95b1f;
    --my-button-text: white;
    --my-button-font: Georgia, serif;
    --my-button-radius: 0;
  }
</style>
<my-button class="brand-theme">Brand Theme</my-button>`},Te={id:"baseline-support",title:"Baseline Support",js:`import { Elena, html, unsafeHTML, nothing } from "@elenajs/core";

/**
 * Baseline Support component that is based on the official <baseline-status>
 * (https://github.com/web-platform-dx/baseline-status), but rebuilt using Elena. 
 * It displays the baseline support status for a web platform feature by fetching 
 * data from the web-features API and rendering an expandable widget.
 *
 * @displayName Baseline Support
 * @status alpha
 *
 * @cssprop [--baseline-font] - Overrides the default font family.
 * @cssprop [--baseline-color-widely] - Overrides the "widely available" accent color.
 * @cssprop [--baseline-color-newly] - Overrides the "newly available" accent color.
 * @cssprop [--baseline-color-limited] - Overrides the "limited availability" accent color.
 * @cssprop [--baseline-color-no-data] - Overrides the "unknown" accent color.
 */
export default class BaselineSupport extends Elena(HTMLElement) {
  static tagName = "baseline-support";
  static props = ["featureid"];
  static shadow = "open";

  /**
   * The web-features feature ID (e.g. "grid", "dialog").
   *
   * @property
   * @type {string}
   */
  featureid = "";

  /**
   * Styles for the baseline support web component.
   * If you use @elenajs/bundler, you can also import them using:
   * 
   * import styles from "./baseline-support.css" with { type: "css" };
   * static styles = styles;
   */
  static styles = \`
    :host {
      --baseline-color-limited: light-dark(#ea8600, #f09418);
      --baseline-color-newly: light-dark(#1a73e8, #4185ff);
      --baseline-color-widely: light-dark(#1e8e3e, #24a446);
      --baseline-color-no_data: light-dark(#707070, #868686);
      --baseline-color-outline: light-dark(#d9d9d9, #d9d9d9);
      --baseline-color-link: light-dark(#1a73e8, #5aa1ff);
      --baseline-icon-limited-front: light-dark(#f09409, #f09409);
      --baseline-icon-limited-back: light-dark(#c6c6c6, #565656);
      --baseline-icon-widely-front: light-dark(#1ea446, #1ea446);
      --baseline-icon-widely-back: light-dark(#c4eed0, #125225);
      --baseline-icon-newly-front: light-dark(#1b6ef3, #4185ff);
      --baseline-icon-newly-back: light-dark(#a8c7fa, #2d509e);
      --baseline-icon-no_data: light-dark(#909090, #666666);

      all: unset;
      box-sizing: border-box;
      color: inherit;
      display: block;
      border: solid 1px var(--baseline-color-outline);
      border-radius: 8px;
      inline-size: 100%;
      padding: 16px 24px 0 24px;
      max-inline-size: 800px;
      margin-block-end: 1rem;
      font-family: Roboto, sans-serif;
      font-size: 14px;
      font-style: normal;
    }

    .name {
      font-weight: normal;
      font-size: 20px;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    a,
    a:active,
    a:visited {
      color: var(--baseline-color-link);
    }

    ::slotted(*) {
      color: grey;
      font-style: italic;
      font-size: 80%;
    }

    .baseline-title {
      gap: 1rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      flex: 1;
    }

    .baseline-title {
      flex: 1;
    }

    .baseline-title div:first-child {
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }

    .baseline-badge {
      background: #3367d6;
      color: #fff;
      font-size: 11px;
      padding: 0 4px;
      border-radius: 2px;
      text-transform: uppercase;
      line-height: 20px;
      margin-inline: 0.5rem;
      white-space: nowrap;
    }

    .baseline-browsers {
      font-size: 0;
      max-inline-size: 200px;
      display: flex;
      gap: 16px;
    }

    .baseline-browsers span {
      white-space: nowrap;
    }

    .support-no_data {
      color: var(--baseline-color-no_data);
    }

    .support-unavailable {
      color: var(--baseline-color-limited);
    }

    .support-newly {
      color: var(--baseline-color-newly);
    }

    .support-widely,
    .support-available {
      color: var(--baseline-color-widely);
    }

    details > summary .open-icon {
      inline-size: 10px;
      block-size: 20px;
      margin-inline-start: auto;
      color: inherit;
    }

    @media (min-width: 420px) {
      details > summary .open-icon {
        margin-inline-start: 48px;
      }
    }

    details > summary .open-icon svg {
      transition: transform 0.3s;
    }

    details[open] summary .open-icon svg {
      transform: rotate(180deg);
    }

    summary {
      display: flex;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: space-between;
      padding: 16px 0;
    }

    summary::-webkit-details-marker {
      display: none;
    }

    .signals-badge,
    .signals-badge:visited,
    .signals-badge:active {
      text-decoration: none;
      background: transparent;
      color: inherit;
      border-radius: 12px;
      padding: 2px 8px;
      font-size: 12px;
      border: 1px solid var(--baseline-color-outline);
      display: inline-flex;
      align-items: center;
      gap: 4px;
      line-height: 1.4;
    }

    .signals-badge:hover {
      background: light-dark(#f5f5f5, #333);
    }
  \`;

  /** @internal */
  _data = null;
  /** @internal */
  _loading = true;
  /** @internal */
  _error = false;
  /** @internal */
  _status = "no_data";
  /** @internal */
  _name = "";
  /** @internal */
  _date = "";
  /** @internal */
  _abortController = null;

  /**
   * @internal
   */
  attributeChangedCallback(prop, oldValue, newValue) {
    super.attributeChangedCallback(prop, oldValue, newValue);

    if (prop === "featureid" && this._hydrated && oldValue !== newValue && newValue) {
      this._fetchData();
    }
  }

  /**
   * @internal
   */
  firstUpdated() {
    if (this.featureid) {
      this._fetchData();
    }
  }

  /**
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    if (this._abortController) {
      this._abortController.abort();
      this._abortController = null;
    }
  }

  /**
   * @internal
   */
  willUpdate() {
    if (this._data) {
      this._status = this._data.baseline?.status || "no_data";
      this._name = this._data.name || this.featureid;

      if (this._data.baseline?.low_date) {
        this._date = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
        }).format(new Date(this._data.baseline.low_date));
      } else {
        this._date = "";
      }
    } else {
      this._status = "no_data";
      this._name = this.featureid || "Unknown feature";
      this._date = "";
    }

    this.setAttribute("status", this._status);
  }

  /**
   * @internal
   */
  async _fetchData() {
    if (this._abortController) {
      this._abortController.abort();
    }

    this._abortController = new AbortController();
    this._loading = true;
    this._error = false;
    this._data = null;
    this.requestUpdate();

    try {
      const res = await fetch(API_URL + this.featureid, {
        signal: this._abortController.signal,
        cache: "force-cache",
      });

      if (!res.ok) {
        throw new Error(\`HTTP \${res.status}\`);
      }

      this._data = await res.json();
    } catch (e) {
      if (e.name !== "AbortError") {
        this._error = true;
      }
    }

    this._loading = false;
    this._abortController = null;
    this.requestUpdate();
  }

  /**
   * @internal
   */
  _checkAvailability(implementations) {
    return implementations.every(impl => impl?.status === "available");
  }

  /**
   * @internal
   */
  _getDescription() {
    const status = this._status;
    const date = this._date;

    if (status === "newly" && date) {
      return \`Since \${date} this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.\`;
    }

    if (status === "widely" && date) {
      return \`This feature is well established and works across many devices and browser versions. It’s been available across browsers since \${date}.\`;
    }

    return BASELINE_DEFS[status].description;
  }

  /**
   * @internal
   */
  renderBaselineIcon(status) {
    return unsafeHTML(\`<span class="baseline-icon">\${BASELINE_ICONS[status]}</span>\`);
  }

  /**
   * @internal
   */
  renderSupportIcon(status, implementations) {
    const allAvailable = this._checkAvailability(implementations);
    const support = status === "limited" ? (allAvailable ? "available" : "unavailable") : status;
    const iconKey =
      support === "newly" || support === "widely"
        ? "available"
        : support === "unavailable"
          ? "no"
          : support === "no_data"
            ? "unknown"
            : support;

    return unsafeHTML(
      \`<span class="support-icon support-\${support}">\${SUPPORT_ICONS[iconKey] || SUPPORT_ICONS.unknown}</span>\`
    );
  }

  /**
   * @internal
   */
  renderBrowsers() {
    const status = this._status;
    const impl = this._data?.browser_implementations || {};

    return html\`
      <div class="baseline-browsers">
        <span>\${unsafeHTML(BROWSER_ICONS.chrome)} \${this.renderSupportIcon(status, [impl.chrome, impl.chrome_android])}</span>
        <span>\${unsafeHTML(BROWSER_ICONS.edge)} \${this.renderSupportIcon(status, [impl.edge])}</span>
        <span>\${unsafeHTML(BROWSER_ICONS.firefox)} \${this.renderSupportIcon(status, [impl.firefox, impl.firefox_android])}</span>
        <span>\${unsafeHTML(BROWSER_ICONS.safari)} \${this.renderSupportIcon(status, [impl.safari, impl.safari_ios])}</span>
      </div>
    \`;
  }

  /**
   * Renders the actual web component.
   *
   * @internal
   */
  render() {
    const status = this._status;
    const def = BASELINE_DEFS[status];
    const title = this._loading ? "Loading..." : def.title;
    const preTitle = status === "limited" || status === "no_data" ? nothing : html\`<strong>Baseline</strong>\`;
    const year = status === "newly" && this._date ? this._date.split(" ")[1] : "";
    const badge = status === "newly" ? html\`<span class="baseline-badge">newly available</span>\` : nothing;
    const upvote = this._data?.developer_signals;
    const upvoteButton = upvote?.link ? html\`<a class="signals-badge" href="\${upvote.link}" target="_top">👍 \${upvote.upvotes || 0}</a>\` : nothing;
    const learnMore = status !== "no_data" && this._data?.feature_id ? html\`<p><a href="https://github.com/web-platform-dx/web-features/blob/main/features/\${this._data.feature_id}.yml" target="_top" class="baseline-link">Learn more</a></p>\` : nothing;

    return html\`
      <div class="name">\${this._name} \${upvoteButton}</div>
      <details>
        <summary>
          \${this.renderBaselineIcon(status)}
          <div class="baseline-title">
            <div class="baseline-title-row">\${preTitle} \${title} \${year}</div>
            \${this.renderBrowsers()}
          </div>
          <span class="open-icon">\${unsafeHTML(CHEVRON_ICON)}</span>
        </summary>
        <p class="baseline-description">\${this._getDescription()}</p>
        \${learnMore}
      </details>
    \`;
  }
}

const API_URL = "https://api.webstatus.dev/v1/features/";

const BASELINE_DEFS = {
  widely: {
    title: "Widely available",
    description:
      "This feature is well established and works across many devices and browser versions.",
  },
  newly: {
    title: "Newly available",
    description:
      "This feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.",
  },
  limited: {
    title: "Limited availability",
    description:
      "This feature is not available across all browsers. Please refer to the table below for details.",
  },
  no_data: {
    title: "Unknown availability",
    description: "This feature doesn’t have status data in Baseline yet.",
  },
};

const BASELINE_ICONS = {
  widely: \`<svg width="36" height="20" viewBox="0 0 36 20"><path fill="var(--baseline-icon-widely-front)" d="m18 8 2 2-2 2-2-2z"/><path fill="var(--baseline-icon-widely-front)" d="m26 0 2 2-18 18L0 10l2-2 8 8z"/><path fill="var(--baseline-icon-widely-back)" d="m28 2-2 2 6 6-6 6-4-4-2 2 6 6 10-10zM10 0 2 8l2 2 6-6 4 4 2-2z"/></svg>\`,
  newly: \`<svg width="36" height="20" viewBox="0 0 36 20"><path fill="var(--baseline-icon-newly-back)" d="m10 0 2 2-2 2-2-2zm4 4 2 2-2 2-2-2zm16 0 2 2-2 2-2-2zm4 4 2 2-2 2-2-2zm-4 4 2 2-2 2-2-2zm-4 4 2 2-2 2-2-2zm-4-4 2 2-2 2-2-2zM6 4l2 2-2 2-2-2z"/><path fill="var(--baseline-icon-newly-front)" d="m26 0 2 2-18 18L0 10l2-2 8 8z"/></svg>\`,
  limited: \`<svg width="36" height="20" viewBox="0 0 36 20"><path fill="var(--baseline-icon-limited-front)" d="m10 0 6 6-2 2-6-6zm12 12-2 2 6 6 2-2zm4-12 2 2-18 18-2-2z"/><path fill="var(--baseline-icon-limited-back)" d="m8 2 2 2-6 6 6 6-2 2-8-8zm20 0 8 8-8 8-2-2 6-6-6-6z"/></svg>\`,
  no_data: \`<svg width="36" height="20" viewBox="0 0 36 20"><path fill="var(--baseline-icon-no_data)" d="m18 8 2 2-2 2-2-2zm10-6-2 2 6 6-6 6-4-4-2 2 6 6 10-10zM10 0 2 8l2 2 6-6 4 4 2-2z"/><path fill="var(--baseline-icon-no_data)" d="m26 0 2 2-18 18L0 10l2-2 8 8z"/></svg>\`,
};

const BROWSER_ICONS = {
  chrome: \`<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 260 260"><circle cx="128" cy="128" r="64" fill="#fff"/><path fill="#34a853" d="M96 183.4A63.7 63.7 0 0 1 72.6 160L17.2 64A128 128 0 0 0 128 256l55.4-96A64 64 0 0 1 96 183.4Z"/><path fill="#fbbc04" d="M192 128a63.7 63.7 0 0 1-8.6 32L128 256A128 128 0 0 0 238.9 64h-111a64 64 0 0 1 64 64Z"/><circle cx="128" cy="128" r="52" fill="#1a73e8"/><path fill="#ea4335" d="M96 72.6a63.7 63.7 0 0 1 32-8.6h110.8a128 128 0 0 0-221.7 0l55.5 96A64 64 0 0 1 96 72.6Z"/></svg>\`,
  edge: \`<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none"><defs><clipPath id="a"><path fill="#fff" d="M0 0h20.4v20.4H0z"/></clipPath></defs><g clip-path="url(#a)"><path fill="#0c59a4" d="M18.416 15.18a7.485 7.485 0 0 1-.845.375 8.121 8.121 0 0 1-2.86.51c-3.77 0-7.053-2.59-7.053-5.92a2.51 2.51 0 0 1 1.307-2.176c-3.41.143-4.287 3.697-4.287 5.777 0 5.897 5.427 6.487 6.598 6.487.63 0 1.578-.184 2.152-.367l.103-.032a10.224 10.224 0 0 0 5.307-4.207.319.319 0 0 0-.422-.447Z"/><path fill="#0078d4" d="M8.423 19.229a6.31 6.31 0 0 1-1.809-1.698A6.43 6.43 0 0 1 8.965 7.97c.255-.12.677-.327 1.243-.319a2.582 2.582 0 0 1 2.048 1.036c.32.431.497.953.502 1.49 0-.016 1.953-6.343-6.375-6.343-3.498 0-6.375 3.315-6.375 6.232-.014 1.54.316 3.065.964 4.462a10.2 10.2 0 0 0 12.464 5.34 6.015 6.015 0 0 1-5.005-.638h-.008Z"/><path fill="#2fc2df" d="M12.145 11.857c-.072.08-.271.2-.271.447 0 .207.135.414.382.582 1.14.796 3.3.685 3.307.685a4.75 4.75 0 0 0 2.415-.662A4.893 4.893 0 0 0 20.4 8.694c.024-1.785-.637-2.972-.9-3.498C17.802 1.896 14.16 0 10.2 0A10.2 10.2 0 0 0 0 10.057c.04-2.909 2.933-5.26 6.375-5.26.28 0 1.873.024 3.347.797a5.786 5.786 0 0 1 2.463 2.335c.486.845.573 1.92.573 2.35 0 .431-.215 1.06-.621 1.587l.008-.008Z"/></g></svg>\`,
  firefox: \`<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none"><defs><clipPath id="M"><path fill="#fff" d="M0 0h20.4v20.4H0z"/></clipPath><path id="N" d="M19.7 6.9a8 8 0 0 0-2-2.6l1 3q1 3.4-.4 6.7c-1.1 2.5-4 5-8.4 4.8a10 10 0 0 1-9.8-8C-.1 10 0 9.7 0 9v1.5q0 3.9 2.7 6.7c2.7 2.8 4.1 3 6.6 3.2a11 11 0 0 0 7.2-2q3-2.5 3.8-6.2v-.4q.3-2.6-.6-5"/><path id="O" d="M10.2 8.6c0 .3-.9 1.1-1.2 1.1-2.9 0-3.4 1.7-3.4 1.7A4 4 0 0 0 8 14.7h.2l.3.2 1.3.2c5.1.2 6.1-5.9 2.4-7.7q1.4 0 2.5.6-.7-1.2-1.9-1.8a5 5 0 0 0-2.6-.7H10q-1.5 0-2.8 1l.7.7c.6.7 2.4 1.3 2.4 1.4"/></defs><g clip-path="url(#M)"><path fill="#ff8c00" d="M19.7 6.9a8 8 0 0 0-2-2.6l1 3c-1.2-2.7-3.2-3.8-4.8-6.3l-.2-.4-.1-.2-.2-.4a7 7 0 0 0-3.5 5.5q-1.6 0-2.8 1l-.3-.1q-.4-1.2 0-2.5-1.5.7-2.5 1.9c-.4-.5-.4-2.2-.4-2.5l-.3.2a7 7 0 0 0-2 2 8 8 0 0 0-1.3 3L.2 9 0 10.5q0 3.9 2.7 6.7c2.7 2.8 4.1 3 6.6 3.2a11 11 0 0 0 7.2-2q3-2.5 3.8-6.2v-.4q.3-2.6-.6-5m-1.1.6"/><use fill="#ff563b" href="#N"/><use fill="#960e18" opacity=".25" href="#N"/><path fill="#ffd000" d="M14.7 8q-.3-.6-.9-1.1a5 5 0 0 1-.4-6.9 7 7 0 0 0-3.5 5.5h.3q1.5 0 2.6.7A5 5 0 0 1 14.7 8"/><use fill="#7059ff" href="#O"/><use fill="#7716a8" opacity=".4" href="#O"/><path fill="#ffb039" d="m6.6 6.2.2.2q-.4-1.2 0-2.5-1.5.7-2.5 1.9s1.5 0 2.3.4"/><path fill="#ff5634" d="M0 10.8c.9 4.5 5.1 8 9.9 8a8.5 8.5 0 0 0 8.7-11.4c.4 2.3-.8 4.5-2.7 6A8 8 0 0 1 8 14.7l-.1-.1c-2.1-1-3-2.9-2.8-4.5q-.7 0-1.5-.4c-.8-.4-.7-.6-1-1A4 4 0 0 1 4.5 8a4 4 0 0 1 1.9.4 5 5 0 0 0 3.8.1S8.5 8 7.8 7.2L7 6.6l-.3-.2-.2-.2c-.8-.4-2.2-.4-2.3-.4-.4-.5-.4-2.2-.4-2.5l-.3.2a7 7 0 0 0-2 2 8 8 0 0 0-1.3 3S-.1 10 0 10.7"/><path fill="#ff3647" d="M13.8 6.9q.6.4 1 1.2h.1c2.3 2.1 1.1 5 1 5.3q3.2-2.4 2.7-6c-1.1-2.8-3-4-4.7-6.4l-.2-.4-.1-.2-.2-.4c-.4.2-2.8 3.8.4 6.9"/><path fill="#ff5634" d="m15 8.2-.2-.1h-.1q-1.1-.9-2.5-.7a4 4 0 0 1-2.4 7.7L8.5 15l-.3-.2H8c.7.4 4.3 1.6 8-1.3 0-.2 1.2-3.2-1-5.2"/><path fill="#ffb039" d="M5.6 11.4S6.1 9.7 9 9.7c.3 0 1.2-.8 1.2-1a5 5 0 0 1-3.8-.2A4 4 0 0 0 4.5 8a4 4 0 0 0-1.9.5q.4.7 1 1.1.8.5 1.5.4c-.2 1.6.7 3.5 2.8 4.5H8a4 4 0 0 1-2.4-3.2"/><path fill="#fff44f" opacity=".3" d="M19.7 6.8c-.5-1-1.4-2.1-2-2.5a10 10 0 0 1 1 3c-1.2-2.7-3.2-3.9-4.8-6.3l-.2-.4-.1-.2-.2-.4a7 7 0 0 0-3.5 5.5h.3q1.5 0 2.6.7A5 5 0 0 1 14.7 8q-1.1-.7-2.5-.6a4 4 0 0 1-2.4 7.7l-1.3-.2-.3-.2H8l-.1-.1H8a4 4 0 0 1-2.4-3.2S6.1 9.7 9 9.7c.3 0 1.2-.8 1.2-1s-1.8-.8-2.4-1.5L7 6.5l-.3-.1q-.4-1.2 0-2.5-1.5.7-2.5 1.9c-.4-.5-.4-2.2-.4-2.5l-.3.2a7 7 0 0 0-2 2A8 8 0 0 0 .4 8.3L.3 9l-.2 1.4q0 3.9 2.7 6.7c2.7 2.8 4.1 3 6.6 3.2a11 11 0 0 0 7.2-2q3-2.5 3.8-6.2v-.4q.3-2.6-.6-5"/></g></svg>\`,
  safari: \`<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none"><defs><clipPath id="clip0_1510_9490"><rect width="20.4" height="20.4" fill="white" transform="translate(0.000488281)"/></clipPath></defs><g clip-path="url(#clip0_1510_9490)"><path d="M19.8586 9.72878C19.8586 11.0041 19.6088 12.2669 19.1234 13.4451C18.6381 14.6233 17.9267 15.6939 17.0298 16.5956C16.133 17.4974 15.0683 18.2127 13.8965 18.7008C12.7248 19.1888 11.4689 19.44 10.2005 19.44C7.63906 19.44 5.1825 18.4168 3.37126 16.5956C1.56002 14.7744 0.54248 12.3043 0.54248 9.72878C0.54248 7.15321 1.56002 4.68313 3.37126 2.86192C5.1825 1.04072 7.63906 0.0175788 10.2005 0.0175781C11.4689 0.017578 12.7248 0.268767 13.8965 0.7568C15.0683 1.24483 16.133 1.96016 17.0298 2.86192C17.9267 3.76369 18.6381 4.83424 19.1234 6.01246C19.6088 7.19068 19.8586 8.45349 19.8586 9.72878Z" fill="#e0e0e0" stroke="#CDCDCD" stroke-width="0.351543" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.1018 9.72868C19.1018 12.1024 18.164 14.379 16.4947 16.0575C14.8254 17.7359 12.5613 18.6789 10.2006 18.6789C7.83982 18.6789 5.57575 17.7359 3.90644 16.0575C2.23713 14.379 1.29932 12.1024 1.29932 9.72868C1.29932 7.35493 2.23713 5.0784 3.90644 3.39991C5.57575 1.72141 7.83982 0.778442 10.2006 0.778442C12.5613 0.778442 14.8254 1.72141 16.4947 3.39991C18.164 5.0784 19.1018 7.35493 19.1018 9.72868Z" fill="#12aef1"/><path d="M11.218 10.8003L9.18286 8.65724L16.4024 3.77393L11.218 10.8003Z" fill="#FF5150"/><path d="M11.2181 10.8003L9.18291 8.65723L3.99854 15.6836L11.2181 10.8003Z" fill="#F1F1F1"/><path opacity="0.243" d="M3.99854 15.6836L11.2181 10.8003L16.4025 3.77393L3.99854 15.6836Z" fill="black"/></g></svg>\`,
};

const SUPPORT_ICONS = {
  available: \`<svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" fill="none"><path fill="currentColor" d="M1.3 3.3a9 9 0 0 1 5.4-1.9c4.9 0 8.9 4 8.9 8.8s-4 8.8-8.9 8.8a9 9 0 0 1-5.4-2l-.8 1a10 10 0 0 0 6.2 2.2 10 10 0 0 0 10-10A10 10 0 0 0 .6 2.3z"/><path fill="currentColor" d="m11.3 8.1-5 5-3-3 1-1 2 2 4-4z"/></svg>\`,
  no: \`<svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" fill="none"><path fill="currentColor" d="M1.3 3.3a9 9 0 0 1 5.4-1.9c5 0 8.9 4 8.9 8.8s-4 8.8-8.9 8.8a9 9 0 0 1-5.4-2l-.8 1a10 10 0 0 0 6.2 2.2 10 10 0 0 0 10.1-10A10 10 0 0 0 .5 2.3z"/><path fill="currentColor" d="m10.3 8.1-2 2 2 2-1 1-2-2-2 2-1-1 2-2-2-2 1-1 2 2 2-2z"/></svg>\`,
  unknown: \`<svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" fill="none" viewBox="0 0 17 21"><path fill="currentColor" d="M7.2 12.3H6l.1-1q0-.4.3-.7l.7-.8 1-1.1.1-.8q0-.4-.2-.7 0-.3-.4-.5l-.8-.2-.7.1-.5.5q-.2.2-.2.7H4.2q0-.8.3-1.3.4-.5 1-.7.6-.3 1.3-.3t1.4.3.9.8.3 1.3q0 .6-.2 1l-.6 1-.8.8q-.4.3-.5.7zm-1.3 2 .2-.5.5-.2q.4 0 .6.2l.1.5-.1.5-.6.2-.5-.2z"/><path fill="currentColor" d="M1.3 3.3a8.8 8.8 0 0 1 14.3 6.9 8.8 8.8 0 0 1-14.3 6.9l-.8 1a10 10 0 0 0 16.3-7.9A10 10 0 0 0 .5 2.3z"/></svg>\`,
};

const CHEVRON_ICON = \`<svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" fill="none" viewBox="0 0 11 7"><path fill="currentColor" d="M5.5 6.5.3 1.2l.9-1 4.3 4.4L9.8.3l1 1z"/></svg>\`;

BaselineSupport.define();`,html:`<baseline-support featureid="autonomous-custom-elements"></baseline-support>
<baseline-support featureid="cascade-layers"></baseline-support>
<baseline-support featureid="scope"></baseline-support>
<baseline-support featureid="declarative-shadow-dom"></baseline-support>
<baseline-support featureid="anchor-positioning"></baseline-support>`},ze={id:"mixins",title:"Mixins",js:`import { Elena, html } from "@elenajs/core";

const Draggable = superclass => class extends superclass {
  #offsetX = 0;
  #offsetY = 0;

  connectedCallback() {
    super.connectedCallback();
    this.style.position = "absolute";
    this.style.cursor = "grab";

    const pos = e => e.touches?.[0] ?? e;

    const onStart = e => {
      const { clientX, clientY } = pos(e);
      const rect = this.getBoundingClientRect();

      this.#offsetX = clientX - rect.left;
      this.#offsetY = clientY - rect.top;

      this.style.cursor = "grabbing";

      const onMove = e => {
        const { clientX, clientY } = pos(e);
        this.style.left = clientX - this.#offsetX + "px";
        this.style.top = clientY - this.#offsetY + "px";
      };

      const onUp = () => {
        this.style.cursor = "grab";

        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onUp);
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
      document.addEventListener("touchmove", onMove, { passive: true });
      document.addEventListener("touchend", onUp);
    };

    this.addEventListener("mousedown", onStart);
    this.addEventListener("touchstart", onStart, { passive: true });
  }
};

export default class MyDraggable extends Draggable(Elena(HTMLElement)) {
  static tagName = "my-draggable";

  render() {
    return html\`
      <div class="my-draggable">
        Drag me!
      </div>
    \`;
  }
}

MyDraggable.define();`,css:`@scope (my-draggable) {
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  :scope {
    display: block;
    user-select: none;
  }

  .my-draggable {
    -webkit-user-select: none;
    user-select: none;
    touch-action: none;
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: #fff;
    background: #5a44d4;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    display: inline-block;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  }
}`,html:`<div style="position: relative; height: calc(100vh - 2.5rem); border: 2px dashed #e2e8f0; border-radius: 8px;">
  <my-draggable style="left: 40px; top: 40px;"></my-draggable>
</div>`},$e={id:"shadow-dom",title:"Shadow DOM",js:`import { Elena, html } from "@elenajs/core";

export default class MyBadge extends Elena(HTMLElement) {
  static tagName = "my-badge";
  static props = ["variant"];

  // Shadow DOM styles are fully isolated
  static shadow = "open";
  static styles = \`
    :host {
      display: inline-block;
    }
    .badge {
      font-family: system-ui, sans-serif;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      background: var(--badge-bg, #eaecf0);
      color: var(--badge-text, #172b4d);
    }
    :host([variant="success"]) {
      --badge-bg: #5B7F24;
      --badge-text: #fff;
    }
    :host([variant="error"]) {
      --badge-bg: #d44444;
      --badge-text: #fff;
    }
  \`;

  /** @property @type {"default" | "success" | "error"} */
  variant = "default";

  render() {
    return html\`
      <span class="badge">
        \${this.text}
      </span>
    \`;
  }
}
MyBadge.define();`,css:`/* Most external styles cannot reach into Shadow DOM.
   CSS custom properties still pierce the boundary for theming. */

/* This will NOT affect the badge (Shadow DOM blocks it) */
* {
  color: red !important;
}`,html:`<span>This span IS affected by the global style (color: red !important;)</span>

<br/><br/>

<my-badge>Default</my-badge>
<my-badge variant="success">Success</my-badge>
<my-badge variant="error">Error</my-badge>

<br/>

<p>
  The badges above are protected by Shadow DOM. The global style has no effect on them.
</p>`},b=[{category:"Basics",items:[me,pe,ue,de]},{category:"Props",items:[he,fe,ye,be]},{category:"Templates",items:[ge,ve,xe,we]},{category:"Events",items:[ke,Ce,_e]},{category:"Lifecycle",items:[Ee,Se,Me]},{category:"Styling",items:[Le]},{category:"Advanced",items:[ze,$e,Te]}],je=`/**
 * @elenajs/core v1.0.0-rc.10
 * (c) 2025-present Ariel Salminen and Elena contributors
 * @license MIT
 */
const t="░█ [ELENA]: ",s=Array.isArray,i=s=>console.warn(t+s),n={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function e(t){return s(t)?t.map(o).join(""):o(t)}function o(t){return t?.t?String(t):String(t??"").replace(/[&<>"']/g,t=>n[t])}function r(t,...s){let i;return{t:!0,strings:t,values:s,toString:()=>(null==i&&(i=t.reduce((t,i,n)=>t+i+e(s[n]),"")),i)}}function h(t){return{t:!0,toString:()=>t??""}}const c={t:!0,toString:()=>""},u=t=>s(t)?t.some(t=>t?.t):t?.t,f=t=>s(t)?t.join(""):String(t??"");function l(t){return t.replace(/(>)\\n\\s*|\\n\\s*(<)/g,"$1$2").replace(/\\n\\s*/g," ").replace(/>\\s+</g,"><")}function a(t,s,n){if(s="boolean"===t&&"boolean"!=typeof s?null!==s:s,!n)return s;if("toAttribute"===n)switch(t){case"object":case"array":return s&&JSON.stringify(s);case"boolean":return s?"":null;default:return""===s?null:s}else switch(t){case"object":case"array":if(!s)return s;try{return JSON.parse(s)}catch{return i("Invalid JSON: "+s),null}case"number":return null!==s?+s:s;default:return s??""}}function d(t,s,n){t?null===n?t.removeAttribute(s):t.setAttribute(s,n):i("Cannot sync attrs.")}const p=new WeakMap,g="e"+(1e5*Math.random()|0),b=()=>document.createElement("template"),y=t=>document.createTreeWalker(t,128);function m(t,i,n){return!function(t,i,n){if(t.i!==i||!t.o)return!1;for(let i=0;i<n.length;i++){const e=n[i],o=s(e)?f(e):e;if(o!==t.h[i]){if(u(e)||!t.o[i])return!1;t.h[i]=o,t.o[i].textContent=f(e)}}return!0}(t,i,n)&&(function(t,i,n){let o=p.get(i);if(!o){const t=i.map(l);o={u:t,l:n.length>0?S(t,n.length):null},p.set(i,o)}if(o.l)t.o=function(t,s,i){const n=s.content.cloneNode(!0),o=y(n),r=Array(i.length),h=[];let c;for(;c=o.nextNode();)c.data===g&&h.push(c);for(let t=0;t<h.length;t++){const s=i[t];if(u(s)){const i=b();i.innerHTML=e(s),h[t].parentNode.replaceChild(i.content,h[t])}else{const i=document.createTextNode(f(s));h[t].parentNode.replaceChild(i,h[t]),r[t]=i}}return t.replaceChildren(n),r}(t,o.l,n);else{const s=n.map(e),i=o.u.reduce((t,i,n)=>t+i+(s[n]??""),"").replace(/>\\s+</g,"><").trim(),r=b();r.innerHTML=i,_(t,r.content.childNodes),t.o=null}t.i=i,t.h=n.map(t=>s(t)?f(t):t)}(t,i,n),!0)}function S(t,s){const i=\`\\x3c!--\${g}--\\x3e\`,n=t.reduce((t,n,e)=>t+n+(e<s?i:""),"").trim(),e=b();e.innerHTML=n;const o=y(e.content);let r=0;for(;o.nextNode();)o.currentNode.data===g&&r++;return r===s?e:null}function _(t,s){const i=Array.from(t.childNodes),n=Array.from(s),e=Math.max(i.length,n.length);for(let s=0;s<e;s++){const e=i[s],o=n[s];e?o?e.nodeType!==o.nodeType||1===e.nodeType&&e.tagName!==o.tagName?t.replaceChild(o,e):3===e.nodeType?e.textContent!==o.textContent&&(e.textContent=o.textContent):1===e.nodeType&&(w(e,o),_(e,o.childNodes)):t.removeChild(e):t.appendChild(o)}}function w(t,s){for(let i=t.attributes.length-1;i>=0;i--){const{name:n}=t.attributes[i];s.hasAttribute(n)||t.removeAttribute(n)}for(let i=0;i<s.attributes.length;i++){const{name:n,value:e}=s.attributes[i];t.getAttribute(n)!==e&&t.setAttribute(n,e)}}const v=new WeakSet,x=(t,s)=>Object.prototype.hasOwnProperty.call(t,s);function C(s){return class extends s{element=null;attributeChangedCallback(t,s,n){super.attributeChangedCallback?.(t,s,n),"text"!==t?(this.p=!0,function(t,s,n,e){if(n!==e){const n=typeof t[s];"undefined"===n&&i(\`Prop "\${s}" has no default.\`);const o=a(n,e,"toProp");t[s]=o}}(this,t,s,n),this.p=!1,this.m&&s!==n&&!this.S&&this._()):this.text=n??""}static get observedAttributes(){if(this.v)return this.v;const t=(this.props||[]).map(t=>"string"==typeof t?t:t.name);return this.v=[...t,"text"],this.v}connectedCallback(){super.connectedCallback?.(),this.C(),this.A(),this.m||void 0!==this.k||(this.text=this.textContent.trim()),this.P(),this.willUpdate(),this.M(),this.N(),this.O(),this.m||(this.m=!0,this.setAttribute("hydrated",""),this.firstUpdated()),this.updated()}C(){const t=this.constructor;if(v.has(t))return;const s=new Set,n=[];if(t.props){for(const i of t.props)"string"==typeof i?n.push(i):(n.push(i.name),!1===i.reflect&&s.add(i.name));n.includes("text")&&i('"text" is reserved.'),function(t,s,i){for(const n of s){const s=!i||!i.has(n);Object.defineProperty(t,n,{configurable:!0,enumerable:!0,get(){return this.j?.get(n)},set(t){if(this.j||(this.j=new Map),t!==this.j.get(n)&&(this.j.set(n,t),this.isConnected))if(s){if(!this.p){const s=a(typeof t,t,"toAttribute");d(this,n,s)}}else this.m&&!this.S&&this._()}})}}(t.prototype,n,s)}if(t.U=n,t.$=s,t.q=t.events||null,t.q)for(const s of t.q)x(t.prototype,s)||(t.prototype[s]=function(...t){return this.element[s](...t)});var e;t.J=(e=t.element)?t=>t.querySelector(e):t=>t.firstElementChild,v.add(t)}A(){this.p=!0;for(const t of this.constructor.U)if(x(this,t)){const s=this[t];delete this[t],this[t]=s}this.p=!1}get R(){return this.W??this.shadowRoot??this}P(){const t=this.constructor;if(!t.shadow)return;if(!this.W&&!this.shadowRoot){const s={mode:t.shadow};t.registry&&(s.customElementRegistry=t.registry),this.W=this.attachShadow(s)}const s=this.W??this.shadowRoot;if(t.styles){if(!t.D){const s=[t.styles].flat();t.D=s.map(t=>{if("string"==typeof t){const s=new CSSStyleSheet;return s.replaceSync(t),s}return t})}s.adoptedStyleSheets=t.D}}M(){const t=this.constructor,s=this.R,n=this.render();if(n&&n.strings&&m(s,n.strings,n.values)){const i=this.element;if(this.element=t.J(s),this.F&&i&&this.element!==i){const s=t.q;for(const t of s)i.removeEventListener(t,this),this.element.addEventListener(t,this)}}this.element||(this.element=t.J(s),this.element||(t.element&&i("Element not found."),this.element=s.firstElementChild))}N(){if(this.j){const t=this.constructor.$;for(const[s,i]of this.j){if(t.has(s))continue;const n=a(typeof i,i,"toAttribute");(null!==n||this.hasAttribute(s))&&d(this,s,n)}}}O(){const t=this.constructor.q;if(!this.F&&t?.length)if(this.element){this.F=!0;for(const s of t)this.element.addEventListener(s,this)}else i("Cannot add events.")}render(){}willUpdate(){}firstUpdated(){}updated(){}adoptedCallback(){super.adoptedCallback?.()}disconnectedCallback(){if(super.disconnectedCallback?.(),this.F){this.F=!1;for(const t of this.constructor.q)this.element?.removeEventListener(t,this)}}handleEvent(t){this.constructor.q?.includes(t.type)&&(t.bubbles&&(t.composed||this.R===this)||this.dispatchEvent(new Event(t.type,{bubbles:t.bubbles})))}get text(){return this.k??""}set text(t){const s=this.k;this.k=t,this.m&&s!==t&&!this.S&&this._()}static define(t){const s=this.tagName;s?function(t,s,i){const n=i??globalThis.customElements;n?.get(t)||n?.define(t,s)}(s,this,t):i("define() without a tagName.")}_(){this.S||this.I||(this.I=!0,this.L=new Promise(t=>{this.T=t}),queueMicrotask(()=>{try{this.B()}catch(s){console.error(t,s)}}))}B(){this.I=!1;const t=this.T;this.T=null;try{try{this.willUpdate(),this.S=!0,this.M()}finally{this.S=!1}this.updated()}finally{this.L=null,t()}}get updateComplete(){return this.L||Promise.resolve()}requestUpdate(){this.m&&!this.S&&this._()}}}export{C as Elena,r as html,c as nothing,h as unsafeHTML};
`,O=je.replace(/\/\/# sourceMappingURL=.*$/m,"").trim(),Ne=typeof Blob<"u"?URL.createObjectURL(new Blob([O],{type:"text/javascript"})):`data:text/javascript;charset=utf-8,${encodeURIComponent(O)}`,Be=JSON.stringify({imports:{"@elenajs/core":Ne}});function He(e,t,s){return`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="importmap">${Be}<\/script>
<style>
body {
  font-family: system-ui, -apple-system, sans-serif;
  margin: 1rem;
  color: #1a1a1a;
}
${t}
</style>
</head>
<body>
${s}
<script>
window.addEventListener("error", function (e) {
  document.body.innerHTML =
    '<pre style="color:#e53e3e;padding:1rem;font-size:13px;white-space:pre-wrap;font-family:ui-monospace,monospace">' +
    e.message + "\\n" + (e.filename ? "at " + e.filename + ":" + e.lineno : "") +
    "</pre>";
});
window.addEventListener("unhandledrejection", function (e) {
  document.body.innerHTML =
    '<pre style="color:#e53e3e;padding:1rem;font-size:13px;white-space:pre-wrap;font-family:ui-monospace,monospace">' +
    (e.reason?.message || String(e.reason)) +
    "</pre>";
});
<\/script>
<script type="module">
${e}
<\/script>
</body>
</html>`}function P(e,t){for(const s of e){const o=s.items.find(n=>n.id===t);if(o)return o}return null}function H(){return typeof window>"u"?null:window.location.hash.slice(1)||null}function R(e){typeof window>"u"||history.replaceState(null,"","#"+e)}function Re(e,t){let s;return function(...o){clearTimeout(s),s=setTimeout(()=>e.apply(this,o),t)}}function q(e){const t="https://unpkg.com/@elenajs/core/bundle";return e.replace(/from\s+["']@elenajs\/core["']/g,`from "${t}"`).replace(/import\s*\(\s*["']@elenajs\/core["']\s*\)/g,`import("${t}")`)}function qe(e,t,s,o){const n=q(t),r=s?`<style>
${s}
</style>
`:"",c=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e||"Elena Component"}</title>
${r}</head>
<body>
${o}
<script type="module">
${n}
<\/script>
</body>
</html>`,u=(e||"component").toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,""),f=new Blob([c],{type:"text/html"}),g=URL.createObjectURL(f),y=document.createElement("a");y.href=g,y.download=`elena-${u}.html`,y.click(),URL.revokeObjectURL(g)}function De(e,{js:t,css:s,html:o}){try{localStorage.setItem(`elena-pg:${e}`,JSON.stringify({js:t,css:s,html:o}))}catch{}}function Ue(e){try{const t=localStorage.getItem(`elena-pg:${e}`);if(!t)return null;const s=JSON.parse(t);return s&&typeof s.js=="string"&&typeof s.html=="string"?{js:s.js,css:s.css||"",html:s.html}:null}catch{return null}}function Fe(e){try{localStorage.removeItem(`elena-pg:${e}`)}catch{}}function We(e,t,s,o){const n=q(t);return JSON.stringify({title:`Elena | ${e||"Component"}`,html:o||"",css:s||"",js:n||"",js_module:!0,editors:"111"})}const Ae={class:"pg-layout"},Ie={key:1,class:"pg-load-error"},Oe={__name:"PlaygroundWrapper",setup(e){const t=G(null),s=h(!1),o=h(!1),n=h(!1),r=h(""),c=h(null),u=h(null),f=h(!1),g=Q(()=>u.value==null?{}:{gridTemplateColumns:`${u.value}px 0px 1fr`});function y(a){a.preventDefault(),f.value=!0,document.addEventListener("pointermove",w),document.addEventListener("pointerup",k)}function w(a){if(!c.value)return;const i=c.value.getBoundingClientRect(),m=320,v=i.width-320;u.value=Math.min(v,Math.max(m,a.clientX-i.left))}function k(){f.value=!1,document.removeEventListener("pointermove",w),document.removeEventListener("pointerup",k)}function E(a){const i=P(b,a);i&&(r.value=i.id,R(i.id),n.value=!1)}function S(){const a=H();a&&a!==r.value&&E(a)}function M(){u.value=null}async function L(){s.value=!1;try{const a=await A(()=>import("./Playground.CffthhGu.js"),__vite__mapDeps([0,1]));t.value=a.default}catch{try{const a=await A(()=>import("./Playground.CffthhGu.js"),__vite__mapDeps([0,1]));t.value=a.default}catch{s.value=!0}}}return W(async()=>{var v,T,z;window.addEventListener("resize",M);const a=H(),i=((T=(v=b[0])==null?void 0:v.items[0])==null?void 0:T.id)||"primitive-component",m=P(b,a||i)||((z=b[0])==null?void 0:z.items[0]);r.value=(m==null?void 0:m.id)||"",a||R(r.value),window.addEventListener("hashchange",S),await L()}),V(()=>{window.removeEventListener("resize",M),window.removeEventListener("hashchange",S),document.removeEventListener("pointermove",w),document.removeEventListener("pointerup",k)}),(a,i)=>(d(),p("div",Ae,[N(ce,{examples:J(b),"current-id":r.value,open:n.value,onSelect:E,onToggle:i[0]||(i[0]=m=>n.value=!n.value)},null,8,["examples","current-id","open"]),l("div",{ref_key:"mainRef",ref:c,class:x(["pg-main",{"pg-resizing":f.value}]),style:K(g.value)},[(d(),B(Z(t.value||I),{"current-id":r.value,onPreviewReady:i[1]||(i[1]=m=>o.value=!0),onToggleSidebar:i[2]||(i[2]=m=>n.value=!n.value)},null,40,["current-id"])),o.value?(d(),p("div",{key:0,class:"pg-resize-handle",onPointerdown:y},null,32)):_("",!0),N(X,{name:"pg-unload"},{default:Y(()=>[t.value&&!o.value?(d(),B(I,{key:0,class:"pg-loading-overlay"})):_("",!0)]),_:1}),s.value?(d(),p("div",Ie,[i[3]||(i[3]=l("p",null,"Failed to load the playground.",-1)),l("button",{onClick:L},"Try again")])):_("",!0)],6)]))}},Ve=Object.freeze(Object.defineProperty({__proto__:null,default:Oe},Symbol.toStringTag,{value:"Module"}));export{Ve as P,qe as a,We as b,Fe as c,Re as d,b as e,P as f,He as g,Ue as l,De as s};

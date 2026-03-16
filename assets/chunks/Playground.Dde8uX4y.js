const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/index.D4PcRLKH.js","assets/chunks/index.DONkB8rS.js","assets/chunks/index.tqIctuLa.js","assets/chunks/index.B12rbTct.js","assets/chunks/index.KpVkJyBP.js","assets/chunks/index.BzjTinSC.js","assets/chunks/index.BHg0SI1Q.js","assets/chunks/index.iNtltN6x.js","assets/chunks/index.DRciRTh7.js"])))=>i.map(i=>d[i]);
import{o as f,c as h,j as a,n as w,F as M,B as T,t as _,a0 as R,u as F,q as C,v as $,x as B,G as q,h as W,p as v,V as x,E as S,k as J,ah as Y}from"./framework.C4CIcs3_.js";const V={id:"hello-world",title:"Hello World",js:`import { Elena, html } from "@elenajs/core";

export default class MyGreeting extends Elena(HTMLElement) {
  static tagName = "my-greeting";
  static props = ["name"];

  /** @attribute @type {String} */
  name = "World";

  render() {
    return html\`<p>Hello, \${this.name}!</p>\`;
  }
}

MyGreeting.define();`,html:'<my-greeting name="Elena"></my-greeting>'},G={id:"composite-component",title:"Composite Component",js:`import { Elena } from "@elenajs/core";

export default class MyStack extends Elena(HTMLElement) {
  static tagName = "my-stack";
  static props = ["direction"];

  /** @attribute @type {"column" | "row"} */
  direction = "column";
}

MyStack.define();`,css:`@scope (my-stack) {
  :scope {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    gap: 0.5rem;
  }

  :scope[direction="row"] {
    flex-direction: row;
  }
}`,html:`<my-stack direction="column">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</my-stack>

<br/>

<my-stack direction="row">
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</my-stack>`},K={id:"primitive-component",title:"Primitive Component",js:`import { Elena, html } from "@elenajs/core";

export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static props = ["variant"];
  static events = ["click"];

  /** @attribute @type {"default" | "primary" | "danger"} */
  variant = "default";

  render() {
    return html\`
      <button class="my-button">
        \${this.text}
      </button>
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
    --my-button-bg: #eaecf0;
    --my-button-text: #172b4d;
    display: inline-block;
    border-radius: 6px;
    cursor: pointer;
  }

  :scope:not([hydrated]),
  .my-button:is(button) {
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background: var(--my-button-bg);
    color: var(--my-button-text);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

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

  :scope[variant="primary"] {
    --my-button-bg: #5a44d4;
    --my-button-text: #fff;
  }

  :scope[variant="danger"] {
    --my-button-bg: #d44444;
    --my-button-text: #fff;
  }
}`,html:`<my-button>Default</my-button>
<my-button variant="primary">Primary</my-button>
<my-button variant="danger">Danger</my-button>`},X={id:"declarative-component",title:"Declarative Component",js:`import { Elena } from "@elenajs/core";

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
</my-button>`},Q={id:"string-props",title:"String Props",js:`import { Elena, html } from "@elenajs/core";

export default class MyBadge extends Elena(HTMLElement) {
  static tagName = "my-badge";
  static props = ["variant"];

  /** @attribute @type {"info" | "success" | "warning" | "error"} */
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
<my-badge variant="error">Error</my-badge>`},Z={id:"boolean-props",title:"Boolean Props",js:`import { Elena, html } from "@elenajs/core";

export default class MyCheckbox extends Elena(HTMLElement) {
  static tagName = "my-checkbox";
  static props = ["checked", "disabled", "label"];
  static events = ["change"];

  /** @attribute @type {Boolean} */
  checked = false;

  /** @attribute @type {Boolean} */
  disabled = false;

  /** @attribute @type {String} */
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
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9375rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
  }

  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 1.125rem;
    height: 1.125rem;
    border: 2px solid #a6a8ab;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    display: grid;
    place-content: center;
    flex-shrink: 0;
    transition: background 0.15s, border-color 0.15s;
  }

  input[type="checkbox"]::before {
    content: "";
    width: 0.75rem;
    height: 0.75rem;
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
<my-checkbox disabled label="Disabled"></my-checkbox>`},ee={id:"number-props",title:"Number Props",js:`import { Elena, html } from "@elenajs/core";

export default class MyCounter extends Elena(HTMLElement) {
  static tagName = "my-counter";
  static props = ["count", "step", "max"];

  /** @attribute @type {Number} */
  count = 0;

  /** @attribute @type {Number} */
  step = 1;

  /** @attribute @type {Number} */
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
    box-shadow: inset 0 0 0 2px #e2e8f0;
    border-radius: 6px;
  }

  .my-counter button {
    padding: 0.6rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    cursor: pointer;
    background: #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .my-counter button:first-of-type {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  .my-counter button:last-of-type {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .my-counter button:hover {
    filter: brightness(0.95);
  }

  .my-counter button:active {
    opacity: 0.7;
  }

  .my-counter button:focus {
    outline: 2px solid #5a44d4;
    outline-offset: 1px;
  }

  .my-counter .value {
    padding: 0.5rem 0.75rem;
    min-width: 1.5rem;
    text-align: center;
    display: inline-flex;
    justify-content: center;
  }
}`,html:`<my-counter></my-counter>
<my-counter count="10" step="5" max="95"></my-counter>`},te={id:"array-object-props",title:"Array/Object Props",js:`import { Elena, html } from "@elenajs/core";

export default class MyList extends Elena(HTMLElement) {
  static tagName = "my-list";
  static props = ["items", "heading"];

  /** @attribute @type {Array} */
  items = [];

  /** @attribute @type {String} */
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
></my-list>`},se={id:"conditional-rendering",title:"Conditional Rendering",js:`import { Elena, html, nothing } from "@elenajs/core";

export default class MyAlert extends Elena(HTMLElement) {
  static tagName = "my-alert";
  static props = ["variant", "dismissible"];

  /** @attribute @type {"info" | "warning" | "error"} */
  variant = "info";

  /** @attribute @type {Boolean} */
  dismissible = false;

  render() {
    const close = this.dismissible
      ? html\`<button onclick="this.closest('my-alert').remove()">x</button>\`
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
    margin-bottom: 0.5rem;
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
    min-height: 1.5rem;
    border-left: 3px solid var(--my-alert-border);
    background: var(--my-alert-bg);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  :scope:not([hydrated]) {
    padding-left: 2.5rem;
  }

  .icon {
    font-size: 1rem;
    width: 1rem;
  }

  .message { flex: 1; }

  button {
    cursor: pointer;
    font-size: 1rem;
    opacity: 0.6;
  }

  button:hover { opacity: 1; }

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
<my-alert variant="warning" dismissible>This warning can be dismissed.</my-alert>`},ne={id:"list-rendering",title:"List Rendering",js:`import { Elena, html } from "@elenajs/core";

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
    max-width: 300px;
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
    border-bottom: 1px solid #edf2f7;
  }

  li.done {
    text-decoration: line-through;
    color: #a0aec0;
  }
}`,html:"<my-list></my-list>"},re={id:"unsafe-html",title:"unsafeHTML",js:`import { Elena, html, unsafeHTML } from "@elenajs/core";

export default class MyIcon extends Elena(HTMLElement) {
  static tagName = "my-icon";
  static props = ["name"];

  /** @attribute @type {String} */
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
    width: 3rem;
  }

  svg {
    width: 100%;
    height: 100%;
  }
}`,html:`<my-icon name="heart" style="color: #e53e3e"></my-icon>
<my-icon name="star" style="color: #ecc94b"></my-icon>
<my-icon name="check" style="color: #48bb78"></my-icon>`},ie={id:"element-ref",title:"Element Ref",js:`import { Elena, html } from "@elenajs/core";

export default class MyInput extends Elena(HTMLElement) {
  static tagName = "my-input";
  static props = ["label"];
  static element = "input";

  /** @attribute @type {String} */
  label = "";

  firstUpdated() {
    this.element.addEventListener("input", () => {
      this.querySelector(".hint").textContent =
        "Characters: " + this.element.value.length;
    });
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
    margin-bottom: 0.75rem;
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
}`,html:'<my-input label="Character counter"></my-input>'},oe={id:"delegated-events",title:"Delegated Events",js:`import { Elena, html } from "@elenajs/core";

export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static props = ["variant"];
  static events = ["click", "focus", "blur"];

  /** @attribute @type {"default" | "primary"} */
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
  margin-top: 1rem;
  min-height: 3rem;
  white-space: pre;
}`,html:`<my-button>Say Hello</my-button>
<my-button variant="primary">Say World</my-button>

<pre id="log"></pre>`},ae={id:"custom-events",title:"Custom Events",js:`import { Elena, html } from "@elenajs/core";

export default class MyRating extends Elena(HTMLElement) {
  static tagName = "my-rating";
  static props = [{ name: "value", reflect: false }];

  /** @type {Number} */
  value = 0;

  rate(stars) {
    this.value = stars;
    this.dispatchEvent(new CustomEvent("rate", {
      bubbles: true,
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
  .star:hover {
    color: #ffb300;
  }
}`,html:`<my-rating></my-rating>

<p id="output">Click a star to rate.</p>`},le={id:"manual-listeners",title:"Manual Listeners",js:`import { Elena, html } from "@elenajs/core";

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
    min-height: 2rem;
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
    margin-top: 0.75rem;
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
}`,html:"<my-key-logger></my-key-logger>"},ce={id:"will-update",title:"willUpdate",js:`import { Elena, html } from "@elenajs/core";

export default class MyFilter extends Elena(HTMLElement) {
  static tagName = "my-filter";
  static props = [
    { name: "items", reflect: false },
    { name: "search", reflect: false }
  ];
  static element = "input";

  /** @type {Array} */
  items = ["Apple", "Banana", "Cherry", "Date", "Fig", "Grape", "Tomato"];

  /** @attribute @type {String} */
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
    max-width: 250px;
  }

  ul {
    display: block;
    padding: 0.5rem 0;
    margin: 0;
    list-style: none;
    background: #f7fafc;
    border: 1px solid #e9ecee;
    border-top: 0;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  li {
    display: block;
    padding: 0.5rem 1rem;
  }

  li.empty {
    color: #718096;
  }

  small {
    margin-top: 1rem;
    display: block;
  }
}

/* See https://elenajs.com/advanced/gotchas#browser-compatibility */
my-filter input {
  all: unset;
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #a5a9af;
  border-radius: 4px;
  box-sizing: border-box;
  display: block;
}

my-filter input:focus {
  outline: 2px solid #5a44d4;
  outline-offset: -1px;
}`,html:"<my-filter></my-filter>"},de={id:"first-updated",title:"firstUpdated",js:`import { Elena, html } from "@elenajs/core";

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
}`,html:"<my-card></my-card>"},me={id:"request-update",title:"requestUpdate",js:`import { Elena, html } from "@elenajs/core";

export default class MyTags extends Elena(HTMLElement) {
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
                    x
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
    margin-top: 0.5rem;
    min-height: 1.75rem;
  }

  .tag {
    padding: 0.35rem 0.75rem;
    background: #ede9ff;
    color: #5a44d4;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
  }

  .remove {
    cursor: pointer;
    margin-left: 0.5rem;
    opacity: 0.6;
  }

  .remove:hover {
    opacity: 1;
  }

  .remove:active {
    transform: translateY(1px);
  }
}

/* See https://elenajs.com/advanced/gotchas#browser-compatibility */
my-tags input {
  all: unset;
  width: 100%;
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
}`,html:"<my-tags></my-tags>"},ue={id:"css-custom-properties",title:"CSS Custom Properties",js:`import { Elena, html } from "@elenajs/core";

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
<my-button class="brand-theme">Brand Theme</my-button>`},pe={id:"mixins",title:"Mixins",js:`import { Elena, html } from "@elenajs/core";

const Draggable = superclass =>
  class extends superclass {
    #offsetX = 0;
    #offsetY = 0;

    connectedCallback() {
      super.connectedCallback();
      this.style.position = "absolute";
      this.style.cursor = "grab";

      this.addEventListener("mousedown", e => {
        this.#offsetX = e.offsetX;
        this.#offsetY = e.offsetY;
        this.style.cursor = "grabbing";

        const onMove = e => {
          this.style.left = e.clientX - this.#offsetX + "px";
          this.style.top = e.clientY - this.#offsetY + "px";
        };
        const onUp = () => {
          this.style.cursor = "grab";
          document.removeEventListener("mousemove", onMove);
          document.removeEventListener("mouseup", onUp);
        };

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
      });
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
</div>`},fe={id:"shadow-dom",title:"Shadow DOM",js:`import { Elena, html } from "@elenajs/core";

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

  /** @attribute @type {"default" | "success" | "error"} */
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
</p>`},L=[{category:"Basics",items:[V,G,K,X]},{category:"Props",items:[Q,Z,ee,te]},{category:"Templates",items:[se,ne,re,ie]},{category:"Events",items:[oe,ae,le]},{category:"Lifecycle",items:[ce,de,me]},{category:"Styling",items:[ue]},{category:"Advanced",items:[pe,fe]}],he=`function t(t,s,e){if(s="boolean"===t&&"boolean"!=typeof s?null!==s:s,!e)return s;if("toAttribute"===e)switch(t){case"object":case"array":return null===s?null:JSON.stringify(s);case"boolean":return s?"":null;case"number":return null===s?null:s;default:return""===s?null:s}else switch(t){case"object":case"array":if(!s)return s;try{return JSON.parse(s)}catch{return console.warn("░█ [ELENA]: Invalid JSON: "+s),null}case"boolean":return s;case"number":return null!==s?+s:s;default:return s??""}}function s(t,s,e){t?null===e?t.removeAttribute(s):t.setAttribute(s,e):console.warn("░█ [ELENA]: Cannot sync attrs.")}function e(t){return Array.isArray(t)?t.map(t=>i(t)).join(""):i(t)}function i(t){return t?.t?String(t):function(t){const s={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return String(t).replace(/[&<>"']/g,t=>s[t])}(String(t??""))}function n(t,...s){let i;return{t:!0,strings:t,values:s,toString:()=>(void 0===i&&(i=t.reduce((t,i,n)=>t+i+e(s[n]),"")),i)}}function r(t){return{t:!0,toString:()=>t??""}}const o=Object.freeze({t:!0,toString:()=>""}),h=t=>Array.isArray(t)?t.some(t=>t?.t):t?.t,c=t=>Array.isArray(t)?t.map(t=>String(t??"")).join(""):String(t??"");function u(t){return t.replace(/>\\n\\s*/g,">").replace(/\\n\\s*</g,"<").replace(/\\n\\s*/g," ")}const l=new WeakMap,a="e"+Math.random().toString(36).slice(2,6);function f(t,s,i){return!function(t,s,e){if(t.i!==s||!t.o)return!1;for(let s=0;s<e.length;s++){const i=e[s],n=Array.isArray(i)?c(i):i;if(n!==t.h[s]){if(h(i)||!t.o[s])return!1;t.h[s]=n,t.o[s].textContent=c(i)}}return!0}(t,s,i)&&(function(t,s,i){let n=l.get(s);if(!n){const t=Array.from(s,u);n={processedStrings:t,template:i.length>0?d(t,i.length):null},l.set(s,n)}if(n.template)t.o=function(t,s,i){const n=s.content.cloneNode(!0),r=document.createTreeWalker(n,NodeFilter.SHOW_COMMENT),o=new Array(i.length),u=[];let l;for(;l=r.nextNode();)l.data===a&&u.push(l);for(let t=0;t<u.length;t++){const s=i[t];if(h(s)){const i=document.createElement("template");i.innerHTML=e(s),u[t].parentNode.replaceChild(i.content,u[t])}else{const e=document.createTextNode(c(s));u[t].parentNode.replaceChild(e,u[t]),o[t]=e}}return t.replaceChildren(n),o}(t,n.template,i);else{const s=i.map(t=>e(t)),r=n.processedStrings.reduce((t,e,i)=>t+e+(s[i]??""),"").replace(/>\\s+</g,"><").trim();t.innerHTML=r,t.o=new Array(i.length)}t.i=s,t.h=i.map(t=>Array.isArray(t)?c(t):t)}(t,s,i),!0)}function d(t,s){const e=\`\\x3c!--\${a}--\\x3e\`,i=t.reduce((t,i,n)=>t+i.replace(/>\\s+</g,"><")+(n<s?e:""),"").trim(),n=document.createElement("template");n.innerHTML=i;const r=document.createTreeWalker(n.content,NodeFilter.SHOW_COMMENT);let o=0;for(;r.nextNode();)r.currentNode.data===a&&o++;return o===s?n:null}class p extends Event{constructor(t,s){super(t,{bubbles:!0,composed:!0,...s})}}const y=new WeakSet;function g(e){return class extends e{element=null;attributeChangedCallback(s,e,i){super.attributeChangedCallback?.(s,e,i),"text"!==s?(this.u=!0,function(s,e,i,n){if(i!==n){const i=typeof s[e];"undefined"===i&&console.warn(\`░█ [ELENA]: Prop "\${e}" has no default.\`);const r=t(i,n,"toProp");s[e]=r}}(this,s,e,i),this.u=!1,this.l&&e!==i&&!this.p&&this.m()):this.text=i??""}static get observedAttributes(){if(this.A)return this.A;const t=this.S||(this.props||[]).map(t=>"string"==typeof t?t:t.name);return this.A=[...t,"text"],this.A}connectedCallback(){super.connectedCallback?.(),this._(),this.v(),this.N(),this.C(),this.willUpdate(),this.L(),this.k(),this.O(),this.P(),this.l||(this.l=!0,this.setAttribute("hydrated",""),this.firstUpdated()),this.updated()}_(){const e=this.constructor;if(y.has(e))return;const i=new Set,n=[];if(e.props){for(const t of e.props)"string"==typeof t?n.push(t):(n.push(t.name),!1===t.reflect&&i.add(t.name));n.includes("text")&&console.warn('░█ [ELENA]: "text" is reserved.'),function(e,i,n){for(const r of i){const i=!n||!n.has(r);Object.defineProperty(e,r,{configurable:!0,enumerable:!0,get(){return this.j?this.j.get(r):void 0},set(e){if(this.j||(this.j=new Map),e!==this.j.get(r)&&(this.j.set(r,e),this.isConnected))if(i){if(!this.u){const i=t(typeof e,e,"toAttribute");s(this,r,i)}}else this.l&&!this.p&&this.m()}})}}(e.prototype,n,i)}var r;e.S=n,e.M=i,e.U=e.events||null,e.q=(r=e.element)?t=>t.querySelector(r):t=>t.firstElementChild,y.add(e)}v(){this.u=!0;for(const t of this.constructor.S)if(Object.prototype.hasOwnProperty.call(this,t)){const s=this[t];delete this[t],this[t]=s}this.u=!1}N(){this.l||void 0!==this.F||(this.text=this.textContent.trim())}get J(){return this.R??this.shadowRoot??this}C(){const t=this.constructor;if(!t.shadow)return;(this.R??this.shadowRoot)||(this.R=this.attachShadow({mode:t.shadow}));const s=this.R??this.shadowRoot;if(t.styles){if(!t.I){const s=Array.isArray(t.styles)?t.styles:[t.styles];t.I=s.map(t=>{if("string"==typeof t){const s=new CSSStyleSheet;return s.replaceSync(t),s}return t})}s.adoptedStyleSheets=t.I}}L(){const t=this.render();if(t&&t.strings){const s=this.J,e=f(s,t.strings,t.values);this.l&&e&&(this.element=this.constructor.q(s))}}k(){if(!this.element){const t=this.J;this.element=this.constructor.q(t),this.element||(this.constructor.element&&console.warn("░█ [ELENA]: Element not found."),this.element=t.firstElementChild)}}O(){if(this.j){const e=this.constructor.M;for(const[i,n]of this.j){if(e.has(i))continue;const r=t(typeof n,n,"toAttribute");(null!==r||this.hasAttribute(i))&&s(this,i,r)}}}P(){const t=this.constructor.U;if(!this.W&&t?.length)if(this.element){this.W=!0;for(const s of t)this.element.addEventListener(s,this),this[s]=(...t)=>this.element[s](...t)}else console.warn("░█ [ELENA]: Cannot add events.")}render(){}willUpdate(){}firstUpdated(){}updated(){}adoptedCallback(){super.adoptedCallback?.()}disconnectedCallback(){if(super.disconnectedCallback?.(),this.W){this.W=!1;for(const t of this.constructor.U)this.element?.removeEventListener(t,this)}}handleEvent(t){this.constructor.U?.includes(t.type)&&(t.stopPropagation(),this.dispatchEvent(new p(t.type,{cancelable:!0})))}get text(){return this.F??""}set text(t){const s=this.F;this.F=t,this.l&&s!==t&&!this.p&&this.m()}static define(){var t,s;this.tagName?(t=this.tagName,s=this,"undefined"!=typeof window&&"customElements"in window&&(window.customElements.get(t)||window.customElements.define(t,s))):console.warn("░█ [ELENA]: define() without a tagName.")}m(){this.p||this.$||(this.$=!0,this.D=new Promise(t=>{this.T=t}),queueMicrotask(()=>{try{this.B()}catch(t){console.error("░█ [ELENA]:",t)}}))}B(){this.$=!1;const t=this.T;this.T=null;try{try{this.willUpdate(),this.p=!0,this.L()}finally{this.p=!1}this.updated()}finally{this.D=null,t()}}get updateComplete(){return this.D?this.D:Promise.resolve()}requestUpdate(){this.l&&!this.p&&this.m()}}}export{g as Elena,p as ElenaEvent,n as html,o as nothing,r as unsafeHTML};
//# sourceMappingURL=bundle.js.map
`,ye=he.replace(/\/\/# sourceMappingURL=.*$/m,"").trim(),ge=`data:text/javascript;charset=utf-8,${encodeURIComponent(ye)}`,be=JSON.stringify({imports:{"@elenajs/core":ge}});function ve(l,r,e){return`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="importmap">${be}<\/script>
<style>
body {
  font-family: system-ui, -apple-system, sans-serif;
  margin: 1rem;
  color: #1a1a1a;
}
${r}
</style>
</head>
<body>
${e}
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
${l}
<\/script>
</body>
</html>`}function xe(l,r){for(const e of l){const t=e.items.find(c=>c.id===r);if(t)return t}return null}function H(){return typeof window>"u"?null:window.location.hash.slice(1)||null}function we(l){typeof window>"u"||history.replaceState(null,"","#"+l)}function ke(l,r){let e;return function(...t){clearTimeout(e),e=setTimeout(()=>l.apply(this,t),r)}}const Ee={class:"pg-sidebar-nav"},Me={class:"pg-sidebar-heading"},Ce={class:"pg-sidebar-items"},je={class:"item"},Se=["href","onClick"],Le={class:"text"},Te={__name:"PlaygroundSidebar",props:{examples:{type:Array,required:!0},currentId:{type:String,default:""},open:{type:Boolean,default:!1}},emits:["select","toggle"],setup(l,{emit:r}){const e=r;return(t,c)=>(f(),h(M,null,[a("div",{class:w(["pg-sidebar-backdrop",{open:l.open}]),onClick:c[0]||(c[0]=d=>e("toggle"))},null,2),a("aside",{class:w(["pg-sidebar",{open:l.open}])},[a("nav",Ee,[(f(!0),h(M,null,T(l.examples,d=>(f(),h("div",{key:d.category,class:"pg-sidebar-group"},[a("p",Me,_(d.category),1),a("div",Ce,[(f(!0),h(M,null,T(d.items,s=>(f(),h("div",{key:s.id,class:w(["pg-sidebar-item",{"is-active":l.currentId===s.id}])},[a("div",je,[c[1]||(c[1]=a("div",{class:"indicator"},null,-1)),a("a",{class:"link",href:"#"+s.id,onClick:R(y=>e("select",s.id),["prevent"])},[a("p",Le,_(s.title),1)],8,Se)])],2))),128))])]))),128))])],2)],64))}},_e={class:"pg-editor"},$e={class:"pg-editor-tabs"},Ae=["onClick"],Ne={__name:"PlaygroundEditor",props:{js:{type:String,default:""},css:{type:String,default:""},html:{type:String,default:""},activeTab:{type:String,default:"js"}},emits:["update:js","update:css","update:html","update:activeTab","toggle-sidebar"],setup(l,{emit:r}){const e=l,t=r,{isDark:c}=F(),d=v(null),s=q(null),y=W(()=>e.css?["js","css","html"]:["js","html"]);let n=null,b=null,u=null;function i(o){return o==="js"?e.js:o==="css"?e.css:e.html}function p(o){return o==="js"?"update:js":o==="css"?"update:css":"update:html"}async function U(){if(n)return n;const[o,m,g,k,E,j]=await Promise.all([x(()=>import("./index.D4PcRLKH.js"),__vite__mapDeps([0,1,2,3])),x(()=>import("./index.tqIctuLa.js"),[]),x(()=>import("./index.KpVkJyBP.js"),__vite__mapDeps([4,5,1,2,3])),x(()=>import("./index.BHg0SI1Q.js"),__vite__mapDeps([6,5,1,2,7,4,3])),x(()=>import("./index.iNtltN6x.js"),__vite__mapDeps([7,5,1,2])),x(()=>import("./index.DRciRTh7.js"),__vite__mapDeps([8,1,2]))]);return n={cm:o,cmState:m,langJs:g,langHtml:k,langCss:E,themeDark:j},n}function A(o){return n?o==="js"?n.langJs.javascript():o==="css"?n.langCss.css():n.langHtml.html():[]}function N(){return n?c.value?n.themeDark.oneDark:[]:[]}async function O(){const o=await U(),{EditorView:m,basicSetup:g}=o.cm,{EditorState:k,Compartment:E}=o.cmState;b=new E,u=new E;const j=i(e.activeTab),I=k.create({doc:j,extensions:[g,b.of(A(e.activeTab)),u.of(N()),m.updateListener.of(D=>{D.docChanged&&t(p(e.activeTab),D.state.doc.toString())}),m.theme({"&":{height:"100%",fontSize:"13px"},".cm-scroller":{overflow:"auto",fontFamily:"ui-monospace, monospace"},".cm-content":{padding:"12px 0"},".cm-gutters":{border:"none"}})]});s.value&&s.value.destroy(),s.value=new m({state:I,parent:d.value})}function z(o){o!==e.activeTab&&t("update:activeTab",o)}function P(){if(!s.value)return;const o=i(e.activeTab),m=s.value.state.doc.toString();o!==m&&s.value.dispatch({changes:{from:0,to:s.value.state.doc.length,insert:o}})}return C(()=>e.activeTab,()=>{!s.value||!n||(P(),s.value.dispatch({effects:b.reconfigure(A(e.activeTab))}))}),C([()=>e.js,()=>e.css,()=>e.html],P),C(c,()=>{!s.value||!u||s.value.dispatch({effects:u.reconfigure(N())})}),$(O),B(()=>{s.value&&s.value.destroy()}),(o,m)=>(f(),h("div",_e,[a("div",$e,[a("button",{class:"pg-sidebar-toggle",onClick:m[0]||(m[0]=g=>t("toggle-sidebar")),"aria-label":"Toggle examples"},[...m[1]||(m[1]=[a("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none"},[a("path",{d:"M2 4h12M2 8h12M2 12h12",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"})],-1)])]),(f(!0),h(M,null,T(y.value,g=>(f(),h("button",{key:g,class:w(["pg-editor-tab",{active:l.activeTab===g}]),onClick:k=>z(g)},_(g.toUpperCase()),11,Ae))),128))]),a("div",{ref_key:"editorContainer",ref:d,class:"pg-editor-container"},null,512)]))}},Pe={class:"pg-preview"},De=["srcdoc"],He={__name:"PlaygroundPreview",props:{js:{type:String,default:""},css:{type:String,default:""},html:{type:String,default:""}},setup(l){const r=l,e=v(null),t=v(null),c=v(!1);function d(){c.value=!1,t.value=ve(r.js,r.css,r.html)}const s=ke(d,300);return $(d),C([()=>r.js,()=>r.css,()=>r.html],(y,n)=>{n&&y[0]!==n[0]&&y[1]!==n[1]&&y[2]!==n[2]?d():s()}),(y,n)=>(f(),h("div",Pe,[a("div",{class:"pg-preview-header"},[n[1]||(n[1]=a("span",{class:"pg-preview-title"},"Preview",-1)),a("button",{class:"pg-preview-reload",onClick:d,title:"Reload preview"},[...n[0]||(n[0]=[a("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none"},[a("path",{d:"M13.65 2.35A7.96 7.96 0 0 0 8 0C3.58 0 0 3.58 0 8s3.58 8 8 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 8 14 6 6 0 1 1 8 2c1.66 0 3.14.69 4.22 1.78L9 7h7V0l-2.35 2.35z",fill:"currentColor"})],-1)])])]),a("iframe",{ref_key:"iframe",ref:e,class:w(["pg-preview-iframe",{"pg-preview-ready":c.value}]),srcdoc:t.value,sandbox:"allow-scripts",title:"Component preview"},null,10,De)]))}},Be={class:"pg-layout"},Oe={__name:"Playground",setup(l){var n,b;const r=v(!1),e=v("js"),t=Y({js:"",css:"",html:""}),c=v("");function d(u){const i=xe(L,u);i&&(c.value=i.id,t.js=i.js,t.css=i.css,t.html=i.html,e.value="js",we(i.id),r.value=!1)}function s(){const u=H();u&&u!==c.value&&d(u)}const y=((b=(n=L[0])==null?void 0:n.items[0])==null?void 0:b.id)||"hello-world";return d(H()||y),$(()=>{window.addEventListener("hashchange",s)}),B(()=>{window.removeEventListener("hashchange",s)}),(u,i)=>(f(),h("div",Be,[S(Te,{examples:J(L),"current-id":c.value,open:r.value,onSelect:d,onToggle:i[0]||(i[0]=p=>r.value=!r.value)},null,8,["examples","current-id","open"]),S(Ne,{js:t.js,css:t.css,html:t.html,"active-tab":e.value,"onUpdate:js":i[1]||(i[1]=p=>t.js=p),"onUpdate:css":i[2]||(i[2]=p=>t.css=p),"onUpdate:html":i[3]||(i[3]=p=>t.html=p),"onUpdate:activeTab":i[4]||(i[4]=p=>e.value=p),onToggleSidebar:i[5]||(i[5]=p=>r.value=!r.value)},null,8,["js","css","html","active-tab"]),S(He,{js:t.js,css:t.css,html:t.html},null,8,["js","css","html"])]))}};export{Oe as default};

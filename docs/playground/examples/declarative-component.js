const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "declarative-component",
  title: "Declarative Component",
  js: `import { Elena } from "${CDN}";

export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static shadow = "open";
}

MyButton.define();`,
  css: `/* Styles are linked inside each <template> block.
   Since this playground injects CSS into the page,
   we define the shadow root styles here for reference.

   In production, these would live in a separate
   stylesheet loaded via <link> in the template. */

button {
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  background: #3182ce;
  color: white;
  cursor: pointer;
}

button:hover {
  filter: brightness(0.9);
}

button:active {
  opacity: 0.7;
}`,
  html: `<my-button>
  <template shadowrootmode="open">
    <style>
      button {
        font-family: system-ui, sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        border: none;
        background: #3182ce;
        color: white;
        cursor: pointer;
      }
      button:hover {
        filter: brightness(0.9);
      }
      button:active {
        opacity: 0.7;
      }
    </style>
    <button><slot></slot></button>
  </template>
  Click me
</my-button>

<my-button>
  <template shadowrootmode="open">
    <style>
      button {
        font-family: system-ui, sans-serif;
        font-size: 0.875rem;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        border: none;
        background: #e2e8f0;
        color: #1a202c;
        cursor: pointer;
      }
      button:hover {
        filter: brightness(0.95);
      }
      button:active {
        opacity: 0.7;
      }
    </style>
    <button><slot></slot></button>
  </template>
  Cancel
</my-button>`,
};

const CDN = "https://unpkg.com/@elenajs/core";

export default {
  id: "list-rendering",
  title: "List Rendering",
  js: `import { Elena, html } from "${CDN}";

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

MyList.define();`,
  css: `@scope (my-list) {
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
    font-size: 0.75rem;
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
    font-size: 0.875rem;
    border-bottom: 1px solid #edf2f7;
  }

  li.done {
    text-decoration: line-through;
    color: #a0aec0;
  }
}`,
  html: `<my-list></my-list>`,
};

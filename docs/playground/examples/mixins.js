export default {
  id: "mixins",
  title: "Mixins",
  js: `import { Elena, html } from "@elenajs/core";

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

MyDraggable.define();`,
  css: `@scope (my-draggable) {
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
}`,
  html: `<div style="position: relative; height: calc(100vh - 2.5rem); border: 2px dashed #e2e8f0; border-radius: 8px;">
  <my-draggable style="left: 40px; top: 40px;"></my-draggable>
</div>`,
};

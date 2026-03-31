import { describe, it, expect } from "vitest";
import { createElement } from "./setup.js";
import { Elena, html } from "../src/elena.js";

describe("inheritance patterns", () => {
  it("subclass can override render()", () => {
    class ParentEl extends Elena(HTMLElement) {
      static props = ["label"];
      label = "";
      render() {
        return html`<span>parent: ${this.label}</span>`;
      }
    }

    class ChildEl extends ParentEl {
      static tagName = "test-inherit-override";
      static props = ["label"];
      render() {
        return html`<span>child: ${this.label}</span>`;
      }
    }
    ChildEl.define();

    const el = createElement("test-inherit-override", { label: "hi" });
    expect(el.querySelector("span").textContent).toBe("child: hi");
  });

  it("subclass adds additional props beyond parent", async () => {
    class BaseEl extends Elena(HTMLElement) {
      static props = ["base"];
      base = "b";
      render() {
        return html`<span>${this.base}-${this.extra || ""}</span>`;
      }
    }

    class ExtEl extends BaseEl {
      static tagName = "test-inherit-extra-props";
      static props = ["base", "extra"];
      extra = "e";
    }
    ExtEl.define();

    const el = createElement("test-inherit-extra-props");
    expect(el.base).toBe("b");
    expect(el.extra).toBe("e");
    el.extra = "updated";
    await el.updateComplete;
    expect(el.querySelector("span").textContent).toBe("b-updated");
  });

  it("subclass calling super.render() gets undefined (no-op base)", () => {
    class SuperRenderEl extends Elena(HTMLElement) {
      static tagName = "test-inherit-super-render";
      render() {
        const parentResult = super.render();
        return html`<span>${String(parentResult)}</span>`;
      }
    }
    SuperRenderEl.define();

    const el = createElement("test-inherit-super-render");
    expect(el.querySelector("span").textContent).toBe("undefined");
  });

  it("subclass overriding willUpdate with no-op super does not error", () => {
    class WillUpdateSuperEl extends Elena(HTMLElement) {
      static tagName = "test-inherit-willupdate-super";
      willUpdate() {
        this._called = true;
      }
      render() {
        return html`<span></span>`;
      }
    }
    WillUpdateSuperEl.define();

    const el = createElement("test-inherit-willupdate-super");
    expect(el._called).toBe(true);
  });

  it("two component classes from same Elena mixin have independent static setup", () => {
    class CompA extends Elena(HTMLElement) {
      static tagName = "test-inherit-comp-a";
      static props = ["a"];
      a = "aa";
      render() {
        return html`<span>${this.a}</span>`;
      }
    }
    CompA.define();

    class CompB extends Elena(HTMLElement) {
      static tagName = "test-inherit-comp-b";
      static props = ["b"];
      b = "bb";
      render() {
        return html`<span>${this.b}</span>`;
      }
    }
    CompB.define();

    const elA = createElement("test-inherit-comp-a");
    const elB = createElement("test-inherit-comp-b");
    expect(elA.a).toBe("aa");
    expect(elB.b).toBe("bb");
    expect(elA.constructor._propNames).toEqual(["a"]);
    expect(elB.constructor._propNames).toEqual(["b"]);
  });

  it("component with no tagName can be registered via customElements.define directly", () => {
    class DirectRegEl extends Elena(HTMLElement) {
      static props = ["label"];
      label = "";
      render() {
        return html`<span>${this.label}</span>`;
      }
    }
    window.customElements.define("test-inherit-direct-reg", DirectRegEl);

    const el = document.createElement("test-inherit-direct-reg");
    el.label = "hello";
    document.body.appendChild(el);
    expect(el.querySelector("span").textContent).toBe("hello");
    el.remove();
  });

  it("component with ALL static fields set works correctly", async () => {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync("span { color: red; }");

    class FullEl extends Elena(HTMLElement) {
      static tagName = "test-inherit-full-el";
      static props = ["label"];
      static events = ["click"];
      static element = "span";
      static shadow = "open";
      static styles = sheet;
      label = "default";
      render() {
        return html`<span>${this.label}</span>`;
      }
    }
    FullEl.define();

    const el = await createElement("test-inherit-full-el", { label: "hi" });
    expect(el.shadowRoot).not.toBeNull();
    expect(el.shadowRoot.querySelector("span").textContent).toBe("hi");
    expect(el.shadowRoot.adoptedStyleSheets.length).toBe(1);
    expect(el.element.tagName).toBe("SPAN");
    expect(typeof el.click).toBe("function");
  });

  it("skipping super.connectedCallback prevents Elena lifecycle", () => {
    class SkipSuperEl extends Elena(HTMLElement) {
      static tagName = "test-inherit-skip-super";
      connectedCallback() {
        this.setAttribute("data-custom", "true");
      }
      render() {
        return html`<span>test</span>`;
      }
    }
    SkipSuperEl.define();

    const el = document.createElement("test-inherit-skip-super");
    document.body.appendChild(el);
    expect(el.getAttribute("data-custom")).toBe("true");
    expect(el.hasAttribute("hydrated")).toBe(false);
    expect(el.querySelector("span")).toBeNull();
    el.remove();
  });
});

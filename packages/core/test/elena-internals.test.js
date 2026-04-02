import { describe, it, expect, vi } from "vitest";
import { createElement } from "./setup.js";
import { Elena, html } from "../src/elena.js";
import "./fixtures/basic-element.js";
import "./fixtures/event-element.js";
import "./fixtures/boolean-element.js";
import "./fixtures/number-element.js";
import "./fixtures/wrapper-element.js";

describe("observedAttributes", () => {
  it("extracts names from object-style props", () => {
    class ObjPropsEl extends Elena(HTMLElement) {
      static props = [{ name: "foo" }, "bar"];
      foo = "";
      bar = "";
    }
    expect(ObjPropsEl.observedAttributes).toEqual(["foo", "bar", "text"]);
  });

  it("returns ['text'] on Elena(HTMLElement) with no subclass props", () => {
    class NoPropEl extends Elena(HTMLElement) {}
    expect(NoPropEl.observedAttributes).toEqual(["text"]);
  });

  it("caches across repeated reads", () => {
    class CacheEl extends Elena(HTMLElement) {
      static props = ["a"];
      a = "";
    }
    const first = CacheEl.observedAttributes;
    const second = CacheEl.observedAttributes;
    expect(first).toBe(second);
  });

  it("independent classes have their own cached arrays", () => {
    class IndA extends Elena(HTMLElement) {
      static props = ["x"];
      x = "";
    }
    class IndB extends Elena(HTMLElement) {
      static props = ["y", "z"];
      y = "";
      z = "";
    }
    expect(IndA.observedAttributes).toEqual(["x", "text"]);
    expect(IndB.observedAttributes).toEqual(["y", "z", "text"]);
    expect(IndA.observedAttributes).not.toBe(IndB.observedAttributes);
  });
});

describe("define()", () => {
  it("warns when called on a class without tagName", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    class NoTagEl extends Elena(HTMLElement) {}
    NoTagEl.define();
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("define() without a tagName"));
    spy.mockRestore();
  });

  it("does not throw when called twice on the same class", () => {
    class DoubleDefEl extends Elena(HTMLElement) {
      static tagName = "test-double-def-int";
    }
    DoubleDefEl.define();
    expect(() => DoubleDefEl.define()).not.toThrow();
  });

  it("registers with customElements", () => {
    class RegEl extends Elena(HTMLElement) {
      static tagName = "test-reg-int";
    }
    RegEl.define();
    expect(window.customElements.get("test-reg-int")).toBe(RegEl);
  });
});

describe("handleEvent", () => {
  it("returns early when _elenaEvents is null", async () => {
    const el = await createElement("basic-element");
    const spy = vi.spyOn(el, "dispatchEvent");
    el.handleEvent(new Event("click", { bubbles: true }));
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("re-dispatches non-bubbling event with matching bubbles property", async () => {
    const el = await createElement("event-element");
    const handler = vi.fn();
    el.addEventListener("focus", handler);

    el.handleEvent(new Event("focus", { bubbles: false }));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][0].bubbles).toBe(false);
  });

  it("does not re-dispatch composed bubbling events (they pass through)", async () => {
    const el = await createElement("event-element");
    const handler = vi.fn();
    el.addEventListener("click", handler);

    el.handleEvent(new Event("click", { bubbles: true, composed: true }));
    expect(handler).not.toHaveBeenCalled();
  });

  it("re-dispatches non-composed events in shadow DOM", async () => {
    class ShadowNonCompEl extends Elena(HTMLElement) {
      static tagName = "test-shadow-noncomp-int";
      static shadow = "open";
      static events = ["submit"];
      render() {
        return html`<form><button type="submit">Go</button></form>`;
      }
    }
    ShadowNonCompEl.define();

    const el = await createElement("test-shadow-noncomp-int");
    const handler = vi.fn();
    el.addEventListener("submit", handler);

    el.handleEvent(new Event("submit", { bubbles: true, composed: false }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does not re-dispatch non-composed events in light DOM", async () => {
    class LightNonCompEl extends Elena(HTMLElement) {
      static tagName = "test-light-noncomp-int";
      static events = ["change"];
      render() {
        return html`<input />`;
      }
    }
    LightNonCompEl.define();

    const el = await createElement("test-light-noncomp-int");
    const handler = vi.fn();
    el.addEventListener("change", handler);

    el.handleEvent(new Event("change", { bubbles: true, composed: false }));
    expect(handler).not.toHaveBeenCalled();
  });
});

describe("_delegateEvents edge cases", () => {
  it("does not duplicate listeners on double connectedCallback", async () => {
    const el = await createElement("event-element");
    const spy = vi.spyOn(el.element, "addEventListener");

    el.connectedCallback();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("no-ops for component with no events and no element", async () => {
    const el = await createElement("basic-element");
    expect(() => el._delegateEvents()).not.toThrow();
  });
});

describe("_attachShadow edge cases", () => {
  it("does not create shadow root for light DOM components", async () => {
    const el = await createElement("basic-element");
    expect(el.shadowRoot).toBeNull();
  });

  it("_root returns the host for light DOM components", async () => {
    const el = await createElement("basic-element");
    expect(el._root).toBe(el);
  });

  it("_root returns shadow root for shadow DOM components", async () => {
    class ShadowRootEl extends Elena(HTMLElement) {
      static tagName = "test-shadow-renderroot-int";
      static shadow = "open";
      render() {
        return html`<span>test</span>`;
      }
    }
    ShadowRootEl.define();
    const el = await createElement("test-shadow-renderroot-int");
    expect(el._root).toBe(el.shadowRoot);
  });

  it("shadow component with no static styles skips adoptedStyleSheets", async () => {
    class NoStylesShadowEl extends Elena(HTMLElement) {
      static tagName = "test-no-styles-shadow-int";
      static shadow = "open";
      render() {
        return html`<span>test</span>`;
      }
    }
    NoStylesShadowEl.define();
    const el = await createElement("test-no-styles-shadow-int");
    expect(el.shadowRoot.adoptedStyleSheets.length).toBe(0);
  });

  it("shadow component with single string style converts to CSSStyleSheet", async () => {
    class StringStyleShadowEl extends Elena(HTMLElement) {
      static tagName = "test-string-style-shadow-int";
      static shadow = "open";
      static styles = "span { color: red; }";
      render() {
        return html`<span>test</span>`;
      }
    }
    StringStyleShadowEl.define();
    const el = await createElement("test-string-style-shadow-int");
    expect(el.shadowRoot.adoptedStyleSheets.length).toBe(1);
    expect(el.shadowRoot.adoptedStyleSheets[0]).toBeInstanceOf(CSSStyleSheet);
  });

  it("shadow component with empty array styles sets empty adoptedStyleSheets", async () => {
    class EmptyStylesShadowEl extends Elena(HTMLElement) {
      static tagName = "test-empty-styles-shadow-int";
      static shadow = "open";
      static styles = [];
      render() {
        return html`<span>test</span>`;
      }
    }
    EmptyStylesShadowEl.define();
    const el = await createElement("test-empty-styles-shadow-int");
    expect(el.shadowRoot.adoptedStyleSheets.length).toBe(0);
  });
});

describe("_captureClassFieldDefaults edge cases", () => {
  it("captures null default", () => {
    class NullDefaultEl extends Elena(HTMLElement) {
      static tagName = "test-null-default-int";
      static props = ["data"];
      data = null;
      render() {
        return html`<span>${String(this.data)}</span>`;
      }
    }
    NullDefaultEl.define();
    const el = createElement("test-null-default-int");
    expect(el.data).toBeNull();
  });

  it("captures zero default", () => {
    class ZeroDefaultEl extends Elena(HTMLElement) {
      static tagName = "test-zero-default-int";
      static props = ["count"];
      count = 0;
      render() {
        return html`<span>${this.count}</span>`;
      }
    }
    ZeroDefaultEl.define();
    const el = createElement("test-zero-default-int");
    expect(el.count).toBe(0);
  });

  it("captures false default", () => {
    const el = createElement("boolean-element");
    expect(el.disabled).toBe(false);
    expect(el.hasAttribute("disabled")).toBe(false);
  });

  it("captures empty array default", () => {
    class ArrayDefaultEl extends Elena(HTMLElement) {
      static tagName = "test-array-default-int";
      static props = ["items"];
      items = [];
      render() {
        return html`<span>${this.items.length}</span>`;
      }
    }
    ArrayDefaultEl.define();
    const el = createElement("test-array-default-int");
    expect(el.items).toEqual([]);
  });
});

describe("_syncProps edge cases", () => {
  it("skips sync when _props is null", () => {
    class NoPresetEl extends Elena(HTMLElement) {
      static tagName = "test-no-preset-int";
      static props = ["label"];
      label = "";
      render() {
        return html`<span>${this.label}</span>`;
      }
    }
    NoPresetEl.define();
    const el = document.createElement("test-no-preset-int");
    expect(() => document.body.appendChild(el)).not.toThrow();
    el.remove();
  });

  it("skips noReflect props during sync", async () => {
    const el = document.createElement("no-reflect-element");
    el.content = "pre-connect";
    document.body.appendChild(el);
    await new Promise(r => requestAnimationFrame(r));
    expect(el.hasAttribute("content")).toBe(false);
    el.remove();
  });

  it("skips sync when attribute value is null and attribute is absent", () => {
    class NullSyncEl extends Elena(HTMLElement) {
      static tagName = "test-null-sync-int";
      static props = ["label"];
      label = "";
      render() {
        return html`<span></span>`;
      }
    }
    NullSyncEl.define();
    const el = document.createElement("test-null-sync-int");
    document.body.appendChild(el);
    expect(el.hasAttribute("label")).toBe(false);
    el.remove();
  });
});

describe("_safeRender / _performUpdate batching", () => {
  it("returns the same promise for concurrent updateComplete calls", async () => {
    const el = await createElement("basic-element", { label: "a" });
    el.setAttribute("label", "b");
    const p1 = el.updateComplete;
    const p2 = el.updateComplete;
    expect(p1).toBe(p2);
    await p1;
  });

  it("_updateComplete is null after resolution", async () => {
    const el = await createElement("basic-element", { label: "a" });
    el.setAttribute("label", "b");
    await el.updateComplete;
    expect(el._updateComplete).toBeNull();
  });

  it("_resolveUpdate is null after resolution", async () => {
    const el = await createElement("basic-element", { label: "a" });
    el.setAttribute("label", "b");
    await el.updateComplete;
    expect(el._resolveUpdate).toBeNull();
  });

  it("updateComplete returns new promise for each update cycle", async () => {
    const el = await createElement("basic-element", { label: "a" });
    el.setAttribute("label", "b");
    const p1 = el.updateComplete;
    await p1;

    el.setAttribute("label", "c");
    const p2 = el.updateComplete;
    expect(p1).not.toBe(p2);
    await p2;
  });

  it("setting multiple different props in same microtask produces one render", async () => {
    class MultiPropEl extends Elena(HTMLElement) {
      static tagName = "test-multi-prop-batch-int";
      static props = ["a", "b", "c"];
      a = "";
      b = "";
      c = "";
      render() {
        return html`<span>${this.a}${this.b}${this.c}</span>`;
      }
    }
    MultiPropEl.define();
    const el = await createElement("test-multi-prop-batch-int");
    const spy = vi.spyOn(el, "render");
    el.a = "x";
    el.b = "y";
    el.c = "z";
    await el.updateComplete;
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});

describe("two independent components batch separately", () => {
  it("each component updates independently", async () => {
    const el1 = await createElement("basic-element", { label: "a" });
    const el2 = await createElement("basic-element", { label: "x" });

    el1.setAttribute("label", "b");
    el2.setAttribute("label", "y");

    await el1.updateComplete;
    await el2.updateComplete;

    expect(el1.querySelector(".inner").textContent).toBe("b");
    expect(el2.querySelector(".inner").textContent).toBe("y");
  });
});

describe("remove while render is pending", () => {
  it("does not crash when element is removed before microtask fires", async () => {
    const el = await createElement("basic-element", { label: "a" });
    el.setAttribute("label", "b");
    el.remove();
    await el.updateComplete;
  });
});

describe("sequential prop changes with updateComplete", () => {
  it("produces correct DOM after each await", async () => {
    const el = await createElement("basic-element", { label: "a" });

    el.setAttribute("label", "b");
    await el.updateComplete;
    expect(el.querySelector(".inner").textContent).toBe("b");

    el.setAttribute("label", "c");
    await el.updateComplete;
    expect(el.querySelector(".inner").textContent).toBe("c");

    el.setAttribute("label", "d");
    await el.updateComplete;
    expect(el.querySelector(".inner").textContent).toBe("d");
  });
});

describe("requestUpdate inside updated", () => {
  it("schedules a new render without infinite loop", async () => {
    let count = 0;
    class ReqUpdInUpdEl extends Elena(HTMLElement) {
      static tagName = "test-requpd-in-upd-int";
      updated() {
        count++;
        if (count === 1) {
          this.requestUpdate();
        }
      }
      render() {
        return html`<span>${count}</span>`;
      }
    }
    ReqUpdInUpdEl.define();

    const el = document.createElement("test-requpd-in-upd-int");
    document.body.appendChild(el);
    await el.updateComplete;
    expect(count).toBeGreaterThanOrEqual(2);
    el.remove();
  });
});

describe("updateComplete resolves immediately when no render pending", () => {
  it("resolves from Promise.resolve when _updateComplete is null", async () => {
    const el = await createElement("basic-element", { label: "stable" });
    const result = await el.updateComplete;
    expect(result).toBeUndefined();
  });
});

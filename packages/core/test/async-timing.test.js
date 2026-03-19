import { describe, it, expect, vi } from "vitest";
import { createElement } from "./setup.js";
import { Elena, html } from "../src/elena.js";
import "./fixtures/basic-element.js";
import "./fixtures/event-element.js";

describe("async timing patterns", () => {
  it("requestUpdate from an external setTimeout triggers render", async () => {
    const el = await createElement("basic-element", { label: "initial" });
    const spy = vi.spyOn(el, "render");

    await new Promise(resolve => {
      setTimeout(() => {
        el.requestUpdate();
        resolve();
      }, 0);
    });

    await el.updateComplete;
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it("setting a prop, await, then same value is a no-op second time", async () => {
    const el = await createElement("basic-element", { label: "a" });
    el.label = "b";
    await el.updateComplete;

    const spy = vi.spyOn(el, "render");
    el.label = "b";
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("rapid prop changes interleaved with awaits produce correct results", async () => {
    const el = await createElement("basic-element", { label: "start" });

    for (let i = 0; i < 5; i++) {
      el.label = `step-${i}`;
      await el.updateComplete;
      expect(el.querySelector(".inner").textContent).toBe(`step-${i}`);
    }
  });

  it("disconnect during pending render does not crash on reconnect", async () => {
    const el = await createElement("basic-element", { label: "a" });
    el.setAttribute("label", "b");
    el.remove();
    await el.updateComplete;

    document.body.appendChild(el);
    el.setAttribute("label", "c");
    await el.updateComplete;
    expect(el.querySelector(".inner").textContent).toBe("c");
  });

  it("two components update independently in the same microtask", async () => {
    const el1 = await createElement("basic-element", { label: "1a" });
    const el2 = await createElement("basic-element", { label: "2a" });

    const spy1 = vi.spyOn(el1, "render");
    const spy2 = vi.spyOn(el2, "render");

    el1.label = "1b";
    el2.label = "2b";

    await el1.updateComplete;
    await el2.updateComplete;

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(el1.querySelector(".inner").textContent).toBe("1b");
    expect(el2.querySelector(".inner").textContent).toBe("2b");

    spy1.mockRestore();
    spy2.mockRestore();
  });

  it("updateComplete resolves immediately when element is not hydrated", async () => {
    const el = document.createElement("basic-element");
    await el.updateComplete;
  });

  it("requestUpdate is a no-op before hydration", () => {
    const el = document.createElement("basic-element");
    const spy = vi.spyOn(el, "render");
    el.requestUpdate();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("_safeRender is a no-op during rendering", async () => {
    const el = await createElement("basic-element", { label: "a" });
    el._isRendering = true;
    const spy = vi.spyOn(el, "_performUpdate");
    el._safeRender();
    expect(spy).not.toHaveBeenCalled();
    el._isRendering = false;
    spy.mockRestore();
  });

  it("_performUpdate clears _isRendering even if render throws", async () => {
    class ThrowRenderEl extends Elena(HTMLElement) {
      static tagName = "test-throw-render-async";
      static props = ["label"];
      label = "";
      render() {
        if (this.label === "crash") {
          throw new Error("boom");
        }
        return html`<span>${this.label}</span>`;
      }
    }
    ThrowRenderEl.define();

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const el = await createElement("test-throw-render-async", { label: "ok" });
    el.label = "crash";
    await el.updateComplete;
    expect(el._isRendering).toBe(false);
    errorSpy.mockRestore();
  });
});

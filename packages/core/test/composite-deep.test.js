import { describe, it, expect, vi } from "vitest";
import { createElement } from "./setup.js";
import { Elena, html } from "../src/elena.js";
import "./fixtures/wrapper-element.js";
import "./fixtures/child-element.js";

describe("Composite Components deep coverage", () => {
  it("boolean prop toggles attribute on host", () => {
    class CompBoolEl extends Elena(HTMLElement) {
      static tagName = "test-comp-bool";
      static props = ["collapsed"];
      collapsed = false;
    }
    CompBoolEl.define();

    const el = createElement("test-comp-bool");
    expect(el.collapsed).toBe(false);
    expect(el.hasAttribute("collapsed")).toBe(false);

    el.collapsed = true;
    expect(el.hasAttribute("collapsed")).toBe(true);

    el.collapsed = false;
    expect(el.hasAttribute("collapsed")).toBe(false);
  });

  it("number prop reflects correctly", () => {
    class CompNumEl extends Elena(HTMLElement) {
      static tagName = "test-comp-num";
      static props = ["columns"];
      columns = 1;
    }
    CompNumEl.define();

    const el = createElement("test-comp-num");
    el.columns = 3;
    expect(el.getAttribute("columns")).toBe("3");
    expect(el.columns).toBe(3);
  });

  it("object prop serializes to JSON attribute", () => {
    class CompObjEl extends Elena(HTMLElement) {
      static tagName = "test-comp-obj";
      static props = ["config"];
      config = null;
    }
    CompObjEl.define();

    const el = createElement("test-comp-obj");
    el.config = { key: "value" };
    expect(el.getAttribute("config")).toBe('{"key":"value"}');
  });

  it("text is captured even without render()", () => {
    const el = document.createElement("wrapper-element");
    el.textContent = "composed text";
    document.body.appendChild(el);
    expect(el.text).toBe("composed text");
    el.remove();
  });

  it("updateComplete resolves immediately (no render pending)", async () => {
    const el = await createElement("wrapper-element");
    const before = Date.now();
    await el.updateComplete;
    expect(Date.now() - before).toBeLessThan(100);
  });

  it("requestUpdate does not throw on Composite Component", async () => {
    const el = await createElement("wrapper-element");
    expect(() => el.requestUpdate()).not.toThrow();
    await el.updateComplete;
  });

  it("willUpdate fires on attribute change", async () => {
    class CompWillUpdateEl extends Elena(HTMLElement) {
      static tagName = "test-comp-willupdate";
      static props = ["mode"];
      mode = "default";
      willUpdate() {
        this._lastMode = this.mode;
      }
    }
    CompWillUpdateEl.define();

    const el = createElement("test-comp-willupdate");
    expect(el._lastMode).toBe("default");

    el.setAttribute("mode", "active");
    await el.updateComplete;
    expect(el._lastMode).toBe("active");
  });

  it("Composite wrapping Composite wrapping Primitive", async () => {
    class OuterCompEl extends Elena(HTMLElement) {
      static tagName = "test-outer-comp";
      static props = ["layout"];
      layout = "stack";
    }
    OuterCompEl.define();

    const outer = createElement("test-outer-comp");
    const inner = document.createElement("wrapper-element");
    const primitive = document.createElement("child-element");
    inner.appendChild(primitive);
    outer.appendChild(inner);

    expect(outer.hasAttribute("hydrated")).toBe(true);
    expect(inner.hasAttribute("hydrated")).toBe(true);
    expect(primitive.hasAttribute("hydrated")).toBe(true);
    expect(primitive.querySelector(".child-inner")).not.toBeNull();
  });

  it("element ref is null when Composite has no children", async () => {
    const el = await createElement("wrapper-element");
    expect(el.element).toBeNull();
  });
});

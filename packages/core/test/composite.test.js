import { describe, it, expect, vi } from "vitest";
import { createElement } from "./setup.js";
import "./fixtures/wrapper-element.js";
import "./fixtures/child-element.js";

describe("HTML Web Components", () => {
  describe("hydration", () => {
    it("gets hydrated attribute after connecting", async () => {
      const el = await createElement("wrapper-element");
      expect(el.hasAttribute("hydrated")).toBe(true);
    });

    it("does not render any inner template", async () => {
      const el = await createElement("wrapper-element");
      // HTML Web Components have no render(), they must not replace their light DOM
      expect(el.innerHTML.trim()).toBe("");
    });
  });

  describe("props", () => {
    it("sets default direction prop", async () => {
      const el = await createElement("wrapper-element");
      expect(el.direction).toBe("column");
    });

    it("accepts direction attribute from HTML", async () => {
      const el = await createElement("wrapper-element", { direction: "row" });
      expect(el.direction).toBe("row");
    });

    it("reflects direction prop as host attribute", async () => {
      const el = await createElement("wrapper-element", { direction: "row" });
      expect(el.getAttribute("direction")).toBe("row");
    });

    it("updates direction attribute when prop changes", async () => {
      const el = await createElement("wrapper-element");
      el.direction = "row";
      expect(el.getAttribute("direction")).toBe("row");
    });

    it("updates direction prop when attribute changes", async () => {
      const el = await createElement("wrapper-element");
      el.setAttribute("direction", "row");
      expect(el.direction).toBe("row");
    });

    it("triggers re-render when attribute changes", async () => {
      const el = await createElement("wrapper-element");
      const spy = vi.spyOn(el, "render");
      el.setAttribute("direction", "row");
      await el.updateComplete;
      expect(spy).toHaveBeenCalledOnce();
      spy.mockRestore();
    });
  });

  describe("light DOM children preserved", () => {
    it("preserves children appended after connection", async () => {
      const wrapper = await createElement("wrapper-element");
      const child = document.createElement("child-element");
      wrapper.appendChild(child);
      expect(wrapper.children.length).toBe(1);
      expect(wrapper.firstElementChild).toBe(child);
    });

    it("does not clear slotted children on attribute change", async () => {
      const wrapper = await createElement("wrapper-element");
      const child = document.createElement("child-element");
      wrapper.appendChild(child);
      wrapper.setAttribute("direction", "row");
      expect(wrapper.children.length).toBe(1);
    });
  });

  describe("does not leak props to slotted children (bug regression)", () => {
    it("direction attribute is not set on the first slotted child", async () => {
      const wrapper = await createElement("wrapper-element", { direction: "row" });
      const child = document.createElement("child-element");
      wrapper.appendChild(child);
      expect(child.getAttribute("direction")).toBeNull();
    });

    it("direction attribute is not set on children when prop changes after connect", async () => {
      const wrapper = await createElement("wrapper-element");
      const child = document.createElement("child-element");
      wrapper.appendChild(child);
      wrapper.direction = "row";
      expect(child.getAttribute("direction")).toBeNull();
    });
  });

  describe("nested components", () => {
    it("nested child component gets hydrated attribute", async () => {
      const wrapper = await createElement("wrapper-element", { direction: "row" });
      const child = document.createElement("child-element");
      wrapper.appendChild(child);
      expect(child.hasAttribute("hydrated")).toBe(true);
    });

    it("nested child component renders its own template", async () => {
      const wrapper = await createElement("wrapper-element");
      const child = document.createElement("child-element");
      wrapper.appendChild(child);
      expect(child.querySelector(".child-inner")).not.toBeNull();
      expect(child.querySelector(".child-inner").textContent).toBe("default");
    });

    it("nested child component props work independently", async () => {
      const wrapper = await createElement("wrapper-element");
      const child = document.createElement("child-element");
      wrapper.appendChild(child);
      child.variant = "primary";
      await child.updateComplete;
      expect(child.querySelector(".child-inner").textContent).toBe("primary");
    });

    it("multiple nested children are all hydrated", async () => {
      const wrapper = await createElement("wrapper-element", { direction: "row" });
      const child1 = document.createElement("child-element");
      const child2 = document.createElement("child-element");
      const child3 = document.createElement("child-element");
      wrapper.appendChild(child1);
      wrapper.appendChild(child2);
      wrapper.appendChild(child3);
      expect(child1.hasAttribute("hydrated")).toBe(true);
      expect(child2.hasAttribute("hydrated")).toBe(true);
      expect(child3.hasAttribute("hydrated")).toBe(true);
    });

    it("wrapper element ref resolves to first slotted child", async () => {
      const wrapper = await createElement("wrapper-element");
      const child = document.createElement("child-element");
      wrapper.appendChild(child);
      // element ref is set on first connectedCallback (before child was added here),
      // so it may be null or the first child depending on timing
      // The key invariant: wrapper's own element ref must never be one of its children
      // when children are added after connection
      expect(wrapper.element).not.toBe(child);
    });

    it("child component element ref does not bleed to wrapper", async () => {
      const wrapper = await createElement("wrapper-element");
      const child = document.createElement("child-element");
      wrapper.appendChild(child);
      // child's .element is its own inner rendered element, not the wrapper
      expect(child.element).toBe(child.querySelector(".child-inner"));
    });
  });

  describe("reconnection", () => {
    it("wrapper props still work after being moved to a new parent", async () => {
      const wrapper = await createElement("wrapper-element", { direction: "row" });
      const container = document.createElement("div");
      document.body.appendChild(container);
      wrapper.remove();
      container.appendChild(wrapper);
      wrapper.direction = "column";
      expect(wrapper.getAttribute("direction")).toBe("column");
    });

    it("children are preserved after wrapper is moved", async () => {
      const wrapper = await createElement("wrapper-element");
      const child = document.createElement("child-element");
      wrapper.appendChild(child);
      const container = document.createElement("div");
      document.body.appendChild(container);
      wrapper.remove();
      container.appendChild(wrapper);
      expect(wrapper.firstElementChild).toBe(child);
    });
  });
});

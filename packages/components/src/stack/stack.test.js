import { describe, it, expect } from "vitest";
import { createElement } from "../../test/setup.js";
import "./stack.js";

describe("Stack", () => {
  describe("hydration", () => {
    it("gets hydrated attribute after connecting", () => {
      const el = createElement("elena-stack");
      expect(el.hasAttribute("hydrated")).toBe(true);
    });

    it("does not render any inner template", () => {
      const el = createElement("elena-stack");
      expect(el.innerHTML.trim()).toBe("");
    });
  });

  describe("children", () => {
    it("preserves children appended after connection", () => {
      const el = createElement("elena-stack");
      const child = document.createElement("div");
      child.textContent = "child";
      el.appendChild(child);
      expect(el.children.length).toBe(1);
      expect(el.firstElementChild).toBe(child);
    });

    it("does not clear children on attribute change", () => {
      const el = createElement("elena-stack");
      const child1 = document.createElement("div");
      const child2 = document.createElement("span");
      el.appendChild(child1);
      el.appendChild(child2);
      el.setAttribute("direction", "row");
      expect(el.children.length).toBe(2);
      expect(el.firstElementChild).toBe(child1);
    });
  });

  describe("direction prop", () => {
    it("defaults to 'column'", () => {
      const el = createElement("elena-stack");
      expect(el.direction).toBe("column");
    });

    it("accepts direction attribute from HTML", () => {
      const el = createElement("elena-stack", { direction: "row" });
      expect(el.direction).toBe("row");
    });

    it("reflects direction property to host attribute", () => {
      const el = createElement("elena-stack");
      el.direction = "row";
      expect(el.getAttribute("direction")).toBe("row");
    });

    it("syncs attribute change to property", () => {
      const el = createElement("elena-stack");
      el.setAttribute("direction", "row");
      expect(el.direction).toBe("row");
    });
  });

  describe("does not interfere with children", () => {
    it("direction attribute is not set on children", () => {
      const el = createElement("elena-stack", { direction: "row" });
      const child = document.createElement("div");
      el.appendChild(child);
      expect(child.getAttribute("direction")).toBeNull();
    });

    it("direction change does not affect children's attributes", () => {
      const el = createElement("elena-stack");
      const child = document.createElement("div");
      child.setAttribute("data-custom", "value");
      el.appendChild(child);
      el.direction = "row";
      expect(child.getAttribute("data-custom")).toBe("value");
      expect(child.getAttribute("direction")).toBeNull();
    });
  });
});

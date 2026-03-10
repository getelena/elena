import { describe, it, expect } from "vitest";
import { createElement } from "../../test/setup.js";
import "./visually-hidden.js";

describe("VisuallyHidden", () => {
  describe("hydration", () => {
    it("gets hydrated attribute after connecting", () => {
      const el = createElement("elena-visually-hidden");
      expect(el.hasAttribute("hydrated")).toBe(true);
    });

    it("does not render any inner template", () => {
      const el = createElement("elena-visually-hidden");
      expect(el.innerHTML.trim()).toBe("");
    });
  });

  describe("children", () => {
    it("preserves children appended after connection", () => {
      const el = createElement("elena-visually-hidden");
      const child = document.createElement("div");
      child.textContent = "child";
      el.appendChild(child);
      expect(el.children.length).toBe(1);
      expect(el.firstElementChild).toBe(child);
    });

    it("does not clear children on attribute change", () => {
      const el = createElement("elena-visually-hidden");
      const child1 = document.createElement("div");
      const child2 = document.createElement("span");
      el.appendChild(child1);
      el.appendChild(child2);
      expect(el.children.length).toBe(2);
      expect(el.firstElementChild).toBe(child1);
    });
  });
});

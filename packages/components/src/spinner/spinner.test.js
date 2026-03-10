import { describe, it, expect } from "vitest";
import { createElement } from "../../test/setup.js";
import "./spinner.js";

describe("Spinner", () => {
  describe("hydration", () => {
    it("gets hydrated attribute after connecting", () => {
      const el = createElement("elena-spinner");
      expect(el.hasAttribute("hydrated")).toBe(true);
    });

    it("does not render any inner template", () => {
      const el = createElement("elena-spinner");
      expect(el.innerHTML.trim()).toBe("");
    });
  });
});

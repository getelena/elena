import { describe, it, expect } from "vitest";
import { createElement } from "./setup.js";
import "./fixtures/basic-element.js";

describe("hydration", () => {
  it("element gets hydrated attribute after connectedCallback", async () => {
    const el = await createElement("basic-element");
    expect(el.hasAttribute("hydrated")).toBe(true);
  });

  it("element does NOT have hydrated attribute before connection", () => {
    const el = document.createElement("basic-element");
    // Not appended. connectedCallback has not fired
    expect(el.hasAttribute("hydrated")).toBe(false);
  });

  it("element has no inner markup before connection", () => {
    const el = document.createElement("basic-element");
    expect(el.innerHTML).toBe("");
    expect(el.querySelector(".inner")).toBeNull();
  });

  it("element has rendered markup after connection", () => {
    const el = createElement("basic-element", { label: "Hydrated" });
    expect(el.querySelector(".inner")).not.toBeNull();
    expect(el.querySelector(".inner").textContent).toBe("Hydrated");
  });

  it("renders raw HTML values in tagged template", () => {
    const el = createElement("basic-element", { label: "<b>bold</b>" });
    expect(el.querySelector("b")).toBeNull();
    expect(el.label).toBe("<b>bold</b>");
  });
});

import { describe, it, expect, vi } from "vitest";
import { createElement } from "./setup.js";
import "./fixtures/basic-element.js";
import "./fixtures/event-element.js";

describe("multiple instances", () => {
  it("two instances have independent prop values", () => {
    const el1 = createElement("basic-element", { label: "first" });
    const el2 = createElement("basic-element", { label: "second" });

    expect(el1.label).toBe("first");
    expect(el2.label).toBe("second");
  });

  it("changing a prop on one instance does not affect the other", async () => {
    const el1 = createElement("basic-element", { label: "shared" });
    const el2 = createElement("basic-element", { label: "shared" });

    el1.label = "changed";
    expect(el1.label).toBe("changed");
    expect(el2.label).toBe("shared");
  });

  it("both instances render independently", () => {
    const el1 = createElement("basic-element", { label: "alpha" });
    const el2 = createElement("basic-element", { label: "beta" });

    expect(el1.querySelector(".inner").textContent).toBe("alpha");
    expect(el2.querySelector(".inner").textContent).toBe("beta");
  });

  it("re-rendering one instance does not re-render the other", async () => {
    const el1 = createElement("basic-element", { label: "a" });
    const el2 = createElement("basic-element", { label: "b" });

    const spy2 = vi.spyOn(el2, "render");

    el1.setAttribute("label", "changed");
    await el1.updateComplete;

    expect(spy2).not.toHaveBeenCalled();
    expect(el1.querySelector(".inner").textContent).toBe("changed");
    expect(el2.querySelector(".inner").textContent).toBe("b");
    spy2.mockRestore();
  });

  it("_props Map is per-instance, not shared", () => {
    const el1 = createElement("basic-element", { label: "x" });
    const el2 = createElement("basic-element", { label: "y" });

    // Each should have its own _props Map
    expect(el1._props).not.toBe(el2._props);
    expect(el1._props.get("label")).toBe("x");
    expect(el2._props.get("label")).toBe("y");
  });

  it("events on one instance do not fire on the other", () => {
    const el1 = createElement("event-element");
    const el2 = createElement("event-element");

    const handler1 = vi.fn();
    const handler2 = vi.fn();
    el1.addEventListener("click", handler1);
    el2.addEventListener("click", handler2);

    el1.element.click();

    expect(handler1).toHaveBeenCalledTimes(1);
    expect(handler2).not.toHaveBeenCalled();
  });
});

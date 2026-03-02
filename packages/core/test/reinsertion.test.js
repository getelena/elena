import { describe, it, expect, vi } from "vitest";
import { createElement } from "./setup.js";
import "./fixtures/event-element.js";
import "./fixtures/basic-element.js";
import "./fixtures/boolean-element.js";

describe("DOM removal and re-insertion", () => {
  /**
   * Move an element from one container to another.
   */
  function moveElement(el, target) {
    el.remove();
    target.appendChild(el);
  }

  describe("events", () => {
    it("click delegation works after moving to a different parent", async () => {
      const el = await createElement("event-element");
      const container = document.createElement("div");
      document.body.appendChild(container);

      moveElement(el, container);

      const handler = vi.fn();
      el.addEventListener("click", handler);
      el.element.click();

      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler.mock.calls[0][0].bubbles).toBe(true);
      expect(handler.mock.calls[0][0].composed).toBe(true);
    });

    it("focus delegation works after moving to a different parent", async () => {
      const el = await createElement("event-element");
      const container = document.createElement("div");
      document.body.appendChild(container);

      moveElement(el, container);

      const handler = vi.fn();
      el.addEventListener("focus", handler);
      el.element.dispatchEvent(new Event("focus", { bubbles: true }));

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("proxy methods work after re-insertion", async () => {
      const el = await createElement("event-element");
      const container = document.createElement("div");
      document.body.appendChild(container);

      moveElement(el, container);

      const spy = vi.spyOn(el.element, "click");
      el.click();
      expect(spy).toHaveBeenCalled();
    });

    it("multiple remove/re-insert cycles do not duplicate event handlers", async () => {
      const el = await createElement("event-element");
      const containerA = document.createElement("div");
      const containerB = document.createElement("div");
      document.body.appendChild(containerA);
      document.body.appendChild(containerB);

      moveElement(el, containerA);
      moveElement(el, containerB);
      moveElement(el, containerA);

      const handler = vi.fn();
      el.addEventListener("click", handler);
      el.element.click();

      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe("props", () => {
    it("property getter works after re-insertion", async () => {
      const el = await createElement("basic-element", { label: "hello" });
      const container = document.createElement("div");
      document.body.appendChild(container);

      moveElement(el, container);

      expect(el.label).toBe("hello");
    });

    it("property setter syncs to attributes after re-insertion", async () => {
      const el = await createElement("basic-element", { label: "before" });
      const container = document.createElement("div");
      document.body.appendChild(container);

      moveElement(el, container);

      el.label = "after";
      expect(el.getAttribute("label")).toBe("after");
    });

    it("attribute change triggers re-render after re-insertion", async () => {
      const el = await createElement("basic-element", { label: "Hello" });
      const container = document.createElement("div");
      document.body.appendChild(container);

      moveElement(el, container);

      el.setAttribute("label", "World");
      expect(el.querySelector(".inner").textContent).toBe("World");
    });

    it("boolean prop toggles correctly after re-insertion", async () => {
      const el = await createElement("boolean-element", { disabled: "" });
      const container = document.createElement("div");
      document.body.appendChild(container);

      moveElement(el, container);

      el.disabled = false;
      expect(el.hasAttribute("disabled")).toBe(false);

      el.disabled = true;
      expect(el.hasAttribute("disabled")).toBe(true);
    });

    it("props set while disconnected are reflected after re-insertion", async () => {
      const el = await createElement("basic-element", { label: "initial" });

      el.remove();
      el.label = "updated-while-disconnected";

      const container = document.createElement("div");
      document.body.appendChild(container);
      container.appendChild(el);

      expect(el.querySelector(".inner").textContent).toBe("updated-while-disconnected");
    });

    it("hydrated attribute is preserved after re-insertion", async () => {
      const el = await createElement("basic-element");
      const container = document.createElement("div");
      document.body.appendChild(container);

      moveElement(el, container);

      expect(el.hasAttribute("hydrated")).toBe(true);
    });
  });
});

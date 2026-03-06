import { describe, it, expect, vi } from "vitest";
import { createElement } from "./setup.js";
import { Elena } from "../src/elena.js";
import "./fixtures/basic-element.js";
import "./fixtures/event-element.js";
import "./fixtures/content-element.js";

describe("Primitive Components", () => {
  describe("hydration", () => {
    it("gets hydrated attribute after connecting", async () => {
      const el = await createElement("basic-element");
      expect(el.hasAttribute("hydrated")).toBe(true);
    });

    it("renders its own template into the DOM", async () => {
      const el = await createElement("basic-element", { label: "Hello" });
      expect(el.querySelector(".inner")).not.toBeNull();
      expect(el.querySelector(".inner").textContent).toBe("Hello");
    });

    it("has no inner markup before connection", () => {
      const el = document.createElement("basic-element");
      expect(el.innerHTML).toBe("");
    });
  });

  describe("render owns the DOM", () => {
    it("replaces children on re-render when template shape changes", async () => {
      const el = await createElement("basic-element", { label: "First" });
      expect(el.querySelector(".inner").textContent).toBe("First");

      el.setAttribute("label", "Second");
      const spans = el.querySelectorAll(".inner");
      expect(spans.length).toBe(1);
      expect(spans[0].textContent).toBe("Second");
    });

    it("content is controlled entirely through props", async () => {
      const el = await createElement("basic-element", { label: "A" });
      expect(el.querySelector(".inner").textContent).toBe("A");

      el.label = "B";
      expect(el.querySelector(".inner").textContent).toBe("B");
    });

    it("does not compose external children into the template", async () => {
      const el = await createElement("basic-element", { label: "Hello" });
      // Primitive components control their own DOM; external children are not part of the contract
      expect(el.children.length).toBe(1);
      expect(el.firstElementChild.classList.contains("inner")).toBe(true);
    });
  });

  describe("element ref", () => {
    it("resolves to the inner rendered element", async () => {
      const el = await createElement("basic-element", { label: "Hello" });
      expect(el.element).not.toBeNull();
      expect(el.element).toBe(el.querySelector(".inner"));
    });

    it("is preserved across fast-path re-renders", async () => {
      const el = await createElement("basic-element", { label: "Hello" });
      const ref = el.element;

      el.setAttribute("label", "World");
      expect(el.element).toBe(ref);
    });
  });

  describe("event delegation", () => {
    it("delegates configured events from inner element to host", async () => {
      const el = await createElement("event-element");
      const handler = vi.fn();
      el.addEventListener("click", handler);

      el.element.click();

      expect(handler).toHaveBeenCalledTimes(1);
      const dispatched = handler.mock.calls[0][0];
      expect(dispatched.bubbles).toBe(true);
      expect(dispatched.composed).toBe(true);
    });

    it("creates proxy methods for delegated events", async () => {
      const el = await createElement("event-element");
      const spy = vi.spyOn(el.element, "click");
      el.click();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("text content", () => {
    it("captures textContent from light DOM before render", () => {
      const el = document.createElement("content-element");
      el.textContent = "Hello";
      document.body.appendChild(el);
      expect(el.text).toBe("Hello");
      expect(el.querySelector(".inner").textContent).toBe("Hello");
    });

    it("is empty string when no text content", async () => {
      const el = await createElement("content-element");
      expect(el.text).toBe("");
    });

    it("returns empty string before connection when _text is undefined", () => {
      // Exercises the `this._text ?? ""` fallback in the getter.
      const el = document.createElement("content-element");
      expect(el.text).toBe("");
    });

    it("does not re-render when set to the same value", async () => {
      const el = await createElement("content-element");
      el.text = "Hello";
      const spy = vi.spyOn(el, "render");
      el.text = "Hello";
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });

    it("does not trigger render when set before first connection", () => {
      const el = document.createElement("content-element");
      const spy = vi.spyOn(el, "render");
      el.text = "pre-connect";
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });

    it("trims whitespace from captured text", () => {
      const el = document.createElement("content-element");
      el.textContent = "  Hello  ";
      document.body.appendChild(el);
      expect(el.text).toBe("Hello");
    });

    it("does not re-capture on re-insertion", () => {
      const el = document.createElement("content-element");
      el.textContent = "Original";
      document.body.appendChild(el);
      expect(el.text).toBe("Original");

      el.text = "Updated";
      el.remove();
      document.body.appendChild(el);
      expect(el.text).toBe("Updated");
    });

    it("triggers re-render when set programmatically", async () => {
      const el = await createElement("content-element");
      el.text = "Dynamic";
      expect(el.querySelector(".inner").textContent).toBe("Dynamic");
    });

    it("does not infinite loop when text changes during render", async () => {
      const el = await createElement("content-element");
      // Setting text triggers _applyRender; the _isRendering guard prevents loops
      el.text = "A";
      el.text = "B";
      expect(el.querySelector(".inner").textContent).toBe("B");
    });

    it("warns when a prop named 'text' is declared", async () => {
      const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
      class TextPropElement extends Elena(HTMLElement) {
        static tagName = "text-prop-element";
        static props = ["text"];
      }
      TextPropElement.define();
      const el = document.createElement("text-prop-element");
      document.body.appendChild(el);
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('"text" is a reserved prop.'));
      spy.mockRestore();
    });
  });

  describe("reconnection", () => {
    it("re-renders after being moved to a new parent", async () => {
      const el = await createElement("basic-element", { label: "Hello" });
      const container = document.createElement("div");
      document.body.appendChild(container);
      el.remove();
      container.appendChild(el);

      el.setAttribute("label", "World");
      expect(el.querySelector(".inner").textContent).toBe("World");
    });

    it("hydrated attribute is preserved after re-insertion", async () => {
      const el = await createElement("basic-element");
      const container = document.createElement("div");
      document.body.appendChild(container);
      el.remove();
      container.appendChild(el);

      expect(el.hasAttribute("hydrated")).toBe(true);
    });

    it("event delegation works after re-insertion", async () => {
      const el = await createElement("event-element");
      const container = document.createElement("div");
      document.body.appendChild(container);
      el.remove();
      container.appendChild(el);

      const handler = vi.fn();
      el.addEventListener("click", handler);
      el.element.click();
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});

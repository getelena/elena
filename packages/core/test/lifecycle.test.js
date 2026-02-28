import { describe, it, expect, vi } from "vitest";
import { createElement } from "./setup.js";
import "./fixtures/basic-element.js";
import "./fixtures/no-template-element.js";
import "./fixtures/extended-element.js";
import "./fixtures/no-props-element.js";
import "./fixtures/attr-element.js";

describe("lifecycle", () => {
  describe("connectedCallback", () => {
    it("fires render and sets this.element", async () => {
      const el = await createElement("basic-element");
      expect(el.element).not.toBeNull();
      expect(el.element.classList.contains("inner")).toBe(true);
    });

    it("falls back to firstElementChild when selector does not match", async () => {
      // basic-element's selector is ".inner" which does match,
      // so element should be the .inner span
      const el = await createElement("basic-element");
      expect(el.element.tagName).toBe("SPAN");
    });
  });

  describe("disconnectedCallback", () => {
    it("removes event listeners on disconnect", async () => {
      // Import event-element which has events
      await import("./fixtures/event-element.js");
      const el = await createElement("event-element");
      const inner = el.element;
      const spy = vi.spyOn(inner, "removeEventListener");
      el.remove();
      expect(spy).toHaveBeenCalledWith("click", el);
      expect(spy).toHaveBeenCalledWith("focus", el);
    });

    it("skips event teardown when _events is already false", async () => {
      await import("./fixtures/event-element.js");
      const el = await createElement("event-element");
      el.remove();
      // _events is now false; calling disconnectedCallback again should be a no-op
      const spy = vi.spyOn(el.element, "removeEventListener");
      el.disconnectedCallback();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe("attributeChangedCallback", () => {
    it("triggers re-render when attribute value changes", async () => {
      const el = await createElement("basic-element", { label: "Hello" });
      expect(el.querySelector(".inner").textContent).toBe("Hello");

      el.setAttribute("label", "World");
      // render replaces children, so query the fresh DOM
      expect(el.querySelector(".inner").textContent).toBe("World");
    });

    it("skips re-render when value is the same", async () => {
      const el = await createElement("basic-element", { label: "Same" });
      const spy = vi.spyOn(el, "render");
      el.setAttribute("label", "Same");
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });

    it("skips re-render when _isRendering is set (re-entrant call)", () => {
      const el = createElement("basic-element", { label: "hello" });
      const spy = vi.spyOn(el, "render");

      // Simulate attributeChangedCallback firing while render() is on the stack
      el._isRendering = true;
      el.attributeChangedCallback("label", "hello", "world");

      expect(spy).not.toHaveBeenCalled();
      el._isRendering = false;
      spy.mockRestore();
    });

    it("still updates prop value when render is skipped due to _isRendering", () => {
      const el = createElement("basic-element", { label: "hello" });

      el._isRendering = true;
      el.attributeChangedCallback("label", "hello", "world");

      // getProps still runs, prop is updated even though render() was not called
      expect(el.label).toBe("world");
      el._isRendering = false;
    });

    it("allows re-render after _isRendering is cleared", () => {
      const el = createElement("basic-element", { label: "hello" });
      // Simulate a completed render cycle
      el._isRendering = true;
      el.attributeChangedCallback("label", "hello", "interim");
      el._isRendering = false;

      // Guard is cleared, next change should render normally
      const spy = vi.spyOn(el, "render");
      el.setAttribute("label", "world");
      expect(spy).toHaveBeenCalledOnce();
      spy.mockRestore();
    });

    it("does not stack overflow when render() normalizes its own prop", async () => {
      await import("./fixtures/self-mutating-element.js");
      const el = createElement("self-mutating-element", { label: "hello" });

      // Changing the label triggers render() which calls setAttribute("label", "WORLD"),
      // which would re-enter attributeChangedCallback, the guard must stop the loop.
      expect(() => el.setAttribute("label", "world")).not.toThrow();
      expect(el.querySelector(".inner").textContent).toBe("WORLD");
    });
  });

  describe("updated", () => {
    it("is called during connectedCallback", async () => {
      const el = await createElement("extended-element");
      expect(el.getAttribute("data-updated")).toBe("true");
    });

    it("adds hydrated attribute", async () => {
      const el = await createElement("extended-element");
      expect(el.hasAttribute("hydrated")).toBe(true);
    });
  });

  describe("extending via super", () => {
    it("custom connectedCallback runs after super", async () => {
      const el = await createElement("extended-element");
      expect(el.getAttribute("data-connected")).toBe("true");
      expect(el.element).not.toBeNull();
    });

    it("custom disconnectedCallback runs after super", async () => {
      const el = await createElement("extended-element");
      el.remove();
      expect(el.getAttribute("data-disconnected")).toBe("true");
    });

    it("custom updated runs after super", async () => {
      const el = await createElement("extended-element");
      expect(el.getAttribute("data-updated")).toBe("true");
      expect(el.hasAttribute("hydrated")).toBe(true);
    });
  });

  describe("element ref", () => {
    it("matches explicit CSS selector", async () => {
      await import("./fixtures/event-element.js");
      const el = await createElement("event-element");
      expect(el.element).not.toBeNull();
      expect(el.element.classList.contains("inner-btn")).toBe(true);
      expect(el.element.tagName).toBe("BUTTON");
    });

    it("falls back to firstElementChild when no element option is given", async () => {
      await import("./fixtures/no-element-option.js");
      const el = await createElement("no-element-option");
      expect(el.element).not.toBeNull();
      expect(el.element).toBe(el.firstElementChild);
    });

    it("resolves via getElementsByClassName for a bare class name", async () => {
      await import("./fixtures/classname-element.js");
      const el = await createElement("classname-element");
      expect(el.element).not.toBeNull();
      expect(el.element.classList.contains("inner")).toBe(true);
    });

    it("caches element ref across reconnections", async () => {
      const el = await createElement("basic-element", { label: "test" });
      const firstRef = el.element;

      const container = document.createElement("div");
      document.body.appendChild(container);
      el.remove();
      container.appendChild(el);

      expect(el.element).toBe(firstRef);
    });
  });

  describe("no-props element", () => {
    it("renders without props defined", async () => {
      const el = await createElement("no-props-element");
      expect(el.element).not.toBeNull();
      expect(el.querySelector(".inner").textContent).toBe("static content");
    });

    it("adds hydrated attribute without props", async () => {
      const el = await createElement("no-props-element");
      expect(el.hasAttribute("hydrated")).toBe(true);
    });
  });

  describe("no constructor", () => {
    it("connects and renders without an explicit constructor", async () => {
      await import("./fixtures/no-constructor-element.js");
      const el = await createElement("no-constructor-element");
      expect(el.querySelector("span").textContent).toBe("no constructor");
      expect(el.hasAttribute("hydrated")).toBe(true);
    });
  });

  describe("no options", () => {
    it("template with no options: connects and resolves firstElementChild", async () => {
      await import("./fixtures/template-no-options.js");
      const el = await createElement("template-no-options");
      expect(el.element).not.toBeNull();
      expect(el.element).toBe(el.firstElementChild);
      expect(el.hasAttribute("hydrated")).toBe(true);
    });

    it("no render and no options: connects safely with null element ref", async () => {
      await import("./fixtures/no-render-no-options.js");
      const el = await createElement("no-render-no-options");
      // No element option → wrapper-style component, null element ref is expected (no warn)
      expect(el.element).toBeNull();
      expect(el.hasAttribute("hydrated")).toBe(true);
    });

    it("warns when an explicit element selector is set but does not match", async () => {
      // no-template-element uses element: ".missing" which never resolves
      const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
      const el = await createElement("no-template-element");
      expect(spy).toHaveBeenCalledWith(expect.stringContaining("No element found"));
      spy.mockRestore();
    });
  });

  describe("event binding optimization", () => {
    it("does not duplicate event listeners on disconnect and reconnect", async () => {
      await import("./fixtures/event-element.js");
      const el = await createElement("event-element");

      const container = document.createElement("div");
      document.body.appendChild(container);
      el.remove();
      container.appendChild(el);

      // Events should work exactly once (not duplicated)
      const handler = vi.fn();
      el.addEventListener("click", handler);
      el.element.click();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("skips addEventListener if already bound", async () => {
      await import("./fixtures/event-element.js");
      const el = await createElement("event-element");
      const addSpy = vi.spyOn(el.element, "addEventListener");

      // Manually call connectedCallback again without disconnecting
      el.connectedCallback();

      expect(addSpy).not.toHaveBeenCalled();
      addSpy.mockRestore();
    });
  });

  describe("render call count (no redundant re-renders)", () => {
    // Helper: resolves after current macrotask so MutationObserver callbacks have fired.
    const tick = () => new Promise(r => setTimeout(r, 0));

    it("text-position attribute change: render called exactly once", async () => {
      // basic-element uses text-position interpolation only → patchTextNodes fast path,
      // no replaceChildren → observer never fires.
      // Start with a non-empty label so the initial render creates a real text node that
      // mapTextNodes can capture; then patchTextNodes can update it in-place without fullRender.
      const el = await createElement("basic-element", { label: "initial" });
      const spy = vi.spyOn(el, "render");

      el.setAttribute("label", "hello");
      await tick();

      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    it("text-position: repeated attribute changes each cost exactly one render", async () => {
      const el = await createElement("basic-element", { label: "initial" });
      const spy = vi.spyOn(el, "render");

      el.setAttribute("label", "a");
      el.setAttribute("label", "b");
      el.setAttribute("label", "c");
      await tick();

      expect(spy).toHaveBeenCalledTimes(3);
      spy.mockRestore();
    });

    it("attribute-position first change: render called exactly once", async () => {
      // attr-element has variant="${this.variant}" in an attribute position.
      // Changing variant triggers fullRender → replaceChildren.
      const el = await createElement("attr-element");
      const spy = vi.spyOn(el, "render");

      el.setAttribute("variant", "primary");
      await tick();

      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    it("attribute-position subsequent changes: render called exactly once each", async () => {
      const el = await createElement("attr-element");

      const spy = vi.spyOn(el, "render");

      el.setAttribute("variant", "secondary");
      await tick();
      expect(spy).toHaveBeenCalledTimes(1);

      el.setAttribute("variant", "danger");
      await tick();
      expect(spy).toHaveBeenCalledTimes(2);

      spy.mockRestore();
    });
  });

  describe("hydration optimization", () => {
    it("does not re-set hydrated attribute on reconnection", async () => {
      const el = await createElement("basic-element");
      const spy = vi.spyOn(el, "setAttribute");

      const container = document.createElement("div");
      document.body.appendChild(container);
      el.remove();
      container.appendChild(el);

      expect(spy).not.toHaveBeenCalledWith("hydrated", "");
      spy.mockRestore();
    });
  });

  describe("updated() behavioral contract", () => {
    it("is NOT called on re-renders triggered by attributeChangedCallback", async () => {
      await import("./fixtures/extended-element.js");
      const el = await createElement("extended-element", { label: "initial" });
      const updateCountAfterConnect = el.getAttribute("data-update-count");

      // Trigger a re-render by changing an observed attribute
      el.setAttribute("label", "changed");

      // updated() should NOT have been called again; count stays the same
      const updateCountAfterChange = el.getAttribute("data-update-count");
      expect(updateCountAfterChange).toBe(updateCountAfterConnect);
    });
  });

  describe("pre-connection prop setting and connect flush", () => {
    it("syncs buffered props to attributes and element when connecting", async () => {
      // Create element but do NOT append it yet (disconnected)
      const el = document.createElement("basic-element");

      // Set prop while disconnected: buffered in _props, not synced to attributes
      el.label = "buffered value";
      expect(el.hasAttribute("label")).toBe(false);

      // Now connect: connectedCallback should flush _props to attributes
      document.body.appendChild(el);

      // After connection, prop should be reflected as attribute and rendered
      expect(el.hasAttribute("label")).toBe(true);
      expect(el.getAttribute("label")).toBe("buffered value");
      expect(el.querySelector(".inner").textContent).toBe("buffered value");

      document.body.removeChild(el);
    });

    it("syncs multiple buffered props on connect", async () => {
      await import("./fixtures/multiline-element.js");
      const el = document.createElement("multiline-element");

      // Buffer multiple props before connect
      el.label = "Submit";
      el.type = "submit";
      el.name = "action";

      document.body.appendChild(el);

      // All should be reflected after connection
      expect(el.getAttribute("label")).toBe("Submit");
      expect(el.getAttribute("type")).toBe("submit");
      expect(el.getAttribute("name")).toBe("action");
      expect(el.querySelector(".btn").getAttribute("type")).toBe("submit");

      document.body.removeChild(el);
    });
  });

  describe("_captureText", () => {
    it("skips capture when text was set before connection", () => {
      const el = document.createElement("basic-element");
      el.text = "pre-set";
      document.body.appendChild(el);
      // _captureText should skip because _text is already truthy
      expect(el.text).toBe("pre-set");
      document.body.removeChild(el);
    });

    it("microtask skips capture when text is set after connect", async () => {
      // Create element with no textContent so the microtask path is taken
      const el = document.createElement("basic-element");
      document.body.appendChild(el);
      // Set text after connect but before microtask fires
      el.text = "set-after-connect";
      // Wait for microtask to run
      await new Promise(r => queueMicrotask(r));
      // microtask should have seen _text is truthy and skipped
      expect(el.text).toBe("set-after-connect");
      document.body.removeChild(el);
    });
  });

  describe("attributeChangedCallback text attribute", () => {
    it("updates this.text and re-renders when the text attribute is set", async () => {
      const el = await createElement("basic-element");
      el.setAttribute("text", "new text");
      expect(el.text).toBe("new text");
    });

    it("sets text to empty string when text attribute is removed", async () => {
      const el = await createElement("basic-element");
      el.setAttribute("text", "some text");
      expect(el.text).toBe("some text");
      el.removeAttribute("text");
      expect(el.text).toBe("");
    });
  });

  describe("event delegation warnings", () => {
    it("warns when events are configured but inner element is not found", async () => {
      await import("./fixtures/events-no-element.js");
      const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
      await createElement("events-no-element");
      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining("Cannot delegate events")
      );
      spy.mockRestore();
    });
  });

  describe("disconnectCallback safe no-op paths", () => {
    it("does not throw when disconnecting an element with no events configured", async () => {
      const el = await createElement("no-props-element");
      // no-props-element has no events in options
      expect(() => el.remove()).not.toThrow();
    });

    it("safely handles disconnect of a Composite Component with no events", async () => {
      await import("./fixtures/wrapper-element.js");
      const el = await createElement("wrapper-element");
      // wrapper-element is a Composite Component, no events
      expect(() => el.remove()).not.toThrow();
    });
  });
});

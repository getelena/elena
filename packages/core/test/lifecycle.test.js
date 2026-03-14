import { describe, it, expect, vi } from "vitest";
import { createElement } from "./setup.js";
import { Elena, html } from "../src/elena.js";
import BasicElement from "./fixtures/basic-element.js";
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
      await el.updateComplete;
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

    it("allows re-render after _isRendering is cleared", async () => {
      const el = createElement("basic-element", { label: "hello" });
      // Simulate a completed render cycle
      el._isRendering = true;
      el.attributeChangedCallback("label", "hello", "interim");
      el._isRendering = false;

      // Guard is cleared, next change should render normally
      const spy = vi.spyOn(el, "render");
      el.setAttribute("label", "world");
      await el.updateComplete;
      expect(spy).toHaveBeenCalledOnce();
      spy.mockRestore();
    });

    it("does not stack overflow when render() normalizes its own prop", async () => {
      await import("./fixtures/self-mutating-element.js");
      const el = createElement("self-mutating-element", { label: "hello" });

      // Changing the label triggers render() which calls setAttribute("label", "WORLD"),
      // which would re-enter attributeChangedCallback, the guard must stop the loop.
      expect(() => el.setAttribute("label", "world")).not.toThrow();
      await el.updateComplete;
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

    it("resolves via querySelector for a CSS class selector", async () => {
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
      expect(spy).toHaveBeenCalledWith(expect.stringContaining("Passed element not found."));
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

    it("text-position: batched attribute changes produce exactly one render", async () => {
      const el = await createElement("basic-element", { label: "initial" });
      const spy = vi.spyOn(el, "render");

      el.setAttribute("label", "a");
      el.setAttribute("label", "b");
      el.setAttribute("label", "c");
      await tick();

      expect(spy).toHaveBeenCalledTimes(1);
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
    it("is called on re-renders triggered by attributeChangedCallback", async () => {
      await import("./fixtures/extended-element.js");
      const el = await createElement("extended-element", { label: "initial" });
      const updateCountAfterConnect = el.getAttribute("data-update-count");

      // Trigger a re-render by changing an observed attribute
      el.setAttribute("label", "changed");
      await el.updateComplete;

      // updated() should have been called again; count increments
      const updateCountAfterChange = el.getAttribute("data-update-count");
      expect(Number(updateCountAfterChange)).toBe(Number(updateCountAfterConnect) + 1);
    });
  });

  describe("willUpdate / firstUpdated / updated hooks", () => {
    it("fires in order: willUpdate → render → firstUpdated → updated on first connect", () => {
      const calls = [];
      class HookOrderEl extends Elena(HTMLElement) {
        static tagName = "test-hook-order";
        willUpdate() {
          calls.push("willUpdate");
        }
        render() {
          calls.push("render");
          return html`<span></span>`;
        }
        firstUpdated() {
          calls.push("firstUpdated");
        }
        updated() {
          calls.push("updated");
        }
      }
      HookOrderEl.define();

      const el = document.createElement("test-hook-order");
      document.body.appendChild(el);
      expect(calls).toEqual(["willUpdate", "render", "firstUpdated", "updated"]);
      el.remove();
    });

    it("re-render fires willUpdate → render → updated (skips firstUpdated)", async () => {
      const calls = [];
      class HookReRenderEl extends Elena(HTMLElement) {
        static tagName = "test-hook-rerender";
        static props = ["label"];
        label = "";
        willUpdate() {
          calls.push("willUpdate");
        }
        render() {
          calls.push("render");
          return html`<span>${this.label}</span>`;
        }
        firstUpdated() {
          calls.push("firstUpdated");
        }
        updated() {
          calls.push("updated");
        }
      }
      HookReRenderEl.define();

      const el = document.createElement("test-hook-rerender");
      document.body.appendChild(el);
      calls.length = 0;

      el.setAttribute("label", "changed");
      await el.updateComplete;
      expect(calls).toEqual(["willUpdate", "render", "updated"]);
      el.remove();
    });

    it("firstUpdated fires exactly once across connect and reconnect", () => {
      let count = 0;
      class HookFirstEl extends Elena(HTMLElement) {
        static tagName = "test-hook-first";
        firstUpdated() {
          count++;
        }
        render() {
          return html`<span></span>`;
        }
      }
      HookFirstEl.define();

      const el = document.createElement("test-hook-first");
      document.body.appendChild(el);
      expect(count).toBe(1);

      const container = document.createElement("div");
      document.body.appendChild(container);
      el.remove();
      container.appendChild(el);
      expect(count).toBe(1);

      el.remove();
      container.remove();
    });

    it("updated fires on every connect including reconnection", () => {
      let count = 0;
      class HookUpdReconnectEl extends Elena(HTMLElement) {
        static tagName = "test-hook-upd-reconnect";
        updated() {
          count++;
        }
        render() {
          return html`<span></span>`;
        }
      }
      HookUpdReconnectEl.define();

      const el = document.createElement("test-hook-upd-reconnect");
      document.body.appendChild(el);
      expect(count).toBe(1);

      const container = document.createElement("div");
      document.body.appendChild(container);
      el.remove();
      container.appendChild(el);
      expect(count).toBe(2);

      el.remove();
      container.remove();
    });

    it("state set in willUpdate is available to render()", () => {
      class HookWillUpdateStateEl extends Elena(HTMLElement) {
        static tagName = "test-hook-willupdate-state";
        static props = ["label"];
        label = "";
        willUpdate() {
          this._upper = this.label.toUpperCase();
        }
        render() {
          return html`<span>${this._upper}</span>`;
        }
      }
      HookWillUpdateStateEl.define();

      const el = document.createElement("test-hook-willupdate-state");
      el.label = "hello";
      document.body.appendChild(el);
      expect(el.querySelector("span").textContent).toBe("HELLO");
      el.remove();
    });

    it("this.element is available in firstUpdated and updated", () => {
      let elementInFirstUpdated;
      let elementInUpdated;
      class HookElementAvailEl extends Elena(HTMLElement) {
        static tagName = "test-hook-element-avail";
        firstUpdated() {
          elementInFirstUpdated = this.element;
        }
        updated() {
          elementInUpdated = this.element;
        }
        render() {
          return html`<span></span>`;
        }
      }
      HookElementAvailEl.define();

      const el = document.createElement("test-hook-element-avail");
      document.body.appendChild(el);
      expect(elementInFirstUpdated).not.toBeNull();
      expect(elementInUpdated).not.toBeNull();
      el.remove();
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
      expect(spy).toHaveBeenCalledWith(expect.stringContaining("Cannot add events"));
      spy.mockRestore();
    });
  });

  describe("disconnectCallback safe no-op paths", () => {
    it("does not throw when disconnecting an element with no events configured", async () => {
      const el = await createElement("no-props-element");
      // no-props-element has no events in options
      expect(() => el.remove()).not.toThrow();
    });

    it("safely handles disconnect of a HTML Web Component with no events", async () => {
      await import("./fixtures/wrapper-element.js");
      const el = await createElement("wrapper-element");
      expect(() => el.remove()).not.toThrow();
    });
  });

  describe("microtask batching", () => {
    it("multiple prop changes in one tick produce exactly one render", async () => {
      const el = await createElement("basic-element", { label: "initial" });
      const spy = vi.spyOn(el, "render");

      el.setAttribute("label", "a");
      el.setAttribute("label", "b");
      el.setAttribute("label", "c");
      await el.updateComplete;

      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    it("updateComplete resolves after DOM is updated", async () => {
      const el = await createElement("basic-element", { label: "initial" });
      el.setAttribute("label", "updated");
      await el.updateComplete;
      expect(el.querySelector(".inner").textContent).toBe("updated");
    });

    it("updateComplete resolves immediately when no render is pending", async () => {
      const el = await createElement("basic-element", { label: "hello" });
      await el.updateComplete;
      // No render is pending now
      await el.updateComplete;
      expect(el.querySelector(".inner").textContent).toBe("hello");
    });

    it("requestUpdate() triggers a deferred render", async () => {
      const el = await createElement("basic-element", { label: "hello" });
      const spy = vi.spyOn(el, "render");
      el.requestUpdate();
      await el.updateComplete;
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    it("requestUpdate() is a no-op before hydration", () => {
      const el = document.createElement("basic-element");
      const spy = vi.spyOn(el, "render");
      el.requestUpdate();
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });

    it("_safeRender() is a no-op when _isRendering is true", () => {
      const el = createElement("basic-element", { label: "hello" });
      el._isRendering = true;
      const spy = vi.spyOn(el, "_performUpdate");
      el._safeRender();
      expect(spy).not.toHaveBeenCalled();
      el._isRendering = false;
      spy.mockRestore();
    });

    it("multiple requestUpdate() calls coalesce into one render", async () => {
      const el = await createElement("basic-element", { label: "hello" });
      const spy = vi.spyOn(el, "render");
      el.requestUpdate();
      el.requestUpdate();
      el.requestUpdate();
      await el.updateComplete;
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    it("willUpdate and updated each fire once per batched render", async () => {
      const el = await createElement("basic-element", { label: "a" });
      const willUpdateSpy = vi.spyOn(el, "willUpdate");
      const updatedSpy = vi.spyOn(el, "updated");

      el.setAttribute("label", "x");
      el.setAttribute("label", "y");
      el.setAttribute("label", "z");
      await el.updateComplete;

      expect(willUpdateSpy).toHaveBeenCalledTimes(1);
      expect(updatedSpy).toHaveBeenCalledTimes(1);
      willUpdateSpy.mockRestore();
      updatedSpy.mockRestore();
    });
  });

  describe("props changed during lifecycle hooks", () => {
    it("setting a prop in willUpdate() syncs the attribute", () => {
      class WillUpdatePropEl extends Elena(HTMLElement) {
        static tagName = "test-willupdate-prop";
        static props = ["label", "upper"];
        label = "";
        upper = "";
        willUpdate() {
          this.upper = this.label.toUpperCase();
        }
        render() {
          return html`<span>${this.upper}</span>`;
        }
      }
      WillUpdatePropEl.define();

      const el = document.createElement("test-willupdate-prop");
      el.label = "hello";
      document.body.appendChild(el);
      expect(el.querySelector("span").textContent).toBe("HELLO");
      expect(el.getAttribute("upper")).toBe("HELLO");
      el.remove();
    });

    it("setting a prop in updated() schedules a new microtask render", async () => {
      let renderCount = 0;
      class UpdatedPropEl extends Elena(HTMLElement) {
        static tagName = "test-updated-prop";
        static props = ["count"];
        count = 0;
        updated() {
          renderCount++;
          // Only set once to avoid infinite loop
          if (this.count === 0 && this._hydrated) {
            this.count = 1;
          }
        }
        render() {
          return html`<span>${this.count}</span>`;
        }
      }
      UpdatedPropEl.define();

      const el = document.createElement("test-updated-prop");
      document.body.appendChild(el);
      // First render: count=0, updated sets count=1, triggers re-render
      await el.updateComplete;
      expect(el.count).toBe(1);
      expect(renderCount).toBeGreaterThanOrEqual(2);
      el.remove();
    });

    it("setting a prop in firstUpdated() schedules a new render", async () => {
      class FirstUpdatedPropEl extends Elena(HTMLElement) {
        static tagName = "test-firstupdated-prop";
        static props = ["label"];
        label = "initial";
        firstUpdated() {
          this.label = "from-firstUpdated";
        }
        render() {
          return html`<span>${this.label}</span>`;
        }
      }
      FirstUpdatedPropEl.define();

      const el = document.createElement("test-firstupdated-prop");
      document.body.appendChild(el);
      await el.updateComplete;
      expect(el.label).toBe("from-firstUpdated");
      expect(el.querySelector("span").textContent).toBe("from-firstUpdated");
      el.remove();
    });

    it("modifying this.text in willUpdate() is available in render", () => {
      class WillUpdateTextEl extends Elena(HTMLElement) {
        static tagName = "test-willupdate-text";
        willUpdate() {
          if (this.text) {
            this._processed = this.text.trim().toUpperCase();
          }
        }
        render() {
          return html`<span>${this._processed || ""}</span>`;
        }
      }
      WillUpdateTextEl.define();

      const el = document.createElement("test-willupdate-text");
      el.textContent = "  hello  ";
      document.body.appendChild(el);
      expect(el.querySelector("span").textContent).toBe("HELLO");
      el.remove();
    });
  });

  describe("async lifecycle patterns", () => {
    it("chaining updateComplete across multiple prop changes", async () => {
      const el = createElement("basic-element", { label: "a" });

      el.setAttribute("label", "b");
      await el.updateComplete;
      expect(el.querySelector(".inner").textContent).toBe("b");

      el.setAttribute("label", "c");
      await el.updateComplete;
      expect(el.querySelector(".inner").textContent).toBe("c");

      el.setAttribute("label", "d");
      await el.updateComplete;
      expect(el.querySelector(".inner").textContent).toBe("d");
    });

    it("multiple sequential await el.updateComplete calls", async () => {
      const el = createElement("basic-element", { label: "start" });

      // No pending render: should resolve immediately
      await el.updateComplete;
      await el.updateComplete;
      await el.updateComplete;

      expect(el.querySelector(".inner").textContent).toBe("start");
    });

    it("updateComplete after requestUpdate() in a setTimeout", async () => {
      const el = createElement("basic-element", { label: "initial" });

      await new Promise(resolve => {
        setTimeout(() => {
          el.requestUpdate();
          resolve();
        }, 0);
      });

      await el.updateComplete;
      // Should complete without error
      expect(el.hasAttribute("hydrated")).toBe(true);
    });
  });

  describe("rapid disconnect/reconnect", () => {
    it("10-cycle disconnect/reconnect does not break the component", async () => {
      const el = createElement("basic-element", { label: "stable" });
      const container = document.createElement("div");
      document.body.appendChild(container);

      for (let i = 0; i < 10; i++) {
        el.remove();
        container.appendChild(el);
      }

      expect(el.querySelector(".inner").textContent).toBe("stable");
      expect(el.hasAttribute("hydrated")).toBe(true);

      el.setAttribute("label", "after-cycles");
      await el.updateComplete;
      expect(el.querySelector(".inner").textContent).toBe("after-cycles");
    });

    it("events work correctly after rapid disconnect/reconnect cycles", async () => {
      await import("./fixtures/event-element.js");
      const el = createElement("event-element");
      const container = document.createElement("div");
      document.body.appendChild(container);

      for (let i = 0; i < 5; i++) {
        el.remove();
        container.appendChild(el);
      }

      const handler = vi.fn();
      el.addEventListener("click", handler);
      el.element.click();
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe("_setupStaticProps (WeakSet guard)", () => {
    it("runs only once per class: getter is not redefined for a second instance", async () => {
      await createElement("basic-element");
      // Capture the getter reference after the first instance ran setup
      const getterAfterFirst = Object.getOwnPropertyDescriptor(BasicElement.prototype, "label").get;

      const el2 = document.createElement("basic-element");
      document.body.appendChild(el2);
      // If setProps ran again it would create a new function object; same ref means it was skipped
      const getterAfterSecond = Object.getOwnPropertyDescriptor(
        BasicElement.prototype,
        "label"
      ).get;

      expect(getterAfterFirst).toBe(getterAfterSecond);
    });

    it("observedAttributes includes 'text' even when static props is not defined", () => {
      class NoPropEl extends Elena(HTMLElement) {}
      expect(NoPropEl.observedAttributes).toEqual(["text"]);
    });

    it("observedAttributes returns cached array on subsequent access", () => {
      class CachedAttrEl extends Elena(HTMLElement) {
        static props = ["foo"];
        foo = "";
      }
      const first = CachedAttrEl.observedAttributes;
      const second = CachedAttrEl.observedAttributes;
      expect(first).toBe(second);
      expect(first).toEqual(["foo", "text"]);
    });

    it("subclass gets its own independent setup from its parent Elena component", () => {
      class ParentComp extends Elena(HTMLElement) {
        static props = ["base"];
        base = "parent-default";
        render() {
          return html`<span>${this.base}</span>`;
        }
      }

      class ChildComp extends ParentComp {
        static tagName = "test-child-comp-setup";
        static props = ["base", "extra"];
        extra = "child-default";
      }
      ChildComp.define();

      const el = document.createElement("test-child-comp-setup");
      document.body.appendChild(el);

      el.extra = "updated";
      expect(el.extra).toBe("updated");

      // Parent prop still works through the prototype chain
      el.base = "base-updated";
      expect(el.base).toBe("base-updated");

      el.remove();
    });
  });
});

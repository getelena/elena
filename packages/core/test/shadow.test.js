import { describe, it, expect, vi } from "vitest";
import { createElement } from "./setup.js";
import { Elena, html } from "../src/elena.js";
import { renderTemplate } from "../src/common/render.js";
import "./fixtures/shadow-element.js";
import ShadowStylesElement from "./fixtures/shadow-styles-element.js";
import { adoptedSheet } from "./fixtures/shadow-sheet-element.js";
import "./fixtures/shadow-text-element.js";
import "./fixtures/shadow-selector-element.js";
import "./fixtures/dsd-element.js";
import "./fixtures/shadow-event-element.js";
import "./fixtures/shadow-complex-element.js";
import "./fixtures/shadow-boolean-element.js";

describe("shadow DOM", () => {
  describe("shadow root", () => {
    it("attaches an open shadow root on connect", async () => {
      const el = await createElement("shadow-element");
      expect(el.shadowRoot).not.toBeNull();
      expect(el.shadowRoot.mode).toBe("open");
    });

    it("does not re-attach shadow root on reconnection", async () => {
      const el = await createElement("shadow-element");
      const root = el.shadowRoot;
      el.remove();
      document.body.appendChild(el);
      expect(el.shadowRoot).toBe(root);
    });
  });

  describe("rendering", () => {
    it("renders template into shadowRoot, not light DOM", async () => {
      const el = await createElement("shadow-element");
      expect(el.shadowRoot.querySelector("button")).not.toBeNull();
      expect(el.innerHTML.trim()).toBe("");
    });

    it("re-renders inside shadowRoot after prop change", async () => {
      const el = await createElement("shadow-element", { label: "Before" });
      expect(el.shadowRoot.querySelector("button").textContent).toBe("Before");
      el.setAttribute("label", "After");
      await el.updateComplete;
      expect(el.shadowRoot.querySelector("button").textContent).toBe("After");
    });

    it("light DOM remains empty after re-render", async () => {
      const el = await createElement("shadow-element", { label: "Hello" });
      el.setAttribute("label", "World");
      await el.updateComplete;
      expect(el.innerHTML.trim()).toBe("");
    });
  });

  describe("styles", () => {
    it("adopts all stylesheets from a static styles array", async () => {
      const el = await createElement("shadow-styles-element");
      expect(el.shadowRoot.adoptedStyleSheets.length).toBe(2);
    });

    it("adopts a pre-created CSSStyleSheet instance directly", async () => {
      const el = await createElement("shadow-sheet-element");
      expect(el.shadowRoot.adoptedStyleSheets.length).toBe(1);
      expect(el.shadowRoot.adoptedStyleSheets[0]).toBe(adoptedSheet);
    });

    it("caches _adoptedSheets on the class and shares them across instances", async () => {
      const el1 = await createElement("shadow-styles-element");
      const sheets = ShadowStylesElement._adoptedSheets;
      const el2 = await createElement("shadow-styles-element");
      expect(ShadowStylesElement._adoptedSheets).toBe(sheets);
      expect(el1.shadowRoot.adoptedStyleSheets.length).toBe(sheets.length);
      expect(el2.shadowRoot.adoptedStyleSheets.length).toBe(sheets.length);
    });
  });

  describe("text", () => {
    it("captures light DOM text before shadow attachment", async () => {
      const el = document.createElement("shadow-text-element");
      el.textContent = "Initial";
      document.body.appendChild(el);
      expect(el.shadowRoot.querySelector("span").textContent).toBe("Initial");
    });

    it("re-renders shadow content when text property is set programmatically", async () => {
      const el = await createElement("shadow-text-element");
      el.text = "Updated";
      await el.updateComplete;
      expect(el.shadowRoot.querySelector("span").textContent).toBe("Updated");
    });

    it("re-renders shadow content when text attribute is set", async () => {
      const el = await createElement("shadow-text-element");
      el.setAttribute("text", "From attribute");
      await el.updateComplete;
      expect(el.shadowRoot.querySelector("span").textContent).toBe("From attribute");
    });
  });

  describe("element resolution", () => {
    it("resolves this.element to firstElementChild of shadow root by default", async () => {
      const el = await createElement("shadow-element");
      expect(el.element).not.toBeNull();
      expect(el.element).toBe(el.shadowRoot.firstElementChild);
    });

    it("resolves this.element using static element selector within shadow root", async () => {
      const el = await createElement("shadow-selector-element");
      expect(el.shadowRoot.firstElementChild.tagName).toBe("DIV");
      expect(el.element.tagName).toBe("BUTTON");
      expect(el.element).toBe(el.shadowRoot.querySelector("button"));
    });
  });

  describe("event delegation", () => {
    it("delegates events from inner shadow element to the host", async () => {
      const el = await createElement("shadow-element");
      let fired = false;
      el.addEventListener("click", () => {
        fired = true;
      });
      el.shadowRoot.querySelector("button").click();
      expect(fired).toBe(true);
    });

    it("stopPropagation is called on original event", async () => {
      const el = await createElement("shadow-event-element");
      const inner = el.element;

      const origEvent = new Event("click", { bubbles: true });
      const spy = vi.spyOn(origEvent, "stopPropagation");
      inner.dispatchEvent(origEvent);

      expect(spy).toHaveBeenCalled();
    });

    it("dispatched event is cancelable", async () => {
      const el = await createElement("shadow-event-element");
      const handler = vi.fn();
      el.addEventListener("click", handler);

      el.element.click();

      expect(handler).toHaveBeenCalledTimes(1);
      const dispatched = handler.mock.calls[0][0];
      expect(dispatched.cancelable).toBe(true);
    });

    it("focus delegation from shadow inner element to host", async () => {
      const el = await createElement("shadow-event-element");
      const handler = vi.fn();
      el.addEventListener("focus", handler);

      el.element.dispatchEvent(new Event("focus", { bubbles: true }));

      expect(handler).toHaveBeenCalledTimes(1);
      const dispatched = handler.mock.calls[0][0];
      expect(dispatched.bubbles).toBe(true);
      expect(dispatched.composed).toBe(true);
    });

    it("both click and focus proxy methods work", async () => {
      const el = await createElement("shadow-event-element");
      expect(typeof el.click).toBe("function");
      expect(typeof el.focus).toBe("function");

      const clickSpy = vi.spyOn(el.element, "click");
      el.click();
      expect(clickSpy).toHaveBeenCalled();
      clickSpy.mockRestore();
    });

    it("events are cleaned up on disconnect", async () => {
      const el = await createElement("shadow-event-element");
      const inner = el.element;
      const spy = vi.spyOn(inner, "removeEventListener");

      el.remove();

      expect(spy).toHaveBeenCalledWith("click", el);
      expect(spy).toHaveBeenCalledWith("focus", el);
    });
  });

  describe("props and attributes", () => {
    it("reflects props as attributes on the host element", async () => {
      const el = await createElement("shadow-element", { label: "Hello" });
      expect(el.getAttribute("label")).toBe("Hello");
    });

    it("re-renders shadow content when attribute changes", async () => {
      const el = await createElement("shadow-element");
      el.setAttribute("label", "Updated");
      await el.updateComplete;
      expect(el.shadowRoot.querySelector("button").textContent).toBe("Updated");
    });

    it("programmatic prop set re-renders shadow content", async () => {
      const el = await createElement("shadow-element");
      el.label = "Programmatic";
      await el.updateComplete;
      expect(el.shadowRoot.querySelector("button").textContent).toBe("Programmatic");
    });
  });

  describe("lifecycle", () => {
    it("adds hydrated attribute to the host after first connect", async () => {
      const el = await createElement("shadow-element");
      expect(el.hasAttribute("hydrated")).toBe(true);
    });

    it("fires firstUpdated only on first connect, not on reconnection", async () => {
      const el = await createElement("shadow-element");
      const spy = vi.spyOn(el, "firstUpdated");
      el.remove();
      document.body.appendChild(el);
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });

    it("fires updated after each re-render", async () => {
      const el = await createElement("shadow-element");
      const spy = vi.spyOn(el, "updated");
      el.setAttribute("label", "New");
      await el.updateComplete;
      expect(spy).toHaveBeenCalledOnce();
      spy.mockRestore();
    });

    it("fires willUpdate before each re-render", async () => {
      const el = await createElement("shadow-element");
      const spy = vi.spyOn(el, "willUpdate");
      el.setAttribute("label", "Trigger");
      await el.updateComplete;
      expect(spy).toHaveBeenCalledOnce();
      spy.mockRestore();
    });

    it("updateComplete resolves after shadow re-render finishes", async () => {
      const el = await createElement("shadow-element");
      el.setAttribute("label", "Async");
      await el.updateComplete;
      expect(el.shadowRoot.querySelector("button").textContent).toBe("Async");
    });

    it("fires in order: willUpdate → render → firstUpdated → updated on first connect", () => {
      const calls = [];
      class ShadowHookOrderEl extends Elena(HTMLElement) {
        static tagName = "shadow-hook-order";
        static shadow = "open";
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
      ShadowHookOrderEl.define();

      const el = document.createElement("shadow-hook-order");
      document.body.appendChild(el);
      expect(calls).toEqual(["willUpdate", "render", "firstUpdated", "updated"]);
      el.remove();
    });

    it("re-render fires willUpdate → render → updated (skips firstUpdated)", async () => {
      const calls = [];
      class ShadowHookReRenderEl extends Elena(HTMLElement) {
        static tagName = "shadow-hook-rerender";
        static shadow = "open";
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
      ShadowHookReRenderEl.define();

      const el = document.createElement("shadow-hook-rerender");
      document.body.appendChild(el);
      calls.length = 0;

      el.setAttribute("label", "changed");
      await el.updateComplete;
      expect(calls).toEqual(["willUpdate", "render", "updated"]);
      el.remove();
    });

    it("state set in willUpdate is available to render in shadow root", () => {
      class ShadowWillUpdateStateEl extends Elena(HTMLElement) {
        static tagName = "shadow-willupdate-state";
        static shadow = "open";
        static props = ["label"];
        label = "";
        willUpdate() {
          this._upper = this.label.toUpperCase();
        }
        render() {
          return html`<span>${this._upper}</span>`;
        }
      }
      ShadowWillUpdateStateEl.define();

      const el = document.createElement("shadow-willupdate-state");
      el.label = "hello";
      document.body.appendChild(el);
      expect(el.shadowRoot.querySelector("span").textContent).toBe("HELLO");
      el.remove();
    });

    it("this.element is available in firstUpdated and updated", () => {
      let elementInFirstUpdated;
      let elementInUpdated;
      class ShadowElementAvailEl extends Elena(HTMLElement) {
        static tagName = "shadow-element-avail";
        static shadow = "open";
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
      ShadowElementAvailEl.define();

      const el = document.createElement("shadow-element-avail");
      document.body.appendChild(el);
      expect(elementInFirstUpdated).not.toBeNull();
      expect(elementInFirstUpdated).toBe(el.shadowRoot.firstElementChild);
      expect(elementInUpdated).not.toBeNull();
      el.remove();
    });

    it("microtask batching: multiple prop changes produce one render", async () => {
      const el = await createElement("shadow-element", { label: "initial" });
      const spy = vi.spyOn(el, "render");

      el.setAttribute("label", "a");
      el.setAttribute("label", "b");
      el.setAttribute("label", "c");
      await el.updateComplete;

      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    it("requestUpdate() triggers deferred shadow re-render", async () => {
      const el = await createElement("shadow-element", { label: "hello" });
      const spy = vi.spyOn(el, "render");
      el.requestUpdate();
      await el.updateComplete;
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    it("multiple requestUpdate() calls coalesce into one render", async () => {
      const el = await createElement("shadow-element", { label: "hello" });
      const spy = vi.spyOn(el, "render");
      el.requestUpdate();
      el.requestUpdate();
      el.requestUpdate();
      await el.updateComplete;
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    it("pre-connection prop setting flushed into shadow root on connect", () => {
      const el = document.createElement("shadow-element");
      el.label = "buffered";
      expect(el.hasAttribute("label")).toBe(false);

      document.body.appendChild(el);
      expect(el.getAttribute("label")).toBe("buffered");
      expect(el.shadowRoot.querySelector("button").textContent).toBe("buffered");
      el.remove();
    });

    it("attributeChangedCallback skips re-render when _isRendering", () => {
      const el = createElement("shadow-element", { label: "hello" });
      const spy = vi.spyOn(el, "render");

      el._isRendering = true;
      el.attributeChangedCallback("label", "hello", "world");

      expect(spy).not.toHaveBeenCalled();
      el._isRendering = false;
      spy.mockRestore();
    });

    it("disconnectedCallback removes event listeners on shadow inner element", async () => {
      const el = await createElement("shadow-event-element");
      const inner = el.element;
      const spy = vi.spyOn(inner, "removeEventListener");

      el.remove();

      expect(spy).toHaveBeenCalledWith("click", el);
      expect(spy).toHaveBeenCalledWith("focus", el);
      spy.mockRestore();
    });

    it("does not re-set hydrated attribute on reconnection", async () => {
      const el = await createElement("shadow-element");
      const spy = vi.spyOn(el, "setAttribute");

      const container = document.createElement("div");
      document.body.appendChild(container);
      el.remove();
      container.appendChild(el);

      expect(spy).not.toHaveBeenCalledWith("hydrated", "");
      spy.mockRestore();
    });
  });

  describe("DOM diffing", () => {
    it("text node identity preserved across re-renders (fast path)", async () => {
      const el = await createElement("shadow-element", { label: "Hello" });
      const root = el.shadowRoot;
      const textNode = root.querySelector("button").firstChild;

      el.setAttribute("label", "World");
      await el.updateComplete;

      // Same text node object patched in-place
      expect(root.querySelector("button").firstChild).toBe(textNode);
      expect(root.querySelector("button").textContent).toBe("World");
    });

    it("skips redundant renders when values are unchanged", () => {
      const el = createElement("shadow-element", { label: "Test" });
      const root = el.shadowRoot;

      // Spy on innerHTML setter after initial render
      let innerHTMLCallCount = 0;
      const originalDescriptor =
        Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML") ||
        Object.getOwnPropertyDescriptor(HTMLElement.prototype, "innerHTML");
      const origSet = originalDescriptor.set;
      Object.defineProperty(root, "innerHTML", {
        configurable: true,
        get: originalDescriptor.get,
        set(val) {
          innerHTMLCallCount++;
          origSet.call(this, val);
        },
      });

      // Trigger re-render with same value: fast path skips innerHTML
      el.render();
      expect(innerHTMLCallCount).toBe(0);

      // Clean up
      delete root.innerHTML;
    });

    it("_tplParts holds live DOM nodes inside shadow root", () => {
      const el = createElement("shadow-element", { label: "Hello" });
      const root = el.shadowRoot;
      const textNode = root._tplParts[0];
      expect(textNode.textContent).toBe("Hello");

      // Different strings ref forces cold-path fullRender
      const t = html`<button>${"World"}</button>`;
      renderTemplate(root, t.strings, t.values);
      const newTextNode = root._tplParts[0];
      expect(newTextNode.textContent).toBe("World");
      expect(root.contains(newTextNode)).toBe(true);
    });

    it("template cache stays coherent after disconnect and reconnect", async () => {
      const el = await createElement("shadow-element", { label: "Hello" });
      const root = el.shadowRoot;
      const textNode = root._tplParts[0];

      // Remove and re-insert
      el.remove();
      document.body.appendChild(el);

      // After reconnect, fast-path should still work with cached parts
      el.setAttribute("label", "World");
      await el.updateComplete;
      expect(root.querySelector("button").textContent).toBe("World");
      // Same text node was patched (not a full re-render)
      expect(root._tplParts[0]).toBe(textNode);
    });

    it("element ref is preserved across fast-path re-renders", async () => {
      const el = await createElement("shadow-element", { label: "Hello" });
      const ref = el.element;

      el.setAttribute("label", "World");
      await el.updateComplete;
      expect(el.element).toBe(ref);
    });
  });

  describe("complex templates", () => {
    it("renders all interpolation types", () => {
      const el = createElement("shadow-complex-element", {
        label: "Email",
        type: "email",
        name: "email",
        description: "Enter your email",
        error: "Invalid email",
      });
      const root = el.shadowRoot;
      expect(root.querySelector("label").textContent).toBe("Email");
      expect(root.querySelector(".elena-desc").textContent).toBe("Enter your email");
      expect(root.querySelector(".elena-input").getAttribute("type")).toBe("email");
      expect(root.querySelector(".elena-input").getAttribute("name")).toBe("email");
      expect(root.querySelector(".elena-error").textContent).toBe("Invalid email");
    });

    it("omits conditional blocks when condition is falsy", () => {
      const el = createElement("shadow-complex-element", { label: "Name", type: "text" });
      const root = el.shadowRoot;
      expect(root.querySelector("label").textContent).toBe("Name");
      expect(root.querySelector(".elena-desc")).toBeNull();
      expect(root.querySelector(".elena-error")).toBeNull();
    });

    it("renders conditional block when condition becomes truthy", async () => {
      const el = createElement("shadow-complex-element", { label: "Name" });
      const root = el.shadowRoot;
      expect(root.querySelector(".elena-desc")).toBeNull();

      el.setAttribute("description", "Please enter your name");
      await el.updateComplete;
      expect(root.querySelector(".elena-desc")).not.toBeNull();
      expect(root.querySelector(".elena-desc").textContent).toBe("Please enter your name");
    });

    it("removes conditional block when condition becomes falsy", async () => {
      const el = createElement("shadow-complex-element", {
        label: "Name",
        error: "Required",
      });
      const root = el.shadowRoot;
      expect(root.querySelector(".elena-error").textContent).toBe("Required");

      el.setAttribute("error", "");
      await el.updateComplete;
      expect(root.querySelector(".elena-error")).toBeNull();
    });

    it("handles conditional attributes", () => {
      const el = createElement("shadow-complex-element", {
        label: "Name",
        name: "username",
        disabled: true,
      });
      const input = el.shadowRoot.querySelector(".elena-input");
      expect(input.getAttribute("name")).toBe("username");
      expect(input.hasAttribute("disabled")).toBe(true);
    });

    it("re-renders correctly when multiple values change", async () => {
      const el = createElement("shadow-complex-element", { label: "Name" });
      const root = el.shadowRoot;
      expect(root.querySelector(".elena-desc")).toBeNull();
      expect(root.querySelector(".elena-error")).toBeNull();

      el.setAttribute("description", "Help text");
      el.setAttribute("error", "Error text");
      await el.updateComplete;
      expect(root.querySelector(".elena-desc").textContent).toBe("Help text");
      expect(root.querySelector(".elena-error").textContent).toBe("Error text");
    });
  });

  describe("declarative shadow DOM", () => {
    it("does not re-attach shadow root when one already exists", async () => {
      const el = document.createElement("shadow-element");
      el.attachShadow({ mode: "open" });
      const preExistingRoot = el.shadowRoot;
      document.body.appendChild(el);
      expect(el.shadowRoot).toBe(preExistingRoot);
    });

    it("renders into a pre-existing shadow root", async () => {
      const el = document.createElement("shadow-element");
      el.attachShadow({ mode: "open" });
      el.setAttribute("label", "DSD");
      document.body.appendChild(el);
      expect(el.shadowRoot.querySelector("button")).not.toBeNull();
      expect(el.shadowRoot.querySelector("button").textContent).toBe("DSD");
    });

    it("adopts stylesheets onto a pre-existing shadow root", async () => {
      const el = document.createElement("shadow-styles-element");
      el.attachShadow({ mode: "open" });
      document.body.appendChild(el);
      expect(el.shadowRoot.adoptedStyleSheets.length).toBe(2);
    });

    it("leaves a pre-existing shadow root untouched when render() is not defined", async () => {
      const el = document.createElement("dsd-element");
      el.attachShadow({ mode: "open" });
      el.shadowRoot.innerHTML = "<button><slot></slot></button>";
      document.body.appendChild(el);
      expect(el.shadowRoot.querySelector("button")).not.toBeNull();
      expect(el.shadowRoot.querySelector("slot")).not.toBeNull();
    });

    it("adopts stylesheets when render() is not defined", async () => {
      const el = document.createElement("dsd-element");
      el.attachShadow({ mode: "open" });
      document.body.appendChild(el);
      expect(el.shadowRoot.adoptedStyleSheets.length).toBe(1);
    });
  });

  describe("re-insertion", () => {
    function moveElement(el, target) {
      el.remove();
      target.appendChild(el);
    }

    it("reconnects correctly after removal", async () => {
      const el = await createElement("shadow-element");
      el.remove();
      document.body.appendChild(el);
      expect(el.shadowRoot).not.toBeNull();
      expect(el.shadowRoot.querySelector("button")).not.toBeNull();
    });

    it("preserves shadow content after reconnection", async () => {
      const el = await createElement("shadow-element", { label: "Persist" });
      el.remove();
      document.body.appendChild(el);
      expect(el.shadowRoot.querySelector("button").textContent).toBe("Persist");
    });

    it("preserves prop values across disconnect and reconnect", async () => {
      const el = await createElement("shadow-element", { label: "Kept" });
      el.remove();
      document.body.appendChild(el);
      expect(el.label).toBe("Kept");
    });

    it("click delegation works after moving to a different parent", async () => {
      const el = await createElement("shadow-event-element");
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
      const el = await createElement("shadow-event-element");
      const container = document.createElement("div");
      document.body.appendChild(container);

      moveElement(el, container);

      const handler = vi.fn();
      el.addEventListener("focus", handler);
      el.element.dispatchEvent(new Event("focus", { bubbles: true }));

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("proxy methods work after re-insertion", async () => {
      const el = await createElement("shadow-event-element");
      const container = document.createElement("div");
      document.body.appendChild(container);

      moveElement(el, container);

      const spy = vi.spyOn(el.element, "click");
      el.click();
      expect(spy).toHaveBeenCalled();
    });

    it("multiple remove/re-insert cycles do not duplicate event handlers", async () => {
      const el = await createElement("shadow-event-element");
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

    it("property setter syncs to attributes after re-insertion", async () => {
      const el = await createElement("shadow-element", { label: "before" });
      const container = document.createElement("div");
      document.body.appendChild(container);

      moveElement(el, container);

      el.label = "after";
      expect(el.getAttribute("label")).toBe("after");
    });

    it("attribute change triggers shadow re-render after re-insertion", async () => {
      const el = await createElement("shadow-element", { label: "Hello" });
      const container = document.createElement("div");
      document.body.appendChild(container);

      moveElement(el, container);

      el.setAttribute("label", "World");
      await el.updateComplete;
      expect(el.shadowRoot.querySelector("button").textContent).toBe("World");
    });

    it("boolean prop toggles correctly after re-insertion", async () => {
      const el = await createElement("shadow-boolean-element", { disabled: "" });
      const container = document.createElement("div");
      document.body.appendChild(container);

      moveElement(el, container);

      el.disabled = false;
      expect(el.hasAttribute("disabled")).toBe(false);

      el.disabled = true;
      expect(el.hasAttribute("disabled")).toBe(true);
    });

    it("props set while disconnected reflected in shadow root after re-insertion", async () => {
      const el = await createElement("shadow-element", { label: "initial" });

      el.remove();
      el.label = "updated-while-disconnected";

      const container = document.createElement("div");
      document.body.appendChild(container);
      container.appendChild(el);

      expect(el.shadowRoot.querySelector("button").textContent).toBe("updated-while-disconnected");
    });
  });
});

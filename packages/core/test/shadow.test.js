import { describe, it, expect, vi } from "vitest";
import { createElement } from "./setup.js";
import "./fixtures/shadow-element.js";
import ShadowStylesElement from "./fixtures/shadow-styles-element.js";
import { adoptedSheet } from "./fixtures/shadow-sheet-element.js";
import "./fixtures/shadow-text-element.js";
import "./fixtures/shadow-selector-element.js";

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
  });

  describe("re-insertion", () => {
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
  });
});

import { describe, it, expect, vi } from "vitest";
import { Elena } from "../src/elena.js";
import { defineElement, html, nothing, unsafeHTML } from "../src/common/utils.js";
import { renderTemplate } from "../src/common/render.js";
import { escapeHtml } from "../src/common/utils.js";
import NothingElement from "./fixtures/nothing-element.js";

describe("utils", () => {
  describe("renderTemplate fast-path edge cases", () => {
    const tplStrings = Object.assign(["<span>", "</span>"], { raw: ["<span>", "</span>"] });

    it("patches text node with null value on fast path", () => {
      const el = document.createElement("div");
      renderTemplate(el, tplStrings, ["Hello"]);
      expect(el.querySelector("span").textContent).toBe("Hello");

      // Re-render with null: same strings ref triggers fast path
      renderTemplate(el, tplStrings, [null]);
      expect(el.querySelector("span").textContent).toBe("");
    });

    it("patches text node with undefined value on fast path", () => {
      const el = document.createElement("div");
      renderTemplate(el, tplStrings, ["Hello"]);

      renderTemplate(el, tplStrings, [undefined]);
      expect(el.querySelector("span").textContent).toBe("");
    });

    it("triggers full render when raw html value changes on fast path", () => {
      const template = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });
      const el = document.createElement("div");

      // First render with a plain string
      renderTemplate(el, template, ["text"]);
      expect(el.querySelector("div").textContent).toBe("text");

      // Re-render with a raw html value: forces full render
      renderTemplate(el, template, [html`<b>bold</b>`]);
      expect(el.querySelector("div").querySelector("b").textContent).toBe("bold");
    });
  });

  describe("template cache lifecycle", () => {
    it("_templateParts references live DOM nodes after initial render", () => {
      const template = Object.assign(["<span>", "</span>"], { raw: ["<span>", "</span>"] });
      const el = document.createElement("div");
      renderTemplate(el, template, ["Hello"]);

      // _templateParts[0] should be the actual text node inside the span
      const textNode = el._templateParts[0];
      expect(textNode).toBeDefined();
      expect(textNode.parentNode).toBe(el.querySelector("span"));
    });

    it("replaces _templateParts with fresh nodes after full re-render", () => {
      // Both values in text positions so mapTextNodes can match them
      const template = Object.assign(["<span>", "</span><span>", "</span>"], {
        raw: ["<span>", "</span><span>", "</span>"],
      });
      const el = document.createElement("div");

      renderTemplate(el, template, ["A", "B"]);
      const oldTextNode = el._templateParts[0];
      expect(oldTextNode.textContent).toBe("A");

      // Switch first value to raw HTML: forces full re-render
      renderTemplate(el, template, [html`<b>bold</b>`, "B"]);
      const newParts = el._templateParts;

      // Old text node is no longer in the element's subtree
      expect(el.contains(oldTextNode)).toBe(false);
      // _templateParts was rebuilt with fresh nodes
      expect(newParts[0]).not.toBe(oldTextNode);
    });

    it("fully replaces cache when template shape changes", () => {
      const tplA = Object.assign(["<span>", "</span>"], { raw: ["<span>", "</span>"] });
      const tplB = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });
      const el = document.createElement("div");

      renderTemplate(el, tplA, ["Hello"]);
      expect(el._templateStrings).toBe(tplA);
      const oldParts = el._templateParts;

      // Render a different template shape
      renderTemplate(el, tplB, ["World"]);
      expect(el._templateStrings).toBe(tplB);
      expect(el._templateParts).not.toBe(oldParts);
      expect(el._templateValues).toEqual(["World"]);
      expect(el.querySelector("div").textContent).toBe("World");
      expect(el.querySelector("span")).toBeNull();
    });

    it("does not accumulate stale entries in _templateValues across renders", () => {
      const template = Object.assign(["<p>", " ", "</p>"], { raw: ["<p>", " ", "</p>"] });
      const el = document.createElement("div");

      renderTemplate(el, template, ["A", "B"]);
      expect(el._templateValues).toEqual(["A", "B"]);

      renderTemplate(el, template, ["C", "D"]);
      expect(el._templateValues).toEqual(["C", "D"]);
      expect(el._templateValues.length).toBe(2);
    });
  });

  describe("Elena().define()", () => {
    it("is a no-op when options has no tagName", () => {
      const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
      class NoTagName extends Elena(HTMLElement) {}
      expect(() => NoTagName.define()).not.toThrow();
      spy.mockRestore();
    });

    it("is a no-op when Elena is called with no options", () => {
      const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
      class NoOptions extends Elena(HTMLElement) {}
      expect(() => NoOptions.define()).not.toThrow();
      spy.mockRestore();
    });
  });

  describe("nothing", () => {
    it("renders as an empty string", () => {
      expect(String(nothing)).toBe("");
    });

    it("is marked as __raw", () => {
      expect(nothing.__raw).toBe(true);
    });

    it("passes through html`` without escaping", () => {
      const result = html`<span>${nothing}</span>`;
      expect(String(result)).toBe("<span></span>");
    });

    it("in render() conditionally renders content vs empty", async () => {
      const el = document.createElement("nothing-element");
      document.body.appendChild(el);

      expect(el.querySelector(".btn").textContent).toBe("Click");

      // Toggle active to false: should render nothing (empty string)
      el.active = false;
      await el.updateComplete;
      expect(el.querySelector(".btn").textContent).toBe("");

      // Toggle back to true: should re-render the label
      el.active = true;
      await el.updateComplete;
      expect(el.querySelector(".btn").textContent).toBe("Click");

      document.body.removeChild(el);
    });

    it("on fast path: prior nothing render followed by value renders correctly", async () => {
      const el = document.createElement("nothing-element");
      document.body.appendChild(el);

      // Start with active=false (nothing)
      el.active = false;
      await el.updateComplete;
      expect(el.querySelector(".btn").textContent).toBe("");

      // Change label while active is false: should not affect output
      el.label = "New Label";
      await el.updateComplete;
      expect(el.querySelector(".btn").textContent).toBe("");

      // Activate: fast path re-renders, should show new label
      el.active = true;
      await el.updateComplete;
      expect(el.querySelector(".btn").textContent).toBe("New Label");

      document.body.removeChild(el);
    });

    it("avoids false string in output", () => {
      // Contrast: if we interpolated false directly, it would become "false"
      const result = html`<span>${false}</span>`;
      expect(String(result)).toBe("<span>false</span>");

      // But nothing avoids this
      const withNothing = html`<span>${nothing}</span>`;
      expect(String(withNothing)).toBe("<span></span>");
    });
  });

  describe("nothing vs empty values", () => {
    it("nothing in attribute value position produces empty attribute", () => {
      const container = document.createElement("div");
      const t = html`<input value="${nothing}">`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("input").getAttribute("value")).toBe("");
    });

    it("nothing vs empty string vs null vs undefined behavioral differences", () => {
      expect(String(nothing)).toBe("");
      expect(nothing.__raw).toBe(true);

      const withEmpty = html`<span>${""}</span>`;
      expect(String(withEmpty)).toBe("<span></span>");

      const withNull = html`<span>${null}</span>`;
      expect(String(withNull)).toBe("<span></span>");

      const withUndef = html`<span>${undefined}</span>`;
      expect(String(withUndef)).toBe("<span></span>");

      const withFalse = html`<span>${false}</span>`;
      expect(String(withFalse)).toBe("<span>false</span>");
    });
  });

  describe("unsafeHTML", () => {
    it("is marked as __raw", () => {
      expect(unsafeHTML("<b>bold</b>").__raw).toBe(true);
    });

    it("returns the raw string as-is when converted to string", () => {
      expect(String(unsafeHTML("<b>bold</b>"))).toBe("<b>bold</b>");
    });

    it("returns empty string for null input", () => {
      expect(String(unsafeHTML(null))).toBe("");
    });

    it("passes through html`` without escaping the raw markup", () => {
      const result = html`<div>${unsafeHTML("<em>hi</em>")}</div>`;
      expect(String(result)).toBe("<div><em>hi</em></div>");
    });
  });

  describe("escapeHtml", () => {
    it("escapes all five special characters", () => {
      const input = "The & symbol, <tag>, \"quotes\", and 'apostrophes' are escaped";
      const output = escapeHtml(input);

      expect(output).toContain("&amp;");
      expect(output).toContain("&lt;");
      expect(output).toContain("&gt;");
      expect(output).toContain("&quot;");
      expect(output).toContain("&#39;");

      // Verify the full escaped result
      expect(output).toBe(
        "The &amp; symbol, &lt;tag&gt;, &quot;quotes&quot;, and &#39;apostrophes&#39; are escaped"
      );
    });
  });

  describe("html tagged template", () => {
    it("with zero interpolations returns static string in strings array", () => {
      const result = html`<span>Static content</span>`;

      expect(result.strings.length).toBe(1);
      expect(result.values.length).toBe(0);
      expect(String(result)).toBe("<span>Static content</span>");
    });

    it("preserves strings and values properties for diffing", () => {
      const value = "dynamic";
      const result = html`<span>${value}</span>`;

      expect(result.strings).toBeDefined();
      expect(result.values).toBeDefined();
      expect(result.values[0]).toBe(value);
    });

    it("nested html fragment passes through without double-escaping", () => {
      const inner = html`<b>${"hello"}</b>`;
      const outer = html`<div>${inner}</div>`;
      expect(String(outer)).toBe("<div><b>hello</b></div>");
    });

    it("nested html fragment escapes its own dynamic values but not the fragment itself", () => {
      const inner = html`<b>${"<script>"}</b>`;
      const outer = html`<div>${inner}</div>`;
      expect(String(outer)).toBe("<div><b>&lt;script&gt;</b></div>");
      expect(String(outer)).not.toContain("<script>");
    });

    it("deeply nested html fragments compose correctly", () => {
      const a = html`<em>${"text"}</em>`;
      const b = html`<span>${a}</span>`;
      const c = html`<p>${b}</p>`;
      expect(String(c)).toBe("<p><span><em>text</em></span></p>");
    });

    it("renders number values as strings", () => {
      const result = html`<span>${42}</span>`;
      expect(String(result)).toBe("<span>42</span>");
    });

    it("renders 0 without treating it as falsy", () => {
      const result = html`<span>${0}</span>`;
      expect(String(result)).toBe("<span>0</span>");
    });

    it("is marked as __raw", () => {
      const result = html`<span>test</span>`;
      expect(result.__raw).toBe(true);
    });
  });

  describe("defineElement", () => {
    it("registers a new custom element", () => {
      class TestDefine extends HTMLElement {}
      defineElement("test-define-el", TestDefine);
      expect(window.customElements.get("test-define-el")).toBe(TestDefine);
    });

    it("does not re-register an already defined element", () => {
      class TestDupe extends HTMLElement {}
      defineElement("test-dupe-el", TestDupe);

      class TestDupe2 extends HTMLElement {}
      // Should not throw or overwrite the first registration
      defineElement("test-dupe-el", TestDupe2);
      expect(window.customElements.get("test-dupe-el")).toBe(TestDupe);
    });

    it("does nothing when window is undefined", () => {
      const originalWindow = globalThis.window;
      // Temporarily remove window
      delete globalThis.window;
      try {
        class TestNoWindow extends HTMLElement {}
        // Should not throw
        expect(() => defineElement("test-no-window", TestNoWindow)).not.toThrow();
      } finally {
        globalThis.window = originalWindow;
      }
    });
  });
});

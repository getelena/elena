import { describe, it, expect } from "vitest";
import { PATTERNS_CONTENT } from "../src/lib/patterns-content.js";

describe("PATTERNS_CONTENT", () => {
  it("is a non-empty string", () => {
    expect(typeof PATTERNS_CONTENT).toBe("string");
    expect(PATTERNS_CONTENT.length).toBeGreaterThan(0);
  });

  describe("component types", () => {
    it("documents components with render()", () => {
      expect(PATTERNS_CONTENT).toContain("Component with");
      expect(PATTERNS_CONTENT).toContain("render()");
    });

    it("documents html web components", () => {
      expect(PATTERNS_CONTENT).toContain("HTML Web Components");
      expect(PATTERNS_CONTENT).toContain("no `render()` method");
    });
  });

  describe("options object", () => {
    it("documents all four static fields", () => {
      expect(PATTERNS_CONTENT).toContain("`static tagName`");
      expect(PATTERNS_CONTENT).toContain("`static props`");
      expect(PATTERNS_CONTENT).toContain("`static events`");
      expect(PATTERNS_CONTENT).toContain("`static element`");
    });

    it("documents firstElementChild fallback for element option", () => {
      expect(PATTERNS_CONTENT).toContain("firstElementChild");
    });
  });

  describe("templates", () => {
    it("documents html tagged template", () => {
      expect(PATTERNS_CONTENT).toContain("`html`");
      expect(PATTERNS_CONTENT).toContain("auto-escapes");
    });

    it("documents nothing placeholder", () => {
      expect(PATTERNS_CONTENT).toContain("`nothing`");
      expect(PATTERNS_CONTENT).toContain("empty string");
    });

    it("documents nested html sub-templates", () => {
      expect(PATTERNS_CONTENT).toContain("double-escaping");
    });
  });

  describe("element ref", () => {
    it("documents this.element access", () => {
      expect(PATTERNS_CONTENT).toContain("this.element");
    });
  });

  describe("reflecting props", () => {
    it("documents automatic prop/attribute sync", () => {
      expect(PATTERNS_CONTENT).toContain("syncs props and attributes on the host element");
    });
  });

  describe("props", () => {
    it("documents supported types", () => {
      expect(PATTERNS_CONTENT).toContain("String");
      expect(PATTERNS_CONTENT).toContain("Number");
      expect(PATTERNS_CONTENT).toContain("Boolean");
      expect(PATTERNS_CONTENT).toContain("Array");
      expect(PATTERNS_CONTENT).toContain("Object");
    });

    it("documents JSDoc annotations", () => {
      expect(PATTERNS_CONTENT).toContain("@attribute");
      expect(PATTERNS_CONTENT).toContain("@type");
    });
  });

  describe("text content", () => {
    it("documents the text property", () => {
      expect(PATTERNS_CONTENT).toContain("`text`");
      expect(PATTERNS_CONTENT).toContain("textContent");
    });
  });

  describe("events", () => {
    it("documents event delegation", () => {
      expect(PATTERNS_CONTENT).toContain("static events");
    });

    it("documents ElenaEvent defaults", () => {
      expect(PATTERNS_CONTENT).toContain("bubbles: true");
      expect(PATTERNS_CONTENT).toContain("composed: true");
    });
  });

  describe("CSS styles", () => {
    it("documents @scope pattern", () => {
      expect(PATTERNS_CONTENT).toContain("@scope");
      expect(PATTERNS_CONTENT).toContain(":scope");
    });

    it("documents Elena CSS Encapsulation Pattern", () => {
      expect(PATTERNS_CONTENT).toContain("Elena CSS Encapsulation Pattern");
      expect(PATTERNS_CONTENT).toContain(":scope,");
      expect(PATTERNS_CONTENT).toContain("*:where(:not(img, svg):not(svg *)),");
      expect(PATTERNS_CONTENT).toContain("all: unset");
      expect(PATTERNS_CONTENT).toContain("display: revert");
    });

    it("documents hydration styling pattern", () => {
      expect(PATTERNS_CONTENT).toContain(":scope:not([hydrated])");
    });

    it("documents legacy style pattern without @scope", () => {
      expect(PATTERNS_CONTENT).toContain(":is(");
    });

    it("documents pre-hydration pseudo-elements", () => {
      expect(PATTERNS_CONTENT).toContain("content: attr(label)");
    });

    it("documents CSS custom property conventions", () => {
      expect(PATTERNS_CONTENT).toContain("@cssprop");
    });
  });

  describe("lifecycle", () => {
    it("documents all lifecycle methods", () => {
      expect(PATTERNS_CONTENT).toContain("connectedCallback()");
      expect(PATTERNS_CONTENT).toContain("disconnectedCallback()");
      expect(PATTERNS_CONTENT).toContain("attributeChangedCallback()");
      expect(PATTERNS_CONTENT).toContain("render()");
      expect(PATTERNS_CONTENT).toContain("updated()");
    });

    it("correctly attributes hydrated to updated()", () => {
      expect(PATTERNS_CONTENT).toContain("updated()");
      expect(PATTERNS_CONTENT).toContain("`hydrated` attribute");
    });

    it("documents super extension pattern", () => {
      expect(PATTERNS_CONTENT).toContain("super.connectedCallback()");
    });
  });

  describe("SSR", () => {
    it("documents html web component full SSR support", () => {
      expect(PATTERNS_CONTENT).toContain("HTML Web Components");
      expect(PATTERNS_CONTENT).toContain("full SSR support");
    });

    it("documents primitive partial SSR support", () => {
      expect(PATTERNS_CONTENT).toContain("partial SSR support");
    });

    it("documents FOUC/FOIC prevention", () => {
      expect(PATTERNS_CONTENT).toContain("FOUC");
    });
  });

  describe("async loading", () => {
    it("documents customElements.whenDefined pattern", () => {
      expect(PATTERNS_CONTENT).toContain("customElements.whenDefined");
    });
  });

  describe("framework compatibility", () => {
    it("documents replaceChildren warning", () => {
      expect(PATTERNS_CONTENT).toContain("replaceChildren()");
    });

    it("documents text property for dynamic framework content", () => {
      expect(PATTERNS_CONTENT).toContain("`text` property instead of children");
    });

    it("documents framework-specific syntax", () => {
      expect(PATTERNS_CONTENT).toContain("text={buttonText}");
      expect(PATTERNS_CONTENT).toContain('[text]="buttonText"');
      expect(PATTERNS_CONTENT).toContain(':text="buttonText"');
    });

    it("notes HTML Web Components are safe to compose", () => {
      expect(PATTERNS_CONTENT).toContain("safe to compose");
    });
  });

  describe("registration", () => {
    it("documents ClassName.define()", () => {
      expect(PATTERNS_CONTENT).toContain("ClassName.define()");
    });
  });
});

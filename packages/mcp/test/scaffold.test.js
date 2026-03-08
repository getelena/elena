import { describe, it, expect } from "vitest";
import {
  toKebab,
  formatDefault,
  generateJS,
  generateCSS,
  registerScaffoldTool,
} from "../src/tools/scaffold.js";

describe("toKebab", () => {
  it("converts PascalCase to kebab-case", () => {
    expect(toKebab("DatePicker")).toBe("date-picker");
    expect(toKebab("Button")).toBe("button");
    expect(toKebab("VisuallyHidden")).toBe("visually-hidden");
  });

  it("handles consecutive uppercase letters", () => {
    expect(toKebab("HTMLElement")).toBe("html-element");
    expect(toKebab("SSRHelper")).toBe("ssr-helper");
  });
});

describe("formatDefault", () => {
  it("returns explicit default when provided", () => {
    expect(formatDefault("string", '"primary"')).toBe('"primary"');
  });

  it("returns type-appropriate defaults", () => {
    expect(formatDefault("boolean")).toBe("false");
    expect(formatDefault("Boolean")).toBe("false");
    expect(formatDefault("number")).toBe("0");
    expect(formatDefault("Number")).toBe("0");
    expect(formatDefault("array")).toBe("[]");
    expect(formatDefault("Array")).toBe("[]");
    expect(formatDefault("object")).toBe("{}");
    expect(formatDefault("Object")).toBe("{}");
    expect(formatDefault("string")).toBe('""');
  });
});

describe("generateJS", () => {
  const primitiveParams = {
    name: "Button",
    tagName: "elena-button",
    type: "primitive",
    props: [
      { name: "variant", type: '"default" | "primary"', default: '"default"' },
      { name: "disabled", type: "Boolean" },
    ],
    events: ["click", "focus"],
    cssProperties: [{ name: "--elena-button-bg", description: "Background color." }],
    description: "A button component.",
    status: "alpha",
  };

  const compositeParams = {
    name: "Stack",
    tagName: "elena-stack",
    type: "composite",
    props: [{ name: "direction", type: '"column" | "row"', default: '"column"' }],
    events: [],
    cssProperties: [],
    description: "Stack layout component.",
    status: "alpha",
  };

  describe("primitive component", () => {
    it("imports html and nothing from @elenajs/core", () => {
      const js = generateJS(primitiveParams);
      expect(js).toContain('import { Elena, html, nothing } from "@elenajs/core";');
    });

    it("includes tagName, props, events, and element as static fields", () => {
      const js = generateJS(primitiveParams);
      expect(js).toContain('static tagName = "elena-button";');
      expect(js).toContain('static props = ["variant", "disabled"];');
      expect(js).toContain('static events = ["click", "focus"];');
      expect(js).toContain('static element = ".elena-button";');
    });

    it("includes render() method with this.text", () => {
      const js = generateJS(primitiveParams);
      expect(js).toContain("render()");
      expect(js).toContain("this.text");
    });

    it("includes @event JSDoc for each event", () => {
      const js = generateJS(primitiveParams);
      expect(js).toContain("@event click");
      expect(js).toContain("@event focus");
    });

    it("includes @cssprop JSDoc", () => {
      const js = generateJS(primitiveParams);
      expect(js).toContain("@cssprop [--elena-button-bg] - Background color.");
    });

    it("includes @displayName and @status", () => {
      const js = generateJS(primitiveParams);
      expect(js).toContain("@displayName Button");
      expect(js).toContain("@status alpha");
    });

    it("generates prop class fields with defaults and JSDoc", () => {
      const js = generateJS(primitiveParams);
      expect(js).toContain('variant = "default";');
      expect(js).toContain("disabled = false;");
      expect(js).toContain("@attribute");
      expect(js).toContain('@type {"default" | "primary"}');
      expect(js).toContain("@type {Boolean}");
    });

    it("calls define() after the class body", () => {
      const js = generateJS(primitiveParams);
      expect(js).toContain("Button.define();");
    });

    it("does not include @slot", () => {
      const js = generateJS(primitiveParams);
      expect(js).not.toContain("@slot");
    });
  });

  describe("composite component", () => {
    it("imports only Elena from @elenajs/core", () => {
      const js = generateJS(compositeParams);
      expect(js).toContain('import { Elena } from "@elenajs/core";');
      expect(js).not.toContain("html");
      expect(js).not.toContain("nothing");
    });

    it("does not include events or element in options", () => {
      const js = generateJS(compositeParams);
      expect(js).not.toContain("events:");
      expect(js).not.toContain("element:");
    });

    it("does not include render()", () => {
      const js = generateJS(compositeParams);
      expect(js).not.toContain("render()");
    });

    it("includes @slot JSDoc", () => {
      const js = generateJS(compositeParams);
      expect(js).toContain("@slot");
    });

    it("calls define() after the class body", () => {
      const js = generateJS(compositeParams);
      expect(js).toContain("Stack.define();");
    });
  });
});

describe("generateCSS", () => {
  describe("primitive component", () => {
    it("generates @scope block with encapsulation pattern and inner element", () => {
      const css = generateCSS({
        tagName: "elena-button",
        name: "Button",
        type: "primitive",
        cssProperties: [{ name: "--elena-button-bg" }],
      });
      expect(css).toContain("@scope (elena-button)");
      expect(css).toContain(":scope,");
      expect(css).toContain("*:where(:not(img, svg):not(svg *)),");
      expect(css).toContain("all: unset;");
      expect(css).toContain("display: revert;");
      expect(css).toContain(":scope {");
      expect(css).toContain("display: inline-block;");
      expect(css).toContain(".elena-button {");
      expect(css).toContain("display: inline-flex;");
      expect(css).toContain(":scope:not([hydrated]),");
      expect(css).toContain("--elena-button-bg: initial;");
    });
  });

  describe("composite component", () => {
    it("generates @scope block with flex layout and no encapsulation reset", () => {
      const css = generateCSS({
        tagName: "elena-stack",
        name: "Stack",
        type: "composite",
        cssProperties: [],
      });
      expect(css).toContain("@scope (elena-stack)");
      expect(css).not.toContain("all: unset;");
      expect(css).toContain("display: flex;");
      expect(css).toContain("flex-direction: column;");
      expect(css).toContain("gap: 0.5rem;");
    });

    it("does not include inner element or hydration selectors", () => {
      const css = generateCSS({
        tagName: "elena-stack",
        name: "Stack",
        type: "composite",
        cssProperties: [],
      });
      expect(css).not.toContain(".elena-stack {");
      expect(css).not.toContain(":scope:not([hydrated])");
    });
  });
});

describe("registerScaffoldTool", () => {
  it("exports a function", () => {
    expect(registerScaffoldTool).toBeTypeOf("function");
  });
});

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
  const params = {
    name: "Button",
    tagName: "elena-button",
    props: [
      { name: "variant", type: '"default" | "primary"', default: '"default"' },
      { name: "disabled", type: "Boolean" },
    ],
    events: ["click", "focus"],
    cssProperties: [{ name: "--elena-button-bg", description: "Background color." }],
    description: "A button component.",
    status: "alpha",
  };

  it("imports Elena and html from @elenajs/core", () => {
    const js = generateJS(params);
    expect(js).toContain('import { Elena, html } from "@elenajs/core";');
  });

  it("does not import nothing", () => {
    const js = generateJS(params);
    expect(js).not.toContain("nothing");
  });

  it("includes tagName, props, and events as static fields", () => {
    const js = generateJS(params);
    expect(js).toContain('static tagName = "elena-button";');
    expect(js).toContain('static props = ["variant", "disabled"];');
    expect(js).toContain('static events = ["click", "focus"];');
  });

  it("does not include static element", () => {
    const js = generateJS(params);
    expect(js).not.toContain("static element");
  });

  it("includes render() method with this.text", () => {
    const js = generateJS(params);
    expect(js).toContain("render()");
    expect(js).toContain("this.text");
  });

  it("includes @event JSDoc for each event", () => {
    const js = generateJS(params);
    expect(js).toContain("@event click");
    expect(js).toContain("@event focus");
  });

  it("includes @cssprop JSDoc", () => {
    const js = generateJS(params);
    expect(js).toContain("@cssprop [--elena-button-bg] - Background color.");
  });

  it("includes @displayName and @status", () => {
    const js = generateJS(params);
    expect(js).toContain("@displayName Button");
    expect(js).toContain("@status alpha");
  });

  it("does not include @slot", () => {
    const js = generateJS(params);
    expect(js).not.toContain("@slot");
  });

  it("generates prop class fields with defaults and JSDoc", () => {
    const js = generateJS(params);
    expect(js).toContain('variant = "default";');
    expect(js).toContain("disabled = false;");
    expect(js).toContain("@attribute");
    expect(js).toContain('@type {"default" | "primary"}');
    expect(js).toContain("@type {Boolean}");
  });

  it("calls define() after the class body", () => {
    const js = generateJS(params);
    expect(js).toContain("Button.define();");
  });
});

describe("generateCSS", () => {
  const baseParams = {
    tagName: "elena-button",
    name: "Button",
    cssProperties: [{ name: "--elena-button-bg" }],
  };

  it("generates @scope block with :scope and inner element", () => {
    const css = generateCSS({ ...baseParams, cssEncapsulation: true, ssr: false });
    expect(css).toContain("@scope (elena-button)");
    expect(css).toContain(":scope {");
    expect(css).toContain("display: inline-block;");
    expect(css).toContain(".elena-button {");
  });

  it("includes encapsulation reset when cssEncapsulation is true", () => {
    const css = generateCSS({ ...baseParams, cssEncapsulation: true, ssr: false });
    expect(css).toContain(":scope,");
    expect(css).toContain("*:where(:not(img, svg):not(svg *)),");
    expect(css).toContain("all: unset;");
    expect(css).toContain("display: revert;");
  });

  it("omits encapsulation reset when cssEncapsulation is false", () => {
    const css = generateCSS({ ...baseParams, cssEncapsulation: false, ssr: false });
    expect(css).not.toContain("all: unset;");
    expect(css).not.toContain("*:where(");
  });

  it("includes :scope:not([hydrated]) selector when ssr is true", () => {
    const css = generateCSS({ ...baseParams, cssEncapsulation: true, ssr: true });
    expect(css).toContain(":scope:not([hydrated]),");
  });

  it("omits :scope:not([hydrated]) selector when ssr is false", () => {
    const css = generateCSS({ ...baseParams, cssEncapsulation: true, ssr: false });
    expect(css).not.toContain(":scope:not([hydrated])");
  });

  it("outputs CSS custom properties", () => {
    const css = generateCSS({ ...baseParams, cssEncapsulation: true, ssr: false });
    expect(css).toContain("--elena-button-bg: initial;");
  });
});

describe("registerScaffoldTool", () => {
  it("exports a function", () => {
    expect(registerScaffoldTool).toBeTypeOf("function");
  });
});

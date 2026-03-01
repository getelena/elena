import { describe, test, expect } from "vitest";
import { toPascal, generateSource, generateCSS } from "../src/generate.js";

describe("toPascal", () => {
  test("single word", () => {
    expect(toPascal("button")).toBe("Button");
  });

  test("two words", () => {
    expect(toPascal("date-picker")).toBe("DatePicker");
  });

  test("three words", () => {
    expect(toPascal("my-cool-widget")).toBe("MyCoolWidget");
  });
});

describe("generateSource, primitive JS", () => {
  const ALL = ["props", "events", "cssprops", "methods", "comments"];
  const NONE = [];

  test("all features", () => {
    const out = generateSource("my-button", "primitive", "javascript", ALL);

    // Imports
    expect(out).toContain('import { Elena, html } from "@elenajs/core"');

    // Options
    expect(out).toContain('props: ["variant"]');
    expect(out).toContain('events: ["click", "focus", "blur"]');

    // Constructor with variant prop
    expect(out).toContain("constructor()");
    expect(out).toContain('this.variant = "default"');

    // Render
    expect(out).toContain("render()");
    expect(out).toContain("${this.text}");

    // JSDoc
    expect(out).toContain("@event click");
    expect(out).toContain("@event focus");
    expect(out).toContain("@event blur");
    expect(out).toContain("@cssprop [--my-button-text]");
    expect(out).toContain("@cssprop [--my-button-bg]");
    expect(out).toContain("@cssprop [--my-button-font]");

    // Custom method
    expect(out).toContain("myMethod()");
    expect(out).toContain("console.log(this.element)");

    // Registration
    expect(out).toContain("MyButton.define()");
  });

  test("no features", () => {
    const out = generateSource("my-button", "primitive", "javascript", NONE);

    // Options, only tagName
    expect(out).toContain('tagName: "my-button"');
    expect(out).not.toContain("props:");
    expect(out).not.toContain("events:");

    // No constructor or variant
    expect(out).not.toContain("constructor()");
    expect(out).not.toContain("this.variant");

    // Still has render
    expect(out).toContain("render()");

    // No JSDoc extras
    expect(out).not.toContain("@event");
    expect(out).not.toContain("@cssprop");

    // No method
    expect(out).not.toContain("myMethod");
  });

  test("only props", () => {
    const out = generateSource("my-button", "primitive", "javascript", ["props"]);

    expect(out).toContain('props: ["variant"]');
    expect(out).toContain("constructor()");
    expect(out).toContain('this.variant = "default"');

    expect(out).not.toContain("events:");
    expect(out).not.toContain("@event");
    expect(out).not.toContain("@cssprop");
    expect(out).not.toContain("myMethod");
  });

  test("only events", () => {
    const out = generateSource("my-button", "primitive", "javascript", ["events", "comments"]);

    expect(out).toContain('events: ["click", "focus", "blur"]');
    expect(out).toContain("@event click");

    expect(out).not.toContain("props:");
    expect(out).not.toContain("constructor()");
    expect(out).not.toContain("@cssprop");
    expect(out).not.toContain("myMethod");
  });

  test("only cssprops", () => {
    const out = generateSource("my-button", "primitive", "javascript", ["cssprops", "comments"]);

    expect(out).toContain("@cssprop [--my-button-text]");

    expect(out).not.toContain("props:");
    expect(out).not.toContain("events:");
    expect(out).not.toContain("@event");
    expect(out).not.toContain("constructor()");
    expect(out).not.toContain("myMethod");
  });

  test("only methods", () => {
    const out = generateSource("my-button", "primitive", "javascript", ["methods"]);

    expect(out).toContain("myMethod()");
    expect(out).toContain("console.log(this.element)");

    expect(out).not.toContain("props:");
    expect(out).not.toContain("events:");
    expect(out).not.toContain("@event");
    expect(out).not.toContain("@cssprop");
    expect(out).not.toContain("constructor()");
  });
});

describe("generateSource, primitive TS", () => {
  test("all features", () => {
    const out = generateSource("my-button", "primitive", "typescript", [
      "props",
      "events",
      "cssprops",
      "methods",
      "comments",
    ]);

    expect(out).toContain('import { Elena, html } from "@elenajs/core"');
    expect(out).toContain('props: ["variant"]');
    expect(out).toContain('events: ["click", "focus", "blur"]');

    // TS uses class field syntax, no constructor
    expect(out).not.toContain("constructor()");
    expect(out).toContain('variant: "default" | "primary" | "danger" = "default"');

    expect(out).toContain("@event click");
    expect(out).toContain("@cssprop [--my-button-text]");
    expect(out).toContain("myMethod()");
    expect(out).toContain("console.log(this.element)");
  });

  test("no features", () => {
    const out = generateSource("my-button", "primitive", "typescript", []);

    expect(out).not.toContain("props:");
    expect(out).not.toContain("events:");
    expect(out).not.toContain("variant");
    expect(out).not.toContain("@event");
    expect(out).not.toContain("@cssprop");
    expect(out).not.toContain("myMethod");
    expect(out).toContain("render()");
  });
});

describe("generateSource, composite JS", () => {
  test("all features (props + cssprops + methods)", () => {
    const out = generateSource("my-stack", "composite", "javascript", [
      "props",
      "cssprops",
      "methods",
      "comments",
    ]);

    expect(out).toContain('import { Elena } from "@elenajs/core"');
    expect(out).not.toContain("html");

    expect(out).toContain('props: ["direction"]');
    expect(out).toContain("constructor()");
    expect(out).toContain('this.direction = "column"');
    expect(out).toContain("@cssprop [--my-stack-text]");
    expect(out).toContain("@slot");

    // Composite uses this, not this.element
    expect(out).toContain("myMethod()");
    expect(out).toContain("console.log(this)");
    expect(out).not.toContain("this.element");

    // No render
    expect(out).not.toContain("render()");

    // No events option
    expect(out).not.toContain("events:");
    expect(out).not.toContain("@event");

    expect(out).toContain("MyStack.define()");
  });

  test("no features", () => {
    const out = generateSource("my-stack", "composite", "javascript", []);

    expect(out).toContain('tagName: "my-stack"');
    expect(out).not.toContain("props:");
    expect(out).not.toContain("constructor()");
    expect(out).not.toContain("@cssprop");
    expect(out).not.toContain("myMethod");
    expect(out).not.toContain("render()");
  });

  test("only props", () => {
    const out = generateSource("my-stack", "composite", "javascript", ["props"]);

    expect(out).toContain('props: ["direction"]');
    expect(out).toContain('this.direction = "column"');
    expect(out).not.toContain("@cssprop");
    expect(out).not.toContain("myMethod");
  });

  test("only methods", () => {
    const out = generateSource("my-stack", "composite", "javascript", ["methods"]);

    expect(out).toContain("myMethod()");
    expect(out).toContain("console.log(this)");
    expect(out).not.toContain("props:");
    expect(out).not.toContain("constructor()");
  });
});

describe("generateSource, composite TS", () => {
  test("all features", () => {
    const out = generateSource("my-stack", "composite", "typescript", [
      "props",
      "cssprops",
      "methods",
      "comments",
    ]);

    // TS class field
    expect(out).not.toContain("constructor()");
    expect(out).toContain('direction: "column" | "row" = "column"');
    expect(out).toContain("@cssprop [--my-stack-text]");
    expect(out).toContain("myMethod()");
    expect(out).toContain("console.log(this)");
  });

  test("no features", () => {
    const out = generateSource("my-stack", "composite", "typescript", []);

    expect(out).not.toContain("props:");
    expect(out).not.toContain("direction");
    expect(out).not.toContain("@cssprop");
    expect(out).not.toContain("myMethod");
  });
});

describe("generateSource, multi-word names", () => {
  test("primitive JS with hyphenated name", () => {
    const out = generateSource("cool-date-picker", "primitive", "javascript", ["props"]);

    expect(out).toContain('tagName: "cool-date-picker"');
    expect(out).toContain("class CoolDatePicker extends");
    expect(out).toContain("CoolDatePicker.define()");
  });

  test("composite TS with hyphenated name", () => {
    const out = generateSource("app-side-panel", "composite", "typescript", ["props"]);

    expect(out).toContain('tagName: "app-side-panel"');
    expect(out).toContain("class AppSidePanel extends");
    expect(out).toContain("AppSidePanel.define()");
  });
});

describe("generateCSS, primitive", () => {
  test("all CSS features", () => {
    const out = generateCSS("my-button", "primitive", ["cssprops", "props", "cssencap", "ssr"]);

    // Scope and reset
    expect(out).toContain("@scope (my-button)");
    expect(out).toContain("all: unset");

    // CSS custom properties
    expect(out).toContain("--my-button-font: sans-serif");
    expect(out).toContain("--my-button-text: white");
    expect(out).toContain("--my-button-bg: blue");

    // Hydration-matching styles (SSR)
    expect(out).toContain(":scope:not([hydrated])");
    expect(out).toContain(".my-button");
    expect(out).toContain("var(--my-button-font)");

    // Variant styling
    expect(out).toContain(':scope[variant="primary"]');
  });

  test("with ssr feature", () => {
    const out = generateCSS("my-button", "primitive", ["ssr"]);

    expect(out).toContain(":scope:not([hydrated])");
    expect(out).toContain(".my-button");
  });

  test("without ssr feature", () => {
    const out = generateCSS("my-button", "primitive", ["cssprops"]);

    expect(out).not.toContain(":scope:not([hydrated])");
    expect(out).toContain(".my-button");
  });

  test("with only cssprops (no props)", () => {
    const out = generateCSS("my-button", "primitive", ["cssprops"]);

    expect(out).toContain("--my-button-font: sans-serif");
    expect(out).toContain("var(--my-button-font)");

    // No variant styling without props
    expect(out).not.toContain(':scope[variant="primary"]');
  });

  test("with only props (no cssprops)", () => {
    const out = generateCSS("my-button", "primitive", ["props"]);

    // No CSS custom properties
    expect(out).not.toContain("--my-button-font");

    // Has variant styling
    expect(out).toContain(':scope[variant="primary"]');
  });

  test("with cssencap", () => {
    const out = generateCSS("my-button", "primitive", ["cssencap"]);

    expect(out).toContain("all: unset");
    expect(out).toContain(":scope, *, *::before, *::after");
  });

  test("without cssencap", () => {
    const out = generateCSS("my-button", "primitive", []);

    expect(out).not.toContain("all: unset");
    expect(out).not.toContain("*::before");
  });

  test("no features", () => {
    const out = generateCSS("my-button", "primitive", []);

    // Always present: scope, display
    expect(out).toContain("@scope (my-button)");
    expect(out).toContain("display: inline-block");

    // Nothing conditional
    expect(out).not.toContain("all: unset");
    expect(out).not.toContain("--my-button");
    expect(out).not.toContain(":scope:not([hydrated])");
    expect(out).not.toContain(':scope[variant="primary"]');
  });
});

describe("generateCSS, composite", () => {
  test("all CSS features", () => {
    const out = generateCSS("my-stack", "composite", ["cssprops", "props", "cssencap"]);

    expect(out).toContain("@scope (my-stack)");
    expect(out).toContain("all: unset");
    expect(out).toContain("display: flex");

    // CSS custom properties
    expect(out).toContain("--my-stack-font: sans-serif");
    expect(out).toContain("--my-stack-text: white");
    expect(out).toContain("--my-stack-bg: blue");

    // Direction attribute
    expect(out).toContain(':scope[direction="row"]');
  });

  test("with only cssprops (no props)", () => {
    const out = generateCSS("my-stack", "composite", ["cssprops"]);

    expect(out).toContain("--my-stack-font: sans-serif");
    expect(out).not.toContain(':scope[direction="row"]');
  });

  test("with only props (no cssprops)", () => {
    const out = generateCSS("my-stack", "composite", ["props"]);

    expect(out).not.toContain("--my-stack-font");
    expect(out).toContain(':scope[direction="row"]');
  });

  test("with cssencap", () => {
    const out = generateCSS("my-stack", "composite", ["cssencap"]);

    expect(out).toContain("all: unset");
    expect(out).toContain(":scope, *, *::before, *::after");
  });

  test("without cssencap", () => {
    const out = generateCSS("my-stack", "composite", []);

    expect(out).not.toContain("all: unset");
    expect(out).not.toContain("*::before");
  });

  test("no features", () => {
    const out = generateCSS("my-stack", "composite", []);

    expect(out).toContain("@scope (my-stack)");
    expect(out).toContain("display: flex");
    expect(out).toContain("gap: 0.5rem");

    expect(out).not.toContain("all: unset");
    expect(out).not.toContain("--my-stack");
    expect(out).not.toContain(':scope[direction="row"]');
  });
});

import { describe, test, expect } from "vitest";
import { generateSource } from "../src/generate.js";

describe("generateSource, primitive JS", () => {
  const ALL = ["props", "events", "cssprops", "methods", "comments"];
  const NONE = [];

  test("all features", () => {
    const out = generateSource("my-button", "primitive", "javascript", ALL);

    // Imports
    expect(out).toContain('import { Elena, html } from "@elenajs/core"');

    // Static fields
    expect(out).toContain('static tagName = "my-button"');
    expect(out).toContain('static props = ["variant"]');
    expect(out).toContain('static events = ["click", "focus", "blur"]');

    // No constructor
    expect(out).not.toContain("constructor()");
    expect(out).not.toContain("this.variant");
    expect(out).toContain('variant = "default"');

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

    // Static tagName always present
    expect(out).toContain('static tagName = "my-button"');
    expect(out).not.toContain("static props");
    expect(out).not.toContain("static events");

    // No constructor or variant
    expect(out).not.toContain("constructor()");
    expect(out).not.toContain("variant");

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

    expect(out).toContain('static props = ["variant"]');
    expect(out).toContain('variant = "default"');
    expect(out).not.toContain("constructor()");
    expect(out).not.toContain("this.variant");

    expect(out).not.toContain("static events");
    expect(out).not.toContain("@event");
    expect(out).not.toContain("@cssprop");
    expect(out).not.toContain("myMethod");
  });

  test("only events", () => {
    const out = generateSource("my-button", "primitive", "javascript", ["events", "comments"]);

    expect(out).toContain('static events = ["click", "focus", "blur"]');
    expect(out).toContain("@event click");

    expect(out).not.toContain("static props");
    expect(out).not.toContain("constructor()");
    expect(out).not.toContain("@cssprop");
    expect(out).not.toContain("myMethod");
  });

  test("only cssprops", () => {
    const out = generateSource("my-button", "primitive", "javascript", ["cssprops", "comments"]);

    expect(out).toContain("@cssprop [--my-button-text]");

    expect(out).not.toContain("static props");
    expect(out).not.toContain("static events");
    expect(out).not.toContain("@event");
    expect(out).not.toContain("constructor()");
    expect(out).not.toContain("myMethod");
  });

  test("only methods", () => {
    const out = generateSource("my-button", "primitive", "javascript", ["methods"]);

    expect(out).toContain("myMethod()");
    expect(out).toContain("console.log(this.element)");

    expect(out).not.toContain("static props");
    expect(out).not.toContain("static events");
    expect(out).not.toContain("@event");
    expect(out).not.toContain("@cssprop");
    expect(out).not.toContain("constructor()");
  });
});

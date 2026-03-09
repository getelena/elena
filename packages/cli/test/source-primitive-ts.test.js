import { describe, test, expect } from "vitest";
import { generateSource } from "../src/generate.js";

describe("generateSource, TS", () => {
  test("all features", () => {
    const out = generateSource("my-button", "typescript", [
      "props",
      "events",
      "cssprops",
      "methods",
      "comments",
    ]);

    expect(out).toContain('import { Elena, html } from "@elenajs/core"');

    // Static fields
    expect(out).toContain('static tagName = "my-button"');
    expect(out).toContain('static props = ["variant"]');
    expect(out).toContain('static events = ["click", "focus", "blur"]');

    // TS uses class field syntax, no constructor
    expect(out).not.toContain("constructor()");
    expect(out).toContain('variant: "default" | "primary" | "danger" = "default"');

    expect(out).toContain("@event click");
    expect(out).toContain("@cssprop [--my-button-text]");
    expect(out).toContain("myMethod()");
    expect(out).toContain("console.log(this.element)");
  });

  test("no features", () => {
    const out = generateSource("my-button", "typescript", []);

    expect(out).not.toContain("static props");
    expect(out).not.toContain("static events");
    expect(out).not.toContain("variant");
    expect(out).not.toContain("@event");
    expect(out).not.toContain("@cssprop");
    expect(out).not.toContain("myMethod");
    expect(out).toContain("render()");
  });
});

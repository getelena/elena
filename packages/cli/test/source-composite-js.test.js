import { describe, test, expect } from "vitest";
import { generateSource } from "../src/generate.js";

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

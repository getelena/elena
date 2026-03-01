import { describe, test, expect } from "vitest";
import { generateSource } from "../src/generate.js";

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

import { describe, test, expect } from "vitest";
import { generateCSS } from "../src/generate.js";

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
    expect(out).toContain("*:where(:not(img, svg):not(svg *))");
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

import { describe, test, expect } from "vitest";
import { generateCSS } from "../src/generate.js";

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

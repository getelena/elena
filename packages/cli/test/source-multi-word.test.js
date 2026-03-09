import { describe, test, expect } from "vitest";
import { generateSource } from "../src/generate.js";

describe("generateSource, multi-word names", () => {
  test("JS with hyphenated name", () => {
    const out = generateSource("cool-date-picker", "javascript", ["props"]);

    expect(out).toContain('static tagName = "cool-date-picker"');
    expect(out).toContain("class CoolDatePicker extends");
    expect(out).toContain("CoolDatePicker.define()");
  });

  test("TS with hyphenated name", () => {
    const out = generateSource("app-side-panel", "typescript", ["props"]);

    expect(out).toContain('static tagName = "app-side-panel"');
    expect(out).toContain("class AppSidePanel extends");
    expect(out).toContain("AppSidePanel.define()");
  });
});

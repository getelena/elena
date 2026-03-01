import { describe, test, expect } from "vitest";
import { toPascal } from "../src/generate.js";

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

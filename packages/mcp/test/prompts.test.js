import { describe, it, expect } from "vitest";
import { registerCreatePrompt } from "../src/prompts/create.js";
import { registerReviewPrompt } from "../src/prompts/review.js";

/**
 * Captures the prompt handler from a registerPrompt call.
 * Returns { meta, handler } where meta is the config object
 * and handler is the function that generates prompt messages.
 */
function capturePrompt(registerFn) {
  let captured;
  const fakeServer = {
    registerPrompt(name, meta, handler) {
      captured = { name, meta, handler };
    },
  };
  registerFn(fakeServer);
  return captured;
}

describe("create-component prompt", () => {
  const prompt = capturePrompt(registerCreatePrompt);

  it("registers with the correct name", () => {
    expect(prompt.name).toBe("create-component");
  });

  it("generates a user message with the component name", () => {
    const result = prompt.handler({ name: "DatePicker" });
    const text = result.messages[0].content.text;
    expect(text).toContain("DatePicker");
  });

  it("includes component type when provided", () => {
    const result = prompt.handler({ name: "DatePicker", type: "composite" });
    const text = result.messages[0].content.text;
    expect(text).toContain("composite");
  });

  it("includes description when provided", () => {
    const result = prompt.handler({ name: "DatePicker", description: "A date picker." });
    const text = result.messages[0].content.text;
    expect(text).toContain("A date picker.");
  });

  it("references elena://patterns resource", () => {
    const result = prompt.handler({ name: "DatePicker" });
    const text = result.messages[0].content.text;
    expect(text).toContain("elena://patterns");
  });

  it("references scaffold-component tool", () => {
    const result = prompt.handler({ name: "DatePicker" });
    const text = result.messages[0].content.text;
    expect(text).toContain("scaffold-component");
  });

  it("includes key Elena rules", () => {
    const result = prompt.handler({ name: "DatePicker" });
    const text = result.messages[0].content.text;
    expect(text).toContain("@scope");
    expect(text).toContain(":scope:not([hydrated])");
    expect(text).toContain("static props");
  });
});

describe("review-component prompt", () => {
  const prompt = capturePrompt(registerReviewPrompt);

  it("registers with the correct name", () => {
    expect(prompt.name).toBe("review-component");
  });

  it("includes the provided JS code", () => {
    const result = prompt.handler({ code: "class Button extends Elena(HTMLElement) {}" });
    const text = result.messages[0].content.text;
    expect(text).toContain("class Button extends Elena(HTMLElement) {}");
  });

  it("includes CSS when provided", () => {
    const result = prompt.handler({
      code: "class Button {}",
      css: "@scope (elena-button) { :scope { all: unset; } }",
    });
    const text = result.messages[0].content.text;
    expect(text).toContain("@scope (elena-button)");
  });

  describe("checklist items", () => {
    const result = prompt.handler({ code: "class Button {}" });
    const text = result.messages[0].content.text;

    it("checks props match constructor defaults", () => {
      expect(text).toContain("Props listed in static props match class field defaults");
    });

    it("checks JSDoc annotations", () => {
      expect(text).toContain("@attribute and @type annotations on every prop");
      expect(text).toContain("@displayName, @status, @event, @cssprop");
    });

    it("checks component type correctness", () => {
      expect(text).toContain("Correct component type");
    });

    it("checks CSS isolation", () => {
      expect(text).toContain("@scope");
      expect(text).toContain("style isolation");
    });

    it("checks host display mode", () => {
      expect(text).toContain("display mode");
    });

    it("checks hydration styling", () => {
      expect(text).toContain(":scope:not([hydrated])");
    });

    it("checks define() registration", () => {
      expect(text).toContain("ClassName.define()");
    });

    it("checks nothing usage in conditionals", () => {
      expect(text).toContain("nothing (not empty string)");
    });

    it("checks text property for framework usage", () => {
      expect(text).toContain("text property used instead of children");
    });

    it("checks pre-hydration SSR styles", () => {
      expect(text).toContain("pre-hydration CSS styles");
    });
  });
});

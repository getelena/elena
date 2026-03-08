import { describe, it, expect } from "vitest";
import { SSR_CONTENT } from "../src/lib/ssr-content.js";

describe("SSR_CONTENT", () => {
  it("is a non-empty string", () => {
    expect(typeof SSR_CONTENT).toBe("string");
    expect(SSR_CONTENT.length).toBeGreaterThan(0);
  });

  it("documents layout shift avoidance", () => {
    expect(SSR_CONTENT).toContain("layout shift");
    expect(SSR_CONTENT).toContain(":not([hydrated])");
  });

  it("documents the @elenajs/ssr package", () => {
    expect(SSR_CONTENT).toContain("@elenajs/ssr");
    expect(SSR_CONTENT).toContain("register");
    expect(SSR_CONTENT).toContain("ssr(");
  });

  it("documents Eleventy integration", () => {
    expect(SSR_CONTENT).toContain("Eleventy");
    expect(SSR_CONTENT).toContain("addTransform");
  });

  it("covers both Primitive and Composite component behavior", () => {
    expect(SSR_CONTENT).toContain("Primitive");
    expect(SSR_CONTENT).toContain("Composite");
  });

  it("documents client-side hydration", () => {
    expect(SSR_CONTENT).toContain("hydrat");
    expect(SSR_CONTENT).toContain("connectedCallback");
  });
});

import { describe, it, expect } from "vitest";
import { API_CONTENT } from "../src/lib/api-content.js";

describe("API_CONTENT", () => {
  it("is a non-empty string", () => {
    expect(typeof API_CONTENT).toBe("string");
    expect(API_CONTENT.length).toBeGreaterThan(0);
  });

  it("documents @elenajs/core exports", () => {
    expect(API_CONTENT).toContain("@elenajs/core");
    expect(API_CONTENT).toContain("`Elena`");
    expect(API_CONTENT).toContain("`html`");
    expect(API_CONTENT).toContain("`nothing`");
    expect(API_CONTENT).toContain("`unsafeHTML`");
    expect(API_CONTENT).toContain("`ElenaEvent`");
  });

  it("documents static class fields (not options object)", () => {
    expect(API_CONTENT).toContain("static tagName");
    expect(API_CONTENT).toContain("static props");
    expect(API_CONTENT).toContain("static events");
    expect(API_CONTENT).toContain("static element");
    expect(API_CONTENT).not.toContain("options object");
  });

  it("documents all lifecycle methods", () => {
    expect(API_CONTENT).toContain("`connectedCallback()`");
    expect(API_CONTENT).toContain("`willUpdate()`");
    expect(API_CONTENT).toContain("`render()`");
    expect(API_CONTENT).toContain("`firstUpdated()`");
    expect(API_CONTENT).toContain("`updated()`");
    expect(API_CONTENT).toContain("`requestUpdate()`");
    expect(API_CONTENT).toContain("`disconnectedCallback()`");
    expect(API_CONTENT).toContain("`attributeChangedCallback");
  });

  it("documents error codes", () => {
    expect(API_CONTENT).toContain("Error Codes");
    expect(API_CONTENT).toContain('"text" is reserved');
    expect(API_CONTENT).toContain("tagName");
  });

  it("documents other Elena packages", () => {
    expect(API_CONTENT).toContain("@elenajs/bundler");
    expect(API_CONTENT).toContain("@elenajs/ssr");
    expect(API_CONTENT).toContain("@elenajs/mcp");
    expect(API_CONTENT).toContain("@elenajs/plugin-cem-typescript");
  });

  it("documents non-reflected prop syntax", () => {
    expect(API_CONTENT).toContain("reflect: false");
  });

  it("documents updateComplete promise", () => {
    expect(API_CONTENT).toContain("updateComplete");
  });
});

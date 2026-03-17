import { describe, it, expect, beforeAll } from "vitest";
import { ssr, register } from "../src/index.js";
import { Elena, html, nothing } from "@elenajs/core";

class TestButton extends Elena(HTMLElement) {
  static tagName = "test-button";
  static props = ["variant", "disabled"];
  variant = "default";
  disabled = false;

  render() {
    return html`<button ${this.disabled ? "disabled" : nothing}>${this.text}</button>`;
  }
}
TestButton.define();

class TestInput extends Elena(HTMLElement) {
  static tagName = "test-input";
  static props = ["type", "placeholder"];
  type = "text";
  placeholder = "";

  render() {
    return html`<input type="${this.type}" placeholder="${this.placeholder}" />`;
  }
}
TestInput.define();

class TestStack extends Elena(HTMLElement) {
  static tagName = "test-stack";
  static props = ["direction"];
  direction = "column";
}
TestStack.define();

class TestBadge extends Elena(HTMLElement) {
  static tagName = "test-badge";
  static props = [{ name: "icon", reflect: false }, "variant"];
  icon = "";
  variant = "info";

  render() {
    return html`<span class="badge">${this.icon ? html`<i>${this.icon}</i>` : nothing}${this.text}</span>`;
  }
}
TestBadge.define();

class TestDerived extends Elena(HTMLElement) {
  static tagName = "test-derived";
  static props = ["base"];
  base = "";

  willUpdate() {
    this.computed = `derived:${this.base}`;
  }

  render() {
    return html`<span>${this.computed}</span>`;
  }
}
TestDerived.define();

class TestTyped extends Elena(HTMLElement) {
  static tagName = "test-typed";
  static props = ["count", "items"];
  count = 0;
  items = [];

  render() {
    return html`<div data-count="${this.count + 1}">${this.items.join(",")}</div>`;
  }
}
TestTyped.define();

beforeAll(() => {
  register(TestButton, TestInput, TestStack, TestBadge, TestDerived, TestTyped);
});

describe("integration with real Elena components", () => {
  it("renders a primitive component with text", () => {
    const result = ssr("<test-button>Click me</test-button>");
    expect(result).toContain("<button");
    expect(result).toContain("Click me");
    expect(result).toContain("hydrated");
  });

  it("renders string props", () => {
    const result = ssr('<test-button variant="primary">OK</test-button>');
    expect(result).toContain('variant="primary"');
    expect(result).toContain("<button");
  });

  it("renders boolean props", () => {
    const result = ssr("<test-button disabled>No</test-button>");
    expect(result).toContain("disabled");
    expect(result).toContain("<button");
  });

  it("renders input with props", () => {
    const result = ssr('<test-input type="email" placeholder="you@example.com"></test-input>');
    expect(result).toContain('type="email"');
    expect(result).toContain('placeholder="you@example.com"');
  });

  it("passes through composite components", () => {
    const result = ssr('<test-stack direction="row"><p>Hello</p></test-stack>');
    expect(result).toContain('direction="row"');
    expect(result).toContain("<p>Hello</p>");
    expect(result).not.toContain("hydrated");
  });

  it("renders primitives inside composites", () => {
    const result = ssr(`
      <test-stack>
        <test-button variant="primary">Save</test-button>
        <test-button>Cancel</test-button>
      </test-stack>
    `);
    expect(result).toContain("<test-stack>");
    expect(result).toContain("Save");
    expect(result).toContain("Cancel");
    expect(result).toContain('variant="primary"');
  });

  it("handles reflect: false props", () => {
    const result = ssr('<test-badge icon="★" variant="success">New</test-badge>');
    expect(result).toContain("★");
    expect(result).toContain("New");
    expect(result).toContain('variant="success"');
  });

  it("calls willUpdate() for derived state", () => {
    const result = ssr('<test-derived base="hello"></test-derived>');
    expect(result).toContain("derived:hello");
  });

  it("coerces number props", () => {
    const result = ssr('<test-typed count="5"></test-typed>');
    expect(result).toContain('data-count="6"');
  });

  it("coerces array props from JSON", () => {
    const result = ssr('<test-typed items=\'["a","b","c"]\'></test-typed>');
    expect(result).toContain("a,b,c");
  });
});

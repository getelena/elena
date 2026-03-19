import { describe, it, expect } from "vitest";
import { html, unsafeHTML } from "../src/elena.js";
import { renderTemplate } from "../src/common/render.js";

const el = () => document.createElement("div");

describe("security / XSS edge cases", () => {
  it("escapes script tags in interpolated values", () => {
    const container = el();
    const t = html`<div>${'<script>alert("xss")</script>'}</div>`;
    renderTemplate(container, t.strings, t.values);
    expect(container.querySelector("script")).toBeNull();
    expect(container.querySelector("div").textContent).toContain("<script>");
  });

  it("escapes event handler attribute injection", () => {
    const container = el();
    const t = html`<div onclick="${"alert(1)"}">click</div>`;
    renderTemplate(container, t.strings, t.values);
    const div = container.querySelector("div");
    expect(div.getAttribute("onclick")).toBe("alert(1)");
  });

  it("does not execute javascript: URI in href", () => {
    const container = el();
    const t = html`<a href="${"javascript:alert(1)"}">link</a>`;
    renderTemplate(container, t.strings, t.values);
    const a = container.querySelector("a");
    expect(a.getAttribute("href")).toBe("javascript:alert(1)");
  });

  it("backticks in values are not special", () => {
    const container = el();
    const t = html`<span>${"hello `world`"}</span>`;
    renderTemplate(container, t.strings, t.values);
    expect(container.querySelector("span").textContent).toBe("hello `world`");
  });

  it("unsafeHTML inside html does not double-escape", () => {
    const result = html`<div>${unsafeHTML("<b>bold</b>")}</div>`;
    expect(String(result)).toBe("<div><b>bold</b></div>");
  });

  it("img onerror is escaped when interpolated", () => {
    const container = el();
    const t = html`<div>${'<img onerror="alert(1)" src=x>'}</div>`;
    renderTemplate(container, t.strings, t.values);
    expect(container.querySelector("img")).toBeNull();
  });
});

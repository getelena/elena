import { describe, it, expect } from "vitest";
import {
  escapeHtml,
  html,
  unsafeHTML,
  resolveValue,
  isRaw,
  toPlainText,
  collapseWhitespace,
} from "../src/common/utils.js";

describe("escapeHtml edge cases", () => {
  it("returns empty string for empty input", () => {
    expect(escapeHtml("")).toBe("");
  });

  it("passes through string with no special characters", () => {
    expect(escapeHtml("hello world 123")).toBe("hello world 123");
  });

  it("escapes a string of only special characters", () => {
    expect(escapeHtml("&<>\"'")).toBe("&amp;&lt;&gt;&quot;&#39;");
  });

  it("coerces numeric input to string", () => {
    expect(escapeHtml(42)).toBe("42");
  });

  it("coerces null to the string 'null'", () => {
    expect(escapeHtml(null)).toBe("null");
  });

  it("coerces undefined to the string 'undefined'", () => {
    expect(escapeHtml(undefined)).toBe("undefined");
  });

  it("escapes repeated special characters", () => {
    expect(escapeHtml("&&&")).toBe("&amp;&amp;&amp;");
  });

  it("double-escapes already-escaped entities", () => {
    expect(escapeHtml("&amp;")).toBe("&amp;amp;");
  });

  it("handles a very long string without truncation", () => {
    const long = "a".repeat(10000) + "<" + "b".repeat(10000);
    const result = escapeHtml(long);
    expect(result).toContain("&lt;");
    expect(result.length).toBeGreaterThan(20000);
  });
});

describe("html tagged template edge cases", () => {
  it("caches toString result on repeated calls", () => {
    const result = html`<span>cached</span>`;
    const first = String(result);
    const second = String(result);
    expect(first).toBe(second);
  });

  it("renders null as empty string", () => {
    expect(String(html`<span>${null}</span>`)).toBe("<span></span>");
  });

  it("renders undefined as empty string", () => {
    expect(String(html`<span>${undefined}</span>`)).toBe("<span></span>");
  });

  it("renders boolean true as 'true'", () => {
    expect(String(html`<span>${true}</span>`)).toBe("<span>true</span>");
  });

  it("renders boolean false as 'false'", () => {
    expect(String(html`<span>${false}</span>`)).toBe("<span>false</span>");
  });

  it("renders an array of strings by joining", () => {
    expect(String(html`<span>${["a", "b", "c"]}</span>`)).toBe("<span>abc</span>");
  });

  it("renders an array containing html fragments", () => {
    const items = [html`<b>1</b>`, html`<b>2</b>`];
    expect(String(html`<div>${items}</div>`)).toBe("<div><b>1</b><b>2</b></div>");
  });

  it("renders an object using its toString()", () => {
    const obj = { toString: () => "custom" };
    expect(String(html`<span>${obj}</span>`)).toBe("<span>custom</span>");
  });

  it("escapes an object's toString() result", () => {
    const obj = { toString: () => "<script>" };
    expect(String(html`<span>${obj}</span>`)).toBe("<span>&lt;script&gt;</span>");
  });

  it("renders mixed array of raw and plain values", () => {
    const items = [html`<b>bold</b>`, "plain"];
    expect(String(html`<div>${items}</div>`)).toBe("<div><b>bold</b>plain</div>");
  });
});

describe("unsafeHTML edge cases", () => {
  it("returns empty string for undefined input", () => {
    expect(String(unsafeHTML(undefined))).toBe("");
  });

  it("returns empty string for empty string input", () => {
    expect(String(unsafeHTML(""))).toBe("");
  });

  it("passes through script tags unescaped", () => {
    const result = unsafeHTML('<script>alert("xss")</script>');
    expect(String(result)).toBe('<script>alert("xss")</script>');
  });
});

describe("resolveValue", () => {
  it("escapes a plain string", () => {
    expect(resolveValue("<b>")).toBe("&lt;b&gt;");
  });

  it("passes through a raw value unchanged", () => {
    expect(resolveValue(html`<b>bold</b>`)).toBe("<b>bold</b>");
  });

  it("joins and resolves an array of mixed values", () => {
    const arr = [html`<b>1</b>`, "<em>"];
    expect(resolveValue(arr)).toBe("<b>1</b>&lt;em&gt;");
  });

  it("returns empty string for null", () => {
    expect(resolveValue(null)).toBe("");
  });

  it("returns empty string for undefined", () => {
    expect(resolveValue(undefined)).toBe("");
  });
});

describe("isRaw", () => {
  it("returns false for a plain string", () => {
    expect(isRaw("hello")).toBeFalsy();
  });

  it("returns false for a plain object with __raw property", () => {
    expect(isRaw({ __raw: true })).toBeFalsy();
  });

  it("returns true for html tagged template result", () => {
    expect(isRaw(html`test`)).toBe(true);
  });

  it("returns true for an array with at least one raw item", () => {
    expect(isRaw(["plain", html`<b>raw</b>`])).toBe(true);
  });

  it("returns false for an array with no raw items", () => {
    expect(isRaw(["a", "b"])).toBe(false);
  });

  it("returns false for null", () => {
    expect(isRaw(null)).toBeFalsy();
  });

  it("returns false for undefined", () => {
    expect(isRaw(undefined)).toBeFalsy();
  });
});

describe("toPlainText", () => {
  it("joins array items into a string", () => {
    expect(toPlainText(["a", "b", "c"])).toBe("abc");
  });

  it("replaces null array items with empty string", () => {
    expect(toPlainText([null, "b", undefined])).toBe("b");
  });

  it("returns empty string for null", () => {
    expect(toPlainText(null)).toBe("");
  });

  it("returns empty string for undefined", () => {
    expect(toPlainText(undefined)).toBe("");
  });

  it("converts number to string", () => {
    expect(toPlainText(42)).toBe("42");
  });
});

describe("collapseWhitespace", () => {
  it("collapses newlines after closing tag", () => {
    expect(collapseWhitespace(">\n  ")).toBe(">");
  });

  it("collapses newlines before opening tag", () => {
    expect(collapseWhitespace("\n  <")).toBe("<");
  });

  it("replaces newlines in text content with a space", () => {
    expect(collapseWhitespace("hello\n  world")).toBe("hello world");
  });

  it("collapses whitespace between tags", () => {
    expect(collapseWhitespace(">   <")).toBe("><");
  });

  it("returns unchanged string with no whitespace", () => {
    expect(collapseWhitespace("<div>text</div>")).toBe("<div>text</div>");
  });

  it("handles tabs mixed with spaces and newlines", () => {
    expect(collapseWhitespace(">\n\t  <")).toBe("><");
  });

  it("handles only newlines", () => {
    expect(collapseWhitespace("\n\n\n")).toBe(" ");
  });

  it("handles complex template with mixed whitespace", () => {
    const input = "<div>\n  <span>\n    text\n  </span>\n</div>";
    const result = collapseWhitespace(input);
    expect(result).not.toContain("\n");
    expect(result).toBe("<div><span>text</span></div>");
  });
});

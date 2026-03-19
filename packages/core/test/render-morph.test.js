import { describe, it, expect } from "vitest";
import { renderTemplate } from "../src/common/render.js";
import { html, unsafeHTML, nothing } from "../src/elena.js";

const el = () => document.createElement("div");

const attrTpl = Object.assign(['<div class="', '"><span>text</span></div>'], {
  raw: ['<div class="', '"><span>text</span></div>'],
});

describe("morphContent edge cases", () => {
  it("appends extra children when new has more nodes", () => {
    const container = el();
    const tpl1 = Object.assign(['<div data-x="', '"><p>one</p></div>'], {
      raw: ['<div data-x="', '"><p>one</p></div>'],
    });
    const tpl2 = Object.assign(['<div data-x="', '"><p>one</p><p>two</p></div>'], {
      raw: ['<div data-x="', '"><p>one</p><p>two</p></div>'],
    });
    renderTemplate(container, tpl1, ["a"]);
    expect(container.querySelectorAll("p").length).toBe(1);

    renderTemplate(container, tpl2, ["a"]);
    expect(container.querySelectorAll("p").length).toBe(2);
  });

  it("removes extra children when new has fewer nodes", () => {
    const container = el();
    const tpl1 = Object.assign(['<div data-x="', '"><p>a</p><p>b</p></div>'], {
      raw: ['<div data-x="', '"><p>a</p><p>b</p></div>'],
    });
    const tpl2 = Object.assign(['<div data-x="', '"><p>a</p></div>'], {
      raw: ['<div data-x="', '"><p>a</p></div>'],
    });
    renderTemplate(container, tpl1, ["x"]);
    expect(container.querySelectorAll("p").length).toBe(2);

    renderTemplate(container, tpl2, ["x"]);
    expect(container.querySelectorAll("p").length).toBe(1);
  });

  it("replaces node when type changes from element to text", () => {
    const container = el();
    const tpl1 = Object.assign(['<div data-x="', '"><span>elem</span></div>'], {
      raw: ['<div data-x="', '"><span>elem</span></div>'],
    });
    const tpl2 = Object.assign(['<div data-x="', '">text only</div>'], {
      raw: ['<div data-x="', '">text only</div>'],
    });
    renderTemplate(container, tpl1, ["a"]);
    expect(container.querySelector("span")).not.toBeNull();

    renderTemplate(container, tpl2, ["b"]);
    expect(container.querySelector("span")).toBeNull();
    expect(container.querySelector("div").textContent).toBe("text only");
  });

  it("replaces node when type changes from text to element", () => {
    const container = el();
    const tpl1 = Object.assign(['<div data-x="', '">text</div>'], {
      raw: ['<div data-x="', '">text</div>'],
    });
    const tpl2 = Object.assign(['<div data-x="', '"><b>bold</b></div>'], {
      raw: ['<div data-x="', '"><b>bold</b></div>'],
    });
    renderTemplate(container, tpl1, ["a"]);
    renderTemplate(container, tpl2, ["b"]);
    expect(container.querySelector("b").textContent).toBe("bold");
  });

  it("replaces element when tag name changes", () => {
    const container = el();
    const tpl1 = Object.assign(['<div data-x="', '"><span>a</span></div>'], {
      raw: ['<div data-x="', '"><span>a</span></div>'],
    });
    const tpl2 = Object.assign(['<div data-x="', '"><em>b</em></div>'], {
      raw: ['<div data-x="', '"><em>b</em></div>'],
    });
    renderTemplate(container, tpl1, ["x"]);
    expect(container.querySelector("span")).not.toBeNull();

    renderTemplate(container, tpl2, ["y"]);
    expect(container.querySelector("span")).toBeNull();
    expect(container.querySelector("em").textContent).toBe("b");
  });

  it("morphs deeply nested attributes", () => {
    const container = el();
    const tpl = Object.assign(
      ['<div data-x="', '"><section><span class="deep">inner</span></section></div>'],
      {
        raw: ['<div data-x="', '"><section><span class="deep">inner</span></section></div>'],
      }
    );
    renderTemplate(container, tpl, ["1"]);
    const span = container.querySelector(".deep");

    renderTemplate(container, tpl, ["2"]);
    expect(container.querySelector(".deep")).toBe(span);
    expect(container.querySelector("div").getAttribute("data-x")).toBe("2");
  });

  it("morphs from empty container to non-empty", () => {
    const container = el();
    const empty = Object.assign([""], { raw: [""] });
    renderTemplate(container, empty, []);
    expect(container.innerHTML).toBe("");

    const filled = Object.assign(['<span data-x="', '">hi</span>'], {
      raw: ['<span data-x="', '">hi</span>'],
    });
    renderTemplate(container, filled, ["a"]);
    expect(container.querySelector("span").textContent).toBe("hi");
  });

  it("morphs from non-empty to empty", () => {
    const container = el();
    const filled = Object.assign(['<span data-x="', '">hi</span>'], {
      raw: ['<span data-x="', '">hi</span>'],
    });
    renderTemplate(container, filled, ["a"]);
    expect(container.querySelector("span")).not.toBeNull();

    const empty = Object.assign([""], { raw: [""] });
    renderTemplate(container, empty, []);
    expect(container.innerHTML).toBe("");
  });
});

describe("createTemplate marker validation", () => {
  it("falls back to morph when value is inside an attribute", () => {
    const container = el();
    const tpl = Object.assign(['<div class="', '">content</div>'], {
      raw: ['<div class="', '">content</div>'],
    });
    renderTemplate(container, tpl, ["test"]);
    expect(container._tplParts).toBeNull();
    expect(container.querySelector("div").getAttribute("class")).toBe("test");
  });

  it("uses clone path when all markers survive in text position", () => {
    const container = el();
    const t = html`<div>${"text"}</div>`;
    renderTemplate(container, t.strings, t.values);
    expect(container._tplParts).not.toBeNull();
    expect(container._tplParts[0]).toBeDefined();
  });

  it("static template with zero values renders correctly", () => {
    const container = el();
    const tpl = Object.assign(["<b>static</b>"], { raw: ["<b>static</b>"] });
    renderTemplate(container, tpl, []);
    expect(container.querySelector("b").textContent).toBe("static");
  });
});

describe("patchTextNodes edge cases", () => {
  it("bails out when _tplParts entry is undefined (raw HTML slot)", () => {
    const container = el();
    const tpl = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });
    renderTemplate(container, tpl, [html`<b>raw</b>`]);
    expect(container._tplParts[0]).toBeUndefined();

    const result = renderTemplate(container, tpl, [html`<em>new</em>`]);
    expect(result).toBe(true);
    expect(container.querySelector("em").textContent).toBe("new");
  });

  it("patches when array value changes (different toPlainText)", () => {
    const container = el();
    const tpl = Object.assign(["<span>", "</span>"], { raw: ["<span>", "</span>"] });
    renderTemplate(container, tpl, [["a"]]);
    expect(container.querySelector("span").textContent).toBe("a");

    renderTemplate(container, tpl, [["a", "b"]]);
    expect(container.querySelector("span").textContent).toBe("ab");
  });

  it("skips patch when array toPlainText is identical", () => {
    const container = el();
    const tpl = Object.assign(["<span>", "</span>"], { raw: ["<span>", "</span>"] });
    renderTemplate(container, tpl, [["x", "y"]]);
    const textNode = container._tplParts[0];

    const result = renderTemplate(container, tpl, [["x", "y"]]);
    expect(result).toBe(false);
    expect(container._tplParts[0]).toBe(textNode);
  });

  it("patches only changed values in a multi-value template", () => {
    const container = el();
    const tpl = Object.assign(["<p>", " ", " ", "</p>"], {
      raw: ["<p>", " ", " ", "</p>"],
    });
    renderTemplate(container, tpl, ["a", "b", "c"]);
    const node0 = container._tplParts[0];
    const node1 = container._tplParts[1];
    const node2 = container._tplParts[2];

    renderTemplate(container, tpl, ["a", "X", "c"]);
    expect(container._tplParts[0]).toBe(node0);
    expect(container._tplParts[1]).toBe(node1);
    expect(container._tplParts[2]).toBe(node2);
    expect(node1.textContent).toBe("X");
    expect(node0.textContent).toBe("a");
    expect(node2.textContent).toBe("c");
  });

  it("bails out immediately when template strings differ", () => {
    const container = el();
    const tplA = Object.assign(["<b>", "</b>"], { raw: ["<b>", "</b>"] });
    const tplB = Object.assign(["<i>", "</i>"], { raw: ["<i>", "</i>"] });
    renderTemplate(container, tplA, ["first"]);

    const result = renderTemplate(container, tplB, ["second"]);
    expect(result).toBe(true);
    expect(container.querySelector("i").textContent).toBe("second");
  });
});

describe("cloneAndPatch edge cases", () => {
  it("handles unsafeHTML with empty string", () => {
    const container = el();
    const t = html`<div>${unsafeHTML("")}</div>`;
    renderTemplate(container, t.strings, t.values);
    expect(container.querySelector("div").textContent).toBe("");
  });

  it("handles nothing sentinel via clone path", () => {
    const container = el();
    const tpl = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });
    renderTemplate(container, tpl, [nothing]);
    expect(container.querySelector("div").textContent).toBe("");
  });

  it("WeakMap cache is not reused for different strings refs", () => {
    const container = el();
    const tplA = Object.assign(["<span>", "</span>"], { raw: ["<span>", "</span>"] });
    const tplB = Object.assign(["<span>", "</span>"], { raw: ["<span>", "</span>"] });
    renderTemplate(container, tplA, ["A"]);
    expect(container._tplStrings).toBe(tplA);

    renderTemplate(container, tplB, ["B"]);
    expect(container._tplStrings).toBe(tplB);
    expect(container.querySelector("span").textContent).toBe("B");
  });
});

describe("morph whitespace compression", () => {
  it("compresses >  < to >< in fallback path output", () => {
    const container = el();
    const tpl = Object.assign(['<div class="', '"> <span>a</span> </div>'], {
      raw: ['<div class="', '"> <span>a</span> </div>'],
    });
    renderTemplate(container, tpl, ["cls"]);
    const span = container.querySelector("span");
    expect(span).not.toBeNull();
    expect(span.textContent).toBe("a");
  });
});

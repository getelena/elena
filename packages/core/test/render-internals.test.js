import { describe, it, expect } from "vitest";
import { renderTemplate } from "../src/common/render.js";
import { html, nothing, unsafeHTML } from "../src/elena.js";

const el = () => document.createElement("div");

// Shared template references for tests
const singleText = Object.assign(["<span>", "</span>"], { raw: ["<span>", "</span>"] });
const twoTexts = Object.assign(["<span>", "</span><span>", "</span>"], {
  raw: ["<span>", "</span><span>", "</span>"],
});
const attrAndText = Object.assign(['<span class="', '">', "</span>"], {
  raw: ['<span class="', '">', "</span>"],
});
const threeTexts = Object.assign(["<p>", " ", " ", "</p>"], {
  raw: ["<p>", " ", " ", "</p>"],
});

describe("render internals", () => {
  describe("template clone path", () => {
    it("clones cached template on second render with same shape", () => {
      const container = el();
      const t1 = html`<div><span>${"a"}</span></div>`;
      const firstResult = renderTemplate(container, t1.strings, t1.values);
      expect(firstResult).toBe(true);

      const container2 = el();
      const t2 = html`<div><span>${"b"}</span></div>`;
      renderTemplate(container2, t2.strings, t2.values);
      expect(container2.querySelector("span").textContent).toBe("b");
    });

    it("reuses cached template across multiple elements", () => {
      // Same strings ref used for multiple elements
      const c1 = el();
      const c2 = el();

      renderTemplate(c1, singleText, ["first"]);
      renderTemplate(c2, singleText, ["second"]);

      expect(c1.querySelector("span").textContent).toBe("first");
      expect(c2.querySelector("span").textContent).toBe("second");

      expect(c1._tplParts).not.toBe(c2._tplParts);
      expect(c1._tplParts[0]).not.toBe(c2._tplParts[0]);
    });

    it("handles static template with zero interpolations", () => {
      const container = el();
      const tpl = Object.assign(["<div><b>static</b></div>"], {
        raw: ["<div><b>static</b></div>"],
      });
      renderTemplate(container, tpl, []);
      expect(container.querySelector("b").textContent).toBe("static");
    });

    it("handles deeply nested HTML structure", () => {
      const container = el();
      const t = html`
        <div>
          <section>
            <article>
              <p>${"deep"}</p>
            </article>
          </section>
        </div>
      `;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("p").textContent).toBe("deep");
    });
  });

  describe("innerHTML fallback path", () => {
    it("falls back to innerHTML when value is in attribute position", () => {
      const container = el();
      renderTemplate(container, attrAndText, ["my-class", "content"]);
      const span = container.querySelector("span");
      expect(span.getAttribute("class")).toBe("my-class");
      expect(span.textContent).toBe("content");
    });

    it("fast-patches text values on re-render even in fallback path", () => {
      const container = el();
      renderTemplate(container, attrAndText, ["cls", "hello"]);
      const textNode = container._tplParts[1];

      // Re-render with same attribute but different text
      renderTemplate(container, attrAndText, ["cls", "world"]);
      // Text node should be patched in place
      expect(container.querySelector("span").textContent).toBe("world");
    });

    it("attribute-position values leave _tplParts unmapped", () => {
      const container = el();
      renderTemplate(container, attrAndText, ["cls-a", "text"]);

      expect(container._tplParts[0]).toBeUndefined();
      expect(container._tplParts[1]).toBeUndefined();
    });

    it("handles multiple attributes with interpolations", () => {
      const container = el();
      const tpl = Object.assign(['<input type="', '" name="', '">'], {
        raw: ['<input type="', '" name="', '">'],
      });
      renderTemplate(container, tpl, ["email", "user-email"]);
      const input = container.querySelector("input");
      expect(input.getAttribute("type")).toBe("email");
      expect(input.getAttribute("name")).toBe("user-email");
    });
  });

  describe("mixed attribute and text positions", () => {
    it("renders both attribute and text values correctly", () => {
      const container = el();
      const t = html`<div class="${"wrapper"}"><span>${"inner"}</span></div>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("div").getAttribute("class")).toBe("wrapper");
      expect(container.querySelector("span").textContent).toBe("inner");
    });

    it("multiple text values with one attribute value", () => {
      const container = el();
      const tpl = Object.assign(['<div class="', '"><b>', "</b><i>", "</i></div>"], {
        raw: ['<div class="', '"><b>', "</b><i>", "</i></div>"],
      });
      renderTemplate(container, tpl, ["cls", "bold", "italic"]);
      expect(container.querySelector("div").getAttribute("class")).toBe("cls");
      expect(container.querySelector("b").textContent).toBe("bold");
      expect(container.querySelector("i").textContent).toBe("italic");
    });
  });

  describe("cloneAndPatch with raw HTML values", () => {
    it("renders html fragment in text position via clone path", () => {
      const container = el();
      const t = html`<div>${html`<b>bold</b>`}</div>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("b").textContent).toBe("bold");
    });

    it("renders unsafeHTML in text position via clone path", () => {
      const container = el();
      const t = html`<div>${unsafeHTML("<em>emphasis</em>")}</div>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("em").textContent).toBe("emphasis");
    });

    it("renders nothing as empty via clone path", () => {
      const container = el();
      const t = html`<div>${nothing}</div>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("div").textContent).toBe("");
    });

    it("raw HTML value has no fast-patch text node (undefined in _tplParts)", () => {
      const container = el();
      const tpl = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });
      renderTemplate(container, tpl, [html`<b>raw</b>`]);
      // Raw values can't be fast-patched
      expect(container._tplParts[0]).toBeUndefined();
    });

    it("mix of raw and plain values in same template", () => {
      const container = el();
      const t = html`<div>${html`<b>bold</b>`}<span>${"plain"}</span></div>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("b").textContent).toBe("bold");
      expect(container.querySelector("span").textContent).toBe("plain");
    });
  });

  describe("re-render path transitions", () => {
    it("clone path → fast path on re-render with changed text", () => {
      const container = el();
      renderTemplate(container, singleText, ["hello"]);
      const textNode = container._tplParts[0];

      const result = renderTemplate(container, singleText, ["world"]);
      expect(result).toBe(false); // patched, no full render
      expect(container.querySelector("span").textContent).toBe("world");
      expect(container._tplParts[0]).toBe(textNode);
    });

    it("fast path → full render when template shape changes", () => {
      const tplA = Object.assign(["<span>", "</span>"], { raw: ["<span>", "</span>"] });
      const tplB = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });
      const container = el();

      renderTemplate(container, tplA, ["A"]);
      expect(container.querySelector("span")).not.toBeNull();

      renderTemplate(container, tplB, ["B"]);
      expect(container.querySelector("span")).toBeNull();
      expect(container.querySelector("div").textContent).toBe("B");
    });

    it("plain text → raw HTML → plain text transitions", () => {
      const container = el();
      const tpl = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });

      // 1. Plain text
      renderTemplate(container, tpl, ["hello"]);
      expect(container.querySelector("div").textContent).toBe("hello");

      // 2. Switch to raw HTML: forces full render
      renderTemplate(container, tpl, [html`<b>bold</b>`]);
      expect(container.querySelector("b").textContent).toBe("bold");

      // 3. Back to plain text: forces full render (raw → non-raw change)
      renderTemplate(container, tpl, ["plain again"]);
      expect(container.querySelector("div").textContent).toBe("plain again");
      expect(container.querySelector("b")).toBeNull();
    });

    it("nothing → text → nothing transitions", () => {
      const container = el();
      const tpl = Object.assign(["<span>", "</span>"], { raw: ["<span>", "</span>"] });

      renderTemplate(container, tpl, [nothing]);
      expect(container.querySelector("span").textContent).toBe("");

      renderTemplate(container, tpl, ["visible"]);
      expect(container.querySelector("span").textContent).toBe("visible");

      renderTemplate(container, tpl, [nothing]);
      expect(container.querySelector("span").textContent).toBe("");
    });

    it("unsafeHTML content change triggers full re-render", () => {
      const container = el();
      const tpl = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });

      renderTemplate(container, tpl, [unsafeHTML("<b>first</b>")]);
      expect(container.querySelector("b").textContent).toBe("first");

      renderTemplate(container, tpl, [unsafeHTML("<i>second</i>")]);
      expect(container.querySelector("b")).toBeNull();
      expect(container.querySelector("i").textContent).toBe("second");
    });
  });

  describe("edge cases", () => {
    it("empty template (no tags, no values)", () => {
      const container = el();
      const tpl = Object.assign([""], { raw: [""] });
      renderTemplate(container, tpl, []);
      expect(container.innerHTML).toBe("");
    });

    it("template with only whitespace", () => {
      const container = el();
      const tpl = Object.assign(["   \n   "], { raw: ["   \n   "] });
      renderTemplate(container, tpl, []);
      expect(container.innerHTML.trim()).toBe("");
    });

    it("adjacent interpolations with no static text between them", () => {
      const container = el();
      const t = html`<span>${"a"}${" "}${"b"}</span>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("span").textContent).toBe("a b");
    });

    it("adjacent interpolations re-render independently on fast path", () => {
      const container = el();
      renderTemplate(container, threeTexts, ["a", "b", "c"]);
      expect(container.querySelector("p").textContent).toBe("a b c");

      renderTemplate(container, threeTexts, ["a", "X", "c"]);
      expect(container.querySelector("p").textContent).toBe("a X c");
    });

    it("special characters in values are escaped on clone path", () => {
      const container = el();
      const t = html`<span>${'<script>alert("xss")</script>'}</span>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("script")).toBeNull();
      expect(container.querySelector("span").textContent).toBe('<script>alert("xss")</script>');
    });

    it("ampersands and quotes in values are escaped", () => {
      const container = el();
      const t = html`<span>${'A & B "quoted"'}</span>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("span").textContent).toBe('A & B "quoted"');
    });

    it("numeric values render correctly", () => {
      const container = el();
      const t = html`<span>${42}</span>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("span").textContent).toBe("42");
    });

    it("zero renders as '0' not empty", () => {
      const container = el();
      const t = html`<span>${0}</span>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("span").textContent).toBe("0");
    });

    it("boolean false renders as 'false'", () => {
      const container = el();
      const t = html`<span>${false}</span>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("span").textContent).toBe("false");
    });

    it("large number of interpolations", () => {
      const container = el();
      const count = 50;
      const statics = ["<div>"];
      for (let i = 0; i < count; i++) {
        statics.push(i < count - 1 ? " " : "</div>");
      }
      const tpl = Object.assign(statics, { raw: [...statics] });
      const values = Array.from({ length: count }, (_, i) => String(i));
      renderTemplate(container, tpl, values);

      const text = container.querySelector("div").textContent;
      expect(text).toBe(values.join(" "));
    });

    it("re-rendering with same values is a no-op", () => {
      const container = el();
      renderTemplate(container, twoTexts, ["A", "B"]);
      const node0 = container._tplParts[0];
      const node1 = container._tplParts[1];

      const result = renderTemplate(container, twoTexts, ["A", "B"]);
      expect(result).toBe(false);
      expect(container._tplParts[0]).toBe(node0);
      expect(container._tplParts[1]).toBe(node1);
    });

    it("HTML comment in template does not interfere with markers", () => {
      const container = el();
      const t = html`<!-- user comment --><span>${"value"}</span><!-- end -->`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("span").textContent).toBe("value");
    });

    it("self-closing elements work with interpolations", () => {
      const container = el();
      const t = html`<div><img src="test.png"><span>${"after"}</span></div>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("img")).not.toBeNull();
      expect(container.querySelector("span").textContent).toBe("after");
    });

    it("entities in static parts are preserved", () => {
      const container = el();
      const t = html`<span>&amp; ${"dynamic"} &lt;</span>`;
      renderTemplate(container, t.strings, t.values);
      const text = container.querySelector("span").textContent;
      expect(text).toContain("&");
      expect(text).toContain("dynamic");
      expect(text).toContain("<");
    });
  });

  describe("rapid successive renders", () => {
    it("many fast-path updates produce correct final state", () => {
      const container = el();
      renderTemplate(container, singleText, ["start"]);

      for (let i = 0; i < 100; i++) {
        renderTemplate(container, singleText, [`value-${i}`]);
      }

      expect(container.querySelector("span").textContent).toBe("value-99");
      expect(container._tplParts[0].textContent).toBe("value-99");
    });

    it("alternating full and fast renders stay consistent", () => {
      const container = el();
      const tplA = Object.assign(["<b>", "</b>"], { raw: ["<b>", "</b>"] });
      const tplB = Object.assign(["<i>", "</i>"], { raw: ["<i>", "</i>"] });

      for (let i = 0; i < 10; i++) {
        const tpl = i % 2 === 0 ? tplA : tplB;
        renderTemplate(container, tpl, [`round-${i}`]);
      }

      expect(container.querySelector("i").textContent).toBe("round-9");
      expect(container.querySelector("b")).toBeNull();
    });
  });

  describe("renderTemplate return value", () => {
    it("returns true on first render (full render)", () => {
      const container = el();
      const result = renderTemplate(container, singleText, ["hello"]);
      expect(result).toBe(true);
    });

    it("returns false on fast-path re-render", () => {
      const container = el();
      renderTemplate(container, singleText, ["a"]);
      const result = renderTemplate(container, singleText, ["b"]);
      expect(result).toBe(false);
    });

    it("returns false when values are unchanged (no-op)", () => {
      const container = el();
      renderTemplate(container, singleText, ["same"]);
      const result = renderTemplate(container, singleText, ["same"]);
      expect(result).toBe(false);
    });

    it("returns true when template shape changes", () => {
      const container = el();
      const tplA = Object.assign(["<b>", "</b>"], { raw: ["<b>", "</b>"] });
      const tplB = Object.assign(["<i>", "</i>"], { raw: ["<i>", "</i>"] });
      renderTemplate(container, tplA, ["x"]);
      const result = renderTemplate(container, tplB, ["y"]);
      expect(result).toBe(true);
    });

    it("returns true when raw HTML value changes on fast path", () => {
      const container = el();
      const tpl = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });
      renderTemplate(container, tpl, ["text"]);
      const result = renderTemplate(container, tpl, [html`<b>raw</b>`]);
      expect(result).toBe(true);
    });
  });
});

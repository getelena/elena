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

      expect(c1._templateParts).not.toBe(c2._templateParts);
      expect(c1._templateParts[0]).not.toBe(c2._templateParts[0]);
    });

    it("handles static template with zero interpolations", () => {
      const container = el();
      const template = Object.assign(["<div><b>static</b></div>"], {
        raw: ["<div><b>static</b></div>"],
      });
      renderTemplate(container, template, []);
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

  describe("morph fallback path", () => {
    it("renders correctly when value is in attribute position", () => {
      const container = el();
      renderTemplate(container, attrAndText, ["my-class", "content"]);
      const span = container.querySelector("span");
      expect(span.getAttribute("class")).toBe("my-class");
      expect(span.textContent).toBe("content");
    });

    it("updates text content on re-render in fallback path", () => {
      const container = el();
      renderTemplate(container, attrAndText, ["cls", "hello"]);

      // Re-render with same attribute but different text
      renderTemplate(container, attrAndText, ["cls", "world"]);
      expect(container.querySelector("span").textContent).toBe("world");
    });

    it("preserves element identity across re-renders", () => {
      const container = el();
      renderTemplate(container, attrAndText, ["cls", "hello"]);
      const span = container.querySelector("span");

      // Re-render: morph should patch in-place, not recreate the element
      renderTemplate(container, attrAndText, ["cls-new", "world"]);
      expect(container.querySelector("span")).toBe(span);
      expect(span.getAttribute("class")).toBe("cls-new");
      expect(span.textContent).toBe("world");
    });

    it("attribute-position values get patchable parts", () => {
      const container = el();
      renderTemplate(container, attrAndText, ["cls-a", "text"]);

      expect(container._templateParts).not.toBeNull();
      // First part is an attribute part [element, attr]
      expect(Array.isArray(container._templateParts[0])).toBe(true);
      // Second part is a text node
      expect(container._templateParts[1].nodeType).toBe(3);
    });

    it("handles multiple attributes with interpolations", () => {
      const container = el();
      const template = Object.assign(['<input type="', '" name="', '">'], {
        raw: ['<input type="', '" name="', '">'],
      });
      renderTemplate(container, template, ["email", "user-email"]);
      const input = container.querySelector("input");
      expect(input.getAttribute("type")).toBe("email");
      expect(input.getAttribute("name")).toBe("user-email");
    });

    it("removes attributes that disappear on re-render", () => {
      const container = el();
      // Template with a conditional boolean attribute: `${disabled ? "disabled" : ""}`
      const template = Object.assign(["<button ", ">click</button>"], {
        raw: ["<button ", ">click</button>"],
      });
      renderTemplate(container, template, ["disabled"]);
      expect(container.querySelector("button").hasAttribute("disabled")).toBe(true);

      renderTemplate(container, template, [""]);
      expect(container.querySelector("button").hasAttribute("disabled")).toBe(false);
    });

    it("preserves element identity when conditional attribute is toggled", () => {
      const container = el();
      const template = Object.assign(["<button ", ">click</button>"], {
        raw: ["<button ", ">click</button>"],
      });
      renderTemplate(container, template, [""]);
      const button = container.querySelector("button");

      renderTemplate(container, template, ["disabled"]);
      expect(container.querySelector("button")).toBe(button);
      expect(button.hasAttribute("disabled")).toBe(true);

      renderTemplate(container, template, [""]);
      expect(container.querySelector("button")).toBe(button);
      expect(button.hasAttribute("disabled")).toBe(false);
    });
  });

  describe("morph with nested elements", () => {
    it("morphs same-tag child elements in-place (attributes and content)", () => {
      const container = el();
      const template = Object.assign(['<div class="', '"><span>inner</span></div>'], {
        raw: ['<div class="', '"><span>inner</span></div>'],
      });
      renderTemplate(container, template, ["a"]);
      const div = container.querySelector("div");
      const span = container.querySelector("span");

      renderTemplate(container, template, ["b"]);
      expect(container.querySelector("div")).toBe(div);
      expect(container.querySelector("span")).toBe(span);
      expect(div.getAttribute("class")).toBe("b");
    });

    it("skips comment nodes that match on both sides", () => {
      const container = el();
      const template = Object.assign(['<div data-x="', '"><!-- keep --><span>ok</span></div>'], {
        raw: ['<div data-x="', '"><!-- keep --><span>ok</span></div>'],
      });
      renderTemplate(container, template, ["1"]);
      const span = container.querySelector("span");

      renderTemplate(container, template, ["2"]);

      expect(container.querySelector("span")).toBe(span);
      expect(container.querySelector("div").getAttribute("data-x")).toBe("2");
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
      const template = Object.assign(['<div class="', '"><b>', "</b><i>", "</i></div>"], {
        raw: ['<div class="', '"><b>', "</b><i>", "</i></div>"],
      });
      renderTemplate(container, template, ["cls", "bold", "italic"]);
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

    it("raw HTML value has no fast-patch text node (undefined in _templateParts)", () => {
      const container = el();
      const template = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });
      renderTemplate(container, template, [html`<b>raw</b>`]);
      // Raw values can't be fast-patched
      expect(container._templateParts[0]).toBeUndefined();
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
      const textNode = container._templateParts[0];

      const result = renderTemplate(container, singleText, ["world"]);
      expect(result).toBe(false); // patched, no full render
      expect(container.querySelector("span").textContent).toBe("world");
      expect(container._templateParts[0]).toBe(textNode);
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
      const template = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });

      // 1. Plain text
      renderTemplate(container, template, ["hello"]);
      expect(container.querySelector("div").textContent).toBe("hello");

      // 2. Switch to raw HTML: forces full render
      renderTemplate(container, template, [html`<b>bold</b>`]);
      expect(container.querySelector("b").textContent).toBe("bold");

      // 3. Back to plain text: forces full render (raw → non-raw change)
      renderTemplate(container, template, ["plain again"]);
      expect(container.querySelector("div").textContent).toBe("plain again");
      expect(container.querySelector("b")).toBeNull();
    });

    it("nothing → text → nothing transitions", () => {
      const container = el();
      const template = Object.assign(["<span>", "</span>"], { raw: ["<span>", "</span>"] });

      renderTemplate(container, template, [nothing]);
      expect(container.querySelector("span").textContent).toBe("");

      renderTemplate(container, template, ["visible"]);
      expect(container.querySelector("span").textContent).toBe("visible");

      renderTemplate(container, template, [nothing]);
      expect(container.querySelector("span").textContent).toBe("");
    });

    it("unsafeHTML content change triggers full re-render", () => {
      const container = el();
      const template = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });

      renderTemplate(container, template, [unsafeHTML("<b>first</b>")]);
      expect(container.querySelector("b").textContent).toBe("first");

      renderTemplate(container, template, [unsafeHTML("<i>second</i>")]);
      expect(container.querySelector("b")).toBeNull();
      expect(container.querySelector("i").textContent).toBe("second");
    });
  });

  describe("edge cases", () => {
    it("empty template (no tags, no values)", () => {
      const container = el();
      const template = Object.assign([""], { raw: [""] });
      renderTemplate(container, template, []);
      expect(container.innerHTML).toBe("");
    });

    it("template with only whitespace", () => {
      const container = el();
      const template = Object.assign(["   \n   "], { raw: ["   \n   "] });
      renderTemplate(container, template, []);
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
      const template = Object.assign(statics, { raw: [...statics] });
      const values = Array.from({ length: count }, (_, i) => String(i));
      renderTemplate(container, template, values);

      const text = container.querySelector("div").textContent;
      expect(text).toBe(values.join(" "));
    });

    it("re-rendering with same values is a no-op", () => {
      const container = el();
      renderTemplate(container, twoTexts, ["A", "B"]);
      const node0 = container._templateParts[0];
      const node1 = container._templateParts[1];

      const result = renderTemplate(container, twoTexts, ["A", "B"]);
      expect(result).toBe(false);
      expect(container._templateParts[0]).toBe(node0);
      expect(container._templateParts[1]).toBe(node1);
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

    it("renders a Symbol as its string representation", () => {
      const container = el();
      const sym = Symbol("test");
      const t = html`<span>${sym}</span>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("span").textContent).toBe("Symbol(test)");
    });

    it("does not call a function bound to a text position", () => {
      const container = el();
      const fn = () => "should not be called";
      const t = html`<span>${fn}</span>`;
      renderTemplate(container, t.strings, t.values);
      // Function should be stringified, not invoked
      expect(container.querySelector("span").textContent).toContain("should not be called");
    });

    it("renders NaN as 'NaN'", () => {
      const container = el();
      const t = html`<span>${NaN}</span>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("span").textContent).toBe("NaN");
    });

    it("renders Infinity as 'Infinity'", () => {
      const container = el();
      const t = html`<span>${Infinity}</span>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("span").textContent).toBe("Infinity");
    });

    it("renders negative zero as '0'", () => {
      const container = el();
      const t = html`<span>${-0}</span>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("span").textContent).toBe("0");
    });

    it("renders an object via its toString()", () => {
      const container = el();
      const obj = { toString: () => "custom string" };
      const t = html`<span>${obj}</span>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("span").textContent).toBe("custom string");
    });

    it("renders an object without custom toString as [object Object]", () => {
      const container = el();
      const t = html`<span>${{}}</span>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("span").textContent).toBe("[object Object]");
    });

    it("boolean true renders as 'true'", () => {
      const container = el();
      const t = html`<span>${true}</span>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("span").textContent).toBe("true");
    });

    it("empty string renders as empty content", () => {
      const container = el();
      const t = html`<span>${""}</span>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("span").textContent).toBe("");
    });
  });

  describe("value type transitions", () => {
    it("switches from template result to plain string", () => {
      const container = el();
      const template = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });

      renderTemplate(container, template, [html`<b>bold</b>`]);
      expect(container.querySelector("b")).not.toBeNull();

      renderTemplate(container, template, ["just text"]);
      expect(container.querySelector("b")).toBeNull();
      expect(container.querySelector("div").textContent).toBe("just text");
    });

    it("switches from plain string to template result", () => {
      const container = el();
      const template = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });

      renderTemplate(container, template, ["just text"]);
      expect(container.querySelector("div").textContent).toBe("just text");

      renderTemplate(container, template, [html`<em>emphasis</em>`]);
      expect(container.querySelector("em").textContent).toBe("emphasis");
    });

    it("switches from template result to null", () => {
      const container = el();
      const template = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });

      renderTemplate(container, template, [html`<b>content</b>`]);
      expect(container.querySelector("b")).not.toBeNull();

      renderTemplate(container, template, [null]);
      expect(container.querySelector("b")).toBeNull();
      expect(container.querySelector("div").textContent).toBe("");
    });

    it("switches from template result to undefined", () => {
      const container = el();
      const template = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });

      renderTemplate(container, template, [html`<b>content</b>`]);
      expect(container.querySelector("b")).not.toBeNull();

      renderTemplate(container, template, [undefined]);
      expect(container.querySelector("b")).toBeNull();
      expect(container.querySelector("div").textContent).toBe("");
    });

    it("switches from number to string to template result", () => {
      const container = el();
      const template = Object.assign(["<span>", "</span>"], { raw: ["<span>", "</span>"] });

      renderTemplate(container, template, [42]);
      expect(container.querySelector("span").textContent).toBe("42");

      renderTemplate(container, template, ["hello"]);
      expect(container.querySelector("span").textContent).toBe("hello");

      renderTemplate(container, template, [html`<i>styled</i>`]);
      expect(container.querySelector("i").textContent).toBe("styled");
    });

    it("switches between different template results", () => {
      const container = el();
      const template = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });

      renderTemplate(container, template, [html`<b>bold</b>`]);
      expect(container.querySelector("b")).not.toBeNull();

      renderTemplate(container, template, [html`<em>emphasis</em>`]);
      expect(container.querySelector("b")).toBeNull();
      expect(container.querySelector("em").textContent).toBe("emphasis");
    });

    it("renders a nested template multiple times", () => {
      const container = el();
      const inner = html`<b>reused</b>`;
      const t = html`<div>${inner}${inner}</div>`;
      renderTemplate(container, t.strings, t.values);
      const bolds = container.querySelectorAll("b");
      expect(bolds.length).toBe(2);
      expect(bolds[0].textContent).toBe("reused");
      expect(bolds[1].textContent).toBe("reused");
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
      expect(container._templateParts[0].textContent).toBe("value-99");
    });

    it("alternating full and fast renders stay consistent", () => {
      const container = el();
      const tplA = Object.assign(["<b>", "</b>"], { raw: ["<b>", "</b>"] });
      const tplB = Object.assign(["<i>", "</i>"], { raw: ["<i>", "</i>"] });

      for (let i = 0; i < 10; i++) {
        const template = i % 2 === 0 ? tplA : tplB;
        renderTemplate(container, template, [`round-${i}`]);
      }

      expect(container.querySelector("i").textContent).toBe("round-9");
      expect(container.querySelector("b")).toBeNull();
    });
  });

  describe("cloneAndPatch attribute edge cases", () => {
    it("handles array value in attribute position", () => {
      const container = el();
      const template = Object.assign(['<div class="', '">text</div>'], {
        raw: ['<div class="', '">text</div>'],
      });
      renderTemplate(container, template, [["a", "b"]]);
      expect(container.querySelector("div").getAttribute("class")).toBe("ab");
    });

    it("handles null value in attribute position", () => {
      const container = el();
      const template = Object.assign(['<div class="', '">text</div>'], {
        raw: ['<div class="', '">text</div>'],
      });
      renderTemplate(container, template, [null]);
      expect(container.querySelector("div").getAttribute("class")).toBe("");
    });

    it("handles undefined value in attribute position", () => {
      const container = el();
      const template = Object.assign(['<div data-x="', '">text</div>'], {
        raw: ['<div data-x="', '">text</div>'],
      });
      renderTemplate(container, template, [undefined]);
      expect(container.querySelector("div").getAttribute("data-x")).toBe("");
    });

    it("skips attribute when placeholder element is unreachable in cloned template", () => {
      const container = el();
      // Attribute placeholder inside <template> is unreachable by querySelector
      const template = Object.assign(
        ['<div><template><span class="', '"></span></template></div>'],
        { raw: ['<div><template><span class="', '"></span></template></div>'] }
      );
      renderTemplate(container, template, ["test"]);
      // Rendering should not crash; the attribute simply isn't patched
      expect(container.querySelector("div")).not.toBeNull();
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
      const template = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });
      renderTemplate(container, template, ["text"]);
      const result = renderTemplate(container, template, [html`<b>raw</b>`]);
      expect(result).toBe(true);
    });
  });

  describe("morph on re-render", () => {
    it("preserves element identity when raw HTML sibling changes", () => {
      const container = el();
      const template = Object.assign(["<input />", ""], { raw: ["<input />", ""] });

      renderTemplate(container, template, [""]);
      const input = container.querySelector("input");

      renderTemplate(container, template, [html`<span class="error">bad</span>`]);
      expect(container.querySelector("input")).toBe(input);
      expect(container.querySelector(".error").textContent).toBe("bad");
    });

    it("updates content correctly through multiple morph cycles", () => {
      const container = el();
      const template = Object.assign(["<input />", ""], { raw: ["<input />", ""] });

      renderTemplate(container, template, [""]);
      const input = container.querySelector("input");

      renderTemplate(container, template, [html`<span>first</span>`]);
      renderTemplate(container, template, [html`<span>second</span>`]);
      renderTemplate(container, template, [html`<span>third</span>`]);

      expect(container.querySelector("input")).toBe(input);
      expect(container.querySelector("span").textContent).toBe("third");
    });

    it("replaces element when tag changes during morph", () => {
      const container = el();
      const tplA = Object.assign(["<span>", "</span>"], { raw: ["<span>", "</span>"] });
      const tplB = Object.assign(["<div>", "</div>"], { raw: ["<div>", "</div>"] });

      renderTemplate(container, tplA, ["hello"]);
      const oldSpan = container.querySelector("span");

      renderTemplate(container, tplB, ["world"]);
      expect(container.querySelector("span")).toBeNull();
      expect(container.querySelector("div").textContent).toBe("world");
      expect(container.querySelector("div")).not.toBe(oldSpan);
    });

    it("preserves fast path for first render", () => {
      const container = el();
      const template = Object.assign(["<span>", "</span>"], { raw: ["<span>", "</span>"] });

      renderTemplate(container, template, ["hello"]);
      expect(container._templateParts).not.toBeNull();

      // Second render uses fast path (patchParts)
      const result = renderTemplate(container, template, ["world"]);
      expect(result).toBe(false);
      expect(container.querySelector("span").textContent).toBe("world");
    });
  });
});

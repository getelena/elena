import { describe, it, expect } from "vitest";
import { renderTemplate } from "../src/common/render.js";
import { html, nothing } from "../src/elena.js";

describe("array rendering in templates", () => {
  /** @returns {HTMLDivElement} */
  const el = () => document.createElement("div");

  it("array of strings renders as joined text (no commas)", () => {
    const container = el();
    const t = html`<span>${["a", "b", "c"]}</span>`;
    renderTemplate(container, t.strings, t.values);
    expect(container.querySelector("span").textContent).toBe("abc");
  });

  it("array of html fragments renders as HTML", () => {
    const container = el();
    const items = ["one", "two"];
    const t = html`<ul>${items.map(i => html`<li>${i}</li>`)}</ul>`;
    renderTemplate(container, t.strings, t.values);
    const lis = container.querySelectorAll("li");
    expect(lis.length).toBe(2);
    expect(lis[0].textContent).toBe("one");
    expect(lis[1].textContent).toBe("two");
  });

  it("nested html fragments (non-array) render as HTML", () => {
    const container = el();
    const inner = html`<li>one</li>`;
    const t = html`<ul>${inner}</ul>`;
    renderTemplate(container, t.strings, t.values);
    expect(container.querySelectorAll("li").length).toBe(1);
    expect(container.querySelector("li").textContent).toBe("one");
  });

  it("chained html fragments via reduce render correctly", () => {
    const container = el();
    const items = ["a", "b", "c"];
    const list = items.reduce((acc, i) => html`${acc}<li>${i}</li>`, nothing);
    const t = html`<ul>${list}</ul>`;
    renderTemplate(container, t.strings, t.values);
    const lis = container.querySelectorAll("li");
    expect(lis.length).toBe(3);
    expect(lis[0].textContent).toBe("a");
    expect(lis[1].textContent).toBe("b");
    expect(lis[2].textContent).toBe("c");
  });

  it("empty array renders as empty string", () => {
    const container = el();
    const t = html`<span>${[]}</span>`;
    renderTemplate(container, t.strings, t.values);
    expect(container.querySelector("span").textContent).toBe("");
  });

  it("nested arrays are flattened", () => {
    const container = el();
    const t = html`<span>${[["a", "b"], ["c"]]}</span>`;
    renderTemplate(container, t.strings, t.values);
    expect(container.querySelector("span").textContent).toBe("a,bc");
  });

  it("array of nothing sentinels renders as empty string", () => {
    const container = el();
    const t = html`<span>${[nothing, nothing]}</span>`;
    renderTemplate(container, t.strings, t.values);
    expect(container.querySelector("span").textContent).toBe("");
  });

  it("array in attribute position", () => {
    const container = el();
    const t = html`<span class="${["a", "b", "c"]}">text</span>`;
    renderTemplate(container, t.strings, t.values);
    expect(container.querySelector("span").getAttribute("class")).toBe("abc");
  });

  it("array with null and undefined elements", () => {
    const container = el();
    const t = html`<span>${[null, "hello", undefined]}</span>`;
    renderTemplate(container, t.strings, t.values);
    expect(container.querySelector("span").textContent).toBe("hello");
  });

  it("conditional nothing fallback with reduce pattern", () => {
    const container = el();
    const items = [1, 2, 3, 4, 5];
    const list = items.reduce((acc, i) => (i % 2 === 0 ? html`${acc}<li>${i}</li>` : acc), nothing);
    const t = html`<ul>${list}</ul>`;
    renderTemplate(container, t.strings, t.values);
    const lis = container.querySelectorAll("li");
    expect(lis.length).toBe(2);
    expect(lis[0].textContent).toBe("2");
    expect(lis[1].textContent).toBe("4");
  });

  it("array mixing html fragments and plain strings", () => {
    const container = el();
    const t = html`<div>${[html`<b>bold</b>`, " and ", html`<i>italic</i>`]}</div>`;
    renderTemplate(container, t.strings, t.values);
    expect(container.querySelector("b").textContent).toBe("bold");
    expect(container.querySelector("i").textContent).toBe("italic");
    expect(container.querySelector("div").textContent).toBe("bold and italic");
  });

  it("array with changing length triggers full render", () => {
    const container = el();

    const t1 = html`<ul>${["a"].map(i => html`<li>${i}</li>`)}</ul>`;
    const firstRender = renderTemplate(container, t1.strings, t1.values);
    expect(firstRender).toBe(true);
    expect(container.querySelectorAll("li").length).toBe(1);

    const t2 = html`<ul>${["a", "b"].map(i => html`<li>${i}</li>`)}</ul>`;
    const secondRender = renderTemplate(container, t2.strings, t2.values);
    expect(secondRender).toBe(true);
    expect(container.querySelectorAll("li").length).toBe(2);
  });

  it("array of plain strings on fast path re-render", () => {
    const container = el();

    function render(items) {
      return html`<span>${items}</span>`;
    }

    const t1 = render(["a", "b"]);
    renderTemplate(container, t1.strings, t1.values);
    expect(container.querySelector("span").textContent).toBe("ab");

    const t2 = render(["a", "b"]);
    const result = renderTemplate(container, t2.strings, t2.values);
    expect(result).toBe(false); // patched (no changes)
    expect(container.querySelector("span").textContent).toBe("ab");
  });
});

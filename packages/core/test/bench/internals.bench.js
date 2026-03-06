import { describe, bench } from "vitest";
import { renderTemplate } from "../../src/common/render.js";
import { html } from "../../src/common/utils.js";

/**
 * Micro-benchmarks isolating specific Elena internals.
 * Run with: npx vitest bench internals
 */

const MARKUP = "<span>hello world</span>";

describe("innerHTML vs createContextualFragment", () => {
  const el = document.createElement("div");
  document.body.appendChild(el);

  bench("innerHTML", () => {
    el.innerHTML = MARKUP;
  });

  bench("createRange().createContextualFragment", () => {
    el.replaceChildren(el.ownerDocument.createRange().createContextualFragment(MARKUP));
  });
});

describe("createTreeWalker node walk", () => {
  const el = document.createElement("div");
  el.innerHTML = MARKUP;
  document.body.appendChild(el);

  bench("createTreeWalker (walk 1 text node)", () => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {}
  });

  bench("no walk (baseline)", () => {
    el.firstElementChild;
  });
});

describe("regex passes on markup string", () => {
  bench("3x replace + trim", () => {
    MARKUP.replace(/>\s+</g, "><").replace(/>\s+/g, ">").replace(/\s+</g, "<").trim();
  });

  bench("no replace (baseline)", () => {
    MARKUP.trim();
  });
});

describe("renderTemplate (Elena fast path vs full render)", () => {
  // Two separate elements so cache state is independent
  const freshEl = () => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    return el;
  };

  const cachedEl = freshEl();
  // Prime the cache with one full render
  const tpl = () => html`<span>${"hello"}</span>`;
  renderTemplate(cachedEl, tpl().strings, tpl().values);

  bench("full render (cold, no cache)", () => {
    const el = freshEl();
    const t = tpl();
    renderTemplate(el, t.strings, t.values);
    document.body.removeChild(el);
  });

  bench("fast path (warm, same strings ref)", () => {
    const t = tpl();
    renderTemplate(cachedEl, t.strings, t.values);
  });
});

describe("queueMicrotask overhead", () => {
  bench("queueMicrotask (no-op fn)", () => {
    queueMicrotask(() => {});
  });

  bench("Promise.resolve().then (no-op fn)", () => {
    Promise.resolve().then(() => {});
  });

  bench("synchronous baseline", () => {
    (() => {})();
  });
});

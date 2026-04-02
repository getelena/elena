import { describe, bench, beforeAll, afterAll } from "vitest";
import "../../src/elena.js";
import "../fixtures/elena-element.js";
import "../fixtures/vanilla-element.js";
import "../fixtures/lit-element.js";
import "../fixtures/stencil-element.js";

/**
 * Template rendering benchmarks.
 * Run with: npx vitest bench
 */

// Suppress console.warn during benchmarks
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = () => {};
});
afterAll(() => {
  console.warn = originalWarn;
});

describe("Time to first render", () => {
  bench("Vanilla Web Component", () => {
    const el = document.createElement("vanilla-element");
    el.textContent = "Demo";
    document.body.appendChild(el);
    document.body.removeChild(el);
  });

  bench("Elena Progressive Web Component", () => {
    const el = document.createElement("basic-element");
    el.textContent = "Demo";
    document.body.appendChild(el);
    document.body.removeChild(el);
  });

  bench("Lit Web Component", async () => {
    const el = document.createElement("lit-bench-element");
    el.textContent = "Demo";
    document.body.appendChild(el);
    await el.updateComplete;
    document.body.removeChild(el);
  });

  bench("Stencil Web Component", async () => {
    const el = document.createElement("stencil-bench-element");
    el.textContent = "Demo";
    document.body.appendChild(el);
    await el.updateComplete;
    document.body.removeChild(el);
  });
});

describe("Batch creation of 100 components", () => {
  bench("100 Vanilla Web Components", () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 100; i++) {
      const el = document.createElement("vanilla-element");
      el.textContent = "test" + i;
      fragment.appendChild(el);
    }
    document.body.appendChild(fragment);
    document.body.innerHTML = "";
  });

  bench("100 Elena Progressive Web Components", () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 100; i++) {
      const el = document.createElement("basic-element");
      el.textContent = "test" + i;
      fragment.appendChild(el);
    }
    document.body.appendChild(fragment);
    document.body.innerHTML = "";
  });

  bench("100 Lit Web Components", async () => {
    const els = [];
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 100; i++) {
      const el = document.createElement("lit-bench-element");
      el.textContent = "test" + i;
      fragment.appendChild(el);
      els.push(el);
    }
    document.body.appendChild(fragment);
    await Promise.all(els.map(el => el.updateComplete));
    document.body.innerHTML = "";
  });

  bench("100 Stencil Web Components", async () => {
    const els = [];
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 100; i++) {
      const el = document.createElement("stencil-bench-element");
      el.textContent = "test" + i;
      fragment.appendChild(el);
      els.push(el);
    }
    document.body.appendChild(fragment);
    await Promise.all(els.map(el => el.updateComplete));
    document.body.innerHTML = "";
  });
});

describe("Batch creation of 500 components", () => {
  bench("500 Vanilla Web Components", () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 500; i++) {
      const el = document.createElement("vanilla-element");
      el.textContent = "test" + i;
      fragment.appendChild(el);
    }
    document.body.appendChild(fragment);
    document.body.innerHTML = "";
  });

  bench("500 Elena Progressive Web Components", () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 500; i++) {
      const el = document.createElement("basic-element");
      el.textContent = "test" + i;
      fragment.appendChild(el);
    }
    document.body.appendChild(fragment);
    document.body.innerHTML = "";
  });

  bench("500 Lit Web Components", async () => {
    const els = [];
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 500; i++) {
      const el = document.createElement("lit-bench-element");
      el.textContent = "test" + i;
      fragment.appendChild(el);
      els.push(el);
    }
    document.body.appendChild(fragment);
    await Promise.all(els.map(el => el.updateComplete));
    document.body.innerHTML = "";
  });

  bench("500 Stencil Web Components", async () => {
    const els = [];
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 500; i++) {
      const el = document.createElement("stencil-bench-element");
      el.textContent = "test" + i;
      fragment.appendChild(el);
      els.push(el);
    }
    document.body.appendChild(fragment);
    await Promise.all(els.map(el => el.updateComplete));
    document.body.innerHTML = "";
  });
});

describe("Batch creation of 1000 components", () => {
  bench("1000 Vanilla Web Components", () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 1000; i++) {
      const el = document.createElement("vanilla-element");
      el.textContent = "test" + i;
      fragment.appendChild(el);
    }
    document.body.appendChild(fragment);
    document.body.innerHTML = "";
  });

  bench("1000 Elena Progressive Web Components", () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 1000; i++) {
      const el = document.createElement("basic-element");
      el.textContent = "test" + i;
      fragment.appendChild(el);
    }
    document.body.appendChild(fragment);
    document.body.innerHTML = "";
  });

  bench("1000 Lit Web Components", async () => {
    const els = [];
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 1000; i++) {
      const el = document.createElement("lit-bench-element");
      el.textContent = "test" + i;
      fragment.appendChild(el);
      els.push(el);
    }
    document.body.appendChild(fragment);
    await Promise.all(els.map(el => el.updateComplete));
    document.body.innerHTML = "";
  });

  bench("1000 Stencil Web Components", async () => {
    const els = [];
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 1000; i++) {
      const el = document.createElement("stencil-bench-element");
      el.textContent = "test" + i;
      fragment.appendChild(el);
      els.push(el);
    }
    document.body.appendChild(fragment);
    await Promise.all(els.map(el => el.updateComplete));
    document.body.innerHTML = "";
  });
});

describe("Re-render performance", () => {
  const vanillaEl = document.createElement("vanilla-element");
  vanillaEl.setAttribute("variant", "initial");
  document.body.appendChild(vanillaEl);
  let vanillaCounter = 0;

  const basicEl = document.createElement("basic-element");
  basicEl.setAttribute("variant", "initial");
  basicEl.textContent = "Demo";
  document.body.appendChild(basicEl);
  let basicCounter = 0;

  const litEl = document.createElement("lit-bench-element");
  litEl.setAttribute("variant", "initial");
  litEl.textContent = "Demo";
  document.body.appendChild(litEl);
  let litCounter = 0;

  const stencilEl = document.createElement("stencil-bench-element");
  stencilEl.setAttribute("variant", "initial");
  document.body.appendChild(stencilEl);
  let stencilCounter = 0;

  bench("Re-render Vanilla Web Component", () => {
    vanillaEl.setAttribute("variant", `updated-${vanillaCounter++}`);
    vanillaEl.textContent = `test-${vanillaCounter++}`;
  });

  bench("Re-render Elena Progressive Web Component", async () => {
    basicEl.setAttribute("variant", `updated-${basicCounter++}`);
    basicEl.text = `test-${basicCounter++}`;
    await basicEl.updateComplete;
  });

  bench("Re-render Lit Web Component", async () => {
    litEl.setAttribute("variant", `updated-${litCounter++}`);
    litEl.textContent = `test-${litCounter++}`;
    await litEl.updateComplete;
  });

  bench("Re-render Stencil Web Component", async () => {
    stencilEl.setAttribute("variant", `updated-${stencilCounter++}`);
    stencilEl.textContent = `test-${stencilCounter++}`;
    await stencilEl.updateComplete;
  });
});

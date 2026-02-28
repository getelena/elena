import { describe, bench, beforeAll, afterAll } from "vitest";
import "../../src/elena.js";
import "../fixtures/elena-element.js";
import "../fixtures/vanilla-element.js";

/**
 * Template rendering benchmarks.
 * Run with: npx vitest bench
 *
 * Compares two element types:
 * - vanilla-element:         Plain HTMLElement, no framework (baseline)
 * - elena-element:           Elena (Custom Element, reactive properties)
 */

// Suppress console.warn during benchmarks (happy-dom fires
// extra callbacks during DOM teardown that trigger warnings)
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = () => {};
});
afterAll(() => {
  console.warn = originalWarn;
});

describe("single element creation", () => {
  bench("Vanilla Custom Element", () => {
    const el = document.createElement("vanilla-element");
    document.body.appendChild(el);
    document.body.removeChild(el);
  });

  bench("Elena Web Component", () => {
    const el = document.createElement("basic-element");
    document.body.appendChild(el);
    document.body.removeChild(el);
  });
});

describe("batch creation (100 elements)", () => {
  bench("100 Vanilla Custom Elements", () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 100; i++) {
      const el = document.createElement("vanilla-element");
      fragment.appendChild(el);
    }
    document.body.appendChild(fragment);
    document.body.innerHTML = "";
  });

  bench("100 Elena Web Components", () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 100; i++) {
      const el = document.createElement("basic-element");
      fragment.appendChild(el);
    }
    document.body.appendChild(fragment);
    document.body.innerHTML = "";
  });
});

describe("batch creation (500 elements)", () => {
  bench("500 Vanilla Custom Elements", () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 500; i++) {
      const el = document.createElement("vanilla-element");
      fragment.appendChild(el);
    }
    document.body.appendChild(fragment);
    document.body.innerHTML = "";
  });

  bench("500 Elena Web Components", () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 500; i++) {
      const el = document.createElement("basic-element");
      fragment.appendChild(el);
    }
    document.body.appendChild(fragment);
    document.body.innerHTML = "";
  });
});

describe("batch creation (1000 elements)", () => {
  bench("1000 Vanilla Custom Elements", () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 1000; i++) {
      const el = document.createElement("vanilla-element");
      fragment.appendChild(el);
    }
    document.body.appendChild(fragment);
    document.body.innerHTML = "";
  });

  bench("1000 Elena Web Components", () => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 1000; i++) {
      const el = document.createElement("basic-element");
      fragment.appendChild(el);
    }
    document.body.appendChild(fragment);
    document.body.innerHTML = "";
  });
});

describe("re-render via attribute change", () => {
  const vanillaEl = document.createElement("vanilla-element");
  vanillaEl.setAttribute("variant", "initial");
  document.body.appendChild(vanillaEl);
  let vanillaCounter = 0;

  const basicEl = document.createElement("basic-element");
  basicEl.setAttribute("variant", "initial");
  document.body.appendChild(basicEl);
  let basicCounter = 0;

  bench("Re-render Vanilla Custom Element", () => {
    vanillaEl.setAttribute("variant", `updated-${vanillaCounter++}`);
  });

  bench("Re-render Elena Web Component", () => {
    basicEl.setAttribute("variant", `updated-${basicCounter++}`);
  });
});

import { describe, it, expect } from "vitest";
import { createElement } from "./setup.js";
import "./fixtures/basic-element.js";
import "./fixtures/observed-element.js";
import "./fixtures/wrapper-element.js";
import "./fixtures/shadow-element.js";

async function waitForObserver(el) {
  await Promise.resolve();
  await el.updateComplete;
}

describe("external mutation observer", () => {
  it("re-renders when children are externally replaced", async () => {
    const el = document.createElement("observed-element");
    el.textContent = "Initial";
    document.body.appendChild(el);
    expect(el.querySelector(".inner").textContent).toBe("Initial");

    el.replaceChildren(document.createTextNode("Updated"));
    await waitForObserver(el);

    expect(el.querySelector(".inner")).not.toBeNull();
    expect(el.querySelector(".inner").textContent).toBe("Updated");
    expect(el.text).toBe("Updated");
  });

  it("re-renders when a text node is appended externally", async () => {
    const el = document.createElement("observed-element");
    el.textContent = "Hello";
    document.body.appendChild(el);
    expect(el.querySelector(".inner").textContent).toBe("Hello");

    el.replaceChildren(document.createTextNode("World"));
    await waitForObserver(el);

    expect(el.querySelector(".inner").textContent).toBe("World");
  });

  it("restores the template even when text is the same", async () => {
    const el = document.createElement("observed-element");
    el.textContent = "Same";
    document.body.appendChild(el);
    expect(el.querySelector(".inner")).not.toBeNull();

    el.replaceChildren(document.createTextNode("Same"));
    await waitForObserver(el);

    expect(el.querySelector(".inner")).not.toBeNull();
    expect(el.querySelector(".inner").textContent).toBe("Same");
  });

  it("does not trigger infinite re-renders", async () => {
    const el = document.createElement("observed-element");
    el.textContent = "Start";
    document.body.appendChild(el);

    let renderCount = 0;
    const origRender = el.render.bind(el);
    el.render = function () {
      renderCount++;
      return origRender();
    };

    el.replaceChildren(document.createTextNode("Change"));
    await waitForObserver(el);

    expect(renderCount).toBe(1);
    expect(el.querySelector(".inner").textContent).toBe("Change");
  });

  it("handles multiple rapid external mutations", async () => {
    const el = document.createElement("observed-element");
    el.textContent = "A";
    document.body.appendChild(el);

    el.replaceChildren(document.createTextNode("B"));
    await waitForObserver(el);

    el.replaceChildren(document.createTextNode("C"));
    await waitForObserver(el);

    expect(el.querySelector(".inner").textContent).toBe("C");
    expect(el.text).toBe("C");
  });

  it("is not active without static observe", async () => {
    const el = await createElement("basic-element", { label: "Prop" });
    expect(el._observer).toBeUndefined();
  });

  it("is not active on Composite Components", async () => {
    const el = await createElement("wrapper-element");
    expect(el._observer).toBeUndefined();
  });

  it("is not active on Shadow DOM components", async () => {
    const el = await createElement("shadow-element");
    expect(el._observer).toBeUndefined();
  });

  it("is cleaned up on disconnect", async () => {
    const el = document.createElement("observed-element");
    el.textContent = "Hello";
    document.body.appendChild(el);

    expect(el._observer).toBeDefined();

    el.remove();
    el.replaceChildren(document.createTextNode("Gone"));
    await Promise.resolve();
    expect(el._updateComplete).toBeUndefined();
  });

  it("is re-attached on reconnection", async () => {
    const el = document.createElement("observed-element");
    el.textContent = "Before";
    document.body.appendChild(el);
    expect(el.querySelector(".inner").textContent).toBe("Before");

    el.remove();
    document.body.appendChild(el);

    el.replaceChildren(document.createTextNode("After"));
    await waitForObserver(el);

    expect(el.querySelector(".inner").textContent).toBe("After");
  });
});

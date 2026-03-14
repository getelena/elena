import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createElement } from "./setup.js";
import "./fixtures/throwing-element.js";

describe("error recovery", () => {
  let errorSpy;
  beforeEach(() => {
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    errorSpy.mockRestore();
  });

  it("exception in render() does not prevent subsequent renders", async () => {
    const el = await createElement("throwing-element", { label: "initial" });
    expect(el.querySelector(".inner").textContent).toBe("initial");

    // Enable throwing, trigger a re-render via microtask
    el._throwInRender = true;
    el.setAttribute("label", "crash");
    await el.updateComplete;
    expect(errorSpy).toHaveBeenCalled();

    // Disable throwing, trigger another re-render
    el._throwInRender = false;
    el.setAttribute("label", "recovered");
    await el.updateComplete;
    expect(el.querySelector(".inner").textContent).toBe("recovered");
  });

  it("exception in willUpdate() does not permanently break the component", async () => {
    const el = await createElement("throwing-element", { label: "initial" });

    el._throwInWillUpdate = true;
    el.setAttribute("label", "crash");
    await el.updateComplete;
    expect(errorSpy).toHaveBeenCalled();

    // Disable throwing and try again
    el._throwInWillUpdate = false;
    el.setAttribute("label", "recovered");
    await el.updateComplete;
    expect(el.querySelector(".inner").textContent).toBe("recovered");
  });

  it("exception in updated() does not block updateComplete resolution", async () => {
    const el = await createElement("throwing-element", { label: "initial" });

    el._throwInUpdated = true;
    el.setAttribute("label", "crash");

    // updateComplete should still resolve (resolve() is in a finally block)
    await expect(el.updateComplete).resolves.toBeUndefined();
    expect(errorSpy).toHaveBeenCalled();
  });

  it("exception in firstUpdated() propagates from connectedCallback", () => {
    // In connectedCallback, firstUpdated() and updated() are called sequentially
    // with no try/catch. If firstUpdated() throws, updated() is skipped.
    const el = document.createElement("throwing-element");
    el._throwInFirstUpdated = true;
    const updatedSpy = vi.spyOn(el, "updated");

    expect(() => document.body.appendChild(el)).toThrow("firstUpdated error");
    // updated() is NOT called because connectedCallback has no error boundary
    expect(updatedSpy).not.toHaveBeenCalled();
    updatedSpy.mockRestore();
  });

  it("_isRendering is cleared after render() throws", async () => {
    const el = await createElement("throwing-element", { label: "initial" });

    el._throwInRender = true;
    el.setAttribute("label", "crash");
    await el.updateComplete;

    // _isRendering should have been cleared by the finally block
    expect(el._isRendering).toBe(false);
  });

  it("_renderPending is reset after an exception in the update cycle", async () => {
    const el = await createElement("throwing-element", { label: "initial" });

    el._throwInRender = true;
    el.setAttribute("label", "crash");
    await el.updateComplete;

    expect(el._renderPending).toBe(false);
  });

  it("element renders correctly after a failed cycle", async () => {
    const el = await createElement("throwing-element", { label: "before" });

    // Crash in willUpdate
    el._throwInWillUpdate = true;
    el.setAttribute("label", "crash");
    await el.updateComplete;

    // Recover and verify the DOM is correct
    el._throwInWillUpdate = false;
    el.setAttribute("label", "after");
    await el.updateComplete;
    expect(el.querySelector(".inner").textContent).toBe("after");
    expect(el.hasAttribute("hydrated")).toBe(true);
  });

  it("multiple consecutive errors do not accumulate broken state", async () => {
    const el = await createElement("throwing-element", { label: "start" });

    // Crash 3 times in a row
    el._throwInRender = true;
    for (let i = 0; i < 3; i++) {
      el.setAttribute("label", `crash-${i}`);
      await el.updateComplete;
    }

    // Recover
    el._throwInRender = false;
    el.setAttribute("label", "final");
    await el.updateComplete;
    expect(el.querySelector(".inner").textContent).toBe("final");
  });
});

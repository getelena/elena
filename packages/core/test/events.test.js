import { describe, it, expect, vi } from "vitest";
import { createElement } from "./setup.js";
import "./fixtures/event-element.js";

describe("event delegation", () => {
  it("click on inner element reaches the host", async () => {
    const el = await createElement("event-element");
    const handler = vi.fn();
    el.addEventListener("click", handler);

    el.element.click();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("non-bubbling focus event is re-dispatched on the host", async () => {
    const el = await createElement("event-element");
    const handler = vi.fn();
    el.addEventListener("focus", handler);

    // Native focus does not bubble, so Elena re-dispatches it.
    el.element.dispatchEvent(new Event("focus"));

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("does not re-dispatch bubbling events (they reach the host naturally)", async () => {
    const el = await createElement("event-element");
    const handler = vi.fn();
    el.addEventListener("click", handler);

    el.element.click();

    // Only one event should reach the host (the original, not a duplicate).
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("programmatic event methods proxy to inner element", async () => {
    const el = await createElement("event-element");
    const spy = vi.spyOn(el.element, "click");
    el.click();
    expect(spy).toHaveBeenCalled();
  });

  it("events are cleaned up on disconnect", async () => {
    const el = await createElement("event-element");
    const inner = el.element;
    const spy = vi.spyOn(inner, "removeEventListener");

    el.remove();

    expect(spy).toHaveBeenCalledWith("click", el);
    expect(spy).toHaveBeenCalledWith("focus", el);
  });

  it("both click and focus proxy methods are created", async () => {
    const el = await createElement("event-element");
    expect(typeof el.click).toBe("function");
    expect(typeof el.focus).toBe("function");
  });

  it("both events delegate independently", async () => {
    const el = await createElement("event-element");
    const clickHandler = vi.fn();
    const focusHandler = vi.fn();
    el.addEventListener("click", clickHandler);
    el.addEventListener("focus", focusHandler);

    el.element.click();
    el.element.dispatchEvent(new Event("focus"));

    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(focusHandler).toHaveBeenCalledTimes(1);
  });
});

describe("handleEvent filtering", () => {
  it("ignores events not listed in static events", async () => {
    const el = await createElement("event-element");
    const handler = vi.fn();
    el.addEventListener("mouseover", handler);

    // Manually call handleEvent with an unlisted event type
    el.handleEvent(new Event("mouseover", { bubbles: true }));

    expect(handler).not.toHaveBeenCalled();
  });

  it("ignores listed bubbling events (they pass through naturally)", async () => {
    const el = await createElement("event-element");
    const handler = vi.fn();
    el.addEventListener("click", handler);

    // handleEvent receives a bubbling click but should not re-dispatch
    el.handleEvent(new Event("click", { bubbles: true }));

    expect(handler).not.toHaveBeenCalled();
  });
});

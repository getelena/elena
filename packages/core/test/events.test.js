import { describe, it, expect, vi } from "vitest";
import { createElement } from "./setup.js";
import { ElenaEvent } from "../src/common/events.js";
import "./fixtures/event-element.js";

describe("ElenaEvent", () => {
  it("defaults to bubbles: true and composed: true", () => {
    const event = new ElenaEvent("click");
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);
  });

  it("merges custom eventInitDict", () => {
    const event = new ElenaEvent("click", { cancelable: true, bubbles: false });
    expect(event.cancelable).toBe(true);
    expect(event.bubbles).toBe(false);
    expect(event.composed).toBe(true);
  });
});

describe("event delegation", () => {
  it("click on inner element dispatches ElenaEvent on host", async () => {
    const el = await createElement("event-element");
    const handler = vi.fn();
    el.addEventListener("click", handler);

    el.element.click();

    expect(handler).toHaveBeenCalledTimes(1);
    const dispatched = handler.mock.calls[0][0];
    expect(dispatched.bubbles).toBe(true);
    expect(dispatched.composed).toBe(true);
  });

  it("stopPropagation is called on original event", async () => {
    const el = await createElement("event-element");
    const inner = el.element;

    const origEvent = new Event("click", { bubbles: true });
    const spy = vi.spyOn(origEvent, "stopPropagation");
    inner.dispatchEvent(origEvent);

    expect(spy).toHaveBeenCalled();
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

  it("dispatched event is always cancelable", async () => {
    const el = await createElement("event-element");
    const handler = vi.fn();
    el.addEventListener("click", handler);

    el.element.click();

    expect(handler).toHaveBeenCalledTimes(1);
    const dispatched = handler.mock.calls[0][0];
    expect(dispatched.cancelable).toBe(true);
  });
});

describe("multiple event delegation", () => {
  it("focus on inner element dispatches ElenaEvent on host", async () => {
    const el = await createElement("event-element");
    const handler = vi.fn();
    el.addEventListener("focus", handler);

    el.element.dispatchEvent(new Event("focus", { bubbles: true }));

    expect(handler).toHaveBeenCalledTimes(1);
    const dispatched = handler.mock.calls[0][0];
    expect(dispatched.bubbles).toBe(true);
    expect(dispatched.composed).toBe(true);
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
    el.element.dispatchEvent(new Event("focus", { bubbles: true }));

    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(focusHandler).toHaveBeenCalledTimes(1);
  });
});

describe("custom event dispatch", () => {
  it("manually dispatching ElenaEvent from component code works", async () => {
    const el = await createElement("event-element");
    const handler = vi.fn();
    el.addEventListener("custom-event", handler);

    el.dispatchEvent(new ElenaEvent("custom-event"));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("ElenaEvent does not carry detail (use CustomEvent for that)", async () => {
    // ElenaEvent extends Event, not CustomEvent. The `detail` property
    // is not part of EventInit, so it is not accessible on the event object.
    const el = await createElement("event-element");
    const handler = vi.fn();
    el.addEventListener("custom-event", handler);

    el.dispatchEvent(new ElenaEvent("custom-event", { detail: { value: 42 } }));

    expect(handler).toHaveBeenCalledTimes(1);
    const dispatched = handler.mock.calls[0][0];
    expect(dispatched.detail).toBeUndefined();
  });

  it("ElenaEvent defaults (bubbles, composed) work when dispatched manually", async () => {
    const el = await createElement("event-element");
    const handler = vi.fn();
    // Listen on parent to verify bubbling
    document.body.addEventListener("custom-event", handler);

    el.dispatchEvent(new ElenaEvent("custom-event"));

    expect(handler).toHaveBeenCalledTimes(1);
    const dispatched = handler.mock.calls[0][0];
    expect(dispatched.bubbles).toBe(true);
    expect(dispatched.composed).toBe(true);

    document.body.removeEventListener("custom-event", handler);
  });
});

describe("handleEvent filtering", () => {
  it("ignores events not listed in options.events", async () => {
    const el = await createElement("event-element");
    const handler = vi.fn();
    el.addEventListener("mouseover", handler);

    // Manually call handleEvent with an unlisted event type
    el.handleEvent(new Event("mouseover", { bubbles: true }));

    expect(handler).not.toHaveBeenCalled();
  });
});

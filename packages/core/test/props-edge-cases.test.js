import { describe, it, expect, vi } from "vitest";
import { createElement } from "./setup.js";
import { getPropValue, setProps, getProps, syncAttribute } from "../src/common/props.js";
import { Elena, html } from "../src/elena.js";
import "./fixtures/basic-element.js";
import "./fixtures/boolean-element.js";
import "./fixtures/number-element.js";
import "./fixtures/object-element.js";
import "./fixtures/no-reflect-element.js";

describe("getPropValue edge cases", () => {
  describe("number", () => {
    it("toProp coerces '0' to 0", () => {
      expect(getPropValue("number", "0", "toProp")).toBe(0);
    });

    it("toProp coerces non-numeric string to NaN", () => {
      expect(getPropValue("number", "abc", "toProp")).toBeNaN();
    });

    it("toProp coerces empty string to 0", () => {
      expect(getPropValue("number", "", "toProp")).toBe(0);
    });

    it("toProp coerces '3.14' to 3.14", () => {
      expect(getPropValue("number", "3.14", "toProp")).toBeCloseTo(3.14);
    });

    it("toProp coerces '-5' to -5", () => {
      expect(getPropValue("number", "-5", "toProp")).toBe(-5);
    });

    it("toAttribute returns 0 for 0", () => {
      expect(getPropValue("number", 0, "toAttribute")).toBe(0);
    });
  });

  describe("boolean", () => {
    it("coerces 0 (falsy non-null) to true", () => {
      expect(getPropValue("boolean", 0)).toBe(true);
    });

    it("coerces 1 (truthy non-null) to true", () => {
      expect(getPropValue("boolean", 1)).toBe(true);
    });

    it("coerces undefined to true (non-null)", () => {
      expect(getPropValue("boolean", undefined)).toBe(true);
    });
  });

  describe("object / array", () => {
    it("toProp returns empty string for empty string (falsy path)", () => {
      expect(getPropValue("object", "", "toProp")).toBe("");
    });

    it("toProp returns undefined for undefined (falsy path)", () => {
      expect(getPropValue("object", undefined, "toProp")).toBeUndefined();
    });

    it("toProp returns 0 for 0 (falsy path)", () => {
      expect(getPropValue("array", 0, "toProp")).toBe(0);
    });

    it("toProp parses JSON array", () => {
      expect(getPropValue("array", "[1,2,3]", "toProp")).toEqual([1, 2, 3]);
    });

    it("toAttribute serializes array to JSON", () => {
      expect(getPropValue("array", [1, 2], "toAttribute")).toBe("[1,2]");
    });
  });

  describe("string", () => {
    it("toAttribute returns null for null value", () => {
      expect(getPropValue("string", null, "toAttribute")).toBe(null);
    });

    it("toProp returns empty string for null", () => {
      expect(getPropValue("string", null, "toProp")).toBe("");
    });

    it("no transform returns value as-is", () => {
      expect(getPropValue("string", "hello")).toBe("hello");
    });
  });

  describe("unknown type (fallback)", () => {
    it("no transform returns value as-is", () => {
      expect(getPropValue("undefined", "raw-value")).toBe("raw-value");
    });

    it("toProp returns value for unknown type", () => {
      expect(getPropValue("undefined", "anything", "toProp")).toBe("anything");
    });

    it("toProp coerces null to empty string for unknown type", () => {
      expect(getPropValue("undefined", null, "toProp")).toBe("");
    });
  });
});

describe("setProps edge cases", () => {
  it("setter stores value but does not sync attribute before connection", () => {
    const el = document.createElement("basic-element");
    el.label = "buffered";
    expect(el.label).toBe("buffered");
    expect(el.hasAttribute("label")).toBe(false);
  });

  it("setter during _syncing skips syncAttribute", async () => {
    const el = await createElement("basic-element");
    el._syncing = true;
    const spy = vi.spyOn(el, "setAttribute");
    el.label = "syncing";
    expect(spy).not.toHaveBeenCalled();
    el._syncing = false;
    spy.mockRestore();
  });

  it("multiple props are independent", async () => {
    const el = await createElement("number-element");
    el.count = 10;
    el.max = 200;
    expect(el.count).toBe(10);
    expect(el.max).toBe(200);
  });

  it("setting prop to null removes string attribute", async () => {
    const el = await createElement("basic-element", { label: "hello" });
    el.label = null;
    expect(el.hasAttribute("label")).toBe(false);
  });

  it("setting boolean prop to null removes attribute", async () => {
    const el = await createElement("boolean-element", { disabled: "" });
    el.disabled = null;
    expect(el.hasAttribute("disabled")).toBe(false);
  });

  it("property descriptor is configurable and enumerable", () => {
    const proto = {};
    setProps(proto, ["test"]);
    const desc = Object.getOwnPropertyDescriptor(proto, "test");
    expect(desc.configurable).toBe(true);
    expect(desc.enumerable).toBe(true);
  });

  it("non-reflecting prop does not trigger render before hydration", () => {
    const el = document.createElement("no-reflect-element");
    const spy = vi.spyOn(el, "render");
    el.content = "before-connect";
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe("getProps edge cases", () => {
  it("coerces boolean attribute presence to true", async () => {
    const el = await createElement("boolean-element");
    el.setAttribute("disabled", "");
    expect(el.disabled).toBe(true);
    expect(typeof el.disabled).toBe("boolean");
  });

  it("coerces number attribute string to number", async () => {
    const el = await createElement("number-element");
    el.setAttribute("count", "42");
    expect(el.count).toBe(42);
    expect(typeof el.count).toBe("number");
  });

  it("coerces JSON object attribute to object", async () => {
    const el = await createElement("object-element");
    el.setAttribute("config", '{"a":1}');
    expect(el.config).toEqual({ a: 1 });
  });

  it("coerces JSON array attribute to array", async () => {
    const el = await createElement("object-element");
    el.setAttribute("items", "[1,2]");
    expect(el.items).toEqual([1, 2]);
  });

  it("handles null to empty string for first attribute set", () => {
    const context = { name: "default" };
    getProps(context, "name", null, "");
    expect(context.name).toBe("");
  });
});

describe("syncAttribute edge cases", () => {
  it("sets attribute to empty string for value ''", () => {
    const el = document.createElement("div");
    syncAttribute(el, "data-test", "");
    expect(el.getAttribute("data-test")).toBe("");
  });

  it("sets attribute to '0' for value 0", () => {
    const el = document.createElement("div");
    syncAttribute(el, "data-count", 0);
    expect(el.getAttribute("data-count")).toBe("0");
  });

  it("sets attribute to 'false' for value false", () => {
    const el = document.createElement("div");
    syncAttribute(el, "data-bool", false);
    expect(el.getAttribute("data-bool")).toBe("false");
  });

  it("overwrites existing attribute value", () => {
    const el = document.createElement("div");
    syncAttribute(el, "data-x", "old");
    syncAttribute(el, "data-x", "new");
    expect(el.getAttribute("data-x")).toBe("new");
  });

  it("warns for undefined element", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    syncAttribute(undefined, "data-test", "value");
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("Cannot sync attrs"));
    spy.mockRestore();
  });

  it("handles hyphenated attribute names", () => {
    const el = document.createElement("div");
    syncAttribute(el, "data-my-attr", "value");
    expect(el.getAttribute("data-my-attr")).toBe("value");
  });

  it("no-op when removing attribute that does not exist", () => {
    const el = document.createElement("div");
    expect(() => syncAttribute(el, "nonexistent", null)).not.toThrow();
    expect(el.hasAttribute("nonexistent")).toBe(false);
  });
});

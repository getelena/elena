import { describe, it, expect, vi } from "vitest";
import { createElement } from "./setup.js";
import { getPropValue, setProps, getProps, syncAttribute } from "../src/common/props.js";
import "./fixtures/basic-element.js";
import "./fixtures/boolean-element.js";
import "./fixtures/number-element.js";
import "./fixtures/object-element.js";
import "./fixtures/no-reflect-element.js";

describe("getPropValue", () => {
  describe("string", () => {
    it("passes through string values", () => {
      expect(getPropValue("string", "hello")).toBe("hello");
    });

    it("toAttribute returns value as-is", () => {
      expect(getPropValue("string", "hello", "toAttribute")).toBe("hello");
    });

    it("toProp returns value as-is", () => {
      expect(getPropValue("string", "hello", "toProp")).toBe("hello");
    });
  });

  describe("boolean", () => {
    it("converts null to false", () => {
      expect(getPropValue("boolean", null)).toBe(false);
    });

    it("converts non-null string to true", () => {
      expect(getPropValue("boolean", "")).toBe(true);
      expect(getPropValue("boolean", "disabled")).toBe(true);
    });

    it("preserves actual boolean values", () => {
      expect(getPropValue("boolean", true)).toBe(true);
      expect(getPropValue("boolean", false)).toBe(false);
    });

    it('toAttribute: true returns ""', () => {
      expect(getPropValue("boolean", true, "toAttribute")).toBe("");
    });

    it("toAttribute: false returns null", () => {
      expect(getPropValue("boolean", false, "toAttribute")).toBeNull();
    });
  });

  describe("number", () => {
    it("toProp coerces string to number", () => {
      expect(getPropValue("number", "42", "toProp")).toBe(42);
    });

    it("toProp preserves null", () => {
      expect(getPropValue("number", null, "toProp")).toBeNull();
    });

    it("toAttribute returns value as-is", () => {
      expect(getPropValue("number", 42, "toAttribute")).toBe(42);
    });

    it("toAttribute returns null for null", () => {
      expect(getPropValue("number", null, "toAttribute")).toBeNull();
    });
  });

  describe("object / array", () => {
    it("toProp parses JSON string", () => {
      expect(getPropValue("object", '{"a":1}', "toProp")).toEqual({ a: 1 });
    });

    it("toAttribute serializes to JSON", () => {
      expect(getPropValue("object", { a: 1 }, "toAttribute")).toBe('{"a":1}');
    });

    it("toProp returns null for null", () => {
      expect(getPropValue("array", null, "toProp")).toBeNull();
    });

    it("toAttribute returns null for null", () => {
      expect(getPropValue("array", null, "toAttribute")).toBeNull();
    });

    it("toProp returns null and warns on invalid JSON object string", () => {
      const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
      expect(getPropValue("object", "not json", "toProp")).toBeNull();
      expect(spy).toHaveBeenCalledWith(expect.stringContaining("[ELENA]"));
      spy.mockRestore();
    });

    it("toProp returns null and warns on malformed JSON array string", () => {
      const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
      expect(getPropValue("array", "[1,2,broken]", "toProp")).toBeNull();
      expect(spy).toHaveBeenCalledWith(expect.stringContaining("[ELENA]"));
      spy.mockRestore();
    });
  });
});

describe("setProps", () => {
  it("getter returns undefined when _props map does not exist", () => {
    // Directly test the prototype getter with a bare object (no _props)
    const proto = {};
    setProps(proto, ["testProp"]);
    const descriptor = Object.getOwnPropertyDescriptor(proto, "testProp");
    expect(descriptor.get.call({})).toBeUndefined();
  });

  it("property getter returns attribute value", async () => {
    const el = await createElement("basic-element", { label: "test" });
    expect(el.label).toBe("test");
  });

  it("property setter syncs to host attribute", async () => {
    const el = await createElement("basic-element", { label: "before" });
    el.label = "after";
    expect(el.getAttribute("label")).toBe("after");
  });

  it("boolean false removes attribute from host", async () => {
    const el = await createElement("boolean-element", { disabled: "" });
    el.disabled = false;
    expect(el.hasAttribute("disabled")).toBe(false);
  });

  it("empty string default is not set as attribute on host", async () => {
    // basic-element defaults label to "" in its constructor. It should flush
    // without adding an empty attribute to the host
    const el = await createElement("basic-element");
    expect(el.hasAttribute("label")).toBe(false);
  });

  it("setter is a no-op when the same value is assigned again", async () => {
    const el = await createElement("basic-element", { label: "hello" });
    const spy = vi.spyOn(el, "setAttribute");
    el.label = "hello";
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe("syncAttribute", () => {
  it("warns and returns early when element is null", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    syncAttribute(null, "data-test", "value");
    expect(spy).toHaveBeenCalledWith(expect.stringContaining("null element"));
    spy.mockRestore();
  });

  it("removes attribute when called with null value", () => {
    const el = document.createElement("div");
    el.setAttribute("test-attr", "initial");
    expect(el.hasAttribute("test-attr")).toBe(true);

    syncAttribute(el, "test-attr", null);
    expect(el.hasAttribute("test-attr")).toBe(false);
  });

  it("does not throw when removing a null value from a missing attribute", () => {
    const el = document.createElement("div");
    expect(el.hasAttribute("missing-attr")).toBe(false);

    // Should not throw or warn
    expect(() => syncAttribute(el, "missing-attr", null)).not.toThrow();
    expect(el.hasAttribute("missing-attr")).toBe(false);
  });
});

describe("getProps", () => {
  it("updates context property on attribute change", async () => {
    const el = await createElement("basic-element", { label: "initial" });
    el.setAttribute("label", "updated");
    // getProps is called in attributeChangedCallback: the prop should reflect
    expect(el.getAttribute("label")).toBe("updated");
  });

  it("does not update when oldValue equals newValue", () => {
    const context = { name: "unchanged" };
    getProps(context, "name", "same", "same");
    expect(context.name).toBe("unchanged");
  });

  it("falls back to string type for undefined properties", () => {
    const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const context = {};
    getProps(context, "missing", null, "hello");
    expect(context.missing).toBe("hello");
    spy.mockRestore();
  });
});

describe("number props", () => {
  it("property getter returns typed value", async () => {
    const el = await createElement("number-element");
    el.count = 42;
    expect(el.count).toBe(42);
    expect(el.getAttribute("count")).toBe("42");
  });

  it("property setter syncs to host attribute", async () => {
    const el = await createElement("number-element");
    el.count = 7;
    expect(el.count).toBe(7);
    expect(el.getAttribute("count")).toBe("7");
  });

  it("default value is available before setProps", () => {
    const el = document.createElement("number-element");
    // Before connection, constructor default is available
    expect(el.count).toBe(0);
    expect(el.max).toBe(100);
  });
});

describe("reflect: false", () => {
  it("non-reflecting prop does not sync to host attribute", async () => {
    const el = await createElement("no-reflect-element");
    el.content = "<b>html</b>";
    expect(el.hasAttribute("content")).toBe(false);
  });

  it("non-reflecting prop still triggers re-render", async () => {
    const el = await createElement("no-reflect-element");
    el.content = "updated";
    expect(el.textContent).toContain("updated");
  });

  it("attribute set in HTML still updates the property", async () => {
    const el = await createElement("no-reflect-element", { content: "from-attr" });
    expect(el.content).toBe("from-attr");
  });

  it("reflecting prop on same element still works normally", async () => {
    const el = await createElement("no-reflect-element");
    el.label = "hello";
    expect(el.getAttribute("label")).toBe("hello");
  });

  it("non-reflecting prop setter skips re-render while _isRendering is true", async () => {
    const el = await createElement("no-reflect-element");
    el._isRendering = true;
    const spy = vi.spyOn(el, "_applyRender");
    el.content = "during-render";
    expect(spy).not.toHaveBeenCalled();
    el._isRendering = false;
    spy.mockRestore();
  });

  it("non-reflecting prop is not flushed as attribute on connect", async () => {
    const el = document.createElement("no-reflect-element");
    el.content = "pre-connect";
    document.body.appendChild(el);
    await new Promise(r => requestAnimationFrame(r));
    expect(el.hasAttribute("content")).toBe(false);
    expect(el.element.textContent).toContain("pre-connect");
    el.remove();
  });
});

describe("runtime type preservation", () => {
  describe("string", () => {
    it("getter returns string value", async () => {
      const el = await createElement("basic-element", { label: "hello" });
      expect(el.label).toBe("hello");
      expect(typeof el.label).toBe("string");
    });

    it("setter preserves string type and syncs attribute", async () => {
      const el = await createElement("basic-element");
      el.label = "updated";
      expect(el.label).toBe("updated");
      expect(typeof el.label).toBe("string");
      expect(el.getAttribute("label")).toBe("updated");
    });

    it("attribute change reflects in getter", async () => {
      const el = await createElement("basic-element", { label: "initial" });
      el.setAttribute("label", "changed");
      expect(el.label).toBe("changed");
    });
  });

  describe("number", () => {
    it("getter returns number value after JS set", async () => {
      const el = await createElement("number-element");
      el.count = 42;
      expect(el.count).toBe(42);
      expect(typeof el.count).toBe("number");
    });

    it("attribute stores string representation", async () => {
      const el = await createElement("number-element");
      el.count = 42;
      expect(el.getAttribute("count")).toBe("42");
    });

    it("attribute change coerces to number", async () => {
      const el = await createElement("number-element");
      el.count = 5;
      el.setAttribute("count", "99");
      expect(el.count).toBe(99);
      expect(typeof el.count).toBe("number");
    });

    it("numeric zero is treated as a valid number, not falsy/null (sets attribute to '0')", async () => {
      // This tests the boundary case: 0 is falsy in JS but is a valid number value
      const el = await createElement("number-element");
      el.count = 5;
      expect(el.getAttribute("count")).toBe("5");

      // Set to 0: should set attribute to "0", not remove it
      el.count = 0;
      expect(el.count).toBe(0);
      expect(el.hasAttribute("count")).toBe(true);
      expect(el.getAttribute("count")).toBe("0");
    });
  });

  describe("boolean", () => {
    it("getter returns boolean after JS set", async () => {
      const el = await createElement("boolean-element");
      el.disabled = true;
      expect(el.disabled).toBe(true);
      expect(typeof el.disabled).toBe("boolean");
    });

    it("setting false removes attribute", async () => {
      const el = await createElement("boolean-element", { disabled: "" });
      el.disabled = false;
      expect(el.disabled).toBe(false);
      expect(el.hasAttribute("disabled")).toBe(false);
    });

    it("setting true adds empty attribute", async () => {
      const el = await createElement("boolean-element");
      el.disabled = true;
      expect(el.getAttribute("disabled")).toBe("");
    });

    it("attribute presence coerces to boolean", async () => {
      const el = await createElement("boolean-element");
      el.setAttribute("disabled", "");
      expect(el.disabled).toBe(true);
      expect(typeof el.disabled).toBe("boolean");
    });
  });

  describe("object", () => {
    it("getter returns object after JS set", async () => {
      const el = await createElement("object-element");
      el.config = { theme: "dark", size: 12 };
      expect(el.config).toEqual({ theme: "dark", size: 12 });
      expect(typeof el.config).toBe("object");
    });

    it("attribute stores JSON string", async () => {
      const el = await createElement("object-element");
      el.config = { key: "value" };
      expect(el.getAttribute("config")).toBe('{"key":"value"}');
    });

    it("attribute change with JSON coerces to object", async () => {
      const el = await createElement("object-element");
      el.config = { a: 1 };
      el.setAttribute("config", '{"b":2}');
      expect(el.config).toEqual({ b: 2 });
      expect(typeof el.config).toBe("object");
    });
  });

  describe("array", () => {
    it("getter returns array after JS set", async () => {
      const el = await createElement("object-element");
      el.items = [1, 2, 3];
      expect(el.items).toEqual([1, 2, 3]);
      expect(Array.isArray(el.items)).toBe(true);
    });

    it("attribute stores JSON string", async () => {
      const el = await createElement("object-element");
      el.items = ["a", "b"];
      expect(el.getAttribute("items")).toBe('["a","b"]');
    });

    it("attribute change with JSON coerces to array", async () => {
      const el = await createElement("object-element");
      el.items = [1];
      el.setAttribute("items", "[4,5,6]");
      expect(el.items).toEqual([4, 5, 6]);
      expect(Array.isArray(el.items)).toBe(true);
    });
  });
});

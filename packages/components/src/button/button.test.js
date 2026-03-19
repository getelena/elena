import { describe, it, expect, vi } from "vitest";
import { createElement } from "../../test/setup.js";
import "./button.js";

describe("Button", () => {
  describe("hydration", () => {
    it("gets hydrated attribute after connecting", () => {
      const el = createElement("elena-button");
      expect(el.hasAttribute("hydrated")).toBe(true);
    });

    it("renders inner <button> element", () => {
      const el = createElement("elena-button");
      expect(el.querySelector("button")).not.toBeNull();
    });
  });

  describe("accessibility", () => {
    it("uses a semantic <button> element", () => {
      const el = createElement("elena-button");
      expect(el.element.tagName).toBe("BUTTON");
    });

    it("has no explicit role attribute (implicit via semantic HTML)", () => {
      const el = createElement("elena-button");
      expect(el.element.hasAttribute("role")).toBe(false);
    });

    it("syncs disabled to inner button for assistive technology", async () => {
      const el = createElement("elena-button");
      el.disabled = true;
      await el.updateComplete;
      expect(el.element.hasAttribute("disabled")).toBe(true);
    });

    it("renders text content inside the inner button", () => {
      const el = document.createElement("elena-button");
      el.textContent = "Save";
      document.body.appendChild(el);
      expect(el.element.textContent).toBe("Save");
    });
  });

  describe("props", () => {
    describe("variant", () => {
      it("defaults to 'default'", () => {
        const el = createElement("elena-button");
        expect(el.variant).toBe("default");
      });

      it("accepts variant attribute from HTML", () => {
        const el = createElement("elena-button", { variant: "primary" });
        expect(el.variant).toBe("primary");
      });

      it("reflects variant property to host attribute", () => {
        const el = createElement("elena-button");
        el.variant = "danger";
        expect(el.getAttribute("variant")).toBe("danger");
      });

      it("syncs attribute change to property", () => {
        const el = createElement("elena-button");
        el.setAttribute("variant", "primary");
        expect(el.variant).toBe("primary");
      });
    });

    describe("disabled", () => {
      it("defaults to false", () => {
        const el = createElement("elena-button");
        expect(el.disabled).toBe(false);
      });

      it("accepts disabled attribute from HTML", () => {
        const el = createElement("elena-button", { disabled: "" });
        expect(el.disabled).toBe(true);
      });

      it("reflects disabled property to host attribute", () => {
        const el = createElement("elena-button");
        el.disabled = true;
        expect(el.hasAttribute("disabled")).toBe(true);
      });

      it("removes disabled attribute when set to false", () => {
        const el = createElement("elena-button", { disabled: "" });
        el.disabled = false;
        expect(el.hasAttribute("disabled")).toBe(false);
      });

      it("syncs disabled to inner button element", async () => {
        const el = createElement("elena-button");
        el.disabled = true;
        await el.updateComplete;
        expect(el.element.hasAttribute("disabled")).toBe(true);
        el.disabled = false;
        await el.updateComplete;
        expect(el.element.hasAttribute("disabled")).toBe(false);
      });
    });

    describe("name", () => {
      it("defaults to empty string", () => {
        const el = createElement("elena-button");
        expect(el.name).toBe("");
      });

      it("accepts name attribute from HTML", () => {
        const el = createElement("elena-button", { name: "submit-btn" });
        expect(el.element.getAttribute("name")).toBe("submit-btn");
      });

      it("reflects name property to host attribute", async () => {
        const el = createElement("elena-button");
        el.name = "my-button";
        expect(el.getAttribute("name")).toBe("my-button");
        await el.updateComplete;
        expect(el.element.getAttribute("name")).toBe("my-button");
      });
    });

    describe("value", () => {
      it("defaults to empty string", () => {
        const el = createElement("elena-button");
        expect(el.value).toBe("");
      });

      it("accepts value attribute from HTML", () => {
        const el = createElement("elena-button", { value: "submit" });
        expect(el.element.getAttribute("value")).toBe("submit");
      });

      it("reflects value property to host attribute", async () => {
        const el = createElement("elena-button");
        el.value = "ok";
        expect(el.getAttribute("value")).toBe("ok");
        await el.updateComplete;
        expect(el.element.getAttribute("value")).toBe("ok");
      });
    });

    describe("type", () => {
      it("defaults to 'button'", () => {
        const el = createElement("elena-button");
        expect(el.type).toBe("button");
      });

      it("accepts type attribute from HTML", () => {
        const el = createElement("elena-button", { type: "submit" });
        expect(el.element.type).toBe("submit");
      });

      it("reflects type property to host attribute", async () => {
        const el = createElement("elena-button");
        el.type = "reset";
        expect(el.getAttribute("type")).toBe("reset");
        await el.updateComplete;
        expect(el.element.type).toBe("reset");
      });
    });
  });

  describe("text content", () => {
    it("captures textContent from light DOM before render", () => {
      const el = document.createElement("elena-button");
      el.textContent = "Click me";
      document.body.appendChild(el);
      expect(el.text).toBe("Click me");
      expect(el.querySelector("button").textContent).toBe("Click me");
    });

    it("is empty string when no text content", () => {
      const el = createElement("elena-button");
      expect(el.text).toBe("");
    });

    it("triggers re-render when set programmatically", async () => {
      const el = createElement("elena-button");
      el.text = "New label";
      await el.updateComplete;
      expect(el.querySelector("button").textContent).toBe("New label");
    });
  });

  describe("programmatic interaction", () => {
    it("can be programmatically clicked", () => {
      const el = createElement("elena-button");
      const handler = vi.fn();
      el.addEventListener("click", handler);

      el.click();

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("can be programmatically focused", () => {
      const el = createElement("elena-button");
      const handler = vi.fn();
      el.addEventListener("focus", handler);

      el.focus();

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("can be programmatically blurred", () => {
      const el = createElement("elena-button");
      el.focus();

      const handler = vi.fn();
      el.addEventListener("blur", handler);

      el.blur();

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("does not raise a click event when disabled", () => {
      const el = createElement("elena-button", { disabled: "" });
      const handler = vi.fn();
      el.addEventListener("click", handler);

      el.element.click();

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("event delegation", () => {
    it("delegates click from inner button to host", () => {
      const el = createElement("elena-button");
      const handler = vi.fn();
      el.addEventListener("click", handler);

      el.element.click();

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("raises only one event per click", () => {
      const el = createElement("elena-button");
      const handler = vi.fn();
      el.addEventListener("click", handler);

      el.element.click();

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("delegates focus from inner button to host", () => {
      const el = createElement("elena-button");
      const handler = vi.fn();
      el.addEventListener("focus", handler);

      el.element.focus();

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("delegates blur from inner button to host", () => {
      const el = createElement("elena-button");
      el.element.focus();

      const handler = vi.fn();
      el.addEventListener("blur", handler);

      el.element.blur();

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("focus on inner button reaches the host", () => {
      const el = createElement("elena-button");
      const handler = vi.fn();
      el.addEventListener("focus", handler);

      el.element.dispatchEvent(new Event("focus"));

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("cleans up event listeners on disconnect", () => {
      const el = createElement("elena-button");
      const inner = el.element;
      const spy = vi.spyOn(inner, "removeEventListener");

      el.remove();

      expect(spy).toHaveBeenCalledWith("click", el);
      expect(spy).toHaveBeenCalledWith("focus", el);
      expect(spy).toHaveBeenCalledWith("blur", el);
    });
  });

  describe("form integration", () => {
    function createForm(buttonAttrs = {}) {
      const form = document.createElement("form");
      const input = document.createElement("input");
      input.name = "field";
      input.defaultValue = "test";
      form.appendChild(input);

      const btn = document.createElement("elena-button");
      for (const [key, value] of Object.entries(buttonAttrs)) {
        btn.setAttribute(key, value);
      }
      form.appendChild(btn);
      document.body.appendChild(form);

      return { form, btn, input };
    }

    it("syncs name and value to the inner button", () => {
      const { btn } = createForm({ type: "submit", name: "action", value: "save" });
      expect(btn.element.getAttribute("name")).toBe("action");
      expect(btn.element.getAttribute("value")).toBe("save");
    });

    it("supports implicit form submission via type=submit", () => {
      const { form, btn } = createForm({ type: "submit" });
      const handler = vi.fn(e => e.preventDefault());
      form.addEventListener("submit", handler);

      btn.element.click();

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("supports explicit form submission via requestSubmit", () => {
      const { form } = createForm({ type: "submit" });
      const handler = vi.fn(e => e.preventDefault());
      form.addEventListener("submit", handler);

      form.requestSubmit();

      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("does not submit when type is button", () => {
      const { form, btn } = createForm({ type: "button" });
      const handler = vi.fn(e => e.preventDefault());
      form.addEventListener("submit", handler);

      btn.element.click();

      expect(handler).not.toHaveBeenCalled();
    });

    it("can reset a form", () => {
      const { btn, input } = createForm({ type: "reset" });
      input.value = "changed";

      btn.element.click();

      expect(input.value).toBe("test");
    });
  });
});

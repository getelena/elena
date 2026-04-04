import { describe, it, expect, vi } from "vitest";
import { createElement } from "./setup.js";
import { renderTemplate } from "../src/common/render.js";
import { html, nothing } from "../src/elena.js";
import "./fixtures/input-element.js";
import "./fixtures/tag-switch-element.js";
import "./fixtures/conditional-event-element.js";

const el = () => document.createElement("div");

describe("focus preservation", () => {
  describe("input component", () => {
    it("preserves focus when error appears during typing", async () => {
      const input = await createElement("input-element", { label: "Email" });
      const innerInput = input.element;
      innerInput.focus();
      expect(document.activeElement).toBe(innerInput);

      input.error = "Invalid email";
      await input.updateComplete;

      expect(document.activeElement).toBe(innerInput);
      expect(input.element).toBe(innerInput);
      expect(input.querySelector(".error").textContent).toBe("Invalid email");
    });

    it("preserves focus when error clears", async () => {
      const input = await createElement("input-element", {
        label: "Email",
        error: "Invalid email",
      });
      const innerInput = input.element;
      innerInput.focus();

      input.error = "";
      await input.updateComplete;

      expect(document.activeElement).toBe(innerInput);
      expect(input.element).toBe(innerInput);
      expect(input.querySelector(".error")).toBeNull();
    });

    it("preserves focus when error message changes", async () => {
      const input = await createElement("input-element", {
        label: "Email",
        error: "Required",
      });
      const innerInput = input.element;
      innerInput.focus();

      input.error = "Invalid format";
      await input.updateComplete;

      expect(document.activeElement).toBe(innerInput);
      expect(input.element).toBe(innerInput);
      expect(input.querySelector(".error").textContent).toBe("Invalid format");
    });

    it("preserves focus through multiple validation cycles", async () => {
      const input = await createElement("input-element", { label: "Email" });
      const innerInput = input.element;
      innerInput.focus();

      // Simulate typing: valid → invalid → valid → invalid
      input.error = "Too short";
      await input.updateComplete;
      expect(document.activeElement).toBe(innerInput);

      input.error = "";
      await input.updateComplete;
      expect(document.activeElement).toBe(innerInput);

      input.error = "Invalid format";
      await input.updateComplete;
      expect(document.activeElement).toBe(innerInput);

      input.error = "";
      await input.updateComplete;
      expect(document.activeElement).toBe(innerInput);
      expect(input.element).toBe(innerInput);
    });

    it("preserves focus when disabled toggles while focused", async () => {
      const input = await createElement("input-element", { label: "Name" });
      const innerInput = input.element;
      innerInput.focus();

      input.disabled = true;
      await input.updateComplete;

      expect(document.activeElement).toBe(innerInput);
      expect(input.element).toBe(innerInput);
    });

    it("preserves focus when name attribute is added", async () => {
      const input = await createElement("input-element", { label: "Name" });
      const innerInput = input.element;
      innerInput.focus();

      input.name = "email";
      await input.updateComplete;

      expect(document.activeElement).toBe(innerInput);
      expect(input.element).toBe(innerInput);
    });

    it("preserves focus when label changes", async () => {
      const input = await createElement("input-element", { label: "Email" });
      const innerInput = input.element;
      innerInput.focus();

      input.label = "Work Email";
      await input.updateComplete;

      expect(document.activeElement).toBe(innerInput);
      expect(input.querySelector("label").textContent).toBe("Work Email");
    });
  });

  describe("event delegation after morph", () => {
    it("click events still bubble after morph re-render", async () => {
      const input = await createElement("input-element", { label: "Email" });
      const handler = vi.fn();
      input.addEventListener("focus", handler);

      input.error = "Invalid";
      await input.updateComplete;

      input.element.focus();
      expect(handler).toHaveBeenCalledOnce();
    });

    it("events work after conditional toggle round-trip", async () => {
      const el = await createElement("conditional-event-element");
      const handler = vi.fn();
      el.addEventListener("click", handler);

      el.active = false;
      await el.updateComplete;
      el.active = true;
      await el.updateComplete;

      el.element.click();
      expect(handler).toHaveBeenCalledOnce();
    });

    it("events work after tag switch", async () => {
      const el = await createElement("tag-switch-element");
      const handler = vi.fn();
      el.addEventListener("click", handler);

      el.variant = "link";
      await el.updateComplete;

      el.element.click();
      expect(handler).toHaveBeenCalledOnce();
    });
  });

  describe("renderTemplate morph path", () => {
    it("preserves element identity when sibling raw HTML is added", () => {
      const container = el();
      const template = Object.assign(["<input />", ""], { raw: ["<input />", ""] });

      renderTemplate(container, template, [nothing]);
      const input = container.querySelector("input");

      renderTemplate(container, template, [html`<span class="error">bad</span>`]);
      expect(container.querySelector("input")).toBe(input);
      expect(container.querySelector(".error").textContent).toBe("bad");
    });

    it("preserves element identity when sibling raw HTML is removed", () => {
      const container = el();
      const template = Object.assign(["<input />", ""], { raw: ["<input />", ""] });

      renderTemplate(container, template, [html`<span class="error">bad</span>`]);
      const input = container.querySelector("input");

      renderTemplate(container, template, [nothing]);
      expect(container.querySelector("input")).toBe(input);
      expect(container.querySelector(".error")).toBeNull();
    });

    it("preserves identity through raw HTML content change", () => {
      const container = el();
      const template = Object.assign(["<input />", ""], { raw: ["<input />", ""] });

      renderTemplate(container, template, [html`<span>first</span>`]);
      const input = container.querySelector("input");

      renderTemplate(container, template, [html`<span>second</span>`]);
      expect(container.querySelector("input")).toBe(input);
      expect(container.querySelector("span").textContent).toBe("second");
    });

    it("preserves identity when template strings change but structure is stable", () => {
      const container = el();
      const tplA = Object.assign(["<button>", "</button>"], { raw: ["<button>", "</button>"] });
      const tplB = Object.assign(["<button>", "</button>"], { raw: ["<button>", "</button>"] });

      renderTemplate(container, tplA, ["On"]);
      const button = container.querySelector("button");

      renderTemplate(container, tplB, ["Off"]);
      expect(container.querySelector("button")).toBe(button);
      expect(button.textContent).toBe("Off");
    });

    it("replaces element when tag changes during morph", () => {
      const container = el();
      const tplA = Object.assign(["<button>", "</button>"], { raw: ["<button>", "</button>"] });
      const tplB = Object.assign(["<a>", "</a>"], { raw: ["<a>", "</a>"] });

      renderTemplate(container, tplA, ["click"]);
      const button = container.querySelector("button");

      renderTemplate(container, tplB, ["link"]);
      expect(container.querySelector("button")).toBeNull();
      expect(container.querySelector("a").textContent).toBe("link");
    });
  });
});

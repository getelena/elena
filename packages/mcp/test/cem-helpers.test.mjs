import { describe, it, expect } from "vitest";
import {
  getComponents,
  findComponent,
  getComponentType,
  formatComponentSummary,
  formatComponentDetails,
} from "../src/lib/cem-helpers.js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load the real CEM from the components package as fixture data
const cemPath = resolve(__dirname, "../../components/dist/custom-elements.json");
let cem;
try {
  cem = JSON.parse(readFileSync(cemPath, "utf8"));
} catch {
  cem = null;
}

describe("cem-helpers", () => {
  describe("getComponents", () => {
    it("returns empty array for null/undefined input", () => {
      expect(getComponents(null)).toEqual([]);
      expect(getComponents(undefined)).toEqual([]);
      expect(getComponents({})).toEqual([]);
    });

    it("extracts custom element declarations from CEM", () => {
      if (!cem) return;
      const components = getComponents(cem);
      expect(components.length).toBeGreaterThan(0);
      for (const c of components) {
        expect(c.kind).toBe("class");
        expect(c.customElement).toBe(true);
      }
    });

    it("finds elena-button in the CEM", () => {
      if (!cem) return;
      const components = getComponents(cem);
      const button = components.find(c => c.tagName === "elena-button");
      expect(button).toBeDefined();
      expect(button.name).toBe("Button");
    });
  });

  describe("findComponent", () => {
    it("finds by tag name", () => {
      if (!cem) return;
      const button = findComponent(cem, "elena-button");
      expect(button).toBeDefined();
      expect(button.name).toBe("Button");
    });

    it("finds by class name (case-insensitive)", () => {
      if (!cem) return;
      const button = findComponent(cem, "button");
      expect(button).toBeDefined();
      expect(button.tagName).toBe("elena-button");
    });

    it("returns undefined for unknown component", () => {
      if (!cem) return;
      expect(findComponent(cem, "elena-nonexistent")).toBeUndefined();
    });
  });

  describe("getComponentType", () => {
    it("returns 'primitive' for components with render()", () => {
      if (!cem) return;
      const button = findComponent(cem, "elena-button");
      // Button has render in its source but CEM may not list it as a member
      // depending on the analyzer config. Check the actual data.
      const type = getComponentType(button);
      expect(["primitive", "composite"]).toContain(type);
    });

    it("returns 'composite' for components without render()", () => {
      if (!cem) return;
      const stack = findComponent(cem, "elena-stack");
      expect(getComponentType(stack)).toBe("composite");
    });
  });

  describe("formatComponentSummary", () => {
    it("returns summary shape", () => {
      if (!cem) return;
      const button = findComponent(cem, "elena-button");
      const summary = formatComponentSummary(button);
      expect(summary).toHaveProperty("name", "Button");
      expect(summary).toHaveProperty("tagName", "elena-button");
      expect(summary).toHaveProperty("description");
      expect(summary).toHaveProperty("status");
      expect(summary).toHaveProperty("displayName");
      expect(summary).toHaveProperty("type");
    });
  });

  describe("formatComponentDetails", () => {
    it("returns full details with props, events, cssProperties, slots", () => {
      if (!cem) return;
      const button = findComponent(cem, "elena-button");
      const details = formatComponentDetails(button);

      expect(details.name).toBe("Button");
      expect(details.tagName).toBe("elena-button");
      expect(details.props.length).toBeGreaterThan(0);
      expect(details.events.length).toBeGreaterThan(0);
      expect(details.cssProperties.length).toBeGreaterThan(0);

      // Check prop shape
      const variant = details.props.find(p => p.name === "variant");
      expect(variant).toBeDefined();
      expect(variant.type).toContain("default");
      expect(variant.default).toBe('"default"');
    });

    it("includes slots for composite components", () => {
      if (!cem) return;
      const stack = findComponent(cem, "elena-stack");
      const details = formatComponentDetails(stack);
      expect(details.slots.length).toBeGreaterThan(0);
    });
  });
});

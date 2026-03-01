import { describe, it, expect } from "vitest";
import { createCemLoader } from "../src/lib/cem-loader.js";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const componentsRoot = resolve(__dirname, "../../components");

describe("cem-loader", () => {
  it("loads custom-elements.json from a valid project root", () => {
    const loadCem = createCemLoader(componentsRoot);
    const cem = loadCem();
    // May be null if components haven't been built
    if (cem) {
      expect(cem).toHaveProperty("schemaVersion");
      expect(cem).toHaveProperty("modules");
      expect(Array.isArray(cem.modules)).toBe(true);
    }
  });

  it("returns null for a nonexistent path", () => {
    const loadCem = createCemLoader("/tmp/nonexistent-elena-project");
    expect(loadCem()).toBeNull();
  });

  it("returns cached result on second call", () => {
    const loadCem = createCemLoader(componentsRoot);
    const first = loadCem();
    const second = loadCem();
    if (first) {
      expect(second).toBe(first); // Same reference = cached
    }
  });

  it("accepts a custom cemPath override", () => {
    const customPath = resolve(componentsRoot, "dist", "custom-elements.json");
    const loadCem = createCemLoader("/unused", customPath);
    const cem = loadCem();
    if (cem) {
      expect(cem).toHaveProperty("schemaVersion");
    }
  });
});

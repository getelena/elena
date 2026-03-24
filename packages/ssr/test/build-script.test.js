/**
 * Integration tests for the file-based SSR build workflow
 * documented in the "Pre-rendering without a framework" section.
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { ssr } from "../src/index.js";

const TMP = join(import.meta.dirname, ".tmp-build-test");
const SRC = join(TMP, "src");
const DIST = join(TMP, "dist");

beforeAll(() => {
  mkdirSync(SRC, { recursive: true });
});

afterAll(() => {
  rmSync(TMP, { recursive: true, force: true });
});

describe("file-based SSR build script", () => {
  it("processes a single HTML file with Elena components", () => {
    writeFileSync(
      join(SRC, "index.html"),
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Test</title>
  <script type="module">console.log("test");</script>
  <style>
    /* Global CSS layer order */
    @layer global, elena;

    /* Global CSS layer */
    @layer global {
      button { color: red; }
    }
  </style>
</head>
<body>
  <div>
    <elena-stack direction="row">
      <elena-button variant="primary">Save</elena-button>
      <elena-button>Cancel</elena-button>
    </elena-stack>
  </div>
  <div>Another div</div>
</body>
</html>`
    );

    mkdirSync(DIST, { recursive: true });

    for (const file of readdirSync(SRC).filter(f => f.endsWith(".html"))) {
      const html = readFileSync(join(SRC, file), "utf-8");
      writeFileSync(join(DIST, file), ssr(html));
    }

    const output = readFileSync(join(DIST, "index.html"), "utf-8");

    // Document structure preserved
    expect(output).toMatch(/^<!DOCTYPE html>/);
    expect(output).toContain('<html lang="en">');
    expect(output).toContain("<title>Test</title>");
    expect(output).toContain("<div>Another div</div>");
    expect(output).toContain('<script type="module">console.log("test");</script>');
    expect(output).toContain("/* Global CSS layer order */");
    expect(output).toContain("@layer global, elena;");

    // Components expanded
    expect(output).toContain("<button><span>Save</span></button>");
    expect(output).toContain("<button><span>Cancel</span></button>");
    expect(output).toContain('variant="primary"');

    // Composite passed through
    expect(output).toContain('direction="row"');
  });

  it("processes multiple HTML files in a loop", () => {
    writeFileSync(join(SRC, "page-one.html"), `<main><elena-button>First</elena-button></main>`);
    writeFileSync(
      join(SRC, "page-two.html"),
      `<main><elena-button variant="danger">Second</elena-button></main>`
    );

    mkdirSync(DIST, { recursive: true });

    for (const file of readdirSync(SRC).filter(f => f.endsWith(".html"))) {
      const html = readFileSync(join(SRC, file), "utf-8");
      writeFileSync(join(DIST, file), ssr(html));
    }

    const one = readFileSync(join(DIST, "page-one.html"), "utf-8");
    const two = readFileSync(join(DIST, "page-two.html"), "utf-8");

    expect(one).toContain("<button><span>First</span></button>");
    expect(two).toContain("<button><span>Second</span></button>");
    expect(two).toContain('variant="danger"');
  });

  it("skips non-HTML files in the source directory", () => {
    writeFileSync(join(SRC, "styles.css"), "body { color: red; }");
    writeFileSync(join(SRC, "data.json"), '{"key": "value"}');

    const htmlFiles = readdirSync(SRC).filter(f => f.endsWith(".html"));

    expect(htmlFiles).not.toContain("styles.css");
    expect(htmlFiles).not.toContain("data.json");
    expect(htmlFiles.length).toBeGreaterThan(0);
  });
});

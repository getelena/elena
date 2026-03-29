/**
 * Integration tests: Config validation, input/bundle validation,
 * custom config path, silent config miss, and error scenarios.
 */
import { existsSync, writeFileSync, rmSync, mkdirSync } from "fs";
import { join } from "path";
import { afterEach, describe, test, expect } from "vitest";
import { setupDir, runCli } from "./helpers.mjs";

let tmpDir;

afterEach(() => {
  if (tmpDir) {
    rmSync(tmpDir, { recursive: true, force: true });
    tmpDir = undefined;
  }
});

describe("Missing input directory", () => {
  test("exits with an error when input directory does not exist", () => {
    tmpDir = setupDir(`export default { input: "nonexistent" };`);
    const result = runCli(tmpDir);
    expect(result.status).not.toBe(0);
    const output = result.stderr + result.stdout;
    expect(output).toContain("does not exist");
  });
});

describe("Invalid bundle path", () => {
  test("exits with an error when bundle entry does not exist", () => {
    tmpDir = setupDir(`export default { bundle: "src/missing.js" };`);
    const result = runCli(tmpDir);
    expect(result.status).not.toBe(0);
    const output = result.stderr + result.stdout;
    expect(output).toContain("does not exist");
  });
});

describe("Config validation", () => {
  test("rejects input with wrong type", () => {
    tmpDir = setupDir(`export default { input: 123 };`);
    const result = runCli(tmpDir);
    expect(result.status).not.toBe(0);
    const output = result.stderr + result.stdout;
    expect(output).toContain('"input" must be a string');
  });

  test("rejects output with wrong type", () => {
    tmpDir = setupDir(`export default { output: "string" };`);
    const result = runCli(tmpDir);
    expect(result.status).not.toBe(0);
    const output = result.stderr + result.stdout;
    expect(output).toContain('"output" must be an object');
  });

  test("rejects plugins with wrong type", () => {
    tmpDir = setupDir(`export default { plugins: "not-array" };`);
    const result = runCli(tmpDir);
    expect(result.status).not.toBe(0);
    const output = result.stderr + result.stdout;
    expect(output).toContain('"plugins" must be an array');
  });

  test("rejects analyze with wrong type", () => {
    tmpDir = setupDir(`export default { analyze: 42 };`);
    const result = runCli(tmpDir);
    expect(result.status).not.toBe(0);
    const output = result.stderr + result.stdout;
    expect(output).toContain('"analyze" must be an object or false');
  });

  test("rejects terser with wrong type", () => {
    tmpDir = setupDir(`export default { terser: "fast" };`);
    const result = runCli(tmpDir);
    expect(result.status).not.toBe(0);
    const output = result.stderr + result.stdout;
    expect(output).toContain('"terser" must be an object');
  });

  test("rejects registration with wrong value", () => {
    tmpDir = setupDir(`export default { registration: "invalid" };`);
    const result = runCli(tmpDir);
    expect(result.status).not.toBe(0);
    const output = result.stderr + result.stdout;
    expect(output).toContain('"registration" must be "auto" or "scoped"');
  });

  test("warns about unknown config keys", () => {
    tmpDir = setupDir(`export default { unknownKey: true };`);
    const result = runCli(tmpDir);
    const output = result.stderr + result.stdout;
    expect(output).toContain('Unknown config option "unknownKey"');
  });
});

describe("Malformed config file", () => {
  test("exits with an error on syntax error in config", () => {
    tmpDir = setupDir(`export default {;`);
    const result = runCli(tmpDir);
    expect(result.status).not.toBe(0);
  });
});

describe("Custom config path (--config)", () => {
  test("loads config from a custom path", () => {
    tmpDir = setupDir(undefined);
    // Write config at a non-standard path.
    writeFileSync(
      join(tmpDir, "custom.config.mjs"),
      `export default { bundle: false, analyze: false };`
    );
    const result = runCli(tmpDir, ["build", "--config", "custom.config.mjs"]);
    expect(result.status).toBe(0);
    // Bundle should be disabled.
    expect(existsSync(join(tmpDir, "dist", "bundle.js"))).toBe(false);
  });

  test("errors when --config points to nonexistent file", () => {
    tmpDir = setupDir(undefined);
    const result = runCli(tmpDir, ["build", "--config", "missing.config.mjs"]);
    expect(result.status).not.toBe(0);
    const output = result.stderr + result.stdout;
    expect(output).toContain("Config file not found");
  });
});

describe("Silent config miss", () => {
  test("logs a message when no config file is found", () => {
    tmpDir = setupDir(undefined);
    const result = runCli(tmpDir);
    const output = result.stderr + result.stdout;
    expect(output).toContain("No config file found");
  });

  test("warns when config file has wrong extension", () => {
    tmpDir = setupDir(undefined);
    writeFileSync(join(tmpDir, "elena.config.json"), "{}");
    const result = runCli(tmpDir);
    const output = result.stderr + result.stdout;
    expect(output).toContain("only .mjs and .js are supported");
  });
});

describe("User-provided Rollup plugins", () => {
  test("custom plugin runs during the build", () => {
    const pluginConfig = `
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

function markerPlugin() {
  return {
    name: "marker",
    generateBundle() {
      const dir = join(process.cwd(), "dist");
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
      writeFileSync(join(dir, "marker.txt"), "ok");
    },
  };
}

export default {
  plugins: [markerPlugin()],
  analyze: false,
};
`;
    tmpDir = setupDir(pluginConfig);
    const result = runCli(tmpDir);
    expect(result.status).toBe(0);
    expect(existsSync(join(tmpDir, "dist", "marker.txt"))).toBe(true);
  });
});

describe("Custom terser options", () => {
  test("build succeeds with custom terser config", () => {
    tmpDir = setupDir(`export default { terser: { ecma: 2015 }, analyze: false };`);
    const result = runCli(tmpDir);
    expect(result.status).toBe(0);
    expect(existsSync(join(tmpDir, "dist", "bundle.js"))).toBe(true);
  });
});

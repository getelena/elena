import { spawnSync } from "child_process";
import { writeFileSync, mkdtempSync, cpSync } from "fs";
import { join, resolve, dirname } from "path";
import { tmpdir } from "os";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const CLI = resolve(__dirname, "../src/cli.js");
export const COMPONENTS_SRC = resolve(__dirname, "../../components/src");

/**
 * Sets up a temp directory with component sources, optionally writes an
 * `elena.config.mjs`, runs the CLI, and returns the paths.
 *
 * @param {string} [elenaConfigContent] - Content to write to `elena.config.mjs`.
 *   If omitted, no config file is created (defaults apply).
 * @returns {{ tmpDir: string; dist: string }}
 */
export function setupBuild(elenaConfigContent) {
  const tmpDir = mkdtempSync(join(tmpdir(), "elena-bundler-test-"));
  const dist = join(tmpDir, "dist");

  // Copy real component sources into the temp dir.
  cpSync(COMPONENTS_SRC, join(tmpDir, "src"), { recursive: true });

  // Write a minimal package.json so the directory is a valid package.
  writeFileSync(
    join(tmpDir, "package.json"),
    JSON.stringify({ name: "test-components", type: "module" })
  );

  // Optionally write a config file.
  if (elenaConfigContent !== undefined) {
    writeFileSync(join(tmpDir, "elena.config.mjs"), elenaConfigContent);
  }

  const result = spawnSync("node", [CLI], {
    cwd: tmpDir,
    stdio: "pipe",
    encoding: "utf8",
  });

  if (result.status !== 0) {
    throw new Error(
      `elena exited with status ${result.status}:\n${result.stderr || result.stdout}`
    );
  }

  return { tmpDir, dist };
}

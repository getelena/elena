/**
 * Integration test: watch mode starts and shuts down cleanly.
 */
import { spawn } from "child_process";
import { rmSync } from "fs";
import { describe, test, expect } from "vitest";
import { setupDir, CLI } from "./helpers.mjs";

describe("Watch mode", () => {
  test("starts watching and exits on SIGTERM", async () => {
    const tmpDir = setupDir(`export default { analyze: false };`);

    try {
      const child = spawn("node", [CLI, "watch"], {
        cwd: tmpDir,
        stdio: "pipe",
      });

      let output = "";
      child.stdout.on("data", chunk => {
        output += chunk.toString();
      });
      child.stderr.on("data", chunk => {
        output += chunk.toString();
      });

      // Wait for watch mode to be ready.
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          child.kill("SIGTERM");
          reject(new Error(`Timed out waiting for watch mode. Output:\n${output}`));
        }, 60_000);

        const check = () => {
          if (output.includes("Waiting for changes")) {
            clearTimeout(timeout);
            resolve();
          } else {
            setTimeout(check, 200);
          }
        };
        check();

        child.on("error", err => {
          clearTimeout(timeout);
          reject(err);
        });
      });

      expect(output).toContain("Watching for changes");

      // Send SIGTERM and verify clean exit.
      const exitCode = await new Promise(resolve => {
        child.on("close", code => resolve(code));
        child.kill("SIGTERM");
      });

      expect(exitCode).toBe(0);
    } finally {
      rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});

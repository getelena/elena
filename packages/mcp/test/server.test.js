import { describe, it, expect } from "vitest";
import { createServer } from "../src/server.js";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const componentsRoot = resolve(__dirname, "../../components");

describe("createServer", () => {
  it("creates an MCP server instance", () => {
    const server = createServer({ projectRoot: componentsRoot });
    expect(server).toBeDefined();
    expect(server).toHaveProperty("connect");
  });

  it("works with a nonexistent project root (graceful degradation)", () => {
    const server = createServer({ projectRoot: "/tmp/nonexistent" });
    expect(server).toBeDefined();
  });
});

/**
 * Minimal browser shim for Node.js environments.
 * Provides global HTMLElement so Elena component
 * classes can be imported in Node.js.
 */
if (typeof globalThis.HTMLElement === "undefined") {
  globalThis.HTMLElement = class HTMLElement {};
}

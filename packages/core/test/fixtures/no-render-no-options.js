import { Elena } from "../../src/elena.js";

export default class NoRenderNoOptions extends Elena(HTMLElement) {
  static tagName = "no-render-no-options";
}
NoRenderNoOptions.define();

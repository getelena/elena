import { Elena } from "../../src/elena.js";

export default class NoRenderNoOptions extends Elena(HTMLElement, { tagName: "no-render-no-options" }) {
  constructor() {
    super();
  }
}
NoRenderNoOptions.define();

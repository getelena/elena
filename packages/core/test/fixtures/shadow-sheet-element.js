import { Elena, html } from "../../src/elena.js";

export const adoptedSheet = new CSSStyleSheet();
adoptedSheet.replaceSync("button { color: blue; }");

export default class ShadowSheetElement extends Elena(HTMLElement) {
  static tagName = "shadow-sheet-element";
  static shadow = "open";
  static styles = adoptedSheet;

  render() {
    return html`<button>test</button>`;
  }
}
ShadowSheetElement.define();

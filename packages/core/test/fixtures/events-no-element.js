import { Elena } from "../../src/elena.js";

export default class EventsNoElement extends Elena(HTMLElement) {
  static tagName = "events-no-element";
  static events = ["click"];
}
EventsNoElement.define();

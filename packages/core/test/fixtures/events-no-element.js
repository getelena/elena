import { Elena } from "../../src/elena.js";

const options = {
  tagName: "events-no-element",
  events: ["click"],
};

export default class EventsNoElement extends Elena(HTMLElement, options) {}
EventsNoElement.define();

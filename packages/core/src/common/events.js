/**
 * A base class for Elena Element’s events which
 * defaults to bubbling and composed.
 */
export class ElenaEvent extends Event {
  constructor(type, eventInitDict) {
    super(type, {
      bubbles: true,
      composed: true,
      ...eventInitDict,
    });
  }
}

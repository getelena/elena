export default {
  id: "baseline-support",
  title: "Baseline Support",
  js: `/** 
 * This “Baseline Support” web component is based on 
 * the official <baseline-status> custom element
 * (https://github.com/web-platform-dx/baseline-status),
 * but rebuilt using @elenajs/core instead.
 */
import { Elena, html, unsafeHTML, nothing } from "@elenajs/core";

const API_URL = "https://api.webstatus.dev/v1/features/";

const BASELINE_DEFS = {
  widely: {
    title: "Widely available",
    description:
      "This feature is well established and works across many devices and browser versions.",
  },
  newly: {
    title: "Newly available",
    description:
      "This feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.",
  },
  limited: {
    title: "Limited availability",
    description:
      "This feature is not available across all browsers. Please refer to the table below for details.",
  },
  no_data: {
    title: "Unknown availability",
    description: "This feature doesn\u2019t have status data in Baseline yet.",
  },
};

const BASELINE_ICONS = {
  widely: \`<svg width="36" height="20" viewBox="0 0 36 20"><path fill="var(--baseline-icon-widely-front)" d="m18 8 2 2-2 2-2-2z"/><path fill="var(--baseline-icon-widely-front)" d="m26 0 2 2-18 18L0 10l2-2 8 8z"/><path fill="var(--baseline-icon-widely-back)" d="m28 2-2 2 6 6-6 6-4-4-2 2 6 6 10-10zM10 0 2 8l2 2 6-6 4 4 2-2z"/></svg>\`,
  newly: \`<svg width="36" height="20" viewBox="0 0 36 20"><path fill="var(--baseline-icon-newly-back)" d="m10 0 2 2-2 2-2-2zm4 4 2 2-2 2-2-2zm16 0 2 2-2 2-2-2zm4 4 2 2-2 2-2-2zm-4 4 2 2-2 2-2-2zm-4 4 2 2-2 2-2-2zm-4-4 2 2-2 2-2-2zM6 4l2 2-2 2-2-2z"/><path fill="var(--baseline-icon-newly-front)" d="m26 0 2 2-18 18L0 10l2-2 8 8z"/></svg>\`,
  limited: \`<svg width="36" height="20" viewBox="0 0 36 20"><path fill="var(--baseline-icon-limited-front)" d="m10 0 6 6-2 2-6-6zm12 12-2 2 6 6 2-2zm4-12 2 2-18 18-2-2z"/><path fill="var(--baseline-icon-limited-back)" d="m8 2 2 2-6 6 6 6-2 2-8-8zm20 0 8 8-8 8-2-2 6-6-6-6z"/></svg>\`,
  no_data: \`<svg width="36" height="20" viewBox="0 0 36 20"><path fill="var(--baseline-icon-no_data)" d="m18 8 2 2-2 2-2-2zm10-6-2 2 6 6-6 6-4-4-2 2 6 6 10-10zM10 0 2 8l2 2 6-6 4 4 2-2z"/><path fill="var(--baseline-icon-no_data)" d="m26 0 2 2-18 18L0 10l2-2 8 8z"/></svg>\`,
};

const BROWSER_ICONS = {
  chrome: \`<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 260 260"><circle cx="128" cy="128" r="64" fill="#fff"/><path fill="#34a853" d="M96 183.4A63.7 63.7 0 0 1 72.6 160L17.2 64A128 128 0 0 0 128 256l55.4-96A64 64 0 0 1 96 183.4Z"/><path fill="#fbbc04" d="M192 128a63.7 63.7 0 0 1-8.6 32L128 256A128 128 0 0 0 238.9 64h-111a64 64 0 0 1 64 64Z"/><circle cx="128" cy="128" r="52" fill="#1a73e8"/><path fill="#ea4335" d="M96 72.6a63.7 63.7 0 0 1 32-8.6h110.8a128 128 0 0 0-221.7 0l55.5 96A64 64 0 0 1 96 72.6Z"/></svg>\`,
  edge: \`<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none"><defs><clipPath id="a"><path fill="#fff" d="M0 0h20.4v20.4H0z"/></clipPath></defs><g clip-path="url(#a)"><path fill="#0c59a4" d="M18.416 15.18a7.485 7.485 0 0 1-.845.375 8.121 8.121 0 0 1-2.86.51c-3.77 0-7.053-2.59-7.053-5.92a2.51 2.51 0 0 1 1.307-2.176c-3.41.143-4.287 3.697-4.287 5.777 0 5.897 5.427 6.487 6.598 6.487.63 0 1.578-.184 2.152-.367l.103-.032a10.224 10.224 0 0 0 5.307-4.207.319.319 0 0 0-.422-.447Z"/><path fill="#0078d4" d="M8.423 19.229a6.31 6.31 0 0 1-1.809-1.698A6.43 6.43 0 0 1 8.965 7.97c.255-.12.677-.327 1.243-.319a2.582 2.582 0 0 1 2.048 1.036c.32.431.497.953.502 1.49 0-.016 1.953-6.343-6.375-6.343-3.498 0-6.375 3.315-6.375 6.232-.014 1.54.316 3.065.964 4.462a10.2 10.2 0 0 0 12.464 5.34 6.015 6.015 0 0 1-5.005-.638h-.008Z"/><path fill="#2fc2df" d="M12.145 11.857c-.072.08-.271.2-.271.447 0 .207.135.414.382.582 1.14.796 3.3.685 3.307.685a4.75 4.75 0 0 0 2.415-.662A4.893 4.893 0 0 0 20.4 8.694c.024-1.785-.637-2.972-.9-3.498C17.802 1.896 14.16 0 10.2 0A10.2 10.2 0 0 0 0 10.057c.04-2.909 2.933-5.26 6.375-5.26.28 0 1.873.024 3.347.797a5.786 5.786 0 0 1 2.463 2.335c.486.845.573 1.92.573 2.35 0 .431-.215 1.06-.621 1.587l.008-.008Z"/></g></svg>\`,
  firefox: \`<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none"><defs><clipPath id="M"><path fill="#fff" d="M0 0h20.4v20.4H0z"/></clipPath><path id="N" d="M19.7 6.9a8 8 0 0 0-2-2.6l1 3q1 3.4-.4 6.7c-1.1 2.5-4 5-8.4 4.8a10 10 0 0 1-9.8-8C-.1 10 0 9.7 0 9v1.5q0 3.9 2.7 6.7c2.7 2.8 4.1 3 6.6 3.2a11 11 0 0 0 7.2-2q3-2.5 3.8-6.2v-.4q.3-2.6-.6-5"/><path id="O" d="M10.2 8.6c0 .3-.9 1.1-1.2 1.1-2.9 0-3.4 1.7-3.4 1.7A4 4 0 0 0 8 14.7h.2l.3.2 1.3.2c5.1.2 6.1-5.9 2.4-7.7q1.4 0 2.5.6-.7-1.2-1.9-1.8a5 5 0 0 0-2.6-.7H10q-1.5 0-2.8 1l.7.7c.6.7 2.4 1.3 2.4 1.4"/></defs><g clip-path="url(#M)"><path fill="#ff8c00" d="M19.7 6.9a8 8 0 0 0-2-2.6l1 3c-1.2-2.7-3.2-3.8-4.8-6.3l-.2-.4-.1-.2-.2-.4a7 7 0 0 0-3.5 5.5q-1.6 0-2.8 1l-.3-.1q-.4-1.2 0-2.5-1.5.7-2.5 1.9c-.4-.5-.4-2.2-.4-2.5l-.3.2a7 7 0 0 0-2 2 8 8 0 0 0-1.3 3L.2 9 0 10.5q0 3.9 2.7 6.7c2.7 2.8 4.1 3 6.6 3.2a11 11 0 0 0 7.2-2q3-2.5 3.8-6.2v-.4q.3-2.6-.6-5m-1.1.6"/><use fill="#ff563b" href="#N"/><use fill="#960e18" opacity=".25" href="#N"/><path fill="#ffd000" d="M14.7 8q-.3-.6-.9-1.1a5 5 0 0 1-.4-6.9 7 7 0 0 0-3.5 5.5h.3q1.5 0 2.6.7A5 5 0 0 1 14.7 8"/><use fill="#7059ff" href="#O"/><use fill="#7716a8" opacity=".4" href="#O"/><path fill="#ffb039" d="m6.6 6.2.2.2q-.4-1.2 0-2.5-1.5.7-2.5 1.9s1.5 0 2.3.4"/><path fill="#ff5634" d="M0 10.8c.9 4.5 5.1 8 9.9 8a8.5 8.5 0 0 0 8.7-11.4c.4 2.3-.8 4.5-2.7 6A8 8 0 0 1 8 14.7l-.1-.1c-2.1-1-3-2.9-2.8-4.5q-.7 0-1.5-.4c-.8-.4-.7-.6-1-1A4 4 0 0 1 4.5 8a4 4 0 0 1 1.9.4 5 5 0 0 0 3.8.1S8.5 8 7.8 7.2L7 6.6l-.3-.2-.2-.2c-.8-.4-2.2-.4-2.3-.4-.4-.5-.4-2.2-.4-2.5l-.3.2a7 7 0 0 0-2 2 8 8 0 0 0-1.3 3S-.1 10 0 10.7"/><path fill="#ff3647" d="M13.8 6.9q.6.4 1 1.2h.1c2.3 2.1 1.1 5 1 5.3q3.2-2.4 2.7-6c-1.1-2.8-3-4-4.7-6.4l-.2-.4-.1-.2-.2-.4c-.4.2-2.8 3.8.4 6.9"/><path fill="#ff5634" d="m15 8.2-.2-.1h-.1q-1.1-.9-2.5-.7a4 4 0 0 1-2.4 7.7L8.5 15l-.3-.2H8c.7.4 4.3 1.6 8-1.3 0-.2 1.2-3.2-1-5.2"/><path fill="#ffb039" d="M5.6 11.4S6.1 9.7 9 9.7c.3 0 1.2-.8 1.2-1a5 5 0 0 1-3.8-.2A4 4 0 0 0 4.5 8a4 4 0 0 0-1.9.5q.4.7 1 1.1.8.5 1.5.4c-.2 1.6.7 3.5 2.8 4.5H8a4 4 0 0 1-2.4-3.2"/><path fill="#fff44f" opacity=".3" d="M19.7 6.8c-.5-1-1.4-2.1-2-2.5a10 10 0 0 1 1 3c-1.2-2.7-3.2-3.9-4.8-6.3l-.2-.4-.1-.2-.2-.4a7 7 0 0 0-3.5 5.5h.3q1.5 0 2.6.7A5 5 0 0 1 14.7 8q-1.1-.7-2.5-.6a4 4 0 0 1-2.4 7.7l-1.3-.2-.3-.2H8l-.1-.1H8a4 4 0 0 1-2.4-3.2S6.1 9.7 9 9.7c.3 0 1.2-.8 1.2-1s-1.8-.8-2.4-1.5L7 6.5l-.3-.1q-.4-1.2 0-2.5-1.5.7-2.5 1.9c-.4-.5-.4-2.2-.4-2.5l-.3.2a7 7 0 0 0-2 2A8 8 0 0 0 .4 8.3L.3 9l-.2 1.4q0 3.9 2.7 6.7c2.7 2.8 4.1 3 6.6 3.2a11 11 0 0 0 7.2-2q3-2.5 3.8-6.2v-.4q.3-2.6-.6-5"/></g></svg>\`,
  safari: \`<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none"><defs><clipPath id="clip0_1510_9490"><rect width="20.4" height="20.4" fill="white" transform="translate(0.000488281)"/></clipPath></defs><g clip-path="url(#clip0_1510_9490)"><path d="M19.8586 9.72878C19.8586 11.0041 19.6088 12.2669 19.1234 13.4451C18.6381 14.6233 17.9267 15.6939 17.0298 16.5956C16.133 17.4974 15.0683 18.2127 13.8965 18.7008C12.7248 19.1888 11.4689 19.44 10.2005 19.44C7.63906 19.44 5.1825 18.4168 3.37126 16.5956C1.56002 14.7744 0.54248 12.3043 0.54248 9.72878C0.54248 7.15321 1.56002 4.68313 3.37126 2.86192C5.1825 1.04072 7.63906 0.0175788 10.2005 0.0175781C11.4689 0.017578 12.7248 0.268767 13.8965 0.7568C15.0683 1.24483 16.133 1.96016 17.0298 2.86192C17.9267 3.76369 18.6381 4.83424 19.1234 6.01246C19.6088 7.19068 19.8586 8.45349 19.8586 9.72878Z" fill="#e0e0e0" stroke="#CDCDCD" stroke-width="0.351543" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.1018 9.72868C19.1018 12.1024 18.164 14.379 16.4947 16.0575C14.8254 17.7359 12.5613 18.6789 10.2006 18.6789C7.83982 18.6789 5.57575 17.7359 3.90644 16.0575C2.23713 14.379 1.29932 12.1024 1.29932 9.72868C1.29932 7.35493 2.23713 5.0784 3.90644 3.39991C5.57575 1.72141 7.83982 0.778442 10.2006 0.778442C12.5613 0.778442 14.8254 1.72141 16.4947 3.39991C18.164 5.0784 19.1018 7.35493 19.1018 9.72868Z" fill="#12aef1"/><path d="M11.218 10.8003L9.18286 8.65724L16.4024 3.77393L11.218 10.8003Z" fill="#FF5150"/><path d="M11.2181 10.8003L9.18291 8.65723L3.99854 15.6836L11.2181 10.8003Z" fill="#F1F1F1"/><path opacity="0.243" d="M3.99854 15.6836L11.2181 10.8003L16.4025 3.77393L3.99854 15.6836Z" fill="black"/></g></svg>\`,
};

const SUPPORT_ICONS = {
  available: \`<svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" fill="none"><path fill="currentColor" d="M1.3 3.3a9 9 0 0 1 5.4-1.9c4.9 0 8.9 4 8.9 8.8s-4 8.8-8.9 8.8a9 9 0 0 1-5.4-2l-.8 1a10 10 0 0 0 6.2 2.2 10 10 0 0 0 10-10A10 10 0 0 0 .6 2.3z"/><path fill="currentColor" d="m11.3 8.1-5 5-3-3 1-1 2 2 4-4z"/></svg>\`,
  no: \`<svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" fill="none"><path fill="currentColor" d="M1.3 3.3a9 9 0 0 1 5.4-1.9c5 0 8.9 4 8.9 8.8s-4 8.8-8.9 8.8a9 9 0 0 1-5.4-2l-.8 1a10 10 0 0 0 6.2 2.2 10 10 0 0 0 10.1-10A10 10 0 0 0 .5 2.3z"/><path fill="currentColor" d="m10.3 8.1-2 2 2 2-1 1-2-2-2 2-1-1 2-2-2-2 1-1 2 2 2-2z"/></svg>\`,
  unknown: \`<svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" fill="none" viewBox="0 0 17 21"><path fill="currentColor" d="M7.2 12.3H6l.1-1q0-.4.3-.7l.7-.8 1-1.1.1-.8q0-.4-.2-.7 0-.3-.4-.5l-.8-.2-.7.1-.5.5q-.2.2-.2.7H4.2q0-.8.3-1.3.4-.5 1-.7.6-.3 1.3-.3t1.4.3.9.8.3 1.3q0 .6-.2 1l-.6 1-.8.8q-.4.3-.5.7zm-1.3 2 .2-.5.5-.2q.4 0 .6.2l.1.5-.1.5-.6.2-.5-.2z"/><path fill="currentColor" d="M1.3 3.3a8.8 8.8 0 0 1 14.3 6.9 8.8 8.8 0 0 1-14.3 6.9l-.8 1a10 10 0 0 0 16.3-7.9A10 10 0 0 0 .5 2.3z"/></svg>\`,
};

const CHEVRON_ICON = \`<svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" fill="none" viewBox="0 0 11 7"><path fill="currentColor" d="M5.5 6.5.3 1.2l.9-1 4.3 4.4L9.8.3l1 1z"/></svg>\`;

/**
 * Displays the Baseline browser support status for a web platform feature.
 * Fetches data from the web-features API and renders an expandable widget
 * with browser support icons, status badges, and descriptions.
 *
 * @displayName Baseline Status
 * @status alpha
 *
 * @cssprop [--baseline-font] - Overrides the default font family.
 * @cssprop [--baseline-color-widely] - Overrides the "widely available" accent color.
 * @cssprop [--baseline-color-newly] - Overrides the "newly available" accent color.
 * @cssprop [--baseline-color-limited] - Overrides the "limited availability" accent color.
 * @cssprop [--baseline-color-no-data] - Overrides the "unknown" accent color.
 */
export default class BaselineSupport extends Elena(HTMLElement) {
  static tagName = "baseline-support";
  static props = ["featureid"];
  static element = "details";
  static shadow = "open";
  static styles = \`
    :host {
      --baseline-color-limited: light-dark(#ea8600, #f09418);
      --baseline-color-newly: light-dark(#1a73e8, #4185ff);
      --baseline-color-widely: light-dark(#1e8e3e, #24a446);
      --baseline-color-no_data: light-dark(#707070, #868686);
      --baseline-color-outline: light-dark(#d9d9d9, #d9d9d9);
      --baseline-color-link: light-dark(#1a73e8, #5aa1ff);
      --baseline-icon-limited-front: light-dark(#f09409, #f09409);
      --baseline-icon-limited-back: light-dark(#c6c6c6, #565656);
      --baseline-icon-widely-front: light-dark(#1ea446, #1ea446);
      --baseline-icon-widely-back: light-dark(#c4eed0, #125225);
      --baseline-icon-newly-front: light-dark(#1b6ef3, #4185ff);
      --baseline-icon-newly-back: light-dark(#a8c7fa, #2d509e);
      --baseline-icon-no_data: light-dark(#909090, #666666);

      all: unset;
      box-sizing: border-box;
      color: inherit;
      display: block;
      border: solid 1px var(--baseline-color-outline);
      border-radius: 8px;
      width: 100%;
      padding: 16px 24px 0 24px;
      max-width: 800px;
      margin-bottom: 1rem;
      font-family: Roboto, sans-serif;
      font-size: 14px;
      font-style: normal;
    }

    .name {
      font-weight: normal;
      font-size: 20px;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    a,
    a:active,
    a:visited {
      color: var(--baseline-color-link);
    }

    ::slotted(*) {
      color: grey;
      font-style: italic;
      font-size: 80%;
    }

    .baseline-title {
      gap: 1rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      flex: 1;
    }

    .baseline-title {
      flex: 1;
    }

    .baseline-title div:first-child {
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }

    .baseline-badge {
      background: #3367d6;
      color: #fff;
      font-size: 11px;
      padding: 0 4px;
      border-radius: 2px;
      text-transform: uppercase;
      line-height: 20px;
      margin-inline: 0.5rem;
      white-space: nowrap;
    }

    .baseline-browsers {
      font-size: 0;
      max-width: 200px;
      display: flex;
      gap: 16px;
    }

    .baseline-browsers span {
      white-space: nowrap;
    }

    .support-no_data {
      color: var(--baseline-color-no_data);
    }

    .support-unavailable {
      color: var(--baseline-color-limited);
    }

    .support-newly {
      color: var(--baseline-color-newly);
    }

    .support-widely,
    .support-available {
      color: var(--baseline-color-widely);
    }

    details > summary .open-icon {
      width: 10px;
      height: 20px;
      margin-left: auto;
      color: inherit;
    }

    @media (min-width: 420px) {
      details > summary .open-icon {
        margin-left: 48px;
      }
    }

    details > summary .open-icon svg {
      transition: transform 0.3s;
    }

    details[open] summary .open-icon svg {
      transform: rotate(180deg);
    }

    summary {
      display: flex;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: space-between;
      padding: 16px 0;
    }

    summary::-webkit-details-marker {
      display: none;
    }

    .signals-badge,
    .signals-badge:visited,
    .signals-badge:active {
      text-decoration: none;
      background: transparent;
      color: inherit;
      border-radius: 12px;
      padding: 2px 8px;
      font-size: 12px;
      border: 1px solid var(--baseline-color-outline);
      display: inline-flex;
      align-items: center;
      gap: 4px;
      line-height: 1.4;
    }

    .signals-badge:hover {
      background: light-dark(#f5f5f5, #333);
    }
  \`;

  /**
   * The web-features feature ID (e.g. "grid", "dialog").
   *
   * @attribute
   * @type {string}
   */
  featureid = "";

  /** @internal */
  _data = null;
  /** @internal */
  _loading = true;
  /** @internal */
  _error = false;
  /** @internal */
  _status = "no_data";
  /** @internal */
  _name = "";
  /** @internal */
  _date = "";
  /** @internal */
  _abortController = null;

  /**
   * @internal
   */
  attributeChangedCallback(prop, oldValue, newValue) {
    super.attributeChangedCallback(prop, oldValue, newValue);

    if (prop === "featureid" && this._hydrated && oldValue !== newValue && newValue) {
      this._fetchData();
    }
  }

  /**
   * @internal
   */
  firstUpdated() {
    if (this.featureid) {
      this._fetchData();
    }
  }

  /**
   * @internal
   */
  disconnectedCallback() {
    super.disconnectedCallback();

    if (this._abortController) {
      this._abortController.abort();
      this._abortController = null;
    }
  }

  /**
   * @internal
   */
  willUpdate() {
    if (this._data) {
      this._status = this._data.baseline?.status || "no_data";
      this._name = this._data.name || this.featureid;

      if (this._data.baseline?.low_date) {
        this._date = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
        }).format(new Date(this._data.baseline.low_date));
      } else {
        this._date = "";
      }
    } else {
      this._status = "no_data";
      this._name = this.featureid || "Unknown feature";
      this._date = "";
    }

    this.setAttribute("status", this._status);
  }

  /**
   * @internal
   */
  async _fetchData() {
    if (this._abortController) {
      this._abortController.abort();
    }

    this._abortController = new AbortController();
    this._loading = true;
    this._error = false;
    this._data = null;
    this.requestUpdate();

    try {
      const res = await fetch(API_URL + this.featureid, {
        signal: this._abortController.signal,
        cache: "force-cache",
      });

      if (!res.ok) {
        throw new Error(\`HTTP \${res.status}\`);
      }

      this._data = await res.json();
    } catch (e) {
      if (e.name !== "AbortError") {
        this._error = true;
      }
    }

    this._loading = false;
    this._abortController = null;
    this.requestUpdate();
  }

  /**
   * @internal
   */
  _checkAvailability(implementations) {
    return implementations.every(impl => impl?.status === "available");
  }

  /**
   * @internal
   */
  _getDescription() {
    const status = this._status;
    const date = this._date;

    if (status === "newly" && date) {
      return \`Since \${date} this feature works across the latest devices and browser versions. This feature might not work in older devices or browsers.\`;
    }

    if (status === "widely" && date) {
      return \`This feature is well established and works across many devices and browser versions. It\u2019s been available across browsers since \${date}.\`;
    }

    return BASELINE_DEFS[status].description;
  }

  /**
   * @internal
   */
  renderBaselineIcon(status) {
    return unsafeHTML(\`<span class="baseline-icon">\${BASELINE_ICONS[status]}</span>\`);
  }

  /**
   * @internal
   */
  renderSupportIcon(status, implementations) {
    const allAvailable = this._checkAvailability(implementations);
    const support = status === "limited" ? (allAvailable ? "available" : "unavailable") : status;
    const iconKey =
      support === "newly" || support === "widely"
        ? "available"
        : support === "unavailable"
          ? "no"
          : support === "no_data"
            ? "unknown"
            : support;

    return unsafeHTML(
      \`<span class="support-icon support-\${support}">\${SUPPORT_ICONS[iconKey] || SUPPORT_ICONS.unknown}</span>\`
    );
  }

  /**
   * @internal
   */
  renderBrowsers() {
    const status = this._status;
    const impl = this._data?.browser_implementations || {};

    return html\`
      <div class="baseline-browsers">
        <span>\${unsafeHTML(BROWSER_ICONS.chrome)} \${this.renderSupportIcon(status, [impl.chrome, impl.chrome_android])}</span>
        <span>\${unsafeHTML(BROWSER_ICONS.edge)} \${this.renderSupportIcon(status, [impl.edge])}</span>
        <span>\${unsafeHTML(BROWSER_ICONS.firefox)} \${this.renderSupportIcon(status, [impl.firefox, impl.firefox_android])}</span>
        <span>\${unsafeHTML(BROWSER_ICONS.safari)} \${this.renderSupportIcon(status, [impl.safari, impl.safari_ios])}</span>
      </div>
    \`;
  }

  /**
   * @internal
   */
  render() {
    const status = this._status;
    const def = BASELINE_DEFS[status];
    const title = this._loading ? "Loading..." : def.title;
    const preTitle =
      status === "limited" || status === "no_data" ? nothing : html\`<strong>Baseline</strong>\`;
    const year = status === "newly" && this._date ? this._date.split(" ")[1] : "";
    const badge =
      status === "newly" ? html\`<span class="baseline-badge">newly available</span>\` : nothing;

    const upvote = this._data?.developer_signals;
    const upvoteButton = upvote?.link
      ? html\`<a class="signals-badge" href="\${upvote.link}" target="_top">\uD83D\uDC4D \${upvote.upvotes || 0}</a>\`
      : nothing;

    const learnMore =
      status !== "no_data" && this._data?.feature_id
        ? html\`<p><a href="https://github.com/web-platform-dx/web-features/blob/main/features/\${this._data.feature_id}.yml" target="_top" class="baseline-link">Learn more</a></p>\`
        : nothing;

    return html\`
      <div class="name">\${this._name} \${upvoteButton}</div>
      <details>
        <summary>
          \${this.renderBaselineIcon(status)}
          <div class="baseline-title">
            <div class="baseline-title-row">\${preTitle} \${title} \${year}</div>
            \${this.renderBrowsers()}
          </div>
          <span class="open-icon">\${unsafeHTML(CHEVRON_ICON)}</span>
        </summary>
        <p class="baseline-description">\${this._getDescription()}</p>
        \${learnMore}
      </details>
    \`;
  }
}

BaselineSupport.define();`,
  html: `<baseline-support featureid="autonomous-custom-elements"></baseline-support>
<baseline-support featureid="cascade-layers"></baseline-support>
<baseline-support featureid="scope"></baseline-support>
<baseline-support featureid="declarative-shadow-dom"></baseline-support>
<baseline-support featureid="anchor-positioning"></baseline-support>`,
};

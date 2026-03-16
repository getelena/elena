import { describe, it, expect, vi } from "vitest";
import { createElement } from "./setup.js";
import { Elena, html } from "../src/elena.js";

describe("mixins", () => {
  describe("mixin applied after Elena (wrapping Elena)", () => {
    const TrackConnects = superClass =>
      class extends superClass {
        _mixinConnected = false;
        _mixinDisconnected = false;

        connectedCallback() {
          super.connectedCallback();
          this._mixinConnected = true;
        }

        disconnectedCallback() {
          super.disconnectedCallback();
          this._mixinDisconnected = true;
        }
      };

    class MixinAfterEl extends TrackConnects(Elena(HTMLElement)) {
      static tagName = "test-mixin-after";
      static props = ["label"];
      static element = ".inner";

      label = "";

      render() {
        return html`<span class="inner">${this.label}</span>`;
      }
    }
    MixinAfterEl.define();

    it("runs Elena lifecycle and mixin lifecycle on connect", () => {
      const el = createElement("test-mixin-after");
      expect(el.hasAttribute("hydrated")).toBe(true);
      expect(el._mixinConnected).toBe(true);
      expect(el.element).not.toBeNull();
    });

    it("runs mixin disconnectedCallback via super chain", () => {
      const el = createElement("test-mixin-after");
      el.remove();
      expect(el._mixinDisconnected).toBe(true);
    });

    it("renders and updates props normally", async () => {
      const el = createElement("test-mixin-after", { label: "hello" });
      expect(el.querySelector(".inner").textContent).toBe("hello");

      el.setAttribute("label", "world");
      await el.updateComplete;
      expect(el.querySelector(".inner").textContent).toBe("world");
    });
  });

  describe("mixin applied before Elena (wrapping HTMLElement)", () => {
    it("mixin super.connectedCallback() throws because HTMLElement has no connectedCallback", () => {
      const BadOrder = superClass =>
        class extends superClass {
          connectedCallback() {
            super.connectedCallback();
            this.setAttribute("data-mixin", "true");
          }
        };

      class MixinBeforeEl extends Elena(BadOrder(HTMLElement)) {
        static tagName = "test-mixin-before";

        render() {
          return html`<span>test</span>`;
        }
      }
      MixinBeforeEl.define();

      // The mixin's super.connectedCallback() targets HTMLElement, which
      // doesn't define it, so it throws. This is why mixins should always
      // be applied after Elena().
      expect(() => createElement("test-mixin-before")).toThrow();
    });
  });

  describe("multiple stacked mixins", () => {
    const calls = [];

    const MixinA = superClass =>
      class extends superClass {
        connectedCallback() {
          super.connectedCallback();
          calls.push("A:connected");
        }

        disconnectedCallback() {
          super.disconnectedCallback();
          calls.push("A:disconnected");
        }
      };

    const MixinB = superClass =>
      class extends superClass {
        connectedCallback() {
          super.connectedCallback();
          calls.push("B:connected");
        }

        disconnectedCallback() {
          super.disconnectedCallback();
          calls.push("B:disconnected");
        }
      };

    class StackedMixinEl extends MixinA(MixinB(Elena(HTMLElement))) {
      static tagName = "test-stacked-mixin";

      render() {
        return html`<span>stacked</span>`;
      }
    }
    StackedMixinEl.define();

    it("fires connect callbacks in outermost-first order after Elena", () => {
      calls.length = 0;
      const el = createElement("test-stacked-mixin");
      // super chain: MixinA.connected → super → MixinB.connected → super → Elena.connected
      // Elena runs first (innermost super), then B, then A
      expect(calls).toEqual(["B:connected", "A:connected"]);
      el.remove();
    });

    it("fires disconnect callbacks through the full super chain", () => {
      const el = createElement("test-stacked-mixin");
      calls.length = 0;
      el.remove();
      expect(calls).toEqual(["B:disconnected", "A:disconnected"]);
    });
  });

  describe("mixin with props", () => {
    const Sizeable = superClass =>
      class extends superClass {
        /** @attribute @type {"sm" | "md" | "lg"} */
        size = "md";
      };

    class SizeableMixinEl extends Sizeable(Elena(HTMLElement)) {
      static tagName = "test-sizeable-mixin";
      static props = ["size", "label"];

      label = "";

      render() {
        return html`<span class="${this.size}">${this.label}</span>`;
      }
    }
    SizeableMixinEl.define();

    it("mixin-provided prop has correct default value", () => {
      const el = createElement("test-sizeable-mixin");
      expect(el.size).toBe("md");
    });

    it("mixin prop syncs to attribute", () => {
      const el = createElement("test-sizeable-mixin");
      el.size = "lg";
      expect(el.getAttribute("size")).toBe("lg");
    });

    it("mixin prop triggers re-render", async () => {
      const el = createElement("test-sizeable-mixin", { label: "hi" });
      el.setAttribute("size", "sm");
      await el.updateComplete;
      expect(el.querySelector("span").className).toBe("sm");
    });

    it("component-defined prop works alongside mixin prop", () => {
      const el = createElement("test-sizeable-mixin");
      el.label = "test";
      expect(el.getAttribute("label")).toBe("test");
      expect(el.size).toBe("md");
    });
  });

  describe("mixin with willUpdate", () => {
    const AutoUppercase = superClass =>
      class extends superClass {
        willUpdate() {
          if (this.label) {
            this._upper = this.label.toUpperCase();
          }
        }
      };

    class UppercaseMixinEl extends AutoUppercase(Elena(HTMLElement)) {
      static tagName = "test-uppercase-mixin";
      static props = ["label"];

      label = "";

      render() {
        return html`<span>${this._upper || ""}</span>`;
      }
    }
    UppercaseMixinEl.define();

    it("mixin willUpdate runs before render", () => {
      const el = document.createElement("test-uppercase-mixin");
      el.label = "hello";
      document.body.appendChild(el);
      expect(el.querySelector("span").textContent).toBe("HELLO");
      el.remove();
    });

    it("mixin willUpdate runs on re-render", async () => {
      const el = createElement("test-uppercase-mixin", { label: "a" });
      el.setAttribute("label", "world");
      await el.updateComplete;
      expect(el.querySelector("span").textContent).toBe("WORLD");
    });
  });

  describe("mixin with firstUpdated and updated", () => {
    const calls = [];

    const LifecycleMixin = superClass =>
      class extends superClass {
        firstUpdated() {
          super.firstUpdated();
          calls.push("mixin:firstUpdated");
        }

        updated() {
          super.updated();
          calls.push("mixin:updated");
        }
      };

    class LifecycleMixinEl extends LifecycleMixin(Elena(HTMLElement)) {
      static tagName = "test-lifecycle-mixin";
      static props = ["label"];

      label = "";

      render() {
        return html`<span>${this.label}</span>`;
      }
    }
    LifecycleMixinEl.define();

    it("mixin firstUpdated fires once on first connect", () => {
      calls.length = 0;
      const el = createElement("test-lifecycle-mixin");
      expect(calls).toContain("mixin:firstUpdated");
      expect(calls.filter(c => c === "mixin:firstUpdated")).toHaveLength(1);
      el.remove();
    });

    it("mixin updated fires on every render", async () => {
      calls.length = 0;
      const el = createElement("test-lifecycle-mixin", { label: "a" });
      const countAfterConnect = calls.filter(c => c === "mixin:updated").length;

      el.setAttribute("label", "b");
      await el.updateComplete;
      const countAfterUpdate = calls.filter(c => c === "mixin:updated").length;
      expect(countAfterUpdate).toBe(countAfterConnect + 1);
    });

    it("mixin firstUpdated does not fire on reconnect", () => {
      calls.length = 0;
      const el = createElement("test-lifecycle-mixin");
      const firstUpdatedCount = calls.filter(c => c === "mixin:firstUpdated").length;

      const container = document.createElement("div");
      document.body.appendChild(container);
      el.remove();
      container.appendChild(el);

      expect(calls.filter(c => c === "mixin:firstUpdated")).toHaveLength(firstUpdatedCount);
    });
  });

  describe("mixin with events", () => {
    const ClickTracker = superClass =>
      class extends superClass {
        _clickCount = 0;

        connectedCallback() {
          super.connectedCallback();
          this.addEventListener("click", this._trackClick);
        }

        disconnectedCallback() {
          super.disconnectedCallback();
          this.removeEventListener("click", this._trackClick);
        }

        _trackClick = () => {
          this._clickCount++;
        };
      };

    class ClickTrackerEl extends ClickTracker(Elena(HTMLElement)) {
      static tagName = "test-click-tracker-mixin";

      render() {
        return html`<button>click me</button>`;
      }
    }
    ClickTrackerEl.define();

    it("mixin event listener works alongside Elena rendering", () => {
      const el = createElement("test-click-tracker-mixin");
      el.click();
      expect(el._clickCount).toBe(1);
    });

    it("mixin cleans up event listener on disconnect", () => {
      const el = createElement("test-click-tracker-mixin");
      el.click();
      expect(el._clickCount).toBe(1);

      el.remove();
      // After disconnect, clicking should not increment (listener was removed)
      el.dispatchEvent(new Event("click"));
      expect(el._clickCount).toBe(1);
    });
  });

  describe("mixin with Composite Component", () => {
    const Collapsible = superClass =>
      class extends superClass {
        connectedCallback() {
          super.connectedCallback();
          this._applyCollapsed();
        }

        _applyCollapsed() {
          if (this.collapsed) {
            this.style.display = "none";
          } else {
            this.style.display = "";
          }
        }
      };

    class CollapsiblePanelEl extends Collapsible(Elena(HTMLElement)) {
      static tagName = "test-collapsible-mixin";
      static props = ["collapsed"];

      /** @attribute @type {Boolean} */
      collapsed = false;
    }
    CollapsiblePanelEl.define();

    it("mixin works with Composite Component (no render)", () => {
      const el = createElement("test-collapsible-mixin");
      expect(el.hasAttribute("hydrated")).toBe(true);
      expect(el.style.display).toBe("");
    });

    it("mixin behavior responds to prop changes", () => {
      const el = createElement("test-collapsible-mixin");
      el.collapsed = true;
      el._applyCollapsed();
      expect(el.style.display).toBe("none");
    });
  });

  describe("mixin with requestUpdate", () => {
    const Counter = superClass =>
      class extends superClass {
        _count = 0;

        increment() {
          this._count++;
          this.requestUpdate();
        }
      };

    class CounterMixinEl extends Counter(Elena(HTMLElement)) {
      static tagName = "test-counter-mixin";

      render() {
        return html`<span>${this._count}</span>`;
      }
    }
    CounterMixinEl.define();

    it("mixin can call requestUpdate to trigger re-render", async () => {
      const el = createElement("test-counter-mixin");
      expect(el.querySelector("span").textContent).toBe("0");

      el.increment();
      await el.updateComplete;
      expect(el.querySelector("span").textContent).toBe("1");
    });

    it("multiple increment calls batch into one render", async () => {
      const el = createElement("test-counter-mixin");
      const spy = vi.spyOn(el, "render");

      el.increment();
      el.increment();
      el.increment();
      await el.updateComplete;

      expect(spy).toHaveBeenCalledTimes(1);
      expect(el.querySelector("span").textContent).toBe("3");
      spy.mockRestore();
    });
  });

  describe("mixin disconnect/reconnect", () => {
    const TrackLifecycle = superClass =>
      class extends superClass {
        _connectCount = 0;
        _disconnectCount = 0;

        connectedCallback() {
          super.connectedCallback();
          this._connectCount++;
        }

        disconnectedCallback() {
          super.disconnectedCallback();
          this._disconnectCount++;
        }
      };

    class ReconnectMixinEl extends TrackLifecycle(Elena(HTMLElement)) {
      static tagName = "test-reconnect-mixin";

      render() {
        return html`<span>reconnect</span>`;
      }
    }
    ReconnectMixinEl.define();

    it("mixin lifecycle fires on reconnect", () => {
      const el = createElement("test-reconnect-mixin");
      expect(el._connectCount).toBe(1);

      const container = document.createElement("div");
      document.body.appendChild(container);
      el.remove();
      expect(el._disconnectCount).toBe(1);

      container.appendChild(el);
      expect(el._connectCount).toBe(2);
    });

    it("component stays functional after disconnect/reconnect with mixin", async () => {
      const el = createElement("test-reconnect-mixin");

      const container = document.createElement("div");
      document.body.appendChild(container);
      el.remove();
      container.appendChild(el);

      expect(el.hasAttribute("hydrated")).toBe(true);
      expect(el.querySelector("span").textContent).toBe("reconnect");
    });
  });
});

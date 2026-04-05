import { describe, it, expect } from "vitest";
import { renderTemplate } from "../src/common/render.js";
import { html, nothing, unsafeHTML } from "../src/elena.js";

const el = () => document.createElement("div");

describe("SVG rendering", () => {
  describe("SVG via html tag", () => {
    it("renders an inline SVG element with correct namespace", () => {
      const container = el();
      const t = html`<svg width="10" height="10"><circle cx="5" cy="5" r="5"/></svg>`;
      renderTemplate(container, t.strings, t.values);
      const svg = container.querySelector("svg");
      expect(svg).not.toBeNull();
      expect(svg.namespaceURI).toBe("http://www.w3.org/2000/svg");
    });

    it("SVG children inherit the SVG namespace", () => {
      const container = el();
      const t = html`<svg><circle cx="5" cy="5" r="5"/></svg>`;
      renderTemplate(container, t.strings, t.values);
      const circle = container.querySelector("circle");
      expect(circle).not.toBeNull();
      expect(circle.namespaceURI).toBe("http://www.w3.org/2000/svg");
    });

    it("renders SVG with dynamic attribute values", () => {
      const container = el();
      const t = html`<svg width="${100}" height="${50}"><rect width="100" height="50"/></svg>`;
      renderTemplate(container, t.strings, t.values);
      const svg = container.querySelector("svg");
      expect(svg.getAttribute("width")).toBe("100");
      expect(svg.getAttribute("height")).toBe("50");
    });

    it("renders SVG with dynamic text content", () => {
      const container = el();
      const t = html`<svg><text>${"Hello SVG"}</text></svg>`;
      renderTemplate(container, t.strings, t.values);
      const text = container.querySelector("text");
      expect(text).not.toBeNull();
      expect(text.textContent).toBe("Hello SVG");
    });

    it("renders nested SVG elements", () => {
      const container = el();
      const t = html`<svg>
        <g>
          <circle cx="10" cy="10" r="5"/>
          <rect x="20" y="20" width="10" height="10"/>
        </g>
      </svg>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("g")).not.toBeNull();
      expect(container.querySelector("circle")).not.toBeNull();
      expect(container.querySelector("rect")).not.toBeNull();
    });

    it("renders SVG with dynamic child elements via nested html", () => {
      const container = el();
      const circle = html`<circle cx="5" cy="5" r="5"/>`;
      const t = html`<svg>${circle}</svg>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("svg")).not.toBeNull();
      expect(container.querySelector("circle")).not.toBeNull();
    });

    it("renders SVG with conditional content using nothing", () => {
      const container = el();
      const showCircle = false;
      const t = html`<svg>${showCircle ? html`<circle cx="5" cy="5" r="5"/>` : nothing}</svg>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("svg")).not.toBeNull();
      expect(container.querySelector("circle")).toBeNull();
    });

    it("renders SVG via unsafeHTML", () => {
      const container = el();
      const svgMarkup = `<svg width="10" height="10"><circle cx="5" cy="5" r="5"/></svg>`;
      const t = html`<div>${unsafeHTML(svgMarkup)}</div>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("svg")).not.toBeNull();
      expect(container.querySelector("circle")).not.toBeNull();
    });

    it("re-renders SVG text content", () => {
      const container = el();
      const strings = Object.assign(["<svg><text>", "</text></svg>"], {
        raw: ["<svg><text>", "</text></svg>"],
      });

      renderTemplate(container, strings, ["First"]);
      expect(container.querySelector("text").textContent).toBe("First");

      const result = renderTemplate(container, strings, ["Second"]);
      expect(result).toBe(false);
      expect(container.querySelector("text").textContent).toBe("Second");
    });

    it("handles SVG alongside regular HTML elements", () => {
      const container = el();
      const t = html`<div>
        <p>${"label"}</p>
        <svg><circle cx="5" cy="5" r="5"/></svg>
      </div>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("p").textContent).toBe("label");
      expect(container.querySelector("svg")).not.toBeNull();
      expect(container.querySelector("circle")).not.toBeNull();
    });

    it("renders multiple SVG elements in the same template", () => {
      const container = el();
      const t = html`<div>
        <svg class="icon-a"><circle cx="5" cy="5" r="5"/></svg>
        <svg class="icon-b"><rect width="10" height="10"/></svg>
      </div>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelectorAll("svg").length).toBe(2);
      expect(container.querySelector(".icon-a circle")).not.toBeNull();
      expect(container.querySelector(".icon-b rect")).not.toBeNull();
    });

    it("escapes dynamic values inside SVG elements", () => {
      const container = el();
      const t = html`<svg><text>${'<script>alert("xss")</script>'}</text></svg>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("script")).toBeNull();
      expect(container.querySelector("text").textContent).toBe('<script>alert("xss")</script>');
    });

    it("preserves SVG attributes with special characters", () => {
      const container = el();
      const t = html`<svg viewBox="0 0 100 100"><path d="M10 10 L90 90"/></svg>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("svg").getAttribute("viewBox")).toBe("0 0 100 100");
      expect(container.querySelector("path").getAttribute("d")).toBe("M10 10 L90 90");
    });
  });
});

describe("MathML rendering", () => {
  describe("MathML via html tag", () => {
    it("renders a math element", () => {
      const container = el();
      const t = html`<math><mi>x</mi></math>`;
      renderTemplate(container, t.strings, t.values);
      const math = container.querySelector("math");
      expect(math).not.toBeNull();
    });

    it("renders MathML with dynamic text content", () => {
      const container = el();
      const t = html`<math><mi>${"x"}</mi><mo>${"+"}</mo><mn>${"2"}</mn></math>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("mi").textContent).toBe("x");
      expect(container.querySelector("mo").textContent).toBe("+");
      expect(container.querySelector("mn").textContent).toBe("2");
    });

    it("renders MathML fraction structure", () => {
      const container = el();
      const t = html`<math><mfrac><mn>${"1"}</mn><mn>${"2"}</mn></mfrac></math>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("mfrac")).not.toBeNull();
      const mns = container.querySelectorAll("mn");
      expect(mns.length).toBe(2);
      expect(mns[0].textContent).toBe("1");
      expect(mns[1].textContent).toBe("2");
    });

    it("re-renders MathML text content", () => {
      const container = el();
      const strings = Object.assign(["<math><mn>", "</mn></math>"], {
        raw: ["<math><mn>", "</mn></math>"],
      });

      renderTemplate(container, strings, ["42"]);
      expect(container.querySelector("mn").textContent).toBe("42");

      const result = renderTemplate(container, strings, ["99"]);
      expect(result).toBe(false);
      expect(container.querySelector("mn").textContent).toBe("99");
    });

    it("renders MathML via unsafeHTML", () => {
      const container = el();
      const mathMarkup = `<math><mi>x</mi><mo>=</mo><mn>5</mn></math>`;
      const t = html`<div>${unsafeHTML(mathMarkup)}</div>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("math")).not.toBeNull();
      expect(container.querySelector("mi")).not.toBeNull();
    });

    it("renders MathML with conditional content using nothing", () => {
      const container = el();
      const showExponent = false;
      const t = html`<math>
        <mi>x</mi>
        ${showExponent ? html`<msup><mn>2</mn></msup>` : nothing}
      </math>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("mi")).not.toBeNull();
      expect(container.querySelector("msup")).toBeNull();
    });

    it("handles MathML alongside HTML and SVG", () => {
      const container = el();
      const t = html`<div>
        <p>${"The equation:"}</p>
        <math><mi>x</mi><mo>=</mo><mn>5</mn></math>
      </div>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("p").textContent).toBe("The equation:");
      expect(container.querySelector("math")).not.toBeNull();
      expect(container.querySelector("mi").textContent).toBe("x");
    });

    it("escapes dynamic values inside MathML elements", () => {
      const container = el();
      const t = html`<math><mi>${"<script>alert(1)</script>"}</mi></math>`;
      renderTemplate(container, t.strings, t.values);
      expect(container.querySelector("script")).toBeNull();
      expect(container.querySelector("mi").textContent).toBe("<script>alert(1)</script>");
    });
  });
});

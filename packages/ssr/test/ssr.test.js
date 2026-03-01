import { describe, it, expect } from "vitest";
import { ssr, register } from "../src/index.js";

describe("ssr", () => {
  it("renders a primitive component with text content", () => {
    const html = ssr(`<elena-button>Click me</elena-button>`);
    expect(html).toBe("<elena-button><button>Click me</button></elena-button>");
  });

  it("renders a primitive component with attributes", () => {
    const html = ssr(`<elena-button variant="primary">OK</elena-button>`);
    expect(html).toBe('<elena-button variant="primary"><button>OK</button></elena-button>');
  });

  it("renders boolean attributes", () => {
    const html = ssr(`<elena-button disabled>No</elena-button>`);
    expect(html).toBe("<elena-button disabled><button>No</button></elena-button>");
  });

  it("renders attribute interpolation in templates", () => {
    const html = ssr(`<elena-input type="email" placeholder="you@example.com"></elena-input>`);
    expect(html).toBe(
      '<elena-input type="email" placeholder="you@example.com"><input type="email" placeholder="you@example.com" /></elena-input>'
    );
  });

  it("renders conditional content (active)", () => {
    const html = ssr(`<elena-conditional label="Go" active></elena-conditional>`);
    expect(html).toBe(
      '<elena-conditional label="Go" active><button>Go</button></elena-conditional>'
    );
  });

  it("renders conditional content (inactive)", () => {
    const html = ssr(`<elena-conditional label="Go"></elena-conditional>`);
    expect(html).toBe('<elena-conditional label="Go"><button></button></elena-conditional>');
  });

  it("renders nested html templates", () => {
    const html = ssr(`<elena-nested description="Hello"></elena-nested>`);
    expect(html).toBe('<elena-nested description="Hello"><div><p>Hello</p></div></elena-nested>');
  });

  it("escapes HTML in text content (XSS prevention)", () => {
    const html = ssr(`<elena-xss label='<script>alert("xss")</script>'></elena-xss>`);
    expect(html).toContain("&lt;script&gt;");
    expect(html).not.toContain("<script>alert");
  });

  it("handles component with no render output", () => {
    const html = ssr(`<elena-empty></elena-empty>`);
    expect(html).toBe("<elena-empty></elena-empty>");
  });

  it("passes through non-Elena HTML unchanged", () => {
    const html = ssr(`<div class="wrapper"><p>Hello</p></div>`);
    expect(html).toBe('<div class="wrapper"><p>Hello</p></div>');
  });

  it("passes through void elements", () => {
    const html = ssr(`<br><hr><img src="test.png">`);
    expect(html).toBe('<br><hr><img src="test.png">');
  });

  it("renders a composite component preserving children", () => {
    const html = ssr(`<elena-stack direction="row"><p>Hello</p></elena-stack>`);
    expect(html).toBe('<elena-stack direction="row"><p>Hello</p></elena-stack>');
  });

  it("renders nested primitive inside composite", () => {
    const html = ssr(`
      <elena-stack>
        <elena-button>Send</elena-button>
      </elena-stack>
    `);
    expect(html).toBe(
      "<elena-stack><elena-button><button>Send</button></elena-button></elena-stack>"
    );
  });

  it("renders multiple primitives inside composite", () => {
    const html = ssr(`
      <elena-stack direction="row">
        <elena-input type="email" placeholder="you@example.com"></elena-input>
        <elena-button>Send</elena-button>
      </elena-stack>
    `);
    expect(html).toBe(
      '<elena-stack direction="row">' +
        '<elena-input type="email" placeholder="you@example.com">' +
        '<input type="email" placeholder="you@example.com" />' +
        "</elena-input>" +
        "<elena-button><button>Send</button></elena-button>" +
        "</elena-stack>"
    );
  });

  it("renders deeply nested composites and primitives", () => {
    const html = ssr(`
      <elena-stack>
        <elena-stack direction="row">
          <elena-button variant="primary">Save</elena-button>
          <elena-button>Cancel</elena-button>
        </elena-stack>
      </elena-stack>
    `);
    expect(html).toBe(
      "<elena-stack>" +
        '<elena-stack direction="row">' +
        '<elena-button variant="primary"><button>Save</button></elena-button>' +
        "<elena-button><button>Cancel</button></elena-button>" +
        "</elena-stack>" +
        "</elena-stack>"
    );
  });

  it("renders a complex template with multiple conditionals and attribute interpolation", () => {
    const html = ssr(
      `<elena-complex-input identifier="email" label="Email" type="email" start="@" error="Required"></elena-complex-input>`
    );
    expect(html).toContain('<label for="email">Email</label>');
    expect(html).toContain('<div class="elena-input-start">@</div>');
    expect(html).toContain('id="email"');
    expect(html).toContain("elena-input-has-start");
    expect(html).toContain('<div class="elena-input-error">Required</div>');
  });

  it("renders a complex template with conditionals omitted", () => {
    const html = ssr(
      `<elena-complex-input identifier="name" label="Name" type="text"></elena-complex-input>`
    );
    expect(html).toContain('<label for="name">Name</label>');
    expect(html).toContain('id="name"');
    expect(html).not.toContain("elena-input-start");
    expect(html).not.toContain("elena-input-has-start");
    expect(html).not.toContain("elena-input-error");
  });

  it("renders a complex template inside a composite", () => {
    const html = ssr(`
      <elena-stack>
        <elena-complex-input identifier="email" label="Email" type="email" error="Invalid"></elena-complex-input>
        <elena-button>Submit</elena-button>
      </elena-stack>
    `);
    expect(html).toContain('<label for="email">Email</label>');
    expect(html).toContain('<div class="elena-input-error">Invalid</div>');
    expect(html).toContain("<button>Submit</button>");
    expect(html).toMatch(/^<elena-stack>.*<\/elena-stack>$/);
  });
});

describe("register", () => {
  it("throws for components without tagName", () => {
    class NoTag {
      render() {
        return "";
      }
    }
    expect(() => register(NoTag)).toThrow("tagName");
  });
});

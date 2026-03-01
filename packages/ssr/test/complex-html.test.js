/**
 * Integration tests for SSR with complex, deeply nested HTML structures.
 */

import { describe, it, expect } from "vitest";
import { ssr } from "../src/index.js";

describe("complex HTML structures", () => {
  it("renders a full page layout with deeply nested HTML and Elena components", () => {
    const html = ssr(`
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Test Page</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <header>
            <nav>
              <ul>
                <li><elena-link href="/" target="_self">Home</elena-link></li>
                <li><elena-link href="/about" target="_self">About</elena-link></li>
                <li><elena-link href="/contact" target="_blank">Contact</elena-link></li>
              </ul>
            </nav>
          </header>
          <main>
            <elena-section>
              <h1>Welcome</h1>
              <elena-stack>
                <elena-card variant="primary">
                  <h2>Card One</h2>
                  <p>Some <strong>bold</strong> and <em>italic</em> text.</p>
                  <elena-stack direction="row">
                    <elena-badge variant="success">New</elena-badge>
                    <elena-badge variant="warning">Beta</elena-badge>
                  </elena-stack>
                  <elena-button variant="primary">Learn More</elena-button>
                </elena-card>
                <elena-card>
                  <h2>Card Two</h2>
                  <table>
                    <thead>
                      <tr><th>Name</th><th>Value</th></tr>
                    </thead>
                    <tbody>
                      <tr><td>Alpha</td><td>100</td></tr>
                      <tr><td>Bravo</td><td>200</td></tr>
                    </tbody>
                  </table>
                  <elena-button>View Details</elena-button>
                </elena-card>
              </elena-stack>
            </elena-section>
            <elena-section>
              <h1>Contact Form</h1>
              <elena-stack>
                <elena-complex-input identifier="name" label="Name" type="text"></elena-complex-input>
                <elena-complex-input identifier="email" label="Email" type="email" start="@" error="Required"></elena-complex-input>
                <elena-stack direction="row">
                  <elena-button variant="primary">Submit</elena-button>
                  <elena-button>Reset</elena-button>
                </elena-stack>
              </elena-stack>
            </elena-section>
          </main>
          <footer>
            <p>&copy; 2026 Elena</p>
          </footer>
        </body>
      </html>
    `);

    // Page structure preserved
    expect(html).toContain('<html lang="en">');
    expect(html).toContain('<meta charset="utf-8">');
    expect(html).toContain("<title>Test Page</title>");
    expect(html).toContain('<link rel="stylesheet" href="/styles.css">');

    // Navigation links expanded
    expect(html).toContain(
      '<elena-link href="/" target="_self"><a href="/" target="_self">Home</a></elena-link>'
    );
    expect(html).toContain(
      '<elena-link href="/contact" target="_blank"><a href="/contact" target="_blank">Contact</a></elena-link>'
    );

    // Composites preserved with children
    expect(html).toContain("<elena-section>");
    expect(html).toContain('<elena-card variant="primary">');

    // Inline HTML inside composites preserved
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain("<em>italic</em>");

    // Badges expanded
    expect(html).toContain(
      '<elena-badge variant="success"><span class="badge badge-success">New</span></elena-badge>'
    );
    expect(html).toContain(
      '<elena-badge variant="warning"><span class="badge badge-warning">Beta</span></elena-badge>'
    );

    // Table structure preserved inside composite
    expect(html).toContain("<thead><tr><th>Name</th><th>Value</th></tr></thead>");
    expect(html).toContain("<td>Alpha</td><td>100</td>");

    // Buttons expanded
    expect(html).toContain(
      '<elena-button variant="primary"><button>Learn More</button></elena-button>'
    );
    expect(html).toContain("<elena-button><button>View Details</button></elena-button>");

    // Complex inputs expanded with conditionals
    expect(html).toContain('<label for="email">Email</label>');
    expect(html).toContain('<div class="elena-input-start">@</div>');
    expect(html).toContain('<div class="elena-input-error">Required</div>');
    expect(html).not.toContain('elena-input-start">@</div></elena-complex-input');

    // Footer preserved (htmlparser2 decodes &copy; to ©)
    expect(html).toContain("© 2026 Elena");
  });

  it("handles interleaved Elena components and plain HTML at many depths", () => {
    const html = ssr(`
      <div class="app">
        <div class="sidebar">
          <elena-stack>
            <div class="sidebar-group">
              <h3>Navigation</h3>
              <ul>
                <li>
                  <elena-link href="/dashboard" target="_self">Dashboard</elena-link>
                </li>
                <li>
                  <elena-link href="/settings" target="_self">Settings</elena-link>
                </li>
              </ul>
            </div>
            <div class="sidebar-group">
              <h3>Actions</h3>
              <elena-stack direction="row">
                <elena-button variant="primary">New</elena-button>
                <elena-button variant="danger">Delete</elena-button>
              </elena-stack>
            </div>
          </elena-stack>
        </div>
        <div class="content">
          <article>
            <header>
              <h1>Article Title</h1>
              <elena-stack direction="row">
                <elena-badge variant="info">Published</elena-badge>
                <span class="date">March 2026</span>
              </elena-stack>
            </header>
            <section>
              <p>Paragraph with <code>inline code</code> and a <elena-link href="https://example.com" target="_blank">link</elena-link> in the middle.</p>
              <blockquote>
                <p>A quote with an <elena-badge variant="highlight">important</elena-badge> badge inside.</p>
              </blockquote>
              <pre><code>const x = 42;</code></pre>
            </section>
            <footer>
              <elena-stack direction="row">
                <elena-button>Like</elena-button>
                <elena-button>Share</elena-button>
                <elena-button>Report</elena-button>
              </elena-stack>
            </footer>
          </article>
        </div>
      </div>
    `);

    // Sidebar structure
    expect(html).toContain('<div class="sidebar">');
    expect(html).toContain("<h3>Navigation</h3>");
    expect(html).toContain(
      '<elena-link href="/dashboard" target="_self"><a href="/dashboard" target="_self">Dashboard</a></elena-link>'
    );
    expect(html).toContain('<elena-button variant="danger"><button>Delete</button></elena-button>');

    // Badge inside article header
    expect(html).toContain(
      '<elena-badge variant="info"><span class="badge badge-info">Published</span></elena-badge>'
    );

    // Plain HTML sibling to Elena component inside the same stack
    expect(html).toContain('<span class="date">March 2026</span>');

    // Link inline within a paragraph
    expect(html).toContain(
      'and a <elena-link href="https://example.com" target="_blank"><a href="https://example.com" target="_blank">link</a></elena-link> in the middle.'
    );

    // Badge inside blockquote > p
    expect(html).toContain(
      '<elena-badge variant="highlight"><span class="badge badge-highlight">important</span></elena-badge>'
    );

    // Pre/code preserved
    expect(html).toContain("<pre><code>const x = 42;</code></pre>");

    // Footer buttons
    expect(html).toContain("<elena-button><button>Like</button></elena-button>");
    expect(html).toContain("<elena-button><button>Share</button></elena-button>");
    expect(html).toContain("<elena-button><button>Report</button></elena-button>");
  });

  it("renders many void elements mixed with components", () => {
    const html = ssr(`
      <elena-card>
        <img src="photo.jpg" alt="Photo">
        <br>
        <elena-badge variant="new">Featured</elena-badge>
        <hr>
        <elena-complex-input identifier="search" label="Search" type="search"></elena-complex-input>
        <input type="hidden" name="token" value="abc123">
      </elena-card>
    `);

    expect(html).toContain('<img src="photo.jpg" alt="Photo">');
    expect(html).toContain("<br>");
    expect(html).toContain("<hr>");
    expect(html).toContain('<input type="hidden" name="token" value="abc123">');
    expect(html).toContain(
      '<elena-badge variant="new"><span class="badge badge-new">Featured</span></elena-badge>'
    );
    expect(html).toContain('<label for="search">Search</label>');
  });
});

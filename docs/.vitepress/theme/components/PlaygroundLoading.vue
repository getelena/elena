<script setup>
// Lightweight loading shell for the Playground page. Bundled synchronously with
// the theme so it renders immediately while the real Playground chunk downloads.
// Shows the playground layout skeleton with a pre-rendered hello-world preview.

const staticSrcdoc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<style>body{font-family:system-ui,-apple-system,sans-serif;margin:1rem;color:#1a1a1a;}</style>
</head>
<body>
<my-greeting name="Elena"><p>Hello, Elena!</p></my-greeting>
</body>
</html>`;
</script>

<template>
  <div class="pg-layout">
    <aside class="pg-sidebar pg-sidebar-loading">
      <nav class="pg-sidebar-nav"></nav>
    </aside>
    <div class="pg-editor pg-editor-loading">
      <div class="pg-editor-tabs">
        <button class="pg-editor-tab active">JS</button>
        <button class="pg-editor-tab">HTML</button>
      </div>
      <div class="pg-editor-container"></div>
    </div>
    <div class="pg-preview">
      <div class="pg-preview-header">
        <span class="pg-preview-title">Preview</span>
      </div>
      <iframe
        class="pg-preview-iframe pg-preview-ready"
        :srcdoc="staticSrcdoc"
        sandbox="allow-scripts allow-same-origin"
        title="Component preview"
      ></iframe>
    </div>
  </div>
</template>

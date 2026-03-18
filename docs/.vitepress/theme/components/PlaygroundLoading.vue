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
      <div class="pg-preview-iframe"></div>
    </div>
  </div>
</template>

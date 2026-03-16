<script setup>
const props = defineProps({
  examples: { type: Array, required: true },
  currentId: { type: String, default: "" },
  open: { type: Boolean, default: false },
});

const emit = defineEmits(["select", "toggle"]);
</script>

<template>
  <aside class="pg-sidebar" :class="{ open }">
    <button class="pg-sidebar-toggle" @click="emit('toggle')" aria-label="Toggle examples">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M2 4h12M2 8h12M2 12h12"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </button>
    <nav class="pg-sidebar-nav">
      <div v-for="category in examples" :key="category.category" class="pg-sidebar-group">
        <p class="pg-sidebar-heading">{{ category.category }}</p>
        <div class="pg-sidebar-items">
          <div
            v-for="item in category.items"
            :key="item.id"
            class="pg-sidebar-item"
            :class="{ 'is-active': currentId === item.id }"
          >
            <div class="item">
              <div class="indicator"></div>
              <a
                class="link"
                :href="'#' + item.id"
                @click.prevent="emit('select', item.id); emit('toggle')"
              >
                <p class="text">{{ item.title }}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
const props = defineProps({
  examples: { type: Array, required: true },
  currentId: { type: String, default: "" },
  open: { type: Boolean, default: false },
});

const emit = defineEmits(["select", "toggle"]);
</script>

<template>
  <div class="pg-sidebar-backdrop" :class="{ open }" @click="emit('toggle')"></div>
  <aside class="pg-sidebar" :class="{ open }">
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
              <a class="link" :href="'#' + item.id" @click.prevent="emit('select', item.id)">
                <p class="text">{{ item.title }}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>

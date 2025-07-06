<script setup lang="ts">
import { defineProps } from 'vue'
import type { Item } from '../mock-data'

defineProps<{
  item: Item
}>()
</script>

<template>
  <ul class="sidebar-item-root">
    <li>{{ item.text }}</li>

    <li v-if="item.children?.length > 0">
      <SidebarItem v-for="item in item.children" :key="item.key" :item="item" />
    </li>
  </ul>
</template>

<style scoped>
.sidebar-item-root {
  color: #FFF;
  list-style: none;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #000;
  cursor: pointer;
}
</style>

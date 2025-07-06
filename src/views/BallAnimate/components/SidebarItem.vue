<script setup lang="ts">
import { computed, defineProps, inject } from 'vue'
import type { Item } from '../mock-data'
import type { InjectedCurrentSelected } from './CompHeader.vue'

const props = defineProps<{
  item: Item
  depth: number
}>()

const { currentSelectedList, handleSelect } = inject('currentSelected') as InjectedCurrentSelected
const currentDepthItem = computed(() => currentSelectedList.value?.[props.depth] ?? null)
const isSelecting = computed(() => currentDepthItem.value && currentDepthItem.value.key === props.item.key)
const isLast = computed(() => !props.item.children || props.item.children.length === 0)
</script>

<template>
  <ul class="sidebar-item-root" :class="{ 'is-selecting': isSelecting }">
    <li @click="handleSelect({ key: item.key, text: item.text, depth: props.depth, isLast })">
      {{ item.text }}
    </li>

    <li v-show="item.children?.length > 0 && isSelecting">
      <SidebarItem
        v-for="item in item.children"
        :key="item.key"
        :item="item"
        :depth="depth + 1"
      />
    </li>
  </ul>
</template>

<style scoped>
.sidebar-item-root {
  color: #FFF;
  list-style: none;
  border-radius: 10px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 10px;
}

.is-selecting {
  background-color: #B2BEC3;
  color: #FFEAA7;
}
</style>

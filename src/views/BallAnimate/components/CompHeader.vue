<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref, useTemplateRef, provide, readonly, type Ref } from 'vue'
import mockData from '../mock-data'
import SidebarItem from './SidebarItem.vue'

const elemHamburger = useTemplateRef('elemHamburger')
const elemSidebar = useTemplateRef('elemSidebar')

const isSidebarOpen = ref(false)

onClickOutside(elemSidebar,
  () => {
    isSidebarOpen.value = false
  },
  {
    ignore: [elemHamburger]
  }
)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
  if (isSidebarOpen.value) {
    currentSelectedList.value = null
    currentSelectedItem.value = null
  }
}

const currentSelectedList = ref<Array<{ key: string, text: string }> | null>(null)
const currentSelectedItem = ref<{ key: string, text: string } | null>(null)

function handleSelect(payload: { key: string, text: string, depth: number, isLast?: boolean }) {
  const { key, text, depth, isLast = false } = payload

  // 若為最後一層則更新目標 item
  if (isLast) {
    currentSelectedItem.value = { key, text }
  } else {
    currentSelectedItem.value = null
  }

  if (currentSelectedList.value === null)
    currentSelectedList.value = []

  const currentDepth = currentSelectedList.value[depth]

  // 當前深度為空表示直接展開
  if (currentDepth === undefined) {
    currentSelectedList.value.push({ key, text })
    return
  }

  // 當前深度有值且選中相同項目則收起當前深度以下的所有項目
  if (currentDepth.key === key && !isLast) {
    currentSelectedList.value.splice(depth)
    return
  }

  // 當前深度有值且選中不同項目則更新
  currentSelectedList.value[depth] = { key, text }
}

provide('currentSelected', {
  currentSelectedList: readonly(currentSelectedList),
  currentSelectedItem: readonly(currentSelectedItem),
  handleSelect
})

export interface InjectedCurrentSelected {
  currentSelectedList: Readonly<Ref<Array<{ key: string, text: string }> | null>>
  currentSelectedItem: Readonly<Ref<{ key: string, text: string } | null>>
  handleSelect: (payload: { key: string, text: string, depth: number, isLast?: boolean }) => void
}
</script>

<template>
  <div class="comp-header-root">
    <button ref="elemHamburger" class="hamburger" @click="toggleSidebar">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </button>
    <div ref="elemSidebar" class="sidebar" :class="{ 'open': isSidebarOpen }">
      <SidebarItem v-for="item in mockData" :key="item.key" :item="item" :depth="0" />
    </div>
  </div>
</template>

<style scoped>
/* root */
.comp-header-root {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

/* hamburger */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 30px;
  padding: 5px;
  margin-left: auto;
  background-color: #DFE6E9;
  border-radius: 5px;
  border: 1px solid #000;
}

.hamburger .line {
  width: 100%;
  height: 2px;
  background-color: #000;
}

/* sidebar */
.sidebar {
  width: 50dvw;
  height: 100dvh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  padding: 10px;
  overflow-y: auto;
  transform: translateX(100%);
  transition: transform 0.15s ease-in-out;
  background-color: rgba(0, 0, 0, 0.9);
  color: #FFF;
}

.sidebar.open {
  transform: translateX(0);
}
</style>

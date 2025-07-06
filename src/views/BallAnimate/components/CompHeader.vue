<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref, useTemplateRef } from 'vue'
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
      <SidebarItem v-for="item in mockData" :key="item.key" :item="item" />
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

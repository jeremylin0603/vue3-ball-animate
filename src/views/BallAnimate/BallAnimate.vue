<script setup lang="ts">
import CompHeader from './components/CompHeader.vue'
import CompBody from './components/CompBody.vue'
</script>

<template>
  <div class="ball-animate-root">
    <CompHeader />
    <div class="ball-animate-body">
      <CompBody />
    </div>
  </div>
</template>

<style scoped>
.ball-animate-root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ball-animate-body {
  flex: 1;
}
</style>

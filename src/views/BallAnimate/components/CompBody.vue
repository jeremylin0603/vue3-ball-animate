<script setup lang="ts">
</script>

<template>
  <div class="comp-body-root">
    <div class="box-wrapper">
      <div v-for="i in 9" :key="i" class="box">
      </div>
    </div>
  </div>
</template>

<style scoped>
/* root */
.comp-body-root {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(223, 230, 233);
}

/* box */
.box-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 100px);
  width: 100%;
  gap: 10px;
  padding: 10px;
}

.box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border: black solid 2px;
}

.box::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(113, 81, 95, 1), 81%, rgba(0, 0, 0, 1) 100%);
  opacity: 1;
}

.box:nth-child(3)::before,
.box:nth-child(5)::before,
.box:nth-child(9)::before {
  animation: bg-flash .5s infinite alternate;
}

@keyframes bg-flash {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

/* ball */
.box:nth-child(1)::after,
.box:nth-child(3)::after,
.box:nth-child(7)::after,
.box:nth-child(9)::after {
  content: '';
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #A5F12B;
  border-radius: 100%;
  animation: ball-move 10s infinite;
  z-index: 1;
}

@keyframes ball-move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100dvw);
  }
}
</style>

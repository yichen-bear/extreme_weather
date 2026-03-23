<template>
  <BackgroundCanvas />

  <main id="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>

  <StatTicker />
</template>

<script setup>
import BackgroundCanvas from './components/BgCanvas.vue'
import StatTicker from './components/StatTicker.vue'
</script>

<style>
:root {
  --c-bg: #060c14;
  --c-deep: #0a1520;
  --c-surface: #0f1f2e;
  --c-accent: #00e5ff;
  --c-warn: #ff6b35;
  --c-text: #c8dce8;
  --c-muted: #627d91;
  --font-disp: 'Bebas Neue', sans-serif;
  --font-body: 'DM Sans', sans-serif;
}

body {
  background: var(--c-bg);
  color: var(--c-text);
  font-family: var(--font-body);
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

#app {
  position: relative;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: scale(0.98);
}
.fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
}
</style>

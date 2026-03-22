<template>
  <div class="page-container game-view">
    <div class="game-ui">
      <div class="altitude">高度: {{ altitude }}m</div>
      <div class="temp-danger">危險等級: {{ dangerLevel }}</div>
    </div>

    <div class="game-canvas-area">
      <div class="player-mock">▲</div>
      <div class="water-level"></div>
      <div class="game-msg">
        <h3>Climate Ascent</h3>
        <p>按下 SPACE 開始攀登</p>
        <router-link to="/" class="btn-text">放棄任務</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const altitude = ref(0);
const dangerLevel = ref('低');
</script>

<style scoped>
.game-view { text-align: center; }
.game-ui { display: flex; justify-content: space-around; margin-bottom: 20px; font-family: monospace; color: var(--c-accent); }

.game-canvas-area {
  width: 100%; max-width: 500px; height: 60vh;
  margin: 0 auto; background: #050a0f;
  border: 2px solid var(--c-warn);
  position: relative; display: flex; align-items: center; justify-content: center;
}

.player-mock { font-size: 40px; color: #fff; position: absolute; bottom: 20%; }

.water-level {
  position: absolute; bottom: 0; width: 100%; height: 15%;
  background: rgba(0, 229, 255, 0.3);
  box-shadow: 0 0 20px var(--c-accent);
}

.game-msg h3 { font-family: var(--font-disp); font-size: 36px; color: var(--c-warn); }
.btn-text { color: var(--c-muted); text-decoration: none; font-size: 12px; margin-top: 10px; display: block; }
</style>
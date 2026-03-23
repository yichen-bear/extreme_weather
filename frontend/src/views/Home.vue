<template>
  <BackgroundCanvas />

  <main id="app">
    <transition name="fade" mode="out-in">
      <div v-if="currentPage === 'home'" key="home" class="hero">
        <div class="sdg-badge">
          <span class="sdg-dot"></span>
          SDG 13 · Climate Action
        </div>

        <h1 class="title">Climate <span>Ascent</span></h1>
        <p class="subtitle">
          探索極端氣候數據，化身氣候時代的攀登者——<br />
          用互動遊戲理解地球的警訊
        </p>

        <div class="divider">
          <span class="divider-text">選擇入口</span>
        </div>

        <div class="cta-group">
          <button class="cta-btn dashboard" @click="currentPage = 'dashboard'">
            <div class="btn-icon">◉</div>
            <div class="btn-label">Explore</div>
            <div class="btn-title">Dashboard</div>
            <span class="btn-arrow">←</span>
            <div class="btn-desc">
              極端氣候事件<br />
              互動資料儀表板
            </div>
          </button>

          <button class="cta-btn game" @click="currentPage = 'game'">
            <div class="btn-icon">▲</div>
            <div class="btn-label">Play</div>
            <div class="btn-title">Ascent</div>
            <div class="btn-desc">
              垂直跳躍闖關<br />
              穿越氣候時代
            </div>
            <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>

      <div v-else key="content" class="hero">
        <div class="sdg-badge">
          <span class="sdg-dot"></span>
          {{ currentPage.toUpperCase() }}
        </div>
        <h1 class="title" style="font-size: 80px">
          {{ currentPage === 'game' ? 'Ascent' : 'Dashboard' }}
        </h1>
        <p class="subtitle">此頁面內容正在建置中，敬請期待...</p>
        <button
          class="cta-btn"
          @click="currentPage = 'home'"
          style="width: 160px; margin-top: 30px; padding: 20px"
        >
          <div class="btn-title" style="font-size: 20px">← Back</div>
        </button>
      </div>
    </transition>
  </main>

  <StatTicker />
</template>

<script setup>
import { ref } from 'vue'
import BackgroundCanvas from '../components/BgCanvas.vue'
import StatTicker from '../components/StatTicker.vue'

// 控制目前的頁面狀態
const currentPage = ref('home')
</script>

<style>
:root {
  --c-bg: #060c14;
  --c-accent: #00e5ff;
  --c-warn: #ff6b35;
  --c-text: #c8dce8;
  --c-muted: #627d91;
  --font-disp: 'Bebas Neue', sans-serif;
  --font-body: 'DM Sans', sans-serif;
}

body {
  background: var(--c-bg);
  margin: 0;
  overflow: hidden;
}

#app {
  position: relative;
  z-index: 1;
  width: 100vw;
  height: 100vh;
}

.hero {
  text-align: center;
  max-width: 900px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 85vh;
}

/* ─── 標籤與標題 ─── */
.sdg-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(0, 229, 255, 0.08);
  border: 1px solid rgba(0, 229, 255, 0.2);
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: var(--c-accent);
  margin-bottom: 16px;
}

.sdg-dot {
  width: 6px;
  height: 6px;
  background: var(--c-accent);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--c-accent);
}

.title {
  font-family: var(--font-disp);
  font-size: clamp(80px, 12vw, 140px);
  line-height: 0.9;
  margin: 0 auto 30px;
}

.title span {
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
}

.subtitle {
  font-size: 16px;
  line-height: 1.6;
  color: var(--c-muted);
  font-weight: 300;
  max-width: 500px;
  letter-spacing: 0.05em;
  margin: 0 auto 30px;
}

/* ─── 分隔線 ─── */
.divider {
  position: relative;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  margin-bottom: 30px;
}

.divider-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--c-bg);
  padding: 0 15px;
  font-size: 10px;
  color: var(--c-muted);
  text-transform: uppercase;
  letter-spacing: 0.3em;
}

/* ─── 按鈕群組 ─── */
.cta-group {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.cta-btn {
  position: relative;
  width: 220px;
  padding: 20px;
  background: var(--c-surface);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.cta-btn:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.cta-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 100%;
  background: var(--btn-color, var(--c-accent));
  transform: scaleY(0);
  transition: transform 0.4s ease;
}

.cta-btn:hover::before {
  transform: scaleY(1);
}

.cta-btn.dashboard {
  --btn-color: var(--c-accent);
  text-align: right;
}

.cta-btn.dashboard::before {
  left: auto;
  right: 0;
}

.cta-btn.dashboard .btn-arrow {
  right: auto;
  left: 30px;
}

.cta-btn.dashboard:hover .btn-arrow {
  transform: translateX(-5px);
}

/* 按鈕內部細節 */
.btn-icon {
  font-size: 18px;
  margin-bottom: 12px;
  color: var(--btn-color, var(--c-accent));
  opacity: 0.8;
}
.btn-label {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--c-muted);
  margin-bottom: 4px;
}
.btn-title {
  font-family: var(--font-disp);
  font-size: 26px;
  color: #fff;
  margin-bottom: 8px;
}
.btn-desc {
  font-size: 12px;
  color: var(--c-muted);
  line-height: 1.6;
}
.btn-arrow {
  position: absolute;
  bottom: 30px;
  right: 30px;
  font-size: 18px;
  color: var(--c-muted);
  transition: transform 0.3s ease;
}
.cta-btn:hover .btn-arrow {
  transform: translateX(5px);
  color: #fff;
}

/* 儀表板與遊戲按鈕色調區分 */
.cta-btn.dashboard {
  --btn-color: var(--c-accent);
}
.cta-btn.game {
  --btn-color: var(--c-warn);
}

/* ─── 頁面切換動畫 ─── */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
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

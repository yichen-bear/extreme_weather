<template>
  <div class="game-overlay">

    <div class="game-menu-container">
      <!-- Header -->
      <header class="game-header">
        <h1 class="game-title">
          <span class="title-climate">CLIMATE</span>
          <span class="title-ascent">ASCENT</span>
        </h1>
        <p class="game-subtitle">登峰危機：在氣候變遷的洪流中向上攀登</p>
        <div class="title-underline"></div>
      </header>

      
      <!-- Central Start Button -->
      <div class="center-col">
        <button class="start-btn" @click="startGame">
          <div class="orbit orbit-1"></div>
          <div class="orbit orbit-2"></div>
          <div class="start-core">
            <div class="start-icon">▲</div>
            <span class="play-text">START</span>
            <span class="play-sub">開始攀登</span>
          </div>
          <div class="start-ring"></div>
        </button>
      </div>

      <!-- Menu Grid -->
      <div class="menu-grid">
        <!-- World Map card -->
        <button
          class="menu-card"
          @click="currentSubView = 'map'"
          :class="{ active: currentSubView === 'map' }"
        >
          <div class="card-glow map-glow"></div>
          <div class="card-inner">
            <div class="card-icon-wrap">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path
                  d="M6 9l8-3 8 3 8-3v21l-8 3-8-3-8 3V9z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  fill="none"
                />
                <path d="M14 6v21M22 9v21" stroke="currentColor" stroke-width="1" opacity="0.5" />
              </svg>
            </div>
            <div class="card-text">
              <span class="card-eyebrow">EXPLORATION</span>
              <h2 class="card-heading">世界地圖</h2>
              <p class="card-desc">探索全球極端氣候熱點</p>
            </div>
          </div>
        </button>

        <!-- Rules card -->
        <button
          class="menu-card rules-card"
          @click="currentSubView = 'rules'"
          :class="{ active: currentSubView === 'rules' }"
        >
          <div class="card-glow rules-glow"></div>
          <div class="card-inner rules-inner">
            <div class="card-icon-wrap">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect
                  x="8"
                  y="5"
                  width="20"
                  height="26"
                  rx="2"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <line x1="12" y1="12" x2="24" y2="12" stroke="currentColor" stroke-width="1.2" />
                <line x1="12" y1="17" x2="24" y2="17" stroke="currentColor" stroke-width="1.2" />
                <line x1="12" y1="22" x2="19" y2="22" stroke="currentColor" stroke-width="1.2" />
              </svg>
            </div>
            <div class="card-text">
              <span class="card-eyebrow">MECHANICS</span>
              <h2 class="card-heading">生存規則</h2>
              <p class="card-desc">掌握極端天氣求生法則</p>
            </div>
          </div>
        </button>
      </div>

      <!-- Leaderboard -->
      <footer class="leaderboard-section">
        <div class="lb-header">
          <div class="lb-line"></div>
          <div class="lb-title">
            <span class="trophy">🏆</span>
            TOP CLIMBERS
          </div>
          <div class="lb-line"></div>
        </div>

        <div class="lb-grid">
          <div v-for="(entry, i) in mockLeaderboard" :key="i" class="lb-row">
            <span class="lb-rank" :class="'rank-' + (i + 1)">{{
              i === 0 ? '①' : i === 1 ? '②' : '③'
            }}</span>
            <span class="lb-name">{{ entry.name }}</span>
            <div class="lb-bar-wrap">
              <div class="lb-bar" :style="{ width: entry.pct + '%' }"></div>
            </div>
            <span class="lb-score">{{ entry.score }}</span>
          </div>
          <div class="lb-row loading-row">
            <span class="lb-dots"> <span></span><span></span><span></span> </span>
            <span class="lb-loading-text">排行榜資料連線中</span>
          </div>
        </div>
      </footer>
    </div>

    <!-- Sub-view modal -->
    <Transition name="modal">
      <div v-if="currentSubView" class="sub-modal" @click.self="currentSubView = null">
        <div class="sub-modal-box">
          <button class="modal-close" @click="currentSubView = null">✕ CLOSE</button>
          <p style="color: var(--c-muted); margin-top: 40px">
            {{ currentSubView === 'map' ? '🗺️ 世界地圖即將開放' : '📜 規則說明即將載入' }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentSubView = ref(null)

const mockLeaderboard = [
  { name: 'APEX_CLIMBER', score: '98,420', pct: 100 },
  { name: 'STORMRIDER_77', score: '84,110', pct: 85 },
  { name: 'ECO_PHOENIX', score: '71,880', pct: 73 },
]

const startGame = () => {
  alert('遊戲啟動中... 準備進入垂直攀登場景！')
}
</script>

<style scoped>
/* ===== CSS VARIABLES ===== */
.game-overlay {
  --c-bg: #080c10;
  --c-surface: rgba(255, 255, 255, 0.03);
  --c-border: rgba(255, 255, 255, 0.07);
  --c-accent: #00e5ff;
  --c-warn: #ff5722;
  --c-green: #00ff88;
  --c-muted: rgba(255, 255, 255, 0.38);
  --font-disp: 'Bebas Neue', 'Impact', sans-serif;
  --font-body: 'DM Sans', 'Segoe UI', sans-serif;

  position: fixed;
  inset: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  overflow-y: auto;
  font-family: var(--font-body);
  color: #fff;
  animation: fadeIn 1s ease-out;
  padding-top: 50px;
}

/* ===== HEADER ===== */
.game-header {
  margin-bottom: 30px;
}
.back-btn {
  position: absolute;
  top: 32px;
  left: 36px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--c-muted);
  text-decoration: none;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 9px 18px;
  border-radius: 3px;
  transition: all 0.3s;
  backdrop-filter: blur(4px);
  z-index: 100;
}
.back-btn:hover {
  color: var(--c-accent);
  border-color: var(--c-accent);
}
.back-arrow {
  font-size: 14px;
}

/* ===== MAIN CONTAINER ===== */
.game-menu-container {
  width: 100%;
  max-width: 1100px;
  margin: auto;
  padding: 0 40px;
  text-align: center;
  position: relative;
  z-index: 2;
}

/* ===== HEADER ===== */
.game-header {
  margin-bottom: 52px;
}

.game-title {
  padding-top: 30px;
  font-family: var(--font-disp);
  font-size: clamp(48px, 8vw, 90px);
  margin: 0;
  line-height: 0.85;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title-climate {
  font-size: 100px;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 12px;
  margin-bottom: 10px;
}
.title-ascent {
  font-size: 100px;
  color: var(--c-warn);
  letter-spacing: 8px;
  text-shadow:
    0 0 60px rgba(255, 87, 34, 0.4),
    0 0 120px rgba(255, 87, 34, 0.2);
}

.game-subtitle {
  margin-top: 14px;
  font-size: 13px;
  color: var(--c-muted);
  letter-spacing: 3px;
}
.title-underline {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--c-accent), transparent);
  margin: 16px auto 0;
}

/* ===== MENU GRID ===== */
.menu-grid {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  grid-template-columns: minmax(150px, 1fr) auto minmax(150px, 1fr);
  gap: 20px;
  margin: 40px auto;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

/* ===== MENU CARDS ===== */
.menu-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background: var(--c-surface);
  border: 1px solid rgba(255, 255, 255, 0.534);
  border-radius: 8px;
  padding: 15px 12px;
  cursor: pointer;
  text-align: center;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  width: 100%;
  max-width: 320px;
  min-width: 120px;
  min-height: 100px;
  justify-self: center;
  flex: 1;
}
.menu-card:hover,
.menu-card.active {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-6px);
  border-color: rgba(0, 229, 255, 0.3);
}
.card-glow {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
}
.menu-card:hover .card-glow {
  opacity: 1;
}
.map-glow {
  background: radial-gradient(circle at 20% 50%, rgba(0, 229, 255, 0.08), transparent 70%);
}
.rules-glow {
  background: radial-gradient(circle at 80% 50%, rgba(0, 255, 136, 0.08), transparent 70%);
}

.card-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
}
.rules-inner {
  flex-direction: column;
}

.card-icon-wrap {
  flex-shrink: 0;
  color: var(--c-accent);
  opacity: 0.8;
}
.rules-card .card-icon-wrap {
  color: var(--c-green);
}
.card-text {
  color: rgb(230, 229, 229);
  text-align: center;
}
.card-eyebrow {
  font-size: 9px;
  letter-spacing: 3px;
  color: var(--c-muted);
  display: block;
  margin-bottom: 5px;
}
.card-heading {
  font-size: 22px;
  font-weight: 500;
  margin: 0 0 4px;
}
.card-desc {
  font-size: 12px;
  color: var(--c-muted);
  margin: 0;
}
.card-tag {
  position: absolute;
  bottom: 14px;
  right: 18px;
  font-size: 16px;
  color: var(--c-muted);
  transition:
    transform 0.3s,
    color 0.3s;
}
.menu-card:hover .card-tag {
  transform: translateX(4px);
  color: var(--c-accent);
}
.rules-card .card-tag {
  right: auto;
  left: 18px;
}
.rules-card:hover .card-tag {
  transform: translateX(-4px);
  color: var(--c-green);
}

/* ===== CENTER START BUTTON ===== */
.center-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.start-btn {
  position: relative;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ff7043, #e64a19, #bf360c);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow:
    0 0 0 1px rgba(255, 87, 34, 0.3),
    0 0 40px rgba(255, 87, 34, 0.3),
    0 20px 60px rgba(0, 0, 0, 0.6);
}
.start-btn:hover {
  transform: scale(1.08);
  box-shadow:
    0 0 0 1px rgba(255, 87, 34, 0.6),
    0 0 80px rgba(255, 87, 34, 0.5),
    0 30px 80px rgba(0, 0, 0, 0.6);
}

.orbit {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  animation: spin linear infinite;
}
.orbit-1 {
  width: 110%;
  height: 110%;
  animation-duration: 8s;
  border-style: dashed;
}
.orbit-2 {
  width: 125%;
  height: 125%;
  animation-duration: 14s;
  animation-direction: reverse;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.start-core {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}
.start-icon {
  font-size: 28px;
  margin-bottom: 4px;
  animation: bounce 2s ease-in-out infinite;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

.play-text {
  font-family: var(--font-disp);
  font-size: 42px;
  letter-spacing: 4px;
  color: #fff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
}
.play-sub {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 2px;
}
.start-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
}
.start-hint {
  font-size: 9px;
  letter-spacing: 4px;
  color: var(--c-muted);
  text-transform: uppercase;
}

/* ===== LEADERBOARD ===== */
.leaderboard-section {
  margin-top: 56px;
}
.lb-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
}
.lb-line {
  flex: 1;
  height: 1px;
  background: var(--c-border);
}
.lb-title {
  font-size: 11px;
  letter-spacing: 3px;
  color: var(--c-muted);
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}
.trophy {
  font-size: 14px;
}

.lb-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.lb-row {
  display: grid;
  grid-template-columns: 36px 1fr 160px 80px;
  align-items: center;
  gap: 14px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 6px;
  padding: 12px 18px;
  transition: background 0.3s;
}
.lb-row:hover {
  background: rgba(255, 255, 255, 0.05);
}

.lb-rank {
  font-family: var(--font-disp);
  font-size: 20px;
  text-align: center;
}
.rank-1 {
  color: #ffd700;
}
.rank-2 {
  color: #c0c0c0;
}
.rank-3 {
  color: #cd7f32;
}

.lb-name {
  font-size: 13px;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.8);
}

.lb-bar-wrap {
  height: 3px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 2px;
  overflow: hidden;
}
.lb-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--c-accent), var(--c-green));
  border-radius: 2px;
}

.lb-score {
  font-size: 13px;
  color: var(--c-accent);
  text-align: right;
  font-variant-numeric: tabular-nums;
}

/* Loading row */
.loading-row {
  grid-template-columns: auto 1fr;
  opacity: 0.5;
}
.lb-dots {
  display: flex;
  gap: 5px;
}
.lb-dots span {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--c-muted);
  animation: dotBlink 1.4s infinite;
}
.lb-dots span:nth-child(2) {
  animation-delay: 0.2s;
}
.lb-dots span:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes dotBlink {
  0%,
  80%,
  100% {
    opacity: 0.2;
  }
  40% {
    opacity: 1;
  }
}
.lb-loading-text {
  font-size: 12px;
  color: var(--c-muted);
  letter-spacing: 1px;
}

/* ===== SUB MODAL ===== */
.sub-modal {
  position: fixed;
  inset: 0;
  background: rgba(8, 12, 16, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.sub-modal-box {
  background: #0d1117;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 40px 60px;
  min-width: 360px;
  min-height: 200px;
  position: relative;
  text-align: center;
}
.modal-close {
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: 1px solid var(--c-border);
  color: var(--c-muted);
  font-size: 11px;
  padding: 6px 14px;
  border-radius: 3px;
  cursor: pointer;
  letter-spacing: 2px;
  transition: all 0.2s;
}
.modal-close:hover {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.3);
}

/* ===== TRANSITIONS ===== */
.modal-enter-active,
.modal-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.97);
}

/* ===== GLOBAL ANIMS ===== */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 850px) {
  .menu-grid {
    grid-template-columns: 1fr; /* 改為單欄排列 */
    justify-items: center;
    gap: 10px;
  }

  .start-btn-wrapper {
    order: -1; /* 將開始按鈕移到最上方 */
  }

  .start-btn {
    width: 160px;
    height: 160px;
  }

  .card-heading {
    font-size: 16px;
  }

  .menu-card {
    width: 100%;
    max-width: 400px;
    justify-content: center;
    text-align: center !important;
    flex-direction: column !important; /* 手機版圖示在文字上方 */
  }

  .game-title { font-size: 60px; }
  
  .back-link {
    top: 15px;
    left: 15px;
    font-size: 11px;
  }

  .play-text {
    font-size: 35px;
  }
}
</style>

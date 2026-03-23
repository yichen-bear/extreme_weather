<template>
  <div class="game-overlay">
    <button class="back-to-portal" @click="$emit('back')">
      <span class="arrow">←</span> EXIT PORTAL
    </button>

    <div class="game-menu-container">
      <header class="game-header">
        <div class="game-badge">MISSION: SURVIVAL</div>
        <h1 class="game-title">CLIMATE <span>ASCENT</span></h1>
        <p class="game-subtitle">垂直極限：在氣候變遷的洪流中向上攀登</p>
      </header>

      <div class="menu-grid">
        <button class="menu-card map" @click="currentSubView = 'map'">
          <div class="card-icon">🗺️</div>
          <div class="card-content">
            <span class="card-label">Exploration</span>
            <h2 class="card-title">世界地圖</h2>
          </div>
        </button>

        <button class="start-btn" @click="startGame">
          <div class="btn-glow"></div>
          <span class="play-text">START ASCENT</span>
          <span class="sub-text">開始攀登</span>
        </button>

        <button class="menu-card rules" @click="currentSubView = 'rules'">
          <div class="card-icon">📜</div>
          <div class="card-content">
            <span class="card-label">Mechanics</span>
            <h2 class="card-title">生存規則</h2>
          </div>
        </button>
      </div>

      <footer class="leaderboard-section">
        <div class="section-header">
          <span class="line"></span>
          <span class="section-title">🏆 TOP CLIMBERS</span>
          <span class="line"></span>
        </div>
        
        <div class="leaderboard-placeholder">
          <div class="placeholder-content">
            <i class="icon-trophy"></i>
            <p>排行榜數據連線中...</p>
            <div class="loading-bar"></div>
          </div>
        </div>
      </footer>
    </div>

    <div v-if="currentSubView" class="sub-view-modal">
       <button @click="currentSubView = null">CLOSE [X]</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentSubView = ref(null)

const startGame = () => {
  alert('遊戲啟動中... 準備進入垂直攀登場景！')
}
</script>

<style scoped>
/* 延續你的變數定義 */
.game-overlay {
  position: absolute;
  inset: 0;
  background: var(--c-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  animation: fadeIn 0.8s ease-out;
}

.back-to-portal {
  position: absolute;
  top: 40px;
  left: 40px;
  background: transparent;
  border: 1px solid var(--c-muted);
  color: var(--c-muted);
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}
.back-to-portal:hover {
  color: #fff;
  border-color: #fff;
}

.game-menu-container {
  width: 100%;
  max-width: 1100px;
  text-align: center;
}

/* 標題區樣式 */
.game-badge {
  color: var(--c-accent);
  letter-spacing: 4px;
  font-size: 14px;
  margin-bottom: 10px;
}
.game-title {
  font-family: var(--font-disp);
  font-size: 100px;
  margin: 0;
  line-height: 0.9;
}
.game-title span {
  color: var(--c-warn);
}
.game-subtitle {
  color: var(--c-muted);
  margin-top: 15px;
  letter-spacing: 2px;
}

/* 選單佈局 (左地圖 / 中開始 / 右規則) */
.menu-grid {
  display: grid;
  grid-template-columns: 1fr 320px 1fr;
  gap: 30px;
  margin-top: 60px;
  align-items: center;
}

.menu-card {
  background: var(--c-surface);
  border: 1px solid rgba(255,255,255,0.05);
  padding: 30px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: 0.4s;
}
.menu-card:hover {
  background: rgba(255,255,255,0.05);
  transform: translateY(-5px);
  border-color: var(--c-accent);
}

/* 地圖靠左，文字靠右；規則靠右，文字靠左 (對稱設計) */
.menu-card.map { text-align: right; flex-direction: row; }
.menu-card.rules { text-align: left; flex-direction: row-reverse; }

.card-icon { font-size: 40px; }
.card-label { font-size: 10px; color: var(--c-muted); text-transform: uppercase; }
.card-title { font-size: 24px; margin: 5px 0 0; color: #fff; }

/* 開始攀登大按鈕 */
.start-btn {
  position: relative;
  height: 320px;
  width: 320px;
  border-radius: 50%;
  background: var(--c-warn);
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: 0.5s;
}
.start-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 50px rgba(255, 107, 53, 0.4);
}
.play-text {
  font-family: var(--font-disp);
  font-size: 38px;
  color: #fff;
  z-index: 2;
}
.sub-text {
  font-size: 14px;
  color: rgba(255,255,255,0.8);
  margin-top: 5px;
  z-index: 2;
}
.btn-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  animation: pulse 2s infinite;
}

/* 排行榜預留區 */
.leaderboard-section {
  margin-top: 80px;
}
.section-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}
.line { flex: 1; height: 1px; background: rgba(255,255,255,0.1); }
.section-title { color: var(--c-muted); font-size: 12px; letter-spacing: 2px; }

.leaderboard-placeholder {
  height: 120px;
  background: rgba(255,255,255,0.02);
  border: 1px dashed rgba(255,255,255,0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-muted);
}

.loading-bar {
  width: 100px;
  height: 2px;
  background: var(--c-surface);
  margin-top: 10px;
  position: relative;
  overflow: hidden;
}
.loading-bar::after {
  content: '';
  position: absolute;
  width: 30%;
  height: 100%;
  background: var(--c-accent);
  animation: loading 1.5s infinite linear;
}

/* 動畫效果 */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes pulse {
  0% { opacity: 0.5; transform: scale(0.9); }
  50% { opacity: 0.8; transform: scale(1); }
  100% { opacity: 0.5; transform: scale(0.9); }
}
@keyframes loading {
  0% { left: -30%; }
  100% { left: 100%; }
}
</style>
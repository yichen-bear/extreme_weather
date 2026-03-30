<template>
  <div class="leaderboard-page">
    <div class="bg-deco deco-1"></div>
    <div class="bg-deco deco-2"></div>

    <div class="leaderboard-container">
      <header class="page-header">
        <div class="header-prefix">// SYSTEM_LOG // HIGH_SCORES</div>
        <h1 class="page-title">
          <span class="title-text">TOP CLIMBERS</span>
          <span class="title-glitch">TOP CLIMBERS</span>
        </h1>
        <p class="page-subtitle">全球極端氣候攀登者：當前積分排名</p>
        <div class="title-separator">
          <div class="separator-line"></div>
          <div class="separator-dot"></div>
          <div class="separator-line"></div>
        </div>
      </header>

      <div class="lb-list">
        <div 
          v-for="(entry, i) in mockLeaderboard" 
          :key="i" 
          class="lb-item"
          :class="'rank-card-' + (i + 1)"
          :style="{ '--delay': i }"
        >
          <div class="item-scan-line"></div>

          <div class="lb-rank-wrap">
            <span class="lb-rank-num" :class="'text-rank-' + (i + 1)">
              {{ i + 1 }}
            </span>
            <span class="lb-rank-suffix">{{ getOrdinal(i + 1) }}</span>
          </div>

          <div class="lb-player-info">
            <div class="lb-player-avatar-placeholder">
              {{ entry.name.substring(0, 2).toUpperCase() }}
            </div>
            <div class="lb-player-details">
              <span class="lb-name">{{ entry.name }}</span>
              <span class="lb-timestamp">
                <span class="time-label">COMPLETED //</span> {{ formatTimestamp(entry.timestamp) }}
              </span>
            </div>
          </div>

          <div class="lb-score-section">
            <div class="lb-score-wrap">
              <span class="lb-score">{{ entry.score }}</span>
              <span class="lb-pts">PTS</span>
            </div>
          </div>
          
        </div>
      </div>
      
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 延用資料結構，新增 timestamp (成績完成時間)
const mockLeaderboard = ref([
  { name: 'APEX_CLIMBER', score: '98,420', pct: 100, timestamp: '2024-05-20T14:32:05' },
  { name: 'STORMRIDER_77', score: '84,110', pct: 85, timestamp: '2024-05-19T09:15:22' },
  { name: 'ECO_PHOENIX', score: '71,880', pct: 73, timestamp: '2024-05-20T11:48:10' },
  { name: 'AURORA_WALKER', score: '65,200', pct: 66, timestamp: '2024-05-18T22:01:30' },
  { name: 'VOID_RUNNER', score: '59,800', pct: 60, timestamp: '2024-05-20T08:12:45' },
])

// 取得排名後綴的小工具 (1st, 2nd, 3rd, 4th...)
const getOrdinal = (n) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

// 格式化時間戳記為系統日誌風格 (YYYY-MM-DD // HH:MM:SS)
const formatTimestamp = (timestampString) => {
  const date = new Date(timestampString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} // ${hh}:${min}:${ss}`;
}
</script>

<style scoped>
/* ===== 全域變數與重置 ===== */
.leaderboard-page {
  --c-bg: #060c14; /* 延用 App.vue 的 --c-bg */
  --c-surface: rgba(15, 31, 46, 0.6);
  --c-accent: #00e5ff; /* 霓虹藍 */
  --c-warn: #ff6b35;   /* 霓虹橘 */
  --c-gold: #ffd700;
  --c-silver: #c0c0c0;
  --c-bronze: #cd7f32;
  --c-text: #c8dce8;
  --c-muted: #627d91;
  --font-disp: 'Bebas Neue', sans-serif;
  --font-body: 'DM Sans', sans-serif;

  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  color: var(--c-text);
  font-family: var(--font-body);
  overflow-y: auto; 
  overflow-x: hidden;
  margin-bottom: 100px;

  /* 核心修正：隱藏該容器本身的滾動條樣式，避免它出現在畫面中間 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* ===== 背景裝飾 ===== */
.bg-deco {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0.1;
  filter: blur(80px);
}
.deco-1 {
  width: 400px;
  height: 400px;
  background: var(--c-accent);
  top: -100px;
  left: -100px;
}
.deco-2 {
  width: 300px;
  height: 300px;
  background: var(--c-warn);
  bottom: -50px;
  right: -50px;
}

/* ===== 容器與布局 ===== */
.leaderboard-container {
  padding: 120px 40px 40px; /* 上方預留 Navbar 空間 */
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* ===== 標題區域美化 ===== */
.page-header {
  text-align: center;
  margin-bottom: 60px;
  animation: fadeInDown 0.8s ease-out;
}

.header-prefix {
  font-family: 'Courier New', monospace;
  color: var(--c-muted);
  font-size: 12px;
  letter-spacing: 2px;
}

.page-title {
  position: relative;
  font-family: var(--font-disp);
  font-size: clamp(40px, 6vw, 70px);
  margin: 10px 0;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #fff;
  display: inline-block;
}

/* Glitch效果 */
.title-glitch {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  color: var(--c-accent);
  background: var(--c-bg);
  overflow: hidden;
  clip: rect(0, 900px, 0, 0);
  animation: noise-anim 2s infinite linear alternate-reverse;
  opacity: 0.7;
}

.page-subtitle {
  font-size: 14px;
  color: var(--c-muted);
  letter-spacing: 3px;
  margin-top: 0;
}

.title-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 25px;
}
.separator-line {
  height: 1px;
  width: 100px;
  background: linear-gradient(90deg, transparent, var(--c-border, rgba(255,255,255,0.1)), transparent);
}
.separator-dot {
  width: 6px; height: 6px;
  background: var(--c-accent);
  transform: rotate(45deg);
  box-shadow: 0 0 10px var(--c-accent);
}

/* ===== 排行榜列表卡片美化 ===== */
.lb-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.lb-item {
  display: grid;
  grid-template-columns: 80px 1.8fr 2fr;
  align-items: center;
  background: var(--c-surface);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 15px 30px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  backdrop-filter: blur(5px);
  
  /* 入場動畫 */
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease-out forwards;
  animation-delay: calc(var(--delay) * 0.1s + 0.3s);
}

/* 滑動懸停效果 */
.lb-item:hover {
  transform: translateX(8px) scale(1.01);
  border-color: rgba(0, 229, 255, 0.3);
  box-shadow: -10px 0 30px rgba(0, 229, 255, 0.15);
  background: rgba(20, 40, 60, 0.8);
}

/* 前三名特殊卡片邊框 */
.rank-card-1 { border-left: 3px solid var(--c-gold); }
.rank-card-2 { border-left: 3px solid var(--c-silver); }
.rank-card-3 { border-left: 3px solid var(--c-bronze); }

/* 背景掃描線動畫 */
.item-scan-line {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 229, 255, 0.05), transparent);
  transform: translateY(-100%);
}
.lb-item:hover .item-scan-line {
  animation: scanLoop 1.5s linear infinite;
}

/* 1. 排名區域 */
.lb-rank-wrap {
  display: flex;
  align-items: baseline;
  font-family: var(--font-disp);
}
.lb-rank-num {
  font-size: 36px;
  line-height: 1;
}
.lb-rank-suffix {
  font-size: 12px;
  color: var(--c-muted);
  margin-left: 2px;
}
/* 前三名顏色 */
.text-rank-1 { color: var(--c-gold); text-shadow: 0 0 15px rgba(255, 215, 0, 0.5); }
.text-rank-2 { color: var(--c-silver); }
.text-rank-3 { color: var(--c-bronze); }

/* 2. 玩家資訊與完成時間區域 */
.lb-player-info {
  display: flex;
  align-items: center;
  gap: 15px;
}
.lb-player-avatar-placeholder {
  width: 45px; height: 45px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-disp);
  font-size: 18px; color: var(--c-muted);
  transition: all 0.3s ease;
}
.lb-item:hover .lb-player-avatar-placeholder {
  border-color: var(--c-accent);
  color: var(--c-accent);
  background: rgba(0, 229, 255, 0.05);
}

.lb-player-details {
  display: flex; flex-direction: column;
}
.lb-name {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  color: #fff;
}
/* 完成時間樣式 */
.lb-timestamp {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: var(--c-muted);
  margin-top: 3px;
  opacity: 0.8;
  display: flex;
  gap: 6px;
  align-items: center;
}
.time-label {
  color: var(--c-green, #00ff88);
  opacity: 0.8;
}

/* 3. 分數與進度條區域 */
.lb-score-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 0 0 30px;
}

.lb-bar-container {
  position: relative;
  height: 4px;
  width: 100%;
}
.lb-bar-bg {
  position: absolute; inset: 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
}
.lb-bar-fill {
  position: absolute; left: 0; top: 0; bottom: 0;
  background: linear-gradient(90deg, var(--c-warn), var(--c-accent));
  border-radius: 2px;
  position: relative;
}
.bar-glow {
  position: absolute; right: 0; top: 50%;
  width: 10px; height: 10px;
  background: var(--c-accent);
  border-radius: 50%;
  transform: translate(50%, -50%);
  filter: blur(3px);
  box-shadow: 0 0 10px var(--c-accent);
}

.lb-score-wrap {
  text-align: right;
  font-family: var(--font-disp);
  display: flex; align-items: baseline; justify-content: flex-end;
}
.lb-score {
  font-size: 26px;
  color: var(--c-accent);
  letter-spacing: 1px;
}
.lb-pts {
  font-size: 10px;
  color: var(--c-muted);
  margin-left: 4px;
}

/* Page Footer已被移除，相關CSS也已移除 */

/* ===== KEYFRAMES & ANIMATIONS ===== */
@keyframes fadeInUp {
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes scanLoop {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

/* Glitch Animation */
@keyframes noise-anim {
  0% { clip: rect(10px, 9999px, 50px, 0); }
  5% { clip: rect(30px, 9999px, 20px, 0); }
  20% { clip: rect(0, 9999px, 0, 0); } 
  100% { clip: rect(0, 9999px, 0, 0); }
}

/* ===== 響應式 RWD ===== */
@media (max-width: 768px) {
  .leaderboard-container { padding-top: 90px; }
  .lb-item {
    grid-template-columns: 50px 1fr;
    gap: 10px;
    padding: 15px 20px;
  }
  .lb-rank-num { font-size: 28px; }
  .lb-score-section {
    grid-column: 1 / -1;
    padding: 10px 0 0;
    margin-top: 10px;
    border-top: 1px solid rgba(255,255,255,0.05);
    flex-direction: row;
    justify-content: space-between; align-items: center;
  }
  .lb-bar-container { width: 55%; }
  .lb-score { font-size: 22px; }
}
</style>
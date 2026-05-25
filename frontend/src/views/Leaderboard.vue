<template>
  <div class="leaderboard-page">
    <div class="bg-deco deco-1"></div>
    <div class="bg-deco deco-2"></div>

    <div class="leaderboard-container">
      <header class="page-header">
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

      <div class="podium-section" v-if="topThree.length > 0">
        <div class="podium-item podium-2" v-if="topThree[1]">
          <div class="podium-avatar-wrapper">
            <div class="podium-avatar">
              <img v-if="topThree[1].avatar" :src="enforceHttps(topThree[1].avatar)" alt="avatar" class="lb-avatar-img" />
              <span v-else>{{ topThree[1].username ? topThree[1].username.substring(0, 2).toUpperCase() : '??' }}</span>
            </div>
            <div class="char-badge" v-if="topThree[1].final_char">
              <img v-if="topThree[1].final_char.includes('.png')" :src="enforceHttps(topThree[1].final_char)" class="lb-avatar-img" />
              <div v-else-if="topThree[1].final_char === 'BALL'" class="badge-ball"></div>
            </div>
          </div>
          <div class="podium-info">
            <span class="podium-name">{{ topThree[1].username }}</span>
            <span class="podium-score">{{ topThree[1].levelfinal }} PTS</span>
          </div>
          <div class="podium-step step-2">
            <span class="podium-rank">2</span><span class="podium-suffix">nd</span>
          </div>
        </div>

        <div class="podium-item podium-1" v-if="topThree[0]">
          <div class="podium-avatar-crown"><i class="fas fa-crown"></i></div>
          <div class="podium-avatar-wrapper">
            <div class="podium-avatar">
              <img v-if="topThree[0].avatar" :src="enforceHttps(topThree[0].avatar)" alt="avatar" class="lb-avatar-img" />
              <span v-else>{{ topThree[0].username ? topThree[0].username.substring(0, 2).toUpperCase() : '??' }}</span>
            </div>
            <div class="char-badge" v-if="topThree[0].final_char">
              <img v-if="topThree[0].final_char.includes('.png')" :src="enforceHttps(topThree[0].final_char)" class="lb-avatar-img" />
              <div v-else-if="topThree[0].final_char === 'BALL'" class="badge-ball"></div>
            </div>
          </div>
          <div class="podium-info">
            <span class="podium-name">{{ topThree[0].username }}</span>
            <span class="podium-score">{{ topThree[0].levelfinal }} PTS</span>
          </div>
          <div class="podium-step step-1">
            <span class="podium-rank">1</span><span class="podium-suffix">st</span>
          </div>
        </div>

        <div class="podium-item podium-3" v-if="topThree[2]">
          <div class="podium-avatar-wrapper">
            <div class="podium-avatar">
              <img v-if="topThree[2].avatar" :src="enforceHttps(topThree[2].avatar)" alt="avatar" class="lb-avatar-img" />
              <span v-else>{{ topThree[2].username ? topThree[2].username.substring(0, 2).toUpperCase() : '??' }}</span>
            </div>
            <div class="char-badge" v-if="topThree[2].final_char">
              <img v-if="topThree[2].final_char.includes('.png')" :src="enforceHttps(topThree[2].final_char)" class="lb-avatar-img" />
              <div v-else-if="topThree[2].final_char === 'BALL'" class="badge-ball"></div>
            </div>
          </div>
          <div class="podium-info">
            <span class="podium-name">{{ topThree[2].username }}</span>
            <span class="podium-score">{{ topThree[2].levelfinal }} PTS</span>
          </div>
          <div class="podium-step step-3">
            <span class="podium-rank">3</span><span class="podium-suffix">rd</span>
          </div>
        </div>
      </div>

      <div class="lb-list" v-if="restOfList.length > 0">
        <div
          v-for="(entry, i) in restOfList"
          :key="i"
          class="lb-item"
          :style="{ '--delay': i }"
        >
          <div class="item-scan-line"></div>
          <div class="lb-rank-wrap">
            <span class="lb-rank-num text-rank-other">{{ i + 4 }}</span>
            <span class="lb-rank-suffix">{{ getOrdinal(i + 4) }}</span>
          </div>

          <div class="lb-player-info">
            <div class="list-avatar-wrapper">
              <div class="lb-player-avatar-placeholder">
                <img v-if="entry.avatar" :src="enforceHttps(entry.avatar)" alt="avatar" class="lb-avatar-img" />
                <span v-else>{{ entry.username ? entry.username.substring(0, 2).toUpperCase() : '??' }}</span>
              </div>
              <div class="char-badge list-badge" v-if="entry.final_char">
                <img v-if="entry.final_char.includes('.png')" :src="enforceHttps(entry.final_char)" class="lb-avatar-img" />
                <div v-else-if="entry.final_char === 'BALL'" class="badge-ball"></div>
              </div>
            </div>
            
            <div class="lb-player-details">
              <span class="lb-name">{{ entry.username }}</span>
              <span class="lb-timestamp" v-if="entry.timestamp">
                <span class="time-label">COMPLETED //</span> {{ formatTimestamp(entry.timestamp) }}
              </span>
            </div>
          </div>

          <div class="lb-score-section">
            <div class="lb-score-wrap">
              <span class="lb-score">{{ entry.levelfinal }}</span>
              <span class="lb-pts">PTS</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const mockLeaderboard = ref([])

// 把資料拆成兩半：前三名 與 剩下的名次
const topThree = computed(() => mockLeaderboard.value.slice(0, 3))
const restOfList = computed(() => mockLeaderboard.value.slice(3))

// 取得排名後綴的小工具
const getOrdinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}

// 格式化時間戳記為系統日誌風格 (如果資料庫沒存時間，前端也不會報錯)
const formatTimestamp = (timestampString) => {
  if (!timestampString) return ''
  const date = new Date(timestampString)
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd} // ${hh}:${min}:${ss}`
}

// 將不安全的 http 網址強制轉換為 https
const enforceHttps = (url) => {
  if (!url) return ''
  if (typeof url === 'string' && url.startsWith('http://')) {
    return url.replace('http://', 'https://')
  }
  return url
}

onMounted(async () => {
  try {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    const res = await axios.get(`${baseURL}/api/score/leaderboard`)
    mockLeaderboard.value = res.data
  } catch (err) {
    console.error('無法載入排行榜:', err)
  }
})
</script>

<style scoped>
/* ===== 全域變數與重置 ===== */
.leaderboard-page {
  --c-bg: #060c14; 
  --c-surface: rgba(15, 31, 46, 0.6);
  --c-accent: #00e5ff;
  --c-warn: #ff6b35;
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
  scrollbar-width: none;
  -ms-overflow-style: none;
}

/* ===== 背景裝飾 ===== */
.bg-deco {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0.1;
  filter: blur(80px);
}
.deco-1 { width: 400px; height: 400px; background: var(--c-accent); top: -100px; left: -100px; }
.deco-2 { width: 300px; height: 300px; background: var(--c-warn); bottom: -50px; right: -50px; }

/* ===== 容器與標題 ===== */
.leaderboard-container {
  padding: 120px 40px 40px;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.page-header { text-align: center; margin-bottom: 50px; animation: fadeInDown 0.8s ease-out; }
.page-title { position: relative; font-family: var(--font-disp); font-size: clamp(40px, 6vw, 70px); margin: 10px 0; letter-spacing: 4px; color: #fff; display: inline-block; }
.title-glitch { position: absolute; top: 0; left: 0; width: 100%; color: var(--c-accent); background: var(--c-bg); overflow: hidden; clip: rect(0, 900px, 0, 0); animation: noise-anim 2s infinite linear alternate-reverse; opacity: 0.7; }
.page-subtitle { font-size: 14px; color: var(--c-muted); letter-spacing: 3px; margin-top: 0; }
.title-separator { display: flex; align-items: center; justify-content: center; gap: 15px; margin-top: 25px; }
.separator-line { height: 1px; width: 100px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); }
.separator-dot { width: 6px; height: 6px; background: var(--c-accent); transform: rotate(45deg); box-shadow: 0 0 10px var(--c-accent); }


/* =========================================
   ===== 頒獎台區域 (Podium) 專屬樣式 =====
   ========================================= */
.podium-section {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 60px;
  animation: fadeInUp 1s ease-out forwards;
}

.podium-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 140px;
  position: relative;
  transition: transform 0.3s ease;
}
.podium-item:hover {
  transform: translateY(-5px);
}

/* ===== 雙頭像結構專用 CSS (主頭像 + 角色徽章) ===== */
.podium-avatar-wrapper {
  position: relative;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
}

.podium-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-surface);
  overflow: hidden;
  z-index: 2;
  box-shadow: 0 0 15px rgba(0,0,0,0.5);
  font-family: var(--font-disp);
  font-size: 24px;
}
.podium-1 .podium-avatar { 
  border-color: var(--c-gold); 
  width: 110px; 
  height: 110px; 
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.4); 
}
.podium-2 .podium-avatar { border-color: var(--c-silver); }
.podium-3 .podium-avatar { border-color: var(--c-bronze); }

/* 第一名專屬小皇冠裝飾 */
.podium-avatar-crown {
  position: absolute;
  top: -25px;
  color: var(--c-gold);
  font-size: 24px;
  filter: drop-shadow(0 0 5px var(--c-gold));
  z-index: 3;
}

/* 玩家名字與分數 */
.podium-info {
  text-align: center;
  margin-bottom: 15px;
  z-index: 2;
}
.podium-name {
  display: block;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 1px;
  white-space: nowrap;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}
.podium-1 .podium-name { font-size: 20px; color: var(--c-gold); font-weight: bold; }
.podium-score {
  font-family: var(--font-disp);
  color: var(--c-accent);
  font-size: 20px;
  letter-spacing: 1px;
}
.podium-1 .podium-score { font-size: 24px; }

/* 柱體(台階)設計 */
.podium-step {
  width: 100%;
  background: linear-gradient(to top, rgba(6, 12, 20, 0.8), rgba(15, 31, 46, 0.9));
  border: 1px solid rgba(255,255,255,0.05);
  border-bottom: none;
  border-top: 4px solid;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 15px;
  border-radius: 8px 8px 0 0;
  position: relative;
  backdrop-filter: blur(5px);
}
.podium-step::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.6));
  pointer-events: none;
}

/* 高度控制 */
.step-1 { height: 180px; border-top-color: var(--c-gold); box-shadow: 0 -10px 30px rgba(255, 215, 0, 0.15); }
.step-2 { height: 130px; border-top-color: var(--c-silver); box-shadow: 0 -10px 20px rgba(192, 192, 192, 0.1); }
.step-3 { height: 100px; border-top-color: var(--c-bronze); box-shadow: 0 -10px 20px rgba(205, 127, 50, 0.1); }

/* 台階上的名次數字 */
.podium-rank {
  font-family: var(--font-disp);
  font-size: 50px;
  line-height: 1;
  text-shadow: 0 4px 10px rgba(0,0,0,0.8);
  z-index: 1;
}
.podium-suffix {
  font-size: 14px;
  font-family: var(--font-disp);
  margin-top: 5px;
  opacity: 0.7;
  z-index: 1;
}
.step-1 .podium-rank, .step-1 .podium-suffix { color: var(--c-gold); }
.step-2 .podium-rank, .step-2 .podium-suffix { color: var(--c-silver); }
.step-3 .podium-rank, .step-3 .podium-suffix { color: var(--c-bronze); }


/* =========================================
   ===== 列表區域 (第4名以後) 樣式 =====
   ========================================= */
.lb-list { display: flex; flex-direction: column; gap: 15px; }

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
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease-out forwards;
  animation-delay: calc(var(--delay) * 0.1s + 0.5s);
}
.lb-item:hover {
  transform: translateX(8px) scale(1.01);
  border-color: rgba(0, 229, 255, 0.3);
  box-shadow: -10px 0 30px rgba(0, 229, 255, 0.15);
  background: rgba(20, 40, 60, 0.8);
}

.item-scan-line { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent, rgba(0, 229, 255, 0.05), transparent); transform: translateY(-100%); }
.lb-item:hover .item-scan-line { animation: scanLoop 1.5s linear infinite; }

.lb-rank-wrap { display: flex; align-items: baseline; font-family: var(--font-disp); }
.lb-rank-num { font-size: 32px; line-height: 1; color: rgba(255,255,255,0.7); }
.lb-rank-suffix { font-size: 12px; color: var(--c-muted); margin-left: 2px; }

.lb-player-info { display: flex; align-items: center; gap: 15px; }
.lb-player-avatar-placeholder {
  width: 45px; height: 45px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-disp); font-size: 18px; color: var(--c-muted);
  overflow: hidden;
  transition: all 0.3s ease;
}
.lb-item:hover .lb-player-avatar-placeholder { border-color: var(--c-accent); color: var(--c-accent); box-shadow: 0 0 10px rgba(0, 229, 255, 0.2); }

.lb-player-details { display: flex; flex-direction: column; }
.lb-name { font-size: 16px; font-weight: 500; letter-spacing: 1px; color: #fff; }
.lb-timestamp { font-family: 'Courier New', monospace; font-size: 11px; color: var(--c-muted); margin-top: 3px; opacity: 0.8; display: flex; gap: 6px; align-items: center; }
.time-label { color: var(--c-green, #00ff88); opacity: 0.8; }

.lb-score-section { display: flex; flex-direction: column; gap: 8px; padding: 0 0 0 30px; }
.lb-score-wrap { text-align: right; font-family: var(--font-disp); display: flex; align-items: baseline; justify-content: flex-end; }
.lb-score { font-size: 26px; color: var(--c-accent); letter-spacing: 1px; }
.lb-pts { font-size: 10px; color: var(--c-muted); margin-left: 4px; }


/* ===== 通用圖片樣式 ===== */
.lb-avatar-img { width: 100%; height: 100%; object-fit: cover; }
.lb-avatar-ball { width: 60%; height: 60%; background-color: #ff8a65; border-radius: 50%; box-shadow: 0 0 8px rgba(255, 138, 101, 0.5); }

/* 角色徽章通用樣式 */
.char-badge {
  position: absolute;
  bottom: -5px;
  right: -5px;
  width: 32px;
  height: 32px;
  background-color: var(--c-bg); /* 用背景色做出挖空隔離效果 */
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 3;
  box-shadow: 0 2px 5px rgba(0,0,0,0.5);
}
.podium-1 .char-badge {
  width: 40px;
  height: 40px;
  bottom: 0px;
  right: 0px;
  border-color: var(--c-gold);
}
.podium-2 .char-badge { border-color: var(--c-silver); }
.podium-3 .char-badge { border-color: var(--c-bronze); }

/* 列表區的頭像與徽章 */
.list-avatar-wrapper {
  position: relative;
  display: flex;
}
.lb-player-avatar-placeholder {
  width: 45px; height: 45px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-disp); font-size: 18px; color: var(--c-muted);
  overflow: hidden;
  transition: all 0.3s ease;
}
.lb-item:hover .lb-player-avatar-placeholder { 
  border-color: var(--c-accent); 
  color: var(--c-accent); 
  box-shadow: 0 0 10px rgba(0, 229, 255, 0.2); 
}
.list-badge {
  width: 22px;
  height: 22px;
  bottom: -4px;
  right: -4px;
  border-color: var(--c-surface);
}
.badge-ball {
  width: 70%;
  height: 70%;
  background-color: #ff8a65;
  border-radius: 50%;
  box-shadow: inset -2px -2px 4px rgba(0,0,0,0.3), 0 0 5px rgba(255, 138, 101, 0.8);
}

/* ===== KEYFRAMES ===== */
@keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes scanLoop { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
@keyframes noise-anim { 0% { clip: rect(10px, 9999px, 50px, 0); } 5% { clip: rect(30px, 9999px, 20px, 0); } 20% { clip: rect(0, 9999px, 0, 0); } 100% { clip: rect(0, 9999px, 0, 0); } }

/* ===== RWD ===== */
@media (max-width: 600px) {
  .leaderboard-container { padding-top: 90px; padding-left: 20px; padding-right: 20px; }
  
  .podium-section { gap: 10px; }
  .podium-item { width: 95px; }
  .podium-avatar { width: 60px; height: 60px; }
  .podium-1 .podium-avatar { width: 80px; height: 80px; }
  .podium-name { font-size: 14px; }
  .podium-1 .podium-name { font-size: 16px; }
  .podium-score { font-size: 16px; }
  .podium-1 .podium-score { font-size: 18px; }
  .step-1 { height: 140px; }
  .step-2 { height: 100px; }
  .step-3 { height: 80px; }

  /* ===== 以下為修改的部分 ===== */
  /* 將原本的 2 欄改為 3 欄 (名次 | 資訊 | 分數)，最後一欄用 auto 適應內容 */
  .lb-item { 
    grid-template-columns: 40px 1fr auto; 
    gap: 10px; 
    padding: 12px 15px; 
  }
  
  /* 稍微縮小名次字體以節省空間 */
  .lb-rank-num { font-size: 24px; } 
  
  /* 移除強制換行 (grid-column: 1 / -1) 與上邊框，讓它維持在右側 */
  .lb-score-section { 
    grid-column: auto; 
    padding: 0; 
    margin-top: 0; 
    border-top: none; 
    flex-direction: column; 
    justify-content: center; 
    align-items: flex-end; 
  }

  /* 縮小玩家名字與分數的字體，避免在極小螢幕上相互擠壓 */
  .lb-name { font-size: 14px; }
  .lb-score { font-size: 20px; }
}
</style>
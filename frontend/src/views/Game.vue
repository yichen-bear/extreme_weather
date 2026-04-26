<template>
  <div class="game-container">
    <div class="hud">
      <div class="score">ALTITUDE: {{ Math.floor(score) }}m</div>
      <div v-if="gameOver" class="game-over">
        <h2>登峰失敗</h2>
        <p>你最終抵達了 {{ Math.floor(score) }} 公尺</p>
        <button @click="resetGame" class="restart-btn">重新攀登</button>
      </div>
    </div>
    <canvas ref="gameCanvas" width="500" height="600"></canvas>
    
    <div class="controls-hint">使用 A / D 或 方向鍵 ← / → 移動</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const gameCanvas = ref(null);
const score = ref(0);
const gameOver = ref(false);
let ctx, animationId;

// 遊戲常數
const GRAVITY = 0.25;
const JUMP_FORCE = -8.5;
const PLATFORM_COUNT = 7; 
const CANVAS_WIDTH = 500; 
const CANVAS_HEIGHT = 600;
const PLATFORM_WIDTH = 80; // 統一階梯寬度

// 遊戲狀態
let player = {
  x: 250,
  y: 530,
  width: 30,
  height: 30,
  vx: 0,
  vy: 0,
  color: '#ff7043'
};

let platforms = [];
let keys = {};

// 計算新平台的 X 位置，確保從舊平台跳得過去
const getValidX = (prevX) => {
  // 玩家在空中跳躍時，水平移動速度約 4.5
  // 跳躍到落下的時間大約是 (JUMP_FORCE * 2 / GRAVITY) 幀
  // 為了保險，我們限制橫向位移在 180px 以內
  const maxHorizontalGap = 180; 
  let minX = Math.max(0, prevX - maxHorizontalGap);
  let maxX = Math.min(CANVAS_WIDTH - PLATFORM_WIDTH, prevX + maxHorizontalGap);
  
  return Math.random() * (maxX - minX) + minX;
};

const initPlatforms = () => {
  platforms = [];
  
  // 1. 初始地板
  platforms.push({
    x: 0,
    y: CANVAS_HEIGHT - 20,
    width: CANVAS_WIDTH,
    height: 20,
    isFloor: true
  });

  // 2. 循序生成平台
  let lastX = 210; // 從中間開始
  let lastY = CANVAS_HEIGHT - 20;

  for (let i = 0; i < PLATFORM_COUNT; i++) {
    let newY = lastY - (Math.random() * 30 + 90); 
    let newX = getValidX(lastX);
    
    platforms.push({
      x: newX,
      y: newY,
      width: PLATFORM_WIDTH, // 統一寬度
      height: 12
    });
    
    lastX = newX;
    lastY = newY;
  }
};

const resetGame = () => {
  player.x = 250;
  player.y = 500;
  player.vx = 0;
  player.vy = JUMP_FORCE;
  score.value = 0;
  gameOver.value = false;
  initPlatforms();
};

const update = () => {
  if (gameOver.value) return;

  if (keys['ArrowLeft'] || keys['a']) player.vx = -4.5;
  else if (keys['ArrowRight'] || keys['d']) player.vx = 4.5;
  else player.vx *= 0.85;

  player.x += player.vx;
  player.vy += GRAVITY;
  player.y += player.vy;

  // 邊界傳送
  if (player.x > CANVAS_WIDTH) player.x = 0;
  if (player.x < 0) player.x = CANVAS_WIDTH;

  if (player.y < CANVAS_HEIGHT / 2) {
    let diff = CANVAS_HEIGHT / 2 - player.y;
    player.y = CANVAS_HEIGHT / 2;
    score.value += diff * 0.1;
    
    platforms.forEach(p => {
      p.y += diff;
      if (p.y > CANVAS_HEIGHT) {
        // 找出目前最高平台的數據
        let highestPlatform = platforms.reduce((prev, curr) => (prev.y < curr.y ? prev : curr));
        
        p.y = highestPlatform.y - (Math.random() * 20 + 100);
        p.x = getValidX(highestPlatform.x); // 基於最高平台計算新 X
        p.width = PLATFORM_WIDTH; // 確保重置時寬度正確
        p.isFloor = false;
      }
    });
  }

  // 碰撞檢測
  if (player.vy > 0) {
    platforms.forEach(p => {
      if (
        player.x + 10 < p.x + p.width &&
        player.x + player.width - 10 > p.x &&
        player.y + player.height > p.y &&
        player.y + player.height < p.y + p.height + 15
      ) {
        player.vy = JUMP_FORCE;
      }
    });
  }

  if (player.y > CANVAS_HEIGHT) gameOver.value = true;
};

const draw = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // 稍微明亮一點的玻璃質感背景層
  ctx.fillStyle = 'rgba(200, 225, 255, 0.12)'; 
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  platforms.forEach(p => {
    ctx.fillStyle = p.isFloor ? '#455a64' : '#00e5ff'; 
    ctx.shadowBlur = p.isFloor ? 0 : 10;
    ctx.shadowColor = '#00e5ff';
    ctx.fillRect(p.x, p.y, p.width, p.height);
  });

  ctx.fillStyle = player.color;
  ctx.shadowBlur = 15;
  ctx.shadowColor = player.color;
  ctx.beginPath();
  ctx.arc(player.x + 15, player.y + 15, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
};

const loop = () => {
  update();
  draw();
  animationId = requestAnimationFrame(loop);
};

onMounted(() => {
  ctx = gameCanvas.value.getContext('2d');
  window.addEventListener('keydown', e => keys[e.key] = true);
  window.addEventListener('keyup', e => keys[e.key] = false);
  resetGame();
  loop();
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
});
</script>

<style scoped>
/* 樣式部分保持不變 */
.game-container {
  position: relative;
  width: 500px;
  height: 600px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
}

canvas {
  display: block;
  background: linear-gradient(to bottom, #14212d, #080c12);
}

.hud {
  position: absolute;
  top: 20px;
  width: 100%;
  text-align: center;
  pointer-events: none;
  z-index: 5;
}

.score {
  font-family: var(--font-disp);
  font-size: 28px;
  color: #fff;
}

.game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #0d1117;
  padding: 40px;
  border-radius: 12px;
  border: 1px solid var(--c-warn);
  pointer-events: all;
  text-align: center;
  z-index: 10;
}

.restart-btn {
  background: var(--c-warn);
  border: none;
  color: white;
  padding: 12px 24px;
  font-family: var(--font-disp);
  font-size: 20px;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 4px;
}

.controls-hint {
  position: absolute;
  bottom: 15px;
  width: 100%;
  text-align: center;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
}
</style>
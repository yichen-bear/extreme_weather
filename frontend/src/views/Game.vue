<template>
  <div class="game-wrapper">
    <div class="game-container">
      <!-- Nav Buttons -->
      <div class="nav-buttons">
        <RouterLink to="/" class="nav-btn">🏠 首頁</RouterLink>
        <RouterLink to="/rules" class="nav-btn">📋 規則</RouterLink>
        <RouterLink to="/map" class="nav-btn">🗺️ 地圖</RouterLink>
      </div>

      <!-- HUD -->
      <div class="hud">
        <div class="health-area">
          <span v-for="i in Math.floor(playerLives)" :key="i" class="heart">❤️</span>
          <span v-if="playerLives % 1 !== 0" class="heart half">💔</span>
          <span v-for="i in 2 - Math.ceil(playerLives)" :key="'lost'+i" class="heart lost">🖤</span>
        </div>

        <div class="altitude-area">
          <div class="altitude-label">ALTITUDE</div>
          <div class="altitude-value">{{ Math.floor(score) }}<span class="alt-unit">m</span></div>
        </div>

        <div class="level-area">
          {{ currentLevelName }}
        </div>
      </div>

      <!-- Water Overlay -->
      <div v-if="activeWaterRise" class="water-overlay" :style="{ height: waterHeight + 'px' }"></div>

      <!-- Game Over Overlay -->
      <Transition name="gameover">
        <div v-if="gameOver" class="game-over-overlay">
          <div class="game-over-panel">
            <div class="go-eyebrow">MISSION FAILED</div>
            <h2 class="go-title">登峰失敗</h2>
            <p class="go-score">最終高度 <span class="go-number">{{ Math.floor(score) }}</span> 公尺</p>
            <div class="go-divider"></div>
            <button @click="resetGame" class="restart-btn">
              <span class="restart-icon">▲</span>
              重新攀登
            </button>
          </div>
        </div>
      </Transition>

      <canvas ref="gameCanvas" :width="CANVAS_WIDTH" :height="CANVAS_HEIGHT"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const gameCanvas = ref(null);
const score = ref(0);
const gameOver = ref(false);
const playerLives = ref(2);
let ctx, animationId;

const GRAVITY = 0.25;
const JUMP_FORCE = -8.5;
const PLATFORM_COUNT = 12;
const CANVAS_WIDTH = 520;
const CANVAS_HEIGHT = 680;
const MAX_WATER_WORLD_Y = CANVAS_HEIGHT + 2000; 
const PLATFORM_WIDTH = 70;
const PLATFORM_MIN_WIDTH = 50;
const PLATFORM_MAX_WIDTH = 90;

// 水位相关（平衡后速度）
const activeWaterRise = ref(false);
const waterHeight = ref(0);
let waterWorldY = CANVAS_HEIGHT; 
let currentWaterRiseSpeed = 0.08;    // 基础上升速度（大幅降低）
const maxWaterHeight = CANVAS_HEIGHT * 0.4;  // 最高升至40%高度（约272px）

let player = {
  x: 260,
  y: 630,
  width: 30,
  height: 30,
  vx: 0,
  vy: 0,
  invincible: false,
};

let platforms = [];
let keys = {};
let frameCount = 0;
let lastPlatform = { x: 260, y: CANVAS_HEIGHT - 50 };  

// 多路线平台生成
const getMultiPathX = (prevPlatforms, currentY) => {
  let lastX = prevPlatforms.length > 0 ? prevPlatforms[prevPlatforms.length-1].x : CANVAS_WIDTH/2;
  const candidates = [];
  let leftX = Math.max(0, lastX - 80 - Math.random() * 70);
  let rightX = Math.min(CANVAS_WIDTH - PLATFORM_WIDTH, lastX + 80 + Math.random() * 70);
  let straightX = Math.min(CANVAS_WIDTH - PLATFORM_WIDTH, Math.max(0, lastX + (Math.random() - 0.5) * 60));
  candidates.push(leftX, straightX, rightX);
  let randomX = Math.random() * (CANVAS_WIDTH - PLATFORM_WIDTH);
  candidates.push(randomX);
  const unique = [...new Set(candidates.map(v => Math.floor(v)))].filter(x => x >= 0 && x <= CANVAS_WIDTH - PLATFORM_WIDTH);
  if (unique.length === 0) return CANVAS_WIDTH/2;
  return unique[Math.floor(Math.random() * unique.length)];
};

const initPlatforms = () => {
  platforms = [];
  platforms.push({
    x: 0,
    y: CANVAS_HEIGHT - 20,
    width: CANVAS_WIDTH,
    height: 20,
    isFloor: true,
    isBurning: false
  });

  let lastY = CANVAS_HEIGHT - 20;
  let lastPlatformsForRef = [platforms[0]];

  for (let i = 0; i < PLATFORM_COUNT; i++) {
    let newY = lastY - (Math.random() * 40 + 70);
    // 每層生成 2-3 個平台（從一開始就多路徑）
    const pathCount = 2 + Math.floor(Math.random() * 2);
    for (let j = 0; j < pathCount; j++) {
      let newX = Math.random() * (CANVAS_WIDTH - PLATFORM_MAX_WIDTH);
      let widthVar = PLATFORM_MIN_WIDTH + Math.random() * (PLATFORM_MAX_WIDTH - PLATFORM_MIN_WIDTH);
      platforms.push({ 
        x: newX, 
        y: newY, 
        width: widthVar, 
        height: 12,
        isBurning: false
      });
    }
    lastY = newY;
    lastPlatformsForRef = platforms.slice(-3);
  }
};

// ----- 新关卡定义（只有四个阶段）-----
// 高度分段：新手训练 < 300m，波濤洪水 300-650m，野火燎原 650-1000m，最終試煉 >= 1000m
const getCurrentLevel = () => {
  const alt = score.value;
  if (alt < 250) return 0;      // 新手训练
  if (alt < 500) return 1;      // 波濤洪水
  if (alt < 750) return 2;     // 野火燎原
  return 3;                     // 最終試煉
};

const currentLevelName = ref("🌱 新手訓練");

// 更新关卡效果（名称、水位特效、火焰特效、水位速度）
const updateLevelEffects = () => {
  const level = getCurrentLevel();
  switch(level) {
    case 0: 
      currentLevelName.value = "🌱 新手訓練"; 
      activeWaterRise.value = false; 
      waterHeight.value = 0;
      break;
    case 1: 
      if (!activeWaterRise.value) {
        currentLevelName.value = "💧 波濤洪水"; 
        activeWaterRise.value = true;
        waterHeight.value = 10;
      }
      currentWaterRiseSpeed = 1.1;
      break;
    case 2: 
      currentLevelName.value = "🔥 野火燎原"; 
      activeWaterRise.value = false;
      break;
    case 3: 
      currentLevelName.value = "⚡ 最終試煉"; 
      activeWaterRise.value = true;
      currentWaterRiseSpeed = 0.12;   
      break;
  }
};

// 更新着火平台（野火燎原 & 最終試煉）
const updateBurningPlatforms = () => {
  const level = getCurrentLevel();
  const shouldHaveFire = (level === 2 || level === 3);
  if (!shouldHaveFire) {
    platforms.forEach(p => { if (!p.isFloor) p.isBurning = false; });
    return;
  }
  platforms.forEach(p => {
    if (!p.isFloor && Math.random() < 0.006) p.isBurning = true;
    if (p.isBurning && Math.random() < 0.003) p.isBurning = false;
  });
  if (shouldHaveFire && platforms.filter(p => p.isBurning && !p.isFloor).length < 2) {
    const nonBurning = platforms.filter(p => !p.isFloor && !p.isBurning);
    if (nonBurning.length) nonBurning[Math.floor(Math.random() * nonBurning.length)].isBurning = true;
  }
};

// 重置游戏
const resetGame = () => {
  player.x = 260;
  player.y = 600;
  player.vx = 0;
  player.vy = JUMP_FORCE;
  score.value = 0;
  gameOver.value = false;
  playerLives.value = 2;
  frameCount = 0;
  waterWorldY = CANVAS_HEIGHT;
  waterHeight.value = 0;
  activeWaterRise.value = false;
  player.invincible = false;
  currentWaterRiseSpeed = 0.08;
  initPlatforms();
  updateLevelEffects();
};

// 受到伤害
const applyDamage = () => {
  if (player.invincible) return;
  playerLives.value -= 0.5;
  if (playerLives.value <= 0) {
    gameOver.value = true;
  }
  player.invincible = true;
  setTimeout(() => { if (player) player.invincible = false; }, 500);
};

const updateWaterRise = () => {
  if (!activeWaterRise.value) {
    waterHeight.value = 0;
    return;
  }

  // 1. 水位自然上升（每幀增加固定像素）
  waterHeight.value += currentWaterRiseSpeed;

  // 2. 限制水位最大高度，避免直接淹沒全螢幕（可選）
  if (waterHeight.value > CANVAS_HEIGHT) {
    waterHeight.value = CANVAS_HEIGHT;
  }

  // 3. 判定死亡
  if (player.y + player.height > CANVAS_HEIGHT - waterHeight.value) {
    gameOver.value = true;
  }
};

const update = () => {
  if (gameOver.value) return;
  
  const level = getCurrentLevel();
  let currentGravity = GRAVITY;
  let currentJumpForce = JUMP_FORCE;
  // 最终试炼提高难度（重力加大、跳跃略强但更考验操作）
  if (level === 3) {
    currentGravity = 0.32;
    currentJumpForce = -9.2;
  } else if (level === 2) {
    currentGravity = 0.28;
    currentJumpForce = -8.8;
  }
  
  frameCount++;

  // 左右移动
  if (keys['ArrowLeft'] || keys['a']) player.vx = -4.5;
  else if (keys['ArrowRight'] || keys['d']) player.vx = 4.5;
  else player.vx *= 0.85;
  player.x += player.vx;
  player.vy += currentGravity;
  player.y += player.vy;

  // 边界环绕
  if (player.x > CANVAS_WIDTH) player.x = 0;
  if (player.x < 0) player.x = CANVAS_WIDTH;

  // 屏幕向上滚动（登山核心）
  if (player.y < CANVAS_HEIGHT / 2) {
    let diff = CANVAS_HEIGHT / 2 - player.y;
    player.y = CANVAS_HEIGHT / 2;
    score.value += diff * 0.1;

        platforms.forEach(p => {
      p.y += diff;
      if (p.y > CANVAS_HEIGHT) {
        let highestPlatform = platforms.reduce((prev, curr) => (prev.y < curr.y ? prev : curr));
        let newY = highestPlatform.y - (Math.random() * 50 + 80);
        // 每層都生成 2-3 個平台
        const pathCount = 2 + Math.floor(Math.random() * 2);
        for (let j = 0; j < pathCount; j++) {
          let newX = Math.random() * (CANVAS_WIDTH - PLATFORM_MAX_WIDTH);
          let newWidth = PLATFORM_MIN_WIDTH + Math.random() * (PLATFORM_MAX_WIDTH - PLATFORM_MIN_WIDTH);
          p.x = newX;
          p.y = newY;
          p.width = newWidth;
          p.isFloor = false;
          p.isBurning = false;
        }
      }
    });

    if (activeWaterRise.value) {
    // 當相機向上移動 diff 時，水位的視覺高度就要減去 diff
    waterHeight.value -= diff; 
    
    // 確保水位不會減到負數（低於螢幕底部）
    if (waterHeight.value < 0) waterHeight.value = 0;
    }
  }
  
  updateLevelEffects();
  updateWaterRise();
  updateBurningPlatforms();

  // 跳跃碰撞与火焰伤害
  if (player.vy > 0) {
    platforms.forEach(p => {
      if (
        player.x + 10 < p.x + p.width &&
        player.x + player.width - 10 > p.x &&
        player.y + player.height > p.y &&
        player.y + player.height < p.y + p.height + 15
      ) {
        player.vy = currentJumpForce;
        lastPlatform.x = player.x;
        lastPlatform.y = p.y - player.height;
        // if (activeWaterRise.value && waterHeight.value > 0) {
        //   waterHeight.value = Math.max(0, waterHeight.value - 0.5);
        // }
        if (p.isBurning && !p.isFloor) {
          applyDamage();
        }
      }
    });
  }
  
  // 掉落底部或触碰水位判定
    // 掉落底部或触碰水位判定
  if (player.y > CANVAS_HEIGHT - waterHeight.value) {
    // 掉落復活機制：檢查是否還有生命
    if (playerLives.value > 0.5) {
      playerLives.value -= 1.5;
      // 回到上一個停留的平台
      player.x = lastPlatform.x;
      player.y = lastPlatform.y;
      player.vy = JUMP_FORCE;
      player.invincible = true;
      setTimeout(() => { if (player) player.invincible = false; }, 1000);
    } else {
      gameOver.value = true;
    }
  }
};

// ----- 绘图部分（保留原配色 + 氛围）-----
const playerImage = new Image();
playerImage.src = '../assets/orbit.png';

const getLevelForSky = () => {
  const s = score.value;
  if (s < 250) return 0;
  if (s < 500) return 1;
  if (s < 750) return 2;
  return 3;
};

const LEVEL_SKIES = [
  [['#87ceeb', 0], ['#b8dff5', 0.5], ['#e8f4fb', 1]],
  [['#ff7043', 0], ['#ff8a65', 0.3], ['#ffb74d', 0.65], ['#ffd54f', 1]],
  [['#311b92', 0], ['#4a148c', 0.3], ['#880e4f', 0.65], ['#e64a19', 1]],
  [['#000010', 0], ['#0d0d2b', 0.4], ['#1a1a4e', 0.75], ['#0d1b3e', 1]],
];

const LEVEL_PLATFORM_COLOR = ['#546e7a', '#bf360c', '#4a148c', '#1a237e'];
const LEVEL_PLATFORM_TOP   = ['#78909c', '#ff7043', '#9c27b0', '#3949ab'];

const draw = () => {
  const skyLevel = getLevelForSky();
  const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
  LEVEL_SKIES[skyLevel].forEach(([color, stop]) => grad.addColorStop(stop, color));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
  // 夜晚星星
  if (skyLevel === 3) {
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    const stars = [[60,40],[140,80],[230,30],[310,60],[400,20],[460,90],[90,130],[260,110],[370,140],[500,50],[180,160],[440,170]];
    stars.forEach(([sx, sy]) => {
      ctx.globalAlpha = 0.5 + 0.5 * Math.sin(frameCount * 0.05 + sx);
      ctx.fillRect(sx, sy, 2, 2);
    });
    ctx.globalAlpha = 1;
  }
  
  // 云层
  if (skyLevel < 3) {
    const cloudAlpha = skyLevel === 0 ? 0.55 : 0.25;
    const clouds = [
      { x: ((frameCount * 0.12 + 80)  % (CANVAS_WIDTH + 120)) - 60, y: 80,  rx: 70, ry: 22 },
      { x: ((frameCount * 0.07 + 300)  % (CANVAS_WIDTH + 120)) - 60, y: 160, rx: 90, ry: 26 },
      { x: ((frameCount * 0.09 + 180) % (CANVAS_WIDTH + 120)) - 60, y: 240, rx: 60, ry: 18 },
    ];
    clouds.forEach(c => {
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.rx, c.ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${cloudAlpha})`;
      ctx.fill();
    });
  }

  // 绘制平台
  const platformColorSet = LEVEL_PLATFORM_COLOR[Math.min(skyLevel, LEVEL_PLATFORM_COLOR.length-1)];
  const platformTopSet = LEVEL_PLATFORM_TOP[Math.min(skyLevel, LEVEL_PLATFORM_TOP.length-1)];
  
  platforms.forEach(p => {
    ctx.fillStyle = p.isBurning ? '#d84315' : platformColorSet;
    ctx.fillRect(p.x, p.y, p.width, p.height);
    ctx.fillStyle = p.isBurning ? '#ffab40' : platformTopSet;
    ctx.fillRect(p.x, p.y, p.width, 3);
    if (p.isBurning && frameCount % 4 === 0) {
      ctx.fillStyle = 'rgba(255, 100, 0, 0.7)';
      ctx.beginPath();
      ctx.moveTo(p.x + p.width/2, p.y - 2);
      ctx.lineTo(p.x + p.width/2 - 4, p.y - 8);
      ctx.lineTo(p.x + p.width/2 + 4, p.y - 8);
      ctx.fill();
    }
  });
  
  // 玩家绘制
  if (playerImage.complete && playerImage.naturalWidth > 0) {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
  } else {
    ctx.fillStyle = '#ff8a65';
    ctx.beginPath();
    ctx.arc(player.x + 15, player.y + 15, 14, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // 无敌闪烁
  if (player.invincible && frameCount % 6 < 3) {
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.globalAlpha = 1;
  }

  // 氛围叠加（洪水/野火主题）
  const current = getCurrentLevel();
  if (current === 1 || current === 3) {
    ctx.fillStyle = 'rgba(0, 40, 80, 0.25)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  } else if (current === 2) {
    ctx.fillStyle = 'rgba(80, 30, 0, 0.25)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
};

const loop = () => {
  update();
  draw();
  animationId = requestAnimationFrame(loop);
};

onMounted(() => {
  ctx = gameCanvas.value.getContext('2d');
  window.addEventListener('keydown', e => { keys[e.key] = true; });
  window.addEventListener('keyup', e => { keys[e.key] = false; });
  resetGame();
  loop();
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
});
</script>

<style scoped>
.game-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.game-container {
  position: relative;
  width: 520px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0, 229, 255, 0.25);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 200, 230, 0.15), 0 24px 64px rgba(0, 0, 0, 0.55);
}
.nav-buttons {
  margin-top: 50px;
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.85);
  font-size: 11px;
  font-family: var(--font-body, 'DM Sans', sans-serif);
  letter-spacing: 0.5px;
  text-decoration: none;
  backdrop-filter: blur(6px);
  transition: background 0.2s, border-color 0.2s;
}
.nav-btn:hover {
  background: rgba(0, 180, 220, 0.25);
  border-color: rgba(0, 229, 255, 0.45);
  color: #fff;
}
canvas {
  display: block;
}
.hud {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  pointer-events: none;
  padding: 12px 16px;
  background: linear-gradient(to bottom, rgba(8,20,32,0.7) 0%, transparent 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.health-area {
  font-size: 22px;
  letter-spacing: 2px;
  min-width: 70px;
}
.heart.half {
  filter: grayscale(0.3);
}
.heart.lost {
  opacity: 0.3;
}
.altitude-area {
  text-align: center;
  flex: 1;
}
.altitude-label {
  font-family: var(--font-disp, 'Bebas Neue', sans-serif);
  font-size: 10px;
  letter-spacing: 4px;
  color: rgba(0, 229, 255, 0.7);
}
.altitude-value {
  font-family: var(--font-disp, 'Bebas Neue', sans-serif);
  font-size: 36px;
  color: #fff;
  line-height: 1;
  text-shadow: 0 0 20px rgba(0, 229, 255, 0.5);
}
.alt-unit {
  font-size: 16px;
  color: rgba(255,255,255,0.55);
}
.level-area {
  background: rgba(0,0,0,0.55);
  padding: 6px 12px;
  border-radius: 24px;
  font-size: 13px;
  font-weight: bold;
  backdrop-filter: blur(4px);
  color: #ffd966;
  min-width: 100px;
  text-align: center;
  pointer-events: none;
}
.water-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, #0a4c6e, rgba(0, 100, 180, 0.5));
  backdrop-filter: blur(2px);
  z-index: 3;
  pointer-events: none;
  transition: height 0.1s linear;
  border-top: 1px solid #2b9bb3;
}
.game-over-overlay {
  position: absolute;
  inset: 0;
  background: rgba(6, 12, 20, 0.75);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
}
.game-over-panel {
  background: #0d1a24;
  border: 1px solid rgba(255, 107, 53, 0.4);
  border-radius: 12px;
  padding: 40px 52px;
  text-align: center;
}
.go-eyebrow {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 11px;
  letter-spacing: 5px;
  color: #ff6b35;
}
.go-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 48px;
  color: #fff;
  margin: 0 0 ;
}
.go-score {
  font-size: 17px;
  color: rgba(255,255,255,0.5);
  padding: 5px;
  margin-bottom: 10px;
}
.go-number {
  color: #ff6b35;
  font-size: 20px;
}
.restart-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ff6b35;
  border: none;
  color: #fff;
  padding: 12px 28px;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 20px;
  cursor: pointer;
  border-radius: 4px;
}
.restart-icon {
  animation: bounce 1.5s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
.gameover-enter-active, .gameover-leave-active {
  transition: opacity 0.4s ease;
}
.gameover-enter-from, .gameover-leave-to {
  opacity: 0;
}
</style>
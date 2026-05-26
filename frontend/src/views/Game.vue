<template>
  <div class="game-wrapper">
    <div class="game-content-area">
      <div class="nav-sidebar">
        <RouterLink to="/" class="nav-btn">
          <span class="nav-icon">🏠</span><span class="nav-text">首頁</span>
        </RouterLink>
        <RouterLink to="/rules" class="nav-btn">
          <span class="nav-icon">📋</span><span class="nav-text">規則</span>
        </RouterLink>
        <RouterLink to="/map" class="nav-btn">
          <span class="nav-icon">🗺️</span><span class="nav-text">地圖</span>
        </RouterLink>
        <RouterLink to="/leaderboard" class="nav-btn">
          <span class="nav-icon">🏆</span><span class="nav-text">排行榜</span>
        </RouterLink>
      </div>

      <div class="gesture-sidebar">
        <div class="gesture-panel">
          <div class="gesture-header">手勢控制</div>

          <label class="switch">
            <input type="checkbox" v-model="isWebcamOn" @change="handleWebcamToggle" />
            <span class="slider round"></span>
          </label>
          <div class="toggle-text">{{ isWebcamOn ? '已開啟' : '已關閉' }}</div>

          <div class="gesture-guide">
            <div class="guide-item"><span>☝️</span><span>向左</span></div>
            <div class="guide-item"><span>✌️</span><span>向右</span></div>
            <div class="guide-item"><span>👍</span><span>Enter</span></div>
          </div>

          <div class="gesture-content" v-show="isWebcamOn">
            <div v-if="isLoadingModel" class="gesture-status loading">載入模型中...</div>
            <div v-if="isLoadingModel" class="gesture-status loading">(第一次載入耗時較久)</div>
            <div v-else class="gesture-status active">
              {{ currentGestureDisplay || '等待手勢...' }}
            </div>

            <div class="webcam-preview-wrapper">
              <video ref="webcamVideo" autoplay playsinline></video>
            </div>
          </div>
        </div>
      </div>

      <div class="game-container">
        <!-- HUD -->
        <div class="hud">
          <div class="health-area">
            <span v-for="i in Math.floor(playerLives)" :key="i" class="heart">❤️</span>
            <span v-if="playerLives % 1 !== 0" class="heart half">💔</span>
            <span
              v-for="i in Math.max(0, 2 - Math.ceil(playerLives))"
              :key="'lost' + i"
              class="heart lost"
              >🖤</span
            >
          </div>

          <div class="altitude-area">
            <div class="altitude-label">ALTITUDE</div>
            <div class="altitude-value">{{ Math.floor(score) }}<span class="alt-unit">m</span></div>
          </div>

          <div v-if="gameStarted" class="level-area">
            {{ currentLevelName }}
          </div>
        </div>

        <!-- Water Overlay -->
        <div
          v-if="activeWaterRise"
          class="water-overlay"
          :style="{ height: waterHeight + 'px' }"
        ></div>

        <!-- Game Over Overlay -->
        <Transition name="gameover">
          <div v-if="gameOver" class="game-over-overlay">
            <div class="game-over-panel">
              <div class="go-eyebrow">MISSION FAILED</div>
              <h2 class="go-title">登峰失敗</h2>
              <p class="go-score">
                最終高度 <span class="go-number">{{ Math.floor(score) }}</span> 公尺
              </p>
              <div class="go-divider"></div>
              <button @click="resetGame" class="restart-btn">
                <span class="restart-icon">▲</span>
                重新攀登
              </button>
              <button @click="backToHome" class="back-home-btn">返回大廳</button>
            </div>
          </div>
        </Transition>

        <Transition name="fade">
          <div v-if="showLevelPopup" class="level-popup-overlay">
            <div class="level-popup-panel">
              <div class="lp-eyebrow">NEW CHALLENGE</div>
              <h2 class="lp-title">{{ nextLevelInfo.title }}</h2>
              <p class="lp-desc">{{ nextLevelInfo.desc }}</p>
              <div class="lp-hint">點擊 Enter 繼續挑戰</div>
            </div>
          </div>
        </Transition>

        <Transition name="fade">
          <div v-if="!gameStarted" class="home-menu-layer">
            <!-- 角色切換控制 -->
            <div class="character-selector">
              <button @click="prevChar" class="arrow-btn left">◀</button>
              <div class="char-info-display">
                <div class="char-name-tag">{{ characters[selectedCharIndex].name }}</div>
              </div>
              <button @click="nextChar" class="arrow-btn right">▶</button>
            </div>

            <!-- 開始按鈕 -->
            <button @click="startGame" class="big-play-btn">
              <span class="play-icon">START</span>
            </button>
          </div>
        </Transition>

        <canvas ref="gameCanvas" :width="CANVAS_WIDTH" :height="CANVAS_HEIGHT"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { FilesetResolver, GestureRecognizer } from '@mediapipe/tasks-vision'

const gameCanvas = ref(null)
const score = ref(0)
const gameOver = ref(false)
const playerLives = ref(2)
let ctx, animationId

const GRAVITY = 0.25
const JUMP_FORCE = -8.5
const PLATFORM_COUNT = 12
const CANVAS_WIDTH = 520
const CANVAS_HEIGHT = 680
const MAX_WATER_WORLD_Y = CANVAS_HEIGHT + 2000
const PLATFORM_WIDTH = 70
const PLATFORM_MIN_WIDTH = 50
const PLATFORM_MAX_WIDTH = 90
let windDirection = 0
const generatedBoundaries = ref([])
const triggeredLevels = ref([])

// 水位相关（平衡后速度）
const activeWaterRise = ref(false)
const waterHeight = ref(0)
let waterWorldY = CANVAS_HEIGHT
let currentWaterRiseSpeed = 0.08
const maxWaterHeight = CANVAS_HEIGHT * 0.4
const gameStarted = ref(false)
const selectedCharIndex = ref(0)
const showLevelPopup = ref(false)
const nextLevelInfo = ref({ title: '', desc: '' })

// 💡 【新增：手勢辨識相關狀態】
const isWebcamOn = ref(false)
const isLoadingModel = ref(false)
const currentGestureDisplay = ref('')
const webcamVideo = ref(null)
const gestureDirection = ref('')

let gestureRecognizer = null
let webcamStream = null
let lastVideoTime = -1
let gestureAnimationFrameId = null

const characters = [
  {
    id: 1,
    name: '小球',
    img: null,
    playW: 30,
    playH: 30,
    lobbyW: 100,
    lobbyH: 100,
  },
  {
    id: 2,
    name: '毆必',
    img: '/orbit.png',
    playW: 50,
    playH: 50,
    lobbyW: 200,
    lobbyH: 200,
  },
  {
    id: 3,
    name: '春天',
    img: '/spring.png',
    playW: 50,
    playH: 75,
    lobbyW: 150,
    lobbyH: 225,
  },
  {
    id: 4,
    name: '夏天',
    img: '/summer.png',
    playW: 50,
    playH: 75,
    lobbyW: 150,
    lobbyH: 225,
  },
  {
    id: 5,
    name: '秋天',
    img: '/fall.png',
    playW: 50,
    playH: 75,
    lobbyW: 150,
    lobbyH: 225,
  },
  {
    id: 6,
    name: '冬天',
    img: '/winter.png',
    playW: 50,
    playH: 75,
    lobbyW: 150,
    lobbyH: 225,
  },
]

// 1. 數字關卡與資料庫欄位白名單的對應表
const LEVEL_COLUMN_MAP = {
  0: 'levelnew', // 🌱 新手訓練
  1: 'levelflood', // 💧 波濤洪水
  2: 'levelfire', // 🔥 野火燎原
  3: 'levelwind', // 🌀 狂風大作
  4: 'levelfinal', // ⚡ 最終試煉
}

const updateBackendLevel = async (levelNum, currentScore = 0, charImg = '') => {
  let columnName = LEVEL_COLUMN_MAP[levelNum]
  if (!columnName) return

  // 💡 【新增】如果是結算(levelNum === 4)且開啟了手勢(isWebcamOn)，就把欄位改成 levelgesture
  if (levelNum === 4 && isWebcamOn.value) {
    columnName = 'levelgesture'
  }

  const token = localStorage.getItem('token')
  if (!token) {
    console.log('未登入，通關紀錄將不會同步至資料庫。')
    return
  }

  try {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

    const requestBody = {
      levelColumn: columnName,
    }

    // 💡 【修改】這裡同時支援一般模式與手勢模式上傳分數
    if (columnName === 'levelfinal' || columnName === 'levelgesture') {
      requestBody.score = Math.floor(currentScore)
      requestBody.character = charImg
    }

    const response = await fetch(`${baseURL}/api/score/update-level`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })

    // 防禦機制：先檢查回應狀態碼是否成功
    if (!response.ok) {
      // 如果是 500 或其他錯誤，先嘗試拿文字，避免直接 .json() 崩潰
      const errorText = await response.text()
      console.error(`❌ 後端伺服器回傳錯誤 (狀態碼 ${response.status})`)
      return
    }

    // 確定是 ok (狀態碼 200~299) 之後，再解析 JSON
    const data = await response.json()
    console.log(`✅ 資料庫更新成功：${columnName}`, data.message)
  } catch (err) {
    console.error('連線後端 Score API 發生錯誤:', err)
  }
}

const LEVEL_DATA = {
  1: { title: '💧 波濤洪水', desc: '水位將持續上升，別被淹沒了！' },
  2: { title: '🔥 野火燎原', desc: '部分平台會著火，停留會受傷。' },
  3: { title: '🌀 狂風大作', desc: '強大的陣風會干擾你的跳躍方向。' },
  4: { title: '⚡ 最終試煉', desc: '結合所有災難，挑戰巔峰吧！' },
}

const prevChar = () => {
  selectedCharIndex.value = (selectedCharIndex.value - 1 + characters.length) % characters.length
  updatePlayerSkin()
}

const nextChar = () => {
  selectedCharIndex.value = (selectedCharIndex.value + 1) % characters.length
  updatePlayerSkin()
}

const updatePlayerSkin = () => {
  const char = characters[selectedCharIndex.value]

  // 更新遊戲尺寸
  player.width = char.playW
  player.height = char.playH

  if (char.img) {
    // 如果是圖片角色
    const imagePath = new URL(char.img, import.meta.url).href
    playerImage.onload = () => {
      if (!gameStarted.value) draw()
    }
    playerImage.src = imagePath
  } else {
    // 如果是球（無圖片）
    if (!gameStarted.value) draw()
  }
}

const startGame = () => {
  gameStarted.value = true
  resetGame() // 確保遊戲數據重置
  loop() // 正式開始動畫循環
}

const backToHome = () => {
  if (animationId) cancelAnimationFrame(animationId)

  gameOver.value = false
  gameStarted.value = false
  score.value = 0
  playerLives.value = 2
  waterHeight.value = 0
  activeWaterRise.value = false
  windDirection = 0
  currentLevelName.value = '🌱 新手訓練'

  const char = characters[selectedCharIndex.value]
  player.width = char.playW // 這裡設為小尺寸，確保一開始遊戲就是對的
  player.height = char.playH

  // 設定大廳平台
  const STAGE_Y = 450
  platforms = [
    {
      x: CANVAS_WIDTH / 2 - 40, // 平台可以稍微加寬一點配大角色
      y: STAGE_Y,
      width: 80,
      height: 12,
      isFloor: true,
      isBurning: false,
    },
  ]

  // 3. 讓角色站在平台正上方
  player.x = CANVAS_WIDTH / 2 - player.width / 2
  player.y = STAGE_Y - player.height // 腳底貼齊平台頂部

  player.vx = 0
  player.vy = 0

  draw()
}

let player = {
  x: 260,
  y: 630,
  width: 50,
  height: 75,
  vx: 0,
  vy: 0,
  invincible: false,
}

let platforms = []
let keys = {}
let frameCount = 0
let lastPlatform = { x: 260, y: CANVAS_HEIGHT - 50 }

// 多路线平台生成
const getMultiPathX = (prevPlatforms, currentY) => {
  let lastX =
    prevPlatforms.length > 0 ? prevPlatforms[prevPlatforms.length - 1].x : CANVAS_WIDTH / 2
  const candidates = []
  let leftX = Math.max(0, lastX - 80 - Math.random() * 70)
  let rightX = Math.min(CANVAS_WIDTH - PLATFORM_WIDTH, lastX + 80 + Math.random() * 70)
  let straightX = Math.min(
    CANVAS_WIDTH - PLATFORM_WIDTH,
    Math.max(0, lastX + (Math.random() - 0.5) * 60),
  )
  candidates.push(leftX, straightX, rightX)
  let randomX = Math.random() * (CANVAS_WIDTH - PLATFORM_WIDTH)
  candidates.push(randomX)
  const unique = [...new Set(candidates.map((v) => Math.floor(v)))].filter(
    (x) => x >= 0 && x <= CANVAS_WIDTH - PLATFORM_WIDTH,
  )
  if (unique.length === 0) return CANVAS_WIDTH / 2
  return unique[Math.floor(Math.random() * unique.length)]
}

const initPlatforms = () => {
  platforms = []
  platforms.push({
    x: 0,
    y: CANVAS_HEIGHT - 20,
    width: CANVAS_WIDTH,
    height: 20,
    isFloor: true,
    isBurning: false,
  })

  let lastY = CANVAS_HEIGHT - 20
  let lastPlatformsForRef = [platforms[0]]

  for (let i = 0; i < PLATFORM_COUNT; i++) {
    let newY = lastY - (Math.random() * 40 + 70)
    // 每層生成 2-3 個平台（從一開始就多路徑）
    // 第1、2關：1個40%、2個50%、3個10%
    // 根據關卡決定平台數量
    const level = getCurrentLevel()
    let pathCount
    if (level <= 1) {
      // 第1、2關：1個40%、2個50%、3個10%
      const rand = Math.random()
      if (rand < 0.4) {
        pathCount = 1
      } else if (rand < 0.9) {
        pathCount = 2
      } else {
        pathCount = 3
      }
    } else if (level === 2) {
      // 第3關：2個70%、3個30%
      const rand = Math.random()
      if (rand < 0.7) {
        pathCount = 2
      } else {
        pathCount = 3
      }
    } else {
      // 第4、5關：2個70%、3個30%
      const rand = Math.random()
      if (rand < 0.7) {
        pathCount = 2
      } else {
        pathCount = 3
      }
    }
    for (let j = 0; j < pathCount; j++) {
      let newX = Math.random() * (CANVAS_WIDTH - PLATFORM_MAX_WIDTH)
      let widthVar = PLATFORM_MIN_WIDTH + Math.random() * (PLATFORM_MAX_WIDTH - PLATFORM_MIN_WIDTH)
      platforms.push({
        x: newX,
        y: newY,
        width: widthVar,
        height: 12,
        isBurning: false,
      })
    }
    lastY = newY
    lastPlatformsForRef = platforms.slice(-3)
  }
}

const getCurrentLevel = () => {
  const alt = score.value
  if (alt < 200) return 0 // 🌱 新手訓練
  if (alt < 400) return 1 // 💧 波濤洪水
  if (alt < 600) return 2 // 🔥 野火燎原
  if (alt < 800) return 3 // 🌀 狂風大作
  return 4 // ⚡ 最終試煉
}

const currentLevelName = ref('🌱 新手訓練')

const updateLevelEffects = () => {
  const level = getCurrentLevel()
  switch (level) {
    case 0:
      currentLevelName.value = '🌱 新手訓練'
      activeWaterRise.value = false
      break
    case 1:
      currentLevelName.value = '💧 波濤洪水'
      activeWaterRise.value = true
      // 不要重置 waterHeight，讓它保持連續上升
      currentWaterRiseSpeed = 0.9
      break
    case 2:
      currentLevelName.value = '🔥 野火燎原'
      activeWaterRise.value = false
      break
    case 3:
      currentLevelName.value = '🌀 狂風大作'
      activeWaterRise.value = false
      break
    case 4:
      currentLevelName.value = '⚡ 最終試煉'
      activeWaterRise.value = true
      currentWaterRiseSpeed = 1.3
      break
  }
}

// 更新着火平台（野火燎原 & 最終試煉）
const updateBurningPlatforms = () => {
  const level = getCurrentLevel()
  const shouldHaveFire = level === 2 || level === 4
  if (!shouldHaveFire) {
    platforms.forEach((p) => {
      if (!p.isFloor) p.isBurning = false
    })
    return
  }
  if (level === 2 || level === 4) {
    const platformsByY = {}
    platforms.forEach((p) => {
      if (!p.isFloor) {
        const yKey = Math.round(p.y).toString()
        if (!platformsByY[yKey]) platformsByY[yKey] = []
        platformsByY[yKey].push(p)
      }
    })

    // 2. 遍歷每一層進行邏輯檢查
    Object.values(platformsByY).forEach((layer) => {
      if (layer.length > 1) {
        // 檢查這一層是否已經有火了
        const hasFire = layer.some((p) => p.isBurning)
        const allBurning = layer.every((p) => p.isBurning)

        // 規則：如果這層一個火都沒有，就隨機挑一個點火[cite: 1]
        if (!hasFire) {
          const luckyIndex = Math.floor(Math.random() * layer.length)
          layer[luckyIndex].isBurning = true
        }

        // 安全機制：如果這層全都著火了，隨機熄滅一個，防止無路可走[cite: 1]
        if (allBurning) {
          const safeIndex = Math.floor(Math.random() * layer.length)
          layer[safeIndex].isBurning = false
        }
      } else {
        // 如果這層只有一個台階，為了公平起見，強制不准著火[cite: 1]
        layer[0].isBurning = false
      }
    })

    // 3. 補火邏輯：如果畫面上著火數量太少，隨機挑選多平台層來點火[cite: 1]
    const nonFloorPlatforms = platforms.filter((p) => !p.isFloor)
    const burningTotal = nonFloorPlatforms.filter((p) => p.isBurning).length

    if (burningTotal < 2) {
      // 只挑選「所在層台階數 > 1」且「目前沒著火」的平台[cite: 1]
      const fireCandidates = nonFloorPlatforms.filter((p) => {
        const yKey = p.y.toFixed(0)
        return !p.isBurning && platformsByY[yKey].length > 1
      })

      if (fireCandidates.length > 0) {
        fireCandidates[Math.floor(Math.random() * fireCandidates.length)].isBurning = true
      }
    }
  }
}

// 重置游戏
const resetGame = () => {
  player.x = 260
  player.y = 600
  player.vx = 0
  player.vy = JUMP_FORCE
  score.value = 0
  gameOver.value = false
  playerLives.value = 2
  frameCount = 0
  waterWorldY = CANVAS_HEIGHT
  waterHeight.value = 0
  activeWaterRise.value = false
  player.invincible = false
  currentWaterRiseSpeed = 0.08
  triggeredLevels.value = []
  generatedBoundaries.value = []
  initPlatforms()
  updateLevelEffects()
}

// 受到伤害
const applyDamage = (amount) => {
  if (player.invincible) return

  playerLives.value -= amount

  // 核心規則：一旦心 <= 0 遊戲結束
  if (playerLives.value <= 0) {
    playerLives.value = 0
    gameOver.value = true

    const currentCharImg = characters[selectedCharIndex.value]?.img || 'BALL'

    // LEVEL_COLUMN_MAP[4] 對應的就是 "levelfinal"
    updateBackendLevel(4, score.value, currentCharImg)

    return
  }

  // 重生位置與微小跳躍力 (避免畫面捲動)
  player.x = lastPlatform.x
  player.y = lastPlatform.y
  player.vy = -3

  player.invincible = true
  setTimeout(() => {
    if (player) player.invincible = false
  }, 1000)
}

const updateWaterRise = () => {
  const level = getCurrentLevel()

  if (!activeWaterRise.value) {
    // 如果水位還在大於 0 的位置，就慢慢減去高度
    if (waterHeight.value > 0) {
      waterHeight.value -= 1.5 // <--- 調整這個數值可以控制退水的速度
    }

    // 確保不會變成負數
    if (waterHeight.value < 0) {
      waterHeight.value = 0
    }
    return
  }

  // 1. 水位自然上升（每幀增加固定像素）- 獨立於玩家移動
  waterHeight.value += currentWaterRiseSpeed

  // 2. 限制水位最大高度，避免直接淹沒全螢幕
  if (waterHeight.value > CANVAS_HEIGHT) {
    waterHeight.value = CANVAS_HEIGHT
  }

  // 3. 判定死亡
  if (player.y + player.height > CANVAS_HEIGHT - waterHeight.value) {
    applyDamage(0.5)
  }
}

const update = () => {
  if (gameOver.value || showLevelPopup.value) return

  const level = getCurrentLevel()
  let currentGravity = GRAVITY
  let currentJumpForce = JUMP_FORCE
  switch (level) {
    case 0: // 🌱 新手訓練
    case 1: // 💧 波濤洪水
      currentGravity = 0.25
      currentJumpForce = -8.5
      break
    case 2: // 🔥 野火燎原
      currentGravity = 0.28 // 數字越大，掉落越快
      currentJumpForce = -8.8 // 負得越多，跳得越高、越猛
      break
    case 3: // 🌀 狂風大作
      currentGravity = 0.32
      currentJumpForce = -9.2
      break
    case 4: // ⚡ 最終試煉 (原本會回到預設值，現在你可以單獨設定它)
      currentGravity = 0.35 // 讓最終關卡手感最沉重
      currentJumpForce = -9.5 // 給予相應的最強彈跳力
      break
  }

  frameCount++

  // 左右移动（💡 整合鍵盤與 AI 手勢控制）
  if (keys['ArrowLeft'] || keys['a'] || gestureDirection.value === 'left') {
    player.vx = -4.5
  } else if (keys['ArrowRight'] || keys['d'] || gestureDirection.value === 'right') {
    player.vx = 4.5
  } else {
    player.vx *= 0.85
  }

  windDirection = 0 // 0: 無風, 1: 右, -1: 左
  if (level === 3 || level === 4) {
    let windSpeed = 0.015
    let windIntensity = 0.8

    if (level === 4) {
      windSpeed = 0.03 // 最終試煉：風向變換頻率加倍
      windIntensity = 1.1 // 最終試煉：風力增強
    }

    const windForce = Math.sin(frameCount * windSpeed) * windIntensity
    player.x += windForce
    windDirection = windForce > 0 ? 1 : -1
  }

  player.x += player.vx
  player.vy += currentGravity
  player.y += player.vy

  // 边界环绕
  if (player.x > CANVAS_WIDTH) player.x = 0
  if (player.x < 0) player.x = CANVAS_WIDTH

  // 屏幕向上滚动（登山核心）
  if (player.y + player.height < CANVAS_HEIGHT * 0.6) {
    let diff = CANVAS_HEIGHT * 0.6 - (player.y + player.height)
    player.y = CANVAS_HEIGHT * 0.6 - player.height

    score.value += diff * 0.1
    const levelThresholds = [200, 400, 600, 800]
    levelThresholds.forEach((threshold, index) => {
      // 1. 檢查分數是否達標
      // 2. 檢查這個門檻是否已經觸發過 (避免重複彈窗)
      if (score.value >= threshold && !triggeredLevels.value.includes(threshold)) {
        // 立即標記為已觸發
        triggeredLevels.value.push(threshold)

        // 根據索引取得對應的關卡資料 (index 0 是 200m，對應 LEVEL_DATA[1])
        const levelNum = index + 1
        if (LEVEL_DATA[levelNum]) {
          nextLevelInfo.value = LEVEL_DATA[levelNum]
          showLevelPopup.value = true
          updateBackendLevel(index)
        }
      }
    })
    platforms.forEach((p) => {
      p.y += diff
      if (p.y > CANVAS_HEIGHT) {
        let highestPlatform = platforms.reduce((prev, curr) => (prev.y < curr.y ? prev : curr))
        let newY = highestPlatform.y - (Math.random() * 50 + 80)

        // 計算新平台對應的高度
        let nextScore = score.value + (CANVAS_HEIGHT - newY) * 0.1

        const targets = [200, 400, 600, 800]

        // 找出下一個還沒生成的門檻
        let targetToGenerate = targets.find(
          (t) => t > score.value && !generatedBoundaries.value.includes(t),
        )

        let altitudeDiff = targetToGenerate - score.value
        let pixelOffset = altitudeDiff / 0.1
        let standardNextY = highestPlatform.y - (Math.random() * 50 + 80)
        let estimatedScore = score.value + (CANVAS_HEIGHT - standardNextY) * 0.1

        // 如果預計分數已經快到門檻了，就強制把平台修正到精確的高度座標
        if (targetToGenerate && pixelOffset > 300 && pixelOffset < 600) {
          generatedBoundaries.value.push(targetToGenerate)

          let distanceToTarget = targetToGenerate - score.value

          let pixelToTarget = distanceToTarget / 0.1

          let preciseY = player.y - pixelToTarget

          platforms.push({
            x: 0,
            y: preciseY, // 使用精確計算的 Y
            width: CANVAS_WIDTH,
            height: 20,
            isFloor: true,
            isBurning: false,
            isBoundary: true,
            targetScore: targetToGenerate,
          })
        } else {
          const level = getCurrentLevel()
          let pathCount
          if (level <= 1) {
            // 第1、2關：1個40%、2個50%、3個10%
            const rand = Math.random()
            if (rand < 0.4) {
              pathCount = 1
            } else if (rand < 0.9) {
              pathCount = 2
            } else {
              pathCount = 3
            }
          } else if (level === 2 || level === 3) {
            // 第3關：2個70%、3個30%
            const rand = Math.random()
            if (rand < 0.7) {
              pathCount = 2
            } else {
              pathCount = 3
            }
          } else {
            // 第4、5關：2個70%、3個30%
            const rand = Math.random()
            if (rand < 0.2) {
              pathCount = 2 // 20% 出現兩個台階
            } else {
              pathCount = 3
            }
          }
          // 3. 計算寬度（在此判斷颱風關卡）
          const extraWidth = level === 3 ? 25 : 0

          // 4. 移除舊平台，創建新的平台
          platforms = platforms.filter((p) => p.y <= CANVAS_HEIGHT)

          // 5. 生成多個新平台
          // 在 update 函式的生成區塊中
          for (let j = 0; j < pathCount; j++) {
            let finalWidth =
              PLATFORM_MIN_WIDTH +
              Math.random() * (PLATFORM_MAX_WIDTH - PLATFORM_MIN_WIDTH) +
              extraWidth
            let newX
            let isOverlapping = true
            let attempts = 0

            while (isOverlapping && attempts < 5) {
              newX = Math.random() * (CANVAS_WIDTH - finalWidth)
              // 檢查是否與同一層（同一個 newY）的其他平台重疊
              isOverlapping = platforms.some(
                (p) =>
                  Math.abs(p.y - newY) < 1 && // 同一層
                  newX < p.x + p.width + 20 && // 加上 20px 的強制間距
                  newX + finalWidth > p.x - 20,
              )
              attempts++
            }

            platforms.push({
              x: newX,
              y: newY,
              width: finalWidth,
              height: 12,
              isFloor: false,
              isBurning: false,
            })
          }
        }
      }
    })

    if (activeWaterRise.value) {
      waterHeight.value -= diff // 當背景向下捲動時，相對於螢幕的水位高度要減少
      if (waterHeight.value < 0) waterHeight.value = 0
    }

    updateLevelEffects()
    // 洪水水位獨立於玩家移動，每幀都更新
    updateWaterRise()
    updateBurningPlatforms()
  }

  // 洪水水位獨立更新（每幀都上升，不依賴於滾動）
  if (player.vy > 0) {
    platforms.forEach((p) => {
      const padding = (player.width - 10) / 2

      if (
        player.x + 10 < p.x + p.width &&
        player.x + player.width - 10 > p.x &&
        player.y + player.height > p.y &&
        player.y + player.height < p.y + p.height + 15
      ) {
        player.vy = currentJumpForce
        lastPlatform.x = player.x
        lastPlatform.y = p.y - player.height

        if (p.isBurning && !p.isFloor) {
          applyDamage(0.5)
        }
      }
    })
  }

  // B. 沒踩到階梯掉到畫面外（或掉進水裡）
  if (player.y > CANVAS_HEIGHT - waterHeight.value) {
    applyDamage(1.5)
  }

  // 洪水水位獨立更新（每幀都上升，不依賴於玩家移動）
  if (activeWaterRise.value) {
    waterHeight.value += currentWaterRiseSpeed
    if (waterHeight.value > CANVAS_HEIGHT) {
      waterHeight.value = CANVAS_HEIGHT
    }
  }
}

// ----- 绘图部分（保留原配色 + 氛围）-----
const playerImage = new Image()
playerImage.src = "/fall.png"

const getLevelForSky = () => {
  const s = score.value
  if (s < 200) return 0 // 新手
  if (s < 400) return 1 // 洪水
  if (s < 600) return 2 // 野火
  if (s < 800) return 3 // 颱風 [建議調整此門檻以對應你的關卡高度]
  return 4 // 最終試煉
}

const LEVEL_SKIES = [
  [
    ['#87ceeb', 0],
    ['#b8dff5', 0.5],
    ['#e8f4fb', 1],
  ], // 新手
  [
    ['#ff7043', 0],
    ['#ff8a65', 0.3],
    ['#ffb74d', 0.65],
    ['#ffd54f', 1],
  ], // 洪水
  [
    ['#311b92', 0],
    ['#4a148c', 0.3],
    ['#880e4f', 0.65],
    ['#e64a19', 1],
  ], // 野火
  [
    ['#455a64', 0],
    ['#607d8b', 0.5],
    ['#90a4ae', 1],
  ], // 颱風 (灰藍色調)
  [
    ['#000010', 0],
    ['#0d0d2b', 0.4],
    ['#1a1a4e', 0.75],
    ['#0d1b3e', 1],
  ], // 最終
]

// 每個索引對應：新手(0)、洪水(1)、野火(2)、颱風(3)、最終(4)
const LEVEL_PLATFORM_COLOR = [
  '#546e7a', // 🌱 新手 (灰藍)
  '#bf360c', // 💧 洪水 (深橘紅)
  '#4a148c', // 🔥 野火 (深紫)
  '#37474f', // 🌀 颱風 (深灰，配合灰藍天空) [新增]
  '#1a237e', // ⚡ 最終 (深藍)
]

const LEVEL_PLATFORM_TOP = [
  '#78909c', // 🌱 頂部
  '#ff7043', // 💧 頂部
  '#9c27b0', // 🔥 頂部
  '#78909c', // 🌀 頂部 [新增]
  '#3949ab', // ⚡ 頂部
]

const draw = () => {
  const skyLevel = getLevelForSky()
  const grad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT)
  LEVEL_SKIES[skyLevel].forEach(([color, stop]) => grad.addColorStop(stop, color))
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  // 夜晚星星
  if (skyLevel === 3) {
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    const stars = [
      [60, 40],
      [140, 80],
      [230, 30],
      [310, 60],
      [400, 20],
      [460, 90],
      [90, 130],
      [260, 110],
      [370, 140],
      [500, 50],
      [180, 160],
      [440, 170],
    ]
    stars.forEach(([sx, sy]) => {
      ctx.globalAlpha = 0.5 + 0.5 * Math.sin(frameCount * 0.05 + sx)
      ctx.fillRect(sx, sy, 2, 2)
    })
    ctx.globalAlpha = 1
  }

  // 云层
  if (skyLevel < 3) {
    const cloudAlpha = skyLevel === 0 ? 0.55 : 0.25
    const clouds = [
      { x: ((frameCount * 0.12 + 80) % (CANVAS_WIDTH + 120)) - 60, y: 80, rx: 70, ry: 22 },
      { x: ((frameCount * 0.07 + 300) % (CANVAS_WIDTH + 120)) - 60, y: 160, rx: 90, ry: 26 },
      { x: ((frameCount * 0.09 + 180) % (CANVAS_WIDTH + 120)) - 60, y: 240, rx: 60, ry: 18 },
    ]
    clouds.forEach((c) => {
      ctx.beginPath()
      ctx.ellipse(c.x, c.y, c.rx, c.ry, 0, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${cloudAlpha})`
      ctx.fill()
    })
  }

  // 绘制平台
  const platformColorSet = LEVEL_PLATFORM_COLOR[Math.min(skyLevel, LEVEL_PLATFORM_COLOR.length - 1)]
  const platformTopSet = LEVEL_PLATFORM_TOP[Math.min(skyLevel, LEVEL_PLATFORM_TOP.length - 1)]

  platforms.forEach((p) => {
    ctx.fillStyle = p.isBurning ? '#d84315' : platformColorSet
    ctx.fillRect(p.x, p.y, p.width, p.height)
    ctx.fillStyle = p.isBurning ? '#ffab40' : platformTopSet
    ctx.fillRect(p.x, p.y, p.width, 3)
    if (p.isBurning && frameCount % 4 === 0) {
      ctx.fillStyle = 'rgba(255, 100, 0, 0.7)'
      ctx.beginPath()
      ctx.moveTo(p.x + p.width / 2, p.y - 2)
      ctx.lineTo(p.x + p.width / 2 - 4, p.y - 8)
      ctx.lineTo(p.x + p.width / 2 + 4, p.y - 8)
      ctx.fill()
    }
  })

  // 在 draw 函式中尋找畫角色的區段
  const char = characters[selectedCharIndex.value]

  if (!char.img) {
    // --- 畫球的邏輯 ---
    ctx.fillStyle = '#ff8a65' // 球的顏色
    ctx.beginPath()

    if (!gameStarted.value) {
      // 大廳展示：畫在舞台中心
      const STAGE_Y = 400
      const radius = char.lobbyW / 2
      ctx.arc(CANVAS_WIDTH / 2, STAGE_Y - radius, radius, 0, Math.PI * 2)
    } else {
      // 遊戲進行中：跟隨玩家座標
      const radius = player.width / 2
      ctx.arc(player.x + radius, player.y + radius, radius, 0, Math.PI * 2)
    }
    ctx.fill()
    ctx.closePath()
  } else if (playerImage.complete && playerImage.naturalWidth > 0) {
    if (!gameStarted.value) {
      // 【大廳展示狀態】使用 lobby 尺寸，並重新計算繪製位置使其置中
      const displayW = char.lobbyW
      const displayH = char.lobbyH
      const STAGE_Y = 450 // 你調整後的舞台高度

      ctx.drawImage(
        playerImage,
        CANVAS_WIDTH / 2 - displayW / 2, // 根據大尺寸置中
        STAGE_Y - displayH, // 腳底踩在舞台上
        displayW,
        displayH,
      )
    } else {
      // 【遊戲進行狀態】使用原始 player 尺寸 (playW/H)
      ctx.drawImage(playerImage, player.x, player.y, player.width, player.height)
    }
  } else {
    ctx.fillStyle = 'red'
    ctx.fillRect(player.x, player.y, player.width, player.height)
  }

  // 受傷閃爍
  if (player.invincible && frameCount % 6 < 3) {
    ctx.globalAlpha = 0.5
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(player.x, player.y, player.width, player.height)
    ctx.globalAlpha = 1
  }

  if (gameStarted.value && !gameOver.value) {
    drawWindIndicator(windDirection)
  }
}

// 在 draw 函數末尾添加
const drawWindIndicator = (direction) => {
  if (direction === 0 || !gameStarted.value) return

  ctx.save()
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
  ctx.font = 'bold 24px Arial'
  ctx.textAlign = 'center'

  // 箭頭符號與位置
  const arrow = direction > 0 ? '▶▶ WIND ▶▶' : '◀◀ WIND ◀◀'
  const xPos = CANVAS_WIDTH / 2
  const yPos = 120 // 位於 HUD 下方

  // 加入一點左右晃動的動畫感
  const bounce = Math.sin(frameCount * 0.1) * 5
  ctx.fillText(arrow, xPos + (direction > 0 ? bounce : -bounce), yPos)

  ctx.restore()
}

// 💡 【新增：初始化模型與偵測迴圈】
const initGestureRecognizer = async () => {
  if (gestureRecognizer) return
  isLoadingModel.value = true
  try {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm',
    )
    gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
      numHands: 1,
    })
    console.log('MediaPipe 模型載入成功！')
  } catch (error) {
    console.error('模型載入失敗：', error)
  } finally {
    isLoadingModel.value = false
  }
}

const predictWebcamLoop = () => {
  if (!webcamVideo.value || !gestureRecognizer || !isWebcamOn.value) return

  const video = webcamVideo.value
  if (video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime
    const results = gestureRecognizer.recognizeForVideo(video, Date.now())

    if (results.gestures && results.gestures.length > 0) {
      const topGesture = results.gestures[0][0].categoryName
      const score = results.gestures[0][0].score

      if (score > 0.65) {
        // 1. 判斷是否為「比讚」：負責關閉彈窗 (Enter)
        if (topGesture === 'Thumb_Up') {
          if (showLevelPopup.value) {
            showLevelPopup.value = false
            currentGestureDisplay.value = '👍 確認 (關閉彈窗)'
          } else {
            currentGestureDisplay.value = '👍 (無動作)'
          }
          gestureDirection.value = '' // 比讚時不移動
        }

        // 2. 判斷是否為「向上指」：負責向左移動
        else if (topGesture === 'Pointing_Up') {
          gestureDirection.value = 'left'
          currentGestureDisplay.value = '☝️ 向左'
        }

        // 3. 判斷是否為「比耶」：負責向右移動
        else if (topGesture === 'Victory') {
          gestureDirection.value = 'right'
          currentGestureDisplay.value = '✌️ 向右'
        }

        // 4. 其他手勢：不動作
        else {
          gestureDirection.value = ''
          currentGestureDisplay.value = topGesture // 顯示偵測到的其他手勢名稱
        }
      } else {
        // 信心分數不夠時，清除所有動作
        gestureDirection.value = ''
        currentGestureDisplay.value = ''
      }
    }
  }

  if (isWebcamOn.value) {
    gestureAnimationFrameId = requestAnimationFrame(predictWebcamLoop)
  }
}

// 💡 【新增：處理滑桿切換】
const handleWebcamToggle = async () => {
  // 注意：這裡 isWebcamOn 的值已經被 v-model 改變了
  if (!isWebcamOn.value) {
    // 關閉邏輯
    gestureDirection.value = ''
    currentGestureDisplay.value = ''
    if (gestureAnimationFrameId) cancelAnimationFrame(gestureAnimationFrameId)
    if (webcamStream) {
      webcamStream.getTracks().forEach((track) => track.stop())
    }
  } else {
    // 開啟邏輯
    await initGestureRecognizer()
    await nextTick()

    try {
      webcamStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240 },
      })
      if (webcamVideo.value) {
        webcamVideo.value.srcObject = webcamStream
        webcamVideo.value.addEventListener('loadeddata', predictWebcamLoop)
      }
    } catch (err) {
      console.error('無法啟動 WebCam:', err)
      isWebcamOn.value = false // 權限被拒絕，把開關切回去
      alert('請允許網頁存取相機權限！')
    }
  }
}

const loop = () => {
  update()
  draw()
  animationId = requestAnimationFrame(loop)
}

onMounted(() => {
  ctx = gameCanvas.value.getContext('2d')
  window.addEventListener('keydown', (e) => {
    keys[e.key] = true

    if (e.key === 'Enter' && showLevelPopup.value) {
      showLevelPopup.value = false
    }
  })
  window.addEventListener('keyup', (e) => {
    keys[e.key] = false
  })

  // 確保一進網頁，角色就在中間
  backToHome()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  if (gestureAnimationFrameId) cancelAnimationFrame(gestureAnimationFrameId)
  if (webcamStream) {
    webcamStream.getTracks().forEach((track) => track.stop())
  }
})
</script>

<style scoped>
.game-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.game-content-area {
  position: relative;
}
.game-container {
  position: relative;
  width: 520px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(0, 229, 255, 0.25);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.6),
    0 0 30px rgba(0, 200, 230, 0.15),
    0 24px 64px rgba(0, 0, 0, 0.55);
}
.nav-buttons {
  position: absolute;
  top: 70px; /* 調整到 HUD 下方一點的位置 */
  left: 16px;
  z-index: 40; /* 確保在選單層之上 */
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.nav-sidebar {
  position: absolute;
  /* 往左推移，拉開與畫布的距離 (130px 足以放下按鈕) */
  left: -130px;
  top: 70px;
  z-index: 40;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  /* 鎖定寬度讓側邊欄看起來比較整齊 */
  width: 110px;
  box-sizing: border-box;

  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 229, 255, 0.3);
  border-radius: 8px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}
.nav-btn:hover {
  /* 懸停時變亮並增加霓虹邊框感 */
  background: rgba(0, 229, 255, 0.2);
  border-color: #00e5ff;
  box-shadow: 0 0 10px rgba(0, 229, 255, 0.4);
  transform: translateY(-2px);
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
  background: linear-gradient(to bottom, rgba(8, 20, 32, 0.7) 0%, transparent 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  display: block;
  height: 60px;
}
.health-area {
  position: absolute;
  left: 16px;
  top: 15px;
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
  position: absolute;
  left: 50%;
  top: 12px; /* 與 hud 的 padding 保持一致 */
  transform: translateX(-50%);
  text-align: center;
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
  color: rgba(255, 255, 255, 0.55);
}
.level-area {
  position: absolute;
  right: 16px;
  top: 12px;
  background: rgba(0, 0, 0, 0.55);
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
  padding: 30px 40px;
  text-align: center;
  min-width: 280px;
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
  margin: 0 0;
}
.go-score {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.5);
  padding: 5px;
  margin-bottom: 10px;
}
.go-number {
  color: #ff6b35;
  font-size: 20px;
}
.restart-btn {
  display: flex;
  justify-content: center;
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
  width: 100%;
  box-sizing: border-box;
}
.restart-icon {
  animation: bounce 1.5s infinite;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
.gameover-enter-active,
.gameover-leave-active {
  transition: opacity 0.4s ease;
}
.gameover-enter-from,
.gameover-leave-to {
  opacity: 0;
}

.start-menu-overlay {
  position: absolute;
  /* 使用 inset 只覆蓋 Canvas 區域，或調整背景透明度 */
  inset: 0;
  /* 改為較透明的背景，讓玩家看得到天空背景 */
  background: rgba(6, 12, 20, 0.4);
  /* 移除強烈的模糊，或者調小數值 */
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  /* z-index 要低於導覽按鈕(40)，但高於 Canvas */
  z-index: 30;
}

.menu-panel {
  text-align: center;
  /* 增加一點深色對比，確保選單文字清晰 */
  background: rgba(13, 26, 36, 0.95);
  padding: 40px;
  border-radius: 16px;
  border: 1px solid rgba(0, 229, 255, 0.3);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
}

.character-grid {
  display: flex;
  gap: 20px;
  margin: 30px 0;
  justify-content: center;
}

.char-card {
  padding: 15px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.char-card.active {
  border-color: #00e5ff;
  background: rgba(0, 229, 255, 0.1);
  transform: scale(1.1);
}

.char-icon {
  font-size: 40px;
  margin-bottom: 8px;
}

.char-name {
  color: #fff;
  font-size: 14px;
}

.start-btn {
  background: #00e5ff;
  color: #000;
  border: none;
  padding: 12px 30px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* 首頁層級 */
.home-menu-layer {
  position: absolute;
  inset: 0;
  z-index: 30;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 讓 UI 集中在下方 */
  padding-bottom: 80px;
  background: transparent;
  backdrop-filter: none;
  pointer-events: none;
}

/* 角色切換器容器 */
.character-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
  pointer-events: auto;
}

.arrow-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(0, 229, 255, 0.5);
  color: #00e5ff;
  font-size: 24px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-btn:hover {
  background: #00e5ff;
  color: #000;
  box-shadow: 0 0 15px #00e5ff;
}

.char-name-tag {
  background: rgba(0, 0, 0, 0.6);
  padding: 8px 24px;
  border-radius: 20px;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 大播放按鈕 */
.big-play-btn {
  align-self: center;
  background: linear-gradient(135deg, #00e5ff, #00b4dc);
  border: none;
  padding: 15px 60px;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 229, 255, 0.4);
  transition: transform 0.2s;
  pointer-events: auto;
}

.big-play-btn:hover {
  transform: scale(1.1);
}

.play-icon {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 28px;
  color: #000;
  letter-spacing: 2px;
}

.back-home-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 12px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.7);
  padding: 12px 28px;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 20px;
  transition: all 0.2s;
  box-sizing: border-box;
}

.back-home-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-color: #fff;
}

.go-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 20px 0;
}

.level-popup-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.level-popup-panel {
  background: linear-gradient(145deg, #1a2a3a, #0d1a24);
  border: 2px solid #00e5ff;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 0 30px rgba(0, 229, 255, 0.3);
  max-width: 80%;
}

.lp-eyebrow {
  color: #00e5ff;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 4px;
  font-size: 14px;
  margin-bottom: 10px;
}

.lp-title {
  color: #fff;
  font-size: 32px;
  margin: 0 0 15px 0;
}

.lp-desc {
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 25px;
}

.lp-hint {
  color: #ffd966;
  font-size: 14px;
  animation: pulse 1.5s infinite;
}

.gesture-sidebar {
  position: absolute;
  /* 往右推移，拉開與畫布的距離，對稱於左側的 -130px */
  right: -140px;
  top: 70px;
  z-index: 40;
  display: flex;
  flex-direction: column;
}

.gesture-panel {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 229, 255, 0.3);
  border-radius: 8px;
  padding: 12px;
  width: 120px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.gesture-header {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

/* 💡 【新增：滑桿樣式 (Toggle Switch)】 */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #374151;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #00e5ff;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 24px;
}

.slider.round:before {
  border-radius: 50%;
}

.toggle-text {
  color: #aaa;
  font-size: 12px;
}

/* 狀態與視訊 */
.gesture-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 8px;
  margin-top: 5px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 10px;
}

.gesture-status {
  font-size: 12px;
  text-align: center;
}
.gesture-status.loading {
  color: #fbbf24;
}
.gesture-status.active {
  color: #10b981;
  font-weight: bold;
}

.webcam-preview-wrapper {
  width: 100%;
  height: 70px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(0, 229, 255, 0.5);
  background: #000;
  transform: scaleX(-1); /* 鏡像反轉 */
}

.webcam-preview-wrapper video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gesture-guide {
  width: 100%;
  margin-top: 8px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.05); /* 淡淡的透明背景 */
  border: 1px dashed rgba(0, 229, 255, 0.3); /* 科技感的虛線邊框 */
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-sizing: border-box;
}

.guide-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #ccc;
  letter-spacing: 1px;
}

.guide-item span:first-child {
  font-size: 14px; /* 讓 Emoji 大一點 */
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* 新增小於 435px 的響應式設計 */
@media (max-width: 790px) {
  .nav-sidebar {
    /* 縮短與畫布的距離，避免小螢幕時超出手機邊界 */
    left: -55px;
    top: 70px;
    gap: 10px;
  }

  .nav-btn {
    /* 將寬度縮小為正方形，剛好容納 Icon */
    width: 42px;
    height: 42px;
    padding: 0;
    font-size: 18px; /* 稍微放大圖標讓手指好點擊 */
    border-radius: 50%; /* 也可以選擇維持 8px，圓形(50%)在純 Icon 時視覺效果較佳 */
  }

  /* 隱藏中文字 */
  .nav-text {
    display: none;
  }

  .gesture-sidebar {
    right: -60px; /* 小螢幕時縮小距離 */
  }
  .gesture-panel {
    width: 50px;
    padding: 8px 4px;
  }
  .gesture-header,
  .toggle-text,
  .gesture-status,
  .webcam-preview-wrapper {
    display: none; /* 小螢幕可能塞不下，可以選擇只保留開關，或隱藏整體 */
  }
  .switch {
    width: 40px;
    height: 20px;
  }
  .slider:before {
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
  }
  input:checked + .slider:before {
    transform: translateX(20px);
  }
  .gesture-guide {
    display: none;
  }
}
</style>

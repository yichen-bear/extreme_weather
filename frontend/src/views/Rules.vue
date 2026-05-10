<template>
  <div class="rules-page">
    <div class="bg-scanline"></div>

    <div class="rules-container">
      <header class="rules-header">
        <div class="header-left">
          <h1 class="page-title">遊戲規則</h1>
          <div class="title-line"></div>
        </div>
        <button class="back-btn" @click="$router.push('/')">返回首頁</button>
      </header>

      <main class="rules-layout">
        <section class="info-section">
          <h2 class="section-label">操作方式</h2>
          <div class="control-content">
            <div class="control-group">
              <div class="keys">
                <span class="key">←</span>
                <span class="key">→</span>
              </div>
              <p>左右移動</p>
            </div>
            <div class="control-group">
              <div class="keys">
                <span class="key">A</span>
                <span class="key">D</span>
              </div>
              <p>左右移動</p>
            </div>
            <div class="special-rule">
              <span class="icon">⇄</span>
              <p>畫面左右互相連通</p>
            </div>
          </div>
        </section>

        <section class="info-section">
          <h2 class="section-label">關卡內容</h2>
          <div class="level-list">
            <div class="level-item">
              <span class="level-num">01</span>
              <div class="level-info">
                <h3>新手訓練</h3>
                <p>熟悉遊戲玩法</p>
              </div>
            </div>
            <div class="level-item">
              <span class="level-num">02</span>
              <div class="level-info">
                <h3>波濤洪水</h3>
                <p>畫面底下會有水往上漲</p>
              </div>
            </div>
            <div class="level-item">
              <span class="level-num">03</span>
              <div class="level-info">
                <h3>野火燎原</h3>
                <p>部分台階著火，避免踩到</p>
              </div>
            </div>
            <div class="level-item">
              <span class="level-num">04</span>
              <div class="level-info">
                <h3>狂風大作</h3>
                <p>有方向變換的風會阻撓移動</p>
              </div>
            </div>
            <div class="level-item">
              <span class="level-num">05</span>
              <div class="level-info">
                <h3>最終試煉</h3>
                <p>所有關卡的合體，看你能撐多久！！</p>
              </div>
            </div>
          </div>
        </section>

        <div class="right-col">
          <section class="info-section">
            <h2 class="section-label">遊戲結束標準</h2>
            <div class="health-content">
              <div class="total-health">初始生命值：❤❤</div>
              <div class="damage-table">
                <div class="damage-row">
                  <span class="event">碰到洪水</span>
                  <span class="cost">-0.5 ❤</span>
                </div>
                <div class="damage-row">
                  <span class="event">碰到著火台階</span>
                  <span class="cost">-0.5 ❤</span>
                </div>
                <div class="damage-row">
                  <span class="event">掉落台階</span>
                  <span class="cost">-1.5 ❤</span>
                </div>
              </div>
              <div class="death-note">❤ 變為 0 則遊戲結束</div>
            </div>
          </section>
        </div>
      </main>
      <div class="btn-container">
        <button class="play-game-btn" @click="$router.push('/game')">
          <span class="btn-text">進入遊戲</span>
          <span class="btn-sub">START CLIMBING</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rules-page {
  --c-bg: #080c10;
  --c-accent: #00e5ff;
  --c-warn: #ff5722;
  --c-border: rgba(255, 255, 255, 0.1);

  position: fixed;
  inset: 0;
  background-color: transparent;
  color: #fff;

  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 80px 40px 100px;
  box-sizing: border-box;
  font-family: 'Segoe UI', sans-serif;
  z-index: 10;
}

.bg-scanline {
  position: fixed;
  inset: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%);
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 0;
}

.rules-container {
  width: 100%;
  max-width: 1400px;
  flex-shrink: 0;
  z-index: 1;
}

.rules-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
}

.page-title {
  font-size: 42px;
  margin: 0;
  letter-spacing: 2px;
}

.title-line {
  width: 60px;
  height: 4px;
  background: var(--c-accent);
  margin-top: 10px;
  margin-bottom: 30px;
}

.back-btn {
  background: transparent;
  border: 1px solid var(--c-border);
  color: #888;
  padding: 8px 20px;
  cursor: pointer;
  transition: all 0.2s;
}
.back-btn:hover {
  border-color: #fff;
  color: #fff;
}

/* 佈局 */
.rules-layout {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.2fr;
  gap: 24px;
  align-items: stretch;
}

.info-section {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--c-border);
  padding: 30px;
  border-radius: 8px;
  height: 100%;
  box-sizing: border-box;
}

.section-label {
  font-size: 13px;
  color: var(--c-accent);
  margin: 0 0 25px 0;
  letter-spacing: 2px;
  font-weight: 600;
}

/* 操作 */
.control-group {
  margin-bottom: 25px;
}
.key {
  display: inline-block;
  min-width: 40px;
  height: 40px;
  border: 2px solid #fff;
  border-radius: 6px;
  text-align: center;
  line-height: 38px;
  margin-right: 8px;
  font-weight: bold;
}
.control-group p {
  color: #aaa;
  margin: 10px 0 0;
  font-size: 14px;
}

.special-rule {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid var(--c-border);
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--c-accent);
  font-size: 14px;
}

/* 關卡 */
.level-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.level-item {
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.03);
}
.level-num {
  font-size: 18px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.2);
}
.level-info h3 {
  margin: 0;
  font-size: 18px;
}
.level-info p {
  margin: 4px 0 0;
  color: #888;
  font-size: 14px;
}
.final {
  border: 1px solid rgba(255, 87, 34, 0.4);
  background: rgba(255, 87, 34, 0.05);
}

/* 右側欄與按鈕 */
.right-col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.total-health {
  font-size: 22px;
  color: #ff4081;
  margin-bottom: 20px;
  text-align: center;
}
.damage-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid var(--c-border);
  font-size: 15px;
}
.cost {
  color: var(--c-warn);
  font-weight: bold;
}
.death-note {
  text-align: center;
  color: #00e5ff;
  font-size: 13px;
  margin-top: 20px;
}

/* 遊戲按鈕 */
.play-game-btn {
    min-width: 250px;
  background: var(--c-accent);
  color: #000;
  border: none;
  padding: 24px;
  border-radius: 8px;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.play-game-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 229, 255, 0.3);
}

.btn-text {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 2px;
}
.btn-sub {
  font-size: 11px;
  margin-top: 4px;
  opacity: 0.7;
  font-weight: bold;
}

.btn-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

@media (max-width: 1100px) {
  .rules-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  .rules-page {
    padding-top: 80px;
  }
}
</style>

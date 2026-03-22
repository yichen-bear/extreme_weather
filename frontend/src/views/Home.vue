<template>
  <div class="hero">
    <div class="sdg-badge">
      <span class="sdg-dot"></span>
      SDG 13 · Climate Action
    </div>

    <h1 class="title">
      Climate
      <span>Ascent</span>
    </h1>

    <p class="subtitle">
      探索極端氣候數據，化身氣候時代的攀登者——<br />
      用互動遊戲理解地球的警訊
    </p>

    <div class="divider"><span class="divider-text">選擇入口</span></div>

    <div class="cta-group">
      <router-link to="/dashboard" class="cta-btn dashboard">
        <div class="btn-icon">◉</div>
        <div class="btn-label">Explore</div>
        <div class="btn-title">Dashboard</div>
        <div class="btn-desc">極端氣候事件<br />互動資料儀表板</div>
        <span class="btn-arrow">→</span>
      </router-link>

      <router-link to="/game" class="cta-btn game">
        <div class="btn-icon">▲</div>
        <div class="btn-label">Play</div>
        <div class="btn-title">Ascent</div>
        <div class="btn-desc">垂直跳躍闖關<br />穿越氣候時代</div>
        <span class="btn-arrow">→</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.hero {
  width: 100%;
  max-width: 1200px;
  
  /* 當寬度超過 1200px 時，自動左右置中容器本身 */
  margin: 0 auto;

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;    
  justify-content: center; 
  
  position: relative; 
  text-align: center; 
  z-index: 2;
}
/* SDG badge */

.sdg-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(0, 229, 255, 0.25);
  border-radius: 2px;
  padding: 5px 14px;
  margin-bottom: 32px;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--c-accent);
  opacity: 0;
  animation: fadeUp 0.6s ease forwards 0.2s;
}

.sdg-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-accent);
  animation: pulse 2s ease-in-out infinite;
}

/* Title */
.title {
  font-family: var(--font-disp);
  font-size: clamp(72px, 12vw, 148px);
  line-height: 0.9;
  color: #fff;
  letter-spacing: 0.02em;
  opacity: 0;
  animation: fadeUp 0.7s ease forwards 0.4s;
}

.title span {
  display: block;
  color: var(--c-accent);
  -webkit-text-stroke: 1px var(--c-accent);
  color: transparent;
}

/* Subtitle */
.subtitle {
  margin: 20px auto 0 auto;
  text-align: center;
  font-size: 15px;
  font-weight: 300;
  color: var(--c-text);
  letter-spacing: 0.04em;
  max-width: 500px;
  line-height: 1.7;
  opacity: 0;
  animation: fadeUp 0.7s ease forwards 0.6s;
}

/* ── Divider ── */

.divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 36px auto;
  width: 260px;
  opacity: 0;
  animation: fadeUp 0.7s ease forwards 0.75s;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--c-muted));
}

.divider::after {
  background: linear-gradient(90deg, var(--c-muted), transparent);
}

.divider-text {
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--c-muted);
  text-transform: uppercase;
}

/* ── CTA buttons ── */

.cta-group {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeUp 0.7s ease forwards 0.9s;
}

.cta-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  padding: 20px 24px;
  border: 1px solid var(--c-muted);
  background: rgba(15, 31, 46, 0.6);
  backdrop-filter: blur(12px);
  color: var(--c-text);
  text-decoration: none;
  cursor: pointer;
  border-radius: 3px;
  overflow: hidden;
  transition:
    border-color 0.3s,
    transform 0.3s;
}

.cta-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--btn-glow, rgba(0, 229, 255, 0.06));
  opacity: 0;
  transition: opacity 0.3s;
}

.cta-btn:hover {
  transform: translateY(-3px);
  border-color: var(--btn-border, var(--c-accent));
}

.cta-btn:hover::before {
  opacity: 1;
}

.cta-btn.dashboard {
  --btn-glow: rgba(0, 229, 255, 0.08);
  --btn-border: var(--c-accent);
}

.cta-btn.game {
  --btn-glow: rgba(255, 107, 53, 0.08);
  --btn-border: var(--c-warn);
}

.btn-icon {
  font-size: 22px;
  margin-bottom: 12px;
  line-height: 1;
}

.btn-label {
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--c-muted);
  margin-bottom: 4px;
}

.btn-title {
  font-family: var(--font-disp);
  font-size: 26px;
  letter-spacing: 0.04em;
  color: #fff;
  line-height: 1;
}

.cta-btn.dashboard .btn-title {
  color: var(--c-accent);
}

.cta-btn.game .btn-title {
  color: var(--c-warn);
}

.btn-desc {
  margin-top: 8px;
  font-size: 12px;
  font-weight: 300;
  color: var(--c-muted);
  line-height: 1.5;
}

.btn-arrow {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 16px;
  opacity: 0;
  transform: translateX(-6px);
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.cta-btn:hover .btn-arrow {
  opacity: 1;
  transform: translateX(0);
}

.cta-btn.dashboard .btn-arrow {
  color: var(--c-accent);
}

.cta-btn.game .btn-arrow {
  color: var(--c-warn);
}

/* corner accent */

.cta-btn::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 28px;
  height: 28px;
  border-top: 1px solid var(--btn-border, var(--c-accent));
  border-right: 1px solid var(--btn-border, var(--c-accent));
  opacity: 0;
  transition: opacity 0.3s;
}

.cta-btn:hover::after {
  opacity: 1;
}

/* ── Footer hint ── */

.footer-hint {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--c-muted);
  z-index: 2;
  opacity: 0;
  animation: fadeUp 0.7s ease forwards 1.2s;
}

.footer-hint span {
  color: rgba(200, 220, 232, 0.4);
}

/* ── Stat ticker ── */

.stat-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 36px;
  z-index: 2;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(6, 12, 20, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  overflow: hidden;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards 1.4s;
}

.stat-track {
  display: flex;
  gap: 60px;
  white-space: nowrap;
  animation: ticker 30s linear infinite;
}

.stat-item {
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--c-muted);
}

.stat-item strong {
  color: var(--c-warn);
  font-weight: 500;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.4;
    transform: scale(0.7);
  }
}

@keyframes ticker {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}
</style>

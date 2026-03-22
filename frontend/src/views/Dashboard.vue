<template>
  <div class="page-container dashboard-view">
    <header class="page-header">
      <div class="sdg-badge">Global Data Center</div>
      <h2 class="page-title">極端氣候<span>觀測站</span></h2>
      <router-link to="/" class="back-link">← 返回控制台</router-link>
    </header>

    <div class="grid-layout">
      <section class="stats-grid">
        <div v-for="n in 3" :key="n" class="data-card">
          <div class="card-label">MEASUREMENT 0{{ n }}</div>
          <div class="card-value">{{ (1.2 + n * 0.1).toFixed(1) }}°C</div>
          <div class="card-footer">關鍵升溫臨界點分析</div>
        </div>
      </section>

      <section class="chart-main">
        <div class="chart-placeholder">
          <div class="scanner"></div>
          <p>正在加載全球極端降雨趨勢圖...</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 5;
  position: relative;
}
.page-title {
  font-family: var(--font-disp);
  font-size: 48px;
  margin-bottom: 20px;
}
.page-title span {
  color: var(--c-accent);
  margin-left: 10px;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  margin-top: 30px;
}

.data-card {
  background: rgba(15, 31, 46, 0.6);
  border-left: 3px solid var(--c-accent);
  padding: 20px;
  margin-bottom: 15px;
}

.card-label {
  font-size: 11px;
  color: var(--c-muted);
}
.card-value {
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  margin: 8px 0;
}

.chart-placeholder {
  height: 400px;
  background: rgba(10, 21, 32, 0.8);
  border: 1px dashed var(--c-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.scanner {
  position: absolute;
  top: 0;
  width: 100%;
  height: 2px;
  background: var(--c-accent);
  opacity: 0.3;
  animation: scan 3s linear infinite;
}

@keyframes scan {
  from {
    top: 0;
  }
  to {
    top: 100%;
  }
}
</style>

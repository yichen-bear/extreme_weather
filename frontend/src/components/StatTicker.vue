<template>
  <div class="stat-bar">
    <div class="stat-track">
      <span v-for="(stat, index) in stats" :key="index" class="stat-item">
        {{ stat.label }}：<strong>{{ stat.val }}</strong>
      </span>
      <span v-for="(stat, index) in stats" :key="'dup-' + index" class="stat-item">
        {{ stat.label }}：<strong>{{ stat.val }}</strong>
      </span>
    </div>
  </div>
</template>

<script setup>
const stats = [
  { label: '2023 年全球氣候災害', val: '398 起' },
  { label: '卡特里娜颶風死亡人數', val: '1,800 人' },
  { label: '澳洲野火受損面積', val: '1,860 萬公頃' },
  { label: '巴基斯坦洪水影響人口', val: '3,300 萬人' },
  { label: '氣候災害增幅', val: '5 倍' },
  { label: '全球平均溫度上升', val: '+1.2°C' },
]
</script>

<style scoped>
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
  color: #4a6070;
}
.stat-item strong {
  color: #ff6b35;
  font-weight: 500;
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

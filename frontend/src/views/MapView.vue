<template>
  <div class="disaster-map-container">
    <div class="main-content">
      
      <div class="sidebar">
        <br><h2 style="text-align:center">災害分布地圖</h2>
        
        <div class="legend">
          <div class="legend-item" @click="toggleMap('wildfire')" :class="{ active: currentActive === 'wildfire' }">
            <span class="dot red"></span> 野火 (Wildfire)
          </div>

          <div class="legend-item" @click="toggleMap('flood')" :class="{ active: currentActive === 'flood' }">
            <span class="dot blue"></span> 洪水 (Flood)
          </div>

          <div class="legend-item" @click="toggleMap('storm')" :class="{ active: currentActive === 'storm' }">
            <span class="dot yellow"></span> 颱風/颶風 (Storm)
          </div>
        </div>
      </div>

      <div class="map-area">
        <div class="map-stack">
        <img src="/images/map-base.png" class="map-layer base-layer">
  
        <img src="/images/map-red.png" class="map-layer" :class="{ 'is-visible': currentActive === 'wildfire' }">
        <img src="/images/map-blue.png" class="map-layer" :class="{ 'is-visible': currentActive === 'flood' }">
        <img src="/images/map-yellow.png" class="map-layer" :class="{ 'is-visible': currentActive === 'storm' }">
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 我們只用一個變數來記錄「現在到底是誰在亮」
// 'none' 代表大家都沒亮（灰色地圖）
const currentActive = ref('none');

const toggleMap = (type) => {
  if (currentActive.value === type) {
    // 如果點的是「已經在亮」的按鈕，就關掉它變回灰色
    currentActive.value = 'none';
  } else {
    // 如果點的是「別的」按鈕，就直接把目前狀態改成新的那個
    // 舊的按鈕因為不再符合條件，顏色就會自動消失
    currentActive.value = type;
  }
};
</script>

<style scoped>
/* 讓大盒子變成橫向排列 */
.main-content {
  display: flex;
  align-items: flex-start; /* 讓內容靠頂部對齊 */
  gap: 40px;               /* 左右兩邊的間距 */
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

/* 左側欄寬度設定 */
.sidebar {
  flex: 0 0 200px;         /* 固定左邊寬度為 250px */
  text-align: left;        /* 文字靠左對齊 */
}

.sidebar h2 {
  margin-top: 0;
  font-size: 1.5rem;
  line-height: 1.4;
  margin-bottom: 30px;
}

/* 讓圖例垂直排列 */
.legend {
  display: flex;
  flex-direction: column;  /* 改為垂直堆疊 */
  gap: 15px;
}

/* 右側地圖區域自動填滿剩餘空間 */
.map-area {
  flex: 1;
  display: flex;
}

/* 地圖疊疊樂維持原樣，但確保寬度 100% */
.map-stack {
  position: relative;
  width: 100%;
  max-width: 1200px;
}

.map-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.base-layer {
  opacity: 1;
  position: relative;
}

.map-layer.is-visible {
  opacity: 1;
}

/* 圖例按鈕微調 */
.legend-item {
  cursor: pointer;
  padding: 6px 12px;
  font-size: 14px;

  border: 1px solid #eee;
  border-radius: 6px;
  transition: 0.3s;
  display: flex;
  align-items: center;
}

.legend-item:hover {
  background-color: #818181;
}

.legend-item.active {
  background-color: #a9a7a7;
  border-color: #cccccc;
}

.dot {
  height: 12px;
  width: 12px;
  border-radius: 2px;
  display: inline-block;
  margin-right: 10px;
}
.red { background-color: #ff7675; }
.blue { background-color: #74b9ff; }
.yellow { background-color: #f3f378; }
</style>
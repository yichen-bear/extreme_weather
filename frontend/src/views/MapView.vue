<template>
  <div class="disaster-map-container">
    <div class="main-content">
      <div class="sidebar">
        <h2>災害分佈地圖</h2>
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
        <div class="map-stack" :key="currentActive">
          <img src="/images/map-base.png" class="map-layer base-layer" usemap="#disaster-map">
          <img src="/images/map-red.png" class="map-layer" :class="{ 'is-visible': currentActive === 'wildfire' }">
          <img src="/images/map-blue.png" class="map-layer" :class="{ 'is-visible': currentActive === 'flood' }">
          <img src="/images/map-yellow.png" class="map-layer" :class="{ 'is-visible': currentActive === 'storm' }">

          <map name="disaster-map">
            <area v-if="currentActive === 'wildfire'" alt="australiaFIRE" title="australiaFIRE" coords="1626,621,1642,648,1647,663,1645,680,1639,695,1627,704,1618,714,1613,724,1604,731,1591,755,1570,778,1562,744,1551,735,1551,722,1538,719,1533,708,1517,700,1503,704,1485,709,1474,717,1455,719,1442,720,1439,706,1444,687,1441,668,1445,645,1463,633,1492,623,1504,609,1517,596,1530,589,1548,581,1565,577,1581,577,1575,599,1594,613,1605,589,1612,573,1621,591,1624,605,1623,621,1643,649" shape="poly" @click.prevent="openModal('australiaFIRE')">
            <area v-if="currentActive === 'flood'" alt="southAsiaFLOOD" title="southAsiaFLOOD" coords="1252,295,1240,276,1224,266,1205,274,1205,287,1200,301,1191,306,1167,313,1172,327,1167,340,1186,340,1199,341,1200,349,1210,356,1216,365,1229,365,1234,373,1236,383,1237,394,1244,410,1248,423,1255,434,1264,448,1287,465,1275,407,1282,392,1291,378,1299,372,1309,364,1323,356,1328,346,1335,356,1343,337,1351,324,1346,313,1333,319,1325,325,1311,330,1301,325,1287,319,1269,313,1256,301,1244,285,1245,284" shape="poly" @click.prevent="openModal('southAsiaFLOOD')">
            <area v-if="currentActive === 'flood'" alt="chinaFLOOD" title="chinaFLOOD" coords="1416,207,1397,194,1409,180,1424,168,1438,181,1461,199,1481,202,1488,211,1481,227,1465,248,1454,255,1433,256,1436,265,1456,269,1457,284,1478,325,1461,355,1427,390,1408,359,1378,362,1364,353,1363,331,1347,313,1313,331,1277,318,1251,302,1227,271,1223,245,1243,223,1256,203,1285,215,1291,226,1302,234,1320,224,1330,242,1381,240,1397,235,1405,218,1400,219,1410,215" shape="poly" @click.prevent="openModal('chinaFLOOD')">
            <area v-if="currentActive === 'wildfire'" alt="usaFIRE" title="usaFIRE" coords="361,194,264,194,232,204,225,233,219,254,224,274,245,297,289,300,312,311,324,329,353,316,375,305,398,305,407,321,409,335,419,333,414,303,436,288,452,270,465,250,481,242,497,230,508,215,527,212,534,190,505,200,462,222,428,235,440,216,403,192,380,192" shape="poly" @click.prevent="openModal('usaFIRE')">
            <area v-if="currentActive === 'wildfire'" alt="southEU1" title="southEU1" coords="874,212,879,197,861,189,852,188,839,193,824,197,829,209,836,218,834,229,820,231,797,231,796,242,794,256,797,268,804,272,813,274,834,271,844,247,855,237,863,228,876,228" shape="poly" @click.prevent="openModal('southEU')">
            <area v-if="currentActive === 'wildfire'" alt="southEU2" title="southEU2" coords="882,211,894,208,906,208,902,216,915,233,923,241,931,249,922,259,917,269,909,254,904,262,906,238,894,224,890,216,886,238,893,261,875,221,877,216" shape="poly" @click.prevent="openModal('southEU')">
            <area v-if="currentActive === 'wildfire'" alt="southEU3" title="southEU3" coords="1049,238,1024,244,992,239,984,246,979,233,968,234,950,242,941,249,942,258,949,266,955,273,963,258,963,244,977,254,981,262,987,268,1005,271,1021,271,1037,265,1049,266,1059,265,1068,263,1064,252,1057,241" shape="poly" @click.prevent="openModal('southEU')">
            <area v-if="currentActive === 'storm'" alt="1eastAsiaTYPHOON" title="1eastAsiaTYPHOON" coords="1423,170,1413,177,1402,189,1404,197,1413,212,1389,234,1329,241,1321,228,1303,225,1262,194,1244,210,1243,220,1241,236,1231,252,1235,264,1254,303,1294,322,1337,317,1335,317,1364,344,1369,357,1394,359,1415,363,1421,378,1426,389,1447,370,1463,352,1477,327,1453,287,1455,269,1434,263,1441,253,1452,253,1465,248,1484,218,1481,207,1458,196,1423,169,1423,170" shape="poly" @click.prevent="openModal('eastAsiaTYPHOON')">
            <area v-if="currentActive === 'storm'" alt="2eastAsiaTYPHOON" title="2eastAsiaTYPHOON" coords="1541,222,1525,240,1527,259,1520,268,1517,275,1511,286,1508,300,1522,321,1536,300,1551,286,1562,270,1576,249,1567,238,1559,226" shape="poly" @click.prevent="openModal('eastAsiaTYPHOON')">
            <area v-if="currentActive === 'storm'" alt="3eastAsiaTYPHOON" title="3eastAsiaTYPHOON" coords="1489,338,1476,358,1498,377,1519,356" shape="poly" @click.prevent="openModal('eastAsiaTYPHOON')">
            <area v-if="currentActive === 'storm'" alt="4eastAsiaTYPHOON" title="4eastAsiaTYPHOON" coords="1490,388,1474,409,1482,437,1501,451,1511,462,1524,469,1543,453,1527,439,1522,402" shape="poly" @click.prevent="openModal('eastAsiaTYPHOON')">
            <area v-if="currentActive === 'storm'" alt="southAsiaCYCLONE" title="southAsiaCYCLONE" coords="1231,281,1225,291,1228,307,1220,323,1209,327,1215,347,1212,358,1223,367,1235,367,1236,382,1238,394,1244,415,1254,430,1259,442,1271,455,1286,460,1279,426,1278,404,1292,377,1310,359,1326,355,1335,343,1343,332,1346,318,1334,319,1308,339,1270,326,1259,305,1249,297" shape="poly" @click.prevent="openModal('southAsiaCYCLONE')">
            <area v-if="currentActive === 'storm'" alt="americaHURRI" title="americaHURRI" coords="248,198,232,205,227,232,222,256,222,287,244,303,246,328,251,344,256,358,254,320,267,341,278,355,281,373,286,384,315,398,335,409,345,408,350,392,359,389,367,376,334,381,326,376,323,334,331,320,348,316,359,312,382,310,398,313,402,323,409,339,422,329,422,310,420,299,433,294,441,278,465,254,485,241,501,227,517,217,533,195,503,202,438,233,439,210,415,194,361,194,303,194,270,192,268,192,257,195" shape="poly" @click.prevent="openModal('americaHURRI')">
          </map>
        </div>
      </div>
    </div>

    <EventModal v-if="isModalOpen" :events="currentRegionEvents" @close="isModalOpen = false" />
  </div>
</template>



<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'; // 引入 nextTick
import imageMapResize from 'image-map-resizer'; 
import { allEvents } from '@/data/events.js';
import EventModal from '@/components/EventModal.vue';

// 1. 狀態定義
const currentActive = ref('none'); // 控制亮起的圖層 (none, wildfire, flood, storm)
const isModalOpen = ref(false);    // 控制彈窗顯示
const selectedRegion = ref('');    // 記錄點擊的地區

// 2. 生命週期：網頁載入後自動啟動 Image Map 縮放修正
onMounted(() => {
  imageMapResize();
});

// 3. 函式定義
// 切換地圖圖層
const toggleMap = async (type) => {
  if (currentActive.value === type) {
    currentActive.value = 'none';
  } else {
    currentActive.value = type;
  }
  // 重要：等 Vue 把新的 <area> 渲染出來後，重新啟動座標縮放
  await nextTick();
  imageMapResize();
};

// 打開彈窗
const openModal = (region) => {
  selectedRegion.value = region;
  // 先檢查過濾後的事件是否有資料，有才開彈窗
  if (currentRegionEvents.value.length > 0) {
    isModalOpen.value = true;
  } else {
    alert(`該地區目前沒有「${currentActive.value}」相關的災害資料`);
  }
};

// 4. 計算屬性：根據「地區」和「目前的災害類型」過濾資料
const currentRegionEvents = computed(() => {
  return allEvents.filter(e => 
    e.region === selectedRegion.value && e.type === currentActive.value
  );
});
</script>

<style scoped>
/* 讓大盒子變成橫向排列 */
.main-content {
  display: flex;
  align-items: flex-start;
  gap: 40px;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

/* 左側欄寬度設定 */
.sidebar {
  flex: 0 0 200px;
  text-align: left;
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
  flex-direction: column;
  gap: 15px;
}

/* 右側地圖區域 */
.map-area {
  flex: 1;
  display: flex;
}

.map-stack {
  position: relative;
  width: 100%;
  max-width: 1200px;
  line-height: 0; /* 重要：消除圖片下方空隙，確保座標精準 */
}

/* 統一地圖層設定 */
.map-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  opacity: 0;
  transition: opacity 0.5s ease;
  /* 關鍵：讓上面的紅、藍、黃圖層不接收滑鼠事件，點擊會「穿透」到底部 */
  pointer-events: none; 
}

.base-layer {
  opacity: 1;
  position: relative; /* 作為撐開容器高度的基準圖層 */
  pointer-events: auto; /* 只有這層（綁定 map 的這層）要接收點擊 */
}

.map-layer.is-visible {
  opacity: 1;
}


/* 圖例按鈕微調 */
.legend-item {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #eee;
  margin-bottom: 10px;
  border-radius: 8px;
}

.legend-item:hover {
  background-color: #818181;
  color: white;
}

.legend-item.active {
  background-color: #a9a7a7;
  border-color: #cccccc;
  font-weight: bold;
}

.dot {
  height: 12px;
  width: 12px;
  border-radius: 2px;
  display: inline-block;
  margin-right: 10px;
  vertical-align: middle; /* 修正正方形偏上的問題 */
}

.red { background-color: #ff7675; }
.blue { background-color: #74b9ff; }
.yellow { background-color: #f3f378; }

/* Image Map 專用樣式 */
area {
  cursor: pointer;
  outline: none;
}
</style>
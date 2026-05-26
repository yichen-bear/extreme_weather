<template>
  <div class="disaster-map-container">
    <div class="main-content">
      <div class="sidebar">
        <h2>災害分佈地圖</h2>
        <div class="legend">
          <div class="legend-item" 
            @click="toggleMap('wildfire')" 
            :class="{ active: currentActive === 'wildfire', 'is-locked': !lockStatus.levelfire }">
            <span class="dot red"></span> 野火 Wildfire

            <Lock v-if="!lockStatus.levelfire" class="lock-icon text-locked" />
            <LockOpen v-else class="lock-icon text-unlocked" />
          </div>
          <div class="legend-item" 
            @click="toggleMap('flood')" 
            :class="{ active: currentActive === 'flood', 'is-locked': !lockStatus.levelflood }">
            <span class="dot blue"></span> 洪水 Flood

            <Lock v-if="!lockStatus.levelflood" class="lock-icon text-locked" />
            <LockOpen v-else class="lock-icon text-unlocked" />
          </div>
          <div class="legend-item" 
            @click="toggleMap('tropical-cyclone')" 
            :class="{ active: currentActive === 'tropical-cyclone', 'is-locked': !lockStatus.levelwind }">
            <span class="dot yellow"></span> 熱帶氣旋<br>Tropical Cyclone</br>

            <Lock v-if="!lockStatus.levelwind" class="lock-icon text-locked" />
            <LockOpen v-else class="lock-icon text-unlocked" />          
          </div>
        </div>
      </div>

      <div class="map-area">
        <div class="map-stack" :key="currentActive">
          <img src="/images/map-base.png" class="map-layer base-layer" usemap="#disaster-map">
          <img src="/images/map-red.png" class="map-layer" :class="{ 'is-visible': currentActive === 'wildfire' }">
          <img src="/images/map-blue.png" class="map-layer" :class="{ 'is-visible': currentActive === 'flood' }">
          <img src="/images/map-yellow.png" class="map-layer" :class="{ 'is-visible': currentActive === 'tropical-cyclone' }">

          <map name="disaster-map">
            <area v-if="currentActive === 'wildfire'" alt="australiaFIRE" title="australiaFIRE" coords="1626,621,1642,648,1647,663,1645,680,1639,695,1627,704,1618,714,1613,724,1604,731,1591,755,1570,778,1562,744,1551,735,1551,722,1538,719,1533,708,1517,700,1503,704,1485,709,1474,717,1455,719,1442,720,1439,706,1444,687,1441,668,1445,645,1463,633,1492,623,1504,609,1517,596,1530,589,1548,581,1565,577,1581,577,1575,599,1594,613,1605,589,1612,573,1621,591,1624,605,1623,621,1643,649" shape="poly" @click.prevent="openModal('australiaFIRE')">
            <area v-if="currentActive === 'flood'" alt="southAsiaFLOOD" title="southAsiaFLOOD" coords="1252,295,1240,276,1224,266,1205,274,1205,287,1200,301,1191,306,1167,313,1172,327,1167,340,1186,340,1199,341,1200,349,1210,356,1216,365,1229,365,1234,373,1236,383,1237,394,1244,410,1248,423,1255,434,1264,448,1287,465,1275,407,1282,392,1291,378,1299,372,1309,364,1323,356,1328,346,1335,356,1343,337,1351,324,1346,313,1333,319,1325,325,1311,330,1301,325,1287,319,1269,313,1256,301,1244,285,1245,284" shape="poly" @click.prevent="openModal('southAsiaFLOOD')">
            <area v-if="currentActive === 'flood'" alt="chinaFLOOD" title="chinaFLOOD" coords="1416,207,1397,194,1409,180,1424,168,1438,181,1461,199,1481,202,1488,211,1481,227,1465,248,1454,255,1433,256,1436,265,1456,269,1457,284,1478,325,1461,355,1427,390,1408,359,1378,362,1364,353,1363,331,1347,313,1313,331,1277,318,1251,302,1227,271,1223,245,1243,223,1256,203,1285,215,1291,226,1302,234,1320,224,1330,242,1381,240,1397,235,1405,218,1400,219,1410,215" shape="poly" @click.prevent="openModal('chinaFLOOD')">
            <area v-if="currentActive === 'wildfire'" alt="usaFIRE" title="usaFIRE" coords="361,194,264,194,232,204,225,233,219,254,224,274,245,297,289,300,312,311,324,329,353,316,375,305,398,305,407,321,409,335,419,333,414,303,436,288,452,270,465,250,481,242,497,230,508,215,527,212,534,190,505,200,462,222,428,235,440,216,403,192,380,192" shape="poly" @click.prevent="openModal('usaFIRE')">
            <area v-if="currentActive === 'wildfire'" alt="southEU1" title="southEU1" coords="874,212,879,197,861,189,852,188,839,193,824,197,829,209,836,218,834,229,820,231,797,231,796,242,794,256,797,268,804,272,813,274,834,271,844,247,855,237,863,228,876,228" shape="poly" @click.prevent="openModal('southEU')">
            <area v-if="currentActive === 'wildfire'" alt="southEU2" title="southEU2" coords="882,211,894,208,906,208,902,216,915,233,923,241,931,249,922,259,917,269,909,254,904,262,906,238,894,224,890,216,886,238,893,261,875,221,877,216" shape="poly" @click.prevent="openModal('southEU')">
            <area v-if="currentActive === 'wildfire'" alt="southEU3" title="southEU3" coords="1049,238,1024,244,992,239,984,246,979,233,968,234,950,242,941,249,942,258,949,266,955,273,963,258,963,244,977,254,981,262,987,268,1005,271,1021,271,1037,265,1049,266,1059,265,1068,263,1064,252,1057,241" shape="poly" @click.prevent="openModal('southEU')">
            <area v-if="currentActive === 'tropical-cyclone'" alt="1eastAsiaTYPHOON" title="1eastAsiaTYPHOON" coords="1423,170,1413,177,1402,189,1404,197,1413,212,1389,234,1329,241,1321,228,1303,225,1262,194,1244,210,1243,220,1241,236,1231,252,1235,264,1254,303,1294,322,1337,317,1335,317,1364,344,1369,357,1394,359,1415,363,1421,378,1426,389,1447,370,1463,352,1477,327,1453,287,1455,269,1434,263,1441,253,1452,253,1465,248,1484,218,1481,207,1458,196,1423,169,1423,170" shape="poly" @click.prevent="openModal('eastAsiaTYPHOON')">
            <area v-if="currentActive === 'tropical-cyclone'" alt="2eastAsiaTYPHOON" title="2eastAsiaTYPHOON" coords="1541,222,1525,240,1527,259,1520,268,1517,275,1511,286,1508,300,1522,321,1536,300,1551,286,1562,270,1576,249,1567,238,1559,226" shape="poly" @click.prevent="openModal('eastAsiaTYPHOON')">
            <area v-if="currentActive === 'tropical-cyclone'" alt="3eastAsiaTYPHOON" title="3eastAsiaTYPHOON" coords="1489,338,1476,358,1498,377,1519,356" shape="poly" @click.prevent="openModal('eastAsiaTYPHOON')">
            <area v-if="currentActive === 'tropical-cyclone'" alt="4eastAsiaTYPHOON" title="4eastAsiaTYPHOON" coords="1490,388,1474,409,1482,437,1501,451,1511,462,1524,469,1543,453,1527,439,1522,402" shape="poly" @click.prevent="openModal('eastAsiaTYPHOON')">
            <area v-if="currentActive === 'tropical-cyclone'" alt="southAsiaCYCLONE" title="southAsiaCYCLONE" coords="1231,281,1225,291,1228,307,1220,323,1209,327,1215,347,1212,358,1223,367,1235,367,1236,382,1238,394,1244,415,1254,430,1259,442,1271,455,1286,460,1279,426,1278,404,1292,377,1310,359,1326,355,1335,343,1343,332,1346,318,1334,319,1308,339,1270,326,1259,305,1249,297" shape="poly" @click.prevent="openModal('southAsiaCYCLONE')">
            <area v-if="currentActive === 'tropical-cyclone'" alt="americaHURRI" title="americaHURRI" coords="248,198,232,205,227,232,222,256,222,287,244,303,246,328,251,344,256,358,254,320,267,341,278,355,281,373,286,384,315,398,335,409,345,408,350,392,359,389,367,376,334,381,326,376,323,334,331,320,348,316,359,312,382,310,398,313,402,323,409,339,422,329,422,310,420,299,433,294,441,278,465,254,485,241,501,227,517,217,533,195,503,202,438,233,439,210,415,194,361,194,303,194,270,192,268,192,257,195" shape="poly" @click.prevent="openModal('americaHURRI')">
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
import { Lock, LockOpen } from 'lucide-vue-next';
// 1. 狀態定義
const currentActive = ref('none'); // 控制亮起的圖層 (none, wildfire, flood, storm)
const isModalOpen = ref(false);    // 控制彈窗顯示
const selectedRegion = ref('');    // 記錄點擊的地區

// 地圖鎖定功能 預設0
const lockStatus = ref({
  levelfire: false,
  levelflood: false,
  levelwind: false
});

// 2. 生命週期：網頁載入後自動啟動 Image Map 縮放修正
onMounted(async () => {
  imageMapResize();

  // 地圖解鎖功能
  try {
    // VITE_API_URL 就是妳在 .env 設定的 http://localhost:3000
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/score`);
    const data = await response.json();
    
    // 把資料庫的 TRUE / FALSE 存進我們的 lockStatus
    lockStatus.value = {
      levelfire: data.levelfire,
      levelflood: data.levelflood,
      levelwind: data.levelwind
    };
  } catch (error) {
    console.error("抓取資料庫解鎖狀態失敗:", error);
  }
});


// 3. 函式定義
// 切換地圖圖層
const toggleMap = async (type) => {
  // 地圖鎖定功能
  if (type === 'wildfire' && !lockStatus.value.levelfire) {
    alert('通過關卡「🔥野火」以解鎖地圖');
    return;
  }
  if (type === 'flood' && !lockStatus.value.levelflood) {
    alert('通過關卡「🌊洪水」以解鎖地圖');
    return;
  }
  if (type === 'tropical-cyclone' && !lockStatus.value.levelwind) {
    alert('通過關卡「🌀熱帶氣旋」以解鎖地圖');
    return;
  }

  // 地圖本人
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
.disaster-map-container {
  width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden; /* 🔑 允許右邊地圖稍微衝破螢幕，但隱藏滾動條，畫面超乾淨 */
}

.main-content {
  display: flex;
  flex-direction: row;  /* 桌機版：左右排列 */
  justify-content: flex-start; /* 讓內容從左邊開始緊湊排列 */
  width: 100%;
  padding: 30px 0px 30px 30px; /* 🔑 稍微縮小上下 padding，釋放垂直空間 */
  gap: 50px;            /* 🔑 微調縮小控制欄與地圖中間的空隙，避免擁擠 */
  box-sizing: border-box;
  align-items: flex-start; /* 🔑 保持妳滿意的靠頂部對齊 */
}

/* 左側 標題與圖例 */
.sidebar {
  width: 195px;         /* 🔑 關鍵修改：從 240px 精簡到 195px，把控制欄「瘦身」，地圖瞬間變大 */
  flex: 0 0 195px;      /* 🔑 同步鎖定這個精緻寬度 */
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  text-align: left;
}

.sidebar h2 {
  margin-top: 100px;    /* 🔑 從 140px 稍微往上調到 100px，解決 100% 縮放時標題太沉的問題 */
  font-size: 1.25rem;   /* 🔑 從 1.5rem 縮小，字體變精緻不粗糙 */
  line-height: 1.4;
  margin-bottom: 15px;  /* 🔑 縮減下方空隙 */
  text-align: center;
  font-weight: 600;
}

/* 讓圖例垂直排列 */
.legend {
  display: flex;
  flex-direction: column;
  gap: 10px;             /* 舒適的按鈕間距 */
  font-size: 0.8rem;    /* 🔑 字體微調，複製 80% 縮放的精細感 */
}

/* 按鈕：全面重現精緻外觀 */
.legend-item {
  display: flex;
  align-items: center;  /* 讓點點、文字、鎖頭全部完美垂直居中 */
  width: 100%;
  padding: 9px 12px;    /* 🔑 關鍵修改：縮減按鈕內襯，按鈕立刻變細緻、絕不臃腫彈出 */
  border-radius: 30px !important; /* 🔑 完美保留妳最愛的超圓邊框 */
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;    /* 🔑 控制按鈕內字體大小 */
  box-sizing: border-box;
}

.legend-item.is-locked {
  opacity: 0.5;          
  cursor: not-allowed;   
  background-color: #f5f5f5;
}

.legend-item.is-locked:hover {
  background-color: #f5f5f5; 
  color: inherit;
}

.lock-icon {
  width: 12px;          /* 🔑 鎖頭稍微縮小，更精緻 */
  height: 12px;
  color: #ffffff;      
  margin-left: auto;    /* 自動把鎖頭推到最右邊對齊 */
}

/* 地圖區域吃滿空間 */
.map-area {
  flex: 1;              /* 霸道吃滿右邊 */
  height: 100%;
  display: flex;
  justify-content: flex-start; /* 🔑 改為 flex-start 配合 width，地圖放大效果更完美 */
  align-items: center;
  overflow: hidden;
  margin-left: 0px;
  width: 125%;          /* 🔑 保留強行衝破邊界放大的視覺氣勢 */
  cursor: default;          /* 強迫整個區域的滑鼠游標維持正常的箭頭，不變成輸入游標 */
  user-select: none;        /* 🔑 核心關鍵：禁止瀏覽器選取這個區域的「隱形文字/空白」，游標就不會跑出來 */
  -webkit-user-select: none;/* 支援 Safari 瀏覽器 */
  -moz-user-select: none;   /* 支援 Firefox 瀏覽器 */
}

.map-stack {
  position: relative;
  width: 115%;          /* 解放地圖圖片舞台 */
  max-width: 1500px;    /* 🔑 微調最大寬度上限 */
  line-height: 0;       
  border-radius: 9px;   /* 完美保留妳要的圓角 */
  overflow: hidden;     /* 🔑 強制切掉地圖原本尖尖的四個角 */
  cursor: default;          /* 讓地圖包裹層也維持箭頭游標 */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}

/* 統一地圖層設定 */
.map-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100% !important;
  max-height: 82vh;     /* 🔑 微調高度上限，防止 100% 縮放時上下爆框 */
  object-fit: cover !important; /*讓點擊圖例時，兩張圖能彼此配合縮放，不要跑出兩個南極洲*/
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none; 
}

/* 確保底圖在大螢幕下全力放大 */
.base-layer {
  width: 100%;
  height: auto;         
  max-height: 82vh;     
  object-fit: contain;  
  opacity: 1;
  position: relative;   
  pointer-events: auto; 
}

.map-layer.is-visible {
  opacity: 1;
}

/* 重複定義的重複樣式清理與合併覆蓋（解決按鈕重複定義沒反應的問題） */
.legend-item {
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.15) !important; /* 配合妳的暗色背景 */
  margin-bottom: 0px;   /* 🔑 移除原本重複定義的 margin-bottom: 10px，避免卡片過長爆開 */
}

.legend-item:hover {
  background-color: rgba(255, 255, 255, 0.15) !important;
  color: white;
}

.legend-item.active {
  background-color: #34495e !important; /* 升級為高階深灰藍 */
  border-color: #3498db !important;
  font-weight: bold;
}

.dot {
  height: 10px;         /* 🔑 點點按比例微調 */
  width: 10px;
  border-radius: 2px;
  display: inline-block;
  margin-right: 8px;
  vertical-align: middle; 
}

.red { background-color: #ff7675; }
.blue { background-color: #74b9ff; }
.yellow { background-color: #e1be22; }

/* Image Map 專用樣式 */
area {
  cursor: pointer;
  outline: none;
}

/* ==========================================================================
   🔑 彈出卡片優化（Popup / Modal / Card）
   針對妳說的「彈出的卡片也太大」，我們在大螢幕下對其進行「最大寬度封印」
   ========================================================================== */
/* 💡 請將下方的 class 換成妳專案中彈出卡片的實際名稱（例如 .info-window 等） */
.info-card, .popup-card, .modal-content, .leaflet-popup-content-wrapper {
  max-width: 380px !important;  /* 🔑 強制限制最大寬度，絕對不讓它在 100% 變巨嬰 */
  padding: 14px 18px !important; /* 🔑 縮小內襯留白，變精緻 */
  font-size: 0.85rem !important; /* 🔑 字體同步變小，複製 80% 的高級感 */
  border-radius: 12px !important;
}


/* ==========================================================================
   2. ⚡ RWD 核心響應式佈局 - 視窗縮小時自動變身（完全不受大螢幕縮小影響）
   ========================================================================== */
@media (max-width: 800px) {
  .disaster-map-container {
    padding: 10px 15px;
    margin: 0;
    width: 100%;
    box-sizing: border-box;
  }
  
  .main-content {
    flex-direction: column;   
    align-items: center;      
    gap: 15px;                
    margin: 0 auto;
    padding: 0;
    width: 100%;
  }
  
  .sidebar {
    width: 100%;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column; 
    align-items: center;     
    gap: 10px;                
  }
  
  .sidebar h2 {
    margin-top: 15px;         
    font-size: 1.25rem;       
    margin-bottom: 0px;       
    text-align: center;       
    width: 100%;     
  }

  .legend {
    display: flex;
    margin-top: 0px;
    flex-direction: row;      
    flex-wrap: nowrap !important;       
    gap: 10px;
    width: 100%;
    overflow-x: auto;         
    justify-content: center;  
  }
  
  .legend-item {
    flex: 1;               
    min-width: 90px;
    padding: 6px 10px !important;    
    justify-content: center;
    font-size: 0.75rem;
    border-radius: 40px !important; 
    white-space: nowrap;      
  }

  /* 🔑 1. 讓顏色方塊（.dot）也跟著視窗等比例伸縮 */
  .dot {
    height: 1.2vh !important;   /* 🔑 改用 vh 單位，隨螢幕高度縮放 */
    width: 1.2vh !important;    /* 🔑 保持正方形，隨螢幕高度縮放 */
    max-height: 12px;           /* 防止過大 */
    max-width: 12px;
    min-height: 8px;            /* 防止太小看不見 */
    min-width: 8px;
    border-radius: 2px;
    display: inline-block;
    margin-right: 6px !important; /* 稍微縮小間距，看起來更精緻 */
    vertical-align: middle;
  }

  .lock-icon {
    margin-left: 6px;         
  }

  /* ==========================================================================
     🔑 2. 地圖圓角修正（將圓角直接綁定在圖片本身，解決 max-height 下圓角消失的問題）
     ========================================================================== */
  .map-area {
    width: 100%;              
    margin: 0;                
    padding: 0;
    display: flex;
    justify-content: center;  
    align-items: center;      
  }

  .map-stack {
    position: relative;
    width: 95%;              
    max-width: 650px;         
    line-height: 0;
    
    /* 🔑 這裡的圓角可以移除或保留，我們主要是把魔法轉移到圖片上 */
    border-radius: 0;       
    overflow: visible; 
    border-radius: 9px !important;   /* 💡 讓外框擁有完美的 9px 圓角 */
    overflow: hidden !important;
  }

  .base-layer, .map-layer {
    width: 100%;              
    height: auto;             
    max-height: 50vh !important; 
    object-fit: contain;      
    
    /* 🔑 終極關鍵：把圓角和切邊強制灌進圖片本尊！ */
    /* 這樣無論地圖怎麼自己等比例放大縮小，地圖圖片的邊角都絕對是圓的！ */
    border-radius: 0 !important;
    overflow: visible !important;
    clip-path: inset(0 0 0 0 round 9px) !important;
  }
  
  /* 確保疊圖的圓角與位置跟底圖完全重合 */
  .disaster-map-container {
    padding: 10px 15px;
    margin: auto;
  }
  .main-content {
    flex-direction: column;
    align-items: center;
    gap: 1px;
    margin: 0 auto;
    padding: 0;
    width: 100%;
  }
  .sidebar {
    width: 100%;
    padding: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column; 
    align-items: center;     /* 讓內容物居中 */
    gap: 15px;
  }
  .sidebar h2 {
    margin-top: 30px;
    font-size: 1.3rem;
    margin-bottom: 3px;
    width: 100%;     
  }

  .legend {
    display: flex;
    margin-top: 0px;
    flex-direction: row;   
    flex-wrap: nowrap !important;       
    gap: 12px;
    width: 100%;
    overflow-x: auto;  
    max-height: 14vh;   
  }
  .legend-item {
    flex: 1;               
    min-width: 80px;
    padding: 6px 8px !important;    
    justify-content: center;
    font-size: 0.7rem;
    border-radius: 40px !important; 
  }

  .lock-icon {
    margin-left: auto;     
  }
  .map-area {
    width: auto;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -35px !important;
  }
  .base-layer {
    /* 💡 原本可能是 85vh 或 70vh，把它縮小到 55vh 或 60vh 試試看！ */
    /* vh 代表螢幕高度百分比。改成 55vh 代表地圖最多只佔螢幕高度的 55% */
    border-radius: 9px !important;   /* 💡 讓外框擁有完美的 9px 圓角 */
    overflow: hidden !important;
    width: auto;
    object-fit: contain;  /* 確保地圖等比例縮小，絕對不變形、不拉伸 */
  }
}
</style>
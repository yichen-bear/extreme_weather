<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="disaster-card" @click.stop>
      
      <div 
        class="card-header" 
        :style="{ backgroundImage: `url(${currentEvent.pages[0].img})` }"
      >
        <div class="header-overlay"></div>
        
        <div class="header-top">
          <span 
            class="badge" 
            :style="{ backgroundColor: getCategoryColor(currentEvent.type) }"
          >
            {{ currentEvent.type }}
          </span>
          <button @click="$emit('close')" class="close-btn">
            <span class="close-icon">✕</span>
          </button>
        </div>

        <div class="header-bottom">
          <br>
          <br>
          <h2 class="title">{{ currentEvent.title }}</h2>
          <div class="info-row">
            <span class="date-tag">{{ currentEvent.date }}</span>
            <span class="location-tag">| 📍 {{ currentEvent.location }}</span>
          </div>
          <p class="subtitle-tag">{{ currentEvent.pages[0].subtitle }}</p>
        </div>
      </div>
      
      <div class="card-body">
        <div class="content-scroll">
          <p v-html="currentEvent.pages[0].content"></p>
          <br>
          <div v-if="currentEvent.pages[0].impact && currentEvent.pages[0].impact.length > 0" class="impact-section">
            <p class="section-title">📊 災害影響</p>
            <div class="stats-grid">
              <div 
                v-for="(item, index) in currentEvent.pages[0].impact" 
                :key="index" 
                class="stat-item"
              >
                <span class="stat-label">{{ item.label }}</span>
                <span class="stat-value">{{ item.value }}</span>
              </div>
            </div>
          </div>

          <div v-if="currentEvent.pages[0].detailImg" class="image-section">
            <p class="section-title">
              {{ currentEvent.pages[0].detailImgTitle || '🖼️ 相關影像' }}
            </p>
            <img :src="currentEvent.pages[0].detailImg" class="detail-image">
          </div>


          <div v-if="currentEvent.pages[0].mapUrl" class="map-section">
            <p class="section-title">地理位置參考</p>
            <iframe :src="currentEvent.pages[0].mapUrl" width="100%" height="200" style="border:0; border-radius:15px;"></iframe>
          </div>

          <div v-if="currentEvent.pages[0].twitterEmbed" class="twitter-section">
            <p class="section-title">🐦 相關社群動態</p>
            <div class="twitter-container" v-html="currentEvent.pages[0].twitterEmbed"></div>
          </div>
        </div>
        
        <div class="source-section">
          <p class="source-label">REFERENCE & SOURCES</p>
          <div class="source-links">
            <a 
              v-for="(source, sIndex) in currentEvent.pages[0].sources" 
              :key="sIndex"
              :href="source.url" 
              target="_blank" 
              class="source-link"
            >
              🔗 {{ source.name }}
            </a>
          </div>
        </div>
        
        <div class="pagination" v-if="events.length > 1">
          <button 
            :disabled="currentIndex === 0" 
            @click="currentIndex--" 
            class="nav-btn"
          >
            ← PREV
          </button>
        
          <span class="page-indicator">
            {{ (currentIndex + 1).toString().padStart(2, '0') }} / {{ events.length.toString().padStart(2, '0') }}
          </span>

          <button 
            :disabled="currentIndex === events.length - 1" 
            @click="currentIndex++" 
            class="nav-btn1"
          ><ChevronRight :size="21" :stroke-width="3" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, watch, nextTick, onMounted} from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
const mapContainer = ref(null);

// 接收從 MapView 傳進來的所有事件陣列
const props = defineProps({
  events: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['close']);

// 1. 設定目前是在哪一頁 (從 0 開始)
const currentIndex = ref(0);
// 2. 關鍵：根據目前的頁碼，計算出要顯示哪一筆資料
const currentEvent = computed(() => {
  return props.events[currentIndex.value];
});


// 3. 處理不同災害標籤的顏色
const getCategoryColor = (type) => {
  console.log("【目前這張卡片的真實 type 是】:", type);
  switch (type) {
    case 'wildfire': 
      return '#ef4444'; // 紅色
    case 'flood': 
      return '#3b82f6';    // 藍色

    // 💡 加上單引號，'tropical-cyclone' 就不會被誤認成減法
    case 'storm':
    case 'tropical-cyclone':
    case 'tropical_cyclone':
      return '#e8c519'; // 黃色  
    default: return '#94a8c3'; // 灰色（預設
  }
};

//手動叫 Twitter 重新解析內容
const renderTwitter = () => {
  nextTick(() => {
    // 檢查瀏覽器是否已經載入 Twitter 腳本
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }
  });
};
// 監控當前事件，只要換頁就重新渲染推文
watch(currentEvent, () => {
  renderTwitter();
});
// 初次打開彈窗時也執行一次
onMounted(() => {
  renderTwitter();
});
</script>


<style scoped>
/**======整體彈窗======*/
.modal-overlay {
  position: fixed; 
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(15, 23, 42, 0.7); 
  display: flex;
  justify-content: center; 
  align-items: center; 
  z-index: 9999;
  backdrop-filter: blur(8px);
}
.disaster-card {
  background: white; 
  width: 95%; 
  max-width: 564px;
  border-radius: 22px; 
  overflow: hidden;
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.4);
  max-height: 81vh; 
  display: flex; 
  flex-direction: column;
}


/**=======卡片標頭圖片區=======*/
.card-header {
  height: 250px; 
  background-size: cover;
  background-position: center;
  position: relative; 
  display: flex; 
  flex-direction: column;
  justify-content: space-between; 
  padding: 21px 16px 15px 21px; /* 上、右、下、左 */
}
.header-overlay {
  position: absolute; 
  inset: 0;
  background: linear-gradient(to top, #0f172a, transparent, transparent);
}
.header-top{
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.badge {
  padding: 2px 10px;
  border-radius: 9px;
  color: rgba(255, 255, 255, 0.969);
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 0.15em;
  opacity: 0.85;
}
.close-btn {
  width: 36px; height: 36px; background: rgba(0, 0, 0, 0.3);
  border-radius: 50%; border: none; cursor: pointer !important;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
  padding: 0;
  margin-left: auto;
}
.close-icon {
  font-size: 20px;      /* 調整叉叉的大小 */
  line-height: 1;       /* 避免行高影響置中 */
  font-family: Arial, sans-serif; /* 確保不同裝置看到的叉叉形狀一致 */
  color: white;
  pointer-events: none; /* 讓叉叉符號本身不接收點擊，點擊會直接傳給外層的 button */
  user-select: none;    /* 防止被選取成 I 游標 */
}
.title {
  color: white;
  font-size: 23px;
  font-weight: 550;
  margin-top:7px;
  margin-bottom: 5px;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1;
  letter-spacing: 0.01em;
}
.info-row {
  display: flex;
  gap: 12px;
  align-items: center;
  color: rgba(255,255,255,0.9);
  font-size: 10px;
  padding: 1px 0px 1px 0px
}
.date-tag {
  background: rgba(255,255,255,0.2);
  padding: 0px 6px;
  border-radius: 4px;
  margin-top: 1.8px;
}
.subtitle-tag {
  margin-top: 4px;
  font-size: 9px;         /* 調整文字大小，可以根據需要改為 12px 或 14px */
  font-weight: 400;       /* 文字加粗 */
  color: #f8fafc;         /* 設定成接近白色的淺灰色，配合深色圖片背景 */
  letter-spacing: 0.05em; /* 稍微增加字母間距，更有設計感 */
  font-style: italic;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.2;
}
.header-bottom {
  position: relative; 
  z-index: 2; 
}


/*=====白色卡身=====*/
.card-body {
  margin-top:3px;
  padding: 20px 32px 21px 34px; 
  overflow-y: auto; 
  flex: 1;
  display: flex;
  flex-direction: column;
}
.content-scroll {   /*卡身文字樣式*/
  color: #434952;
  line-height: 1.7;
  font-size: 12px;
  margin-bottom: 12.7px;/* 主資料 <=> 和R&R的距離 */
}
.content-scroll p {   /*換行、文句格式*/
  white-space: pre-wrap;/* 保留換行、空白 */
  word-wrap: break-word;/* 長單字正確斷行 */
}
.card-body::-webkit-scrollbar {   /*捲軸美化*/
  width: 6px;
}


/*=========影響資訊區============*/
.impact-section {   /*淺藍色影響區塊*/
  /* 外距 上右下左*/ margin: -6px -6px -3px -6px; 
  padding: 1px 25px 16px 25px; 
  background: #f8fafc;
  border-radius: 8px;
}
.stat-item {    /*影響資訊內部小白格子*/
  background: white;
  margin-right: 0px;
  padding: 6px; /*白框與文字之間*/
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 改為靠左對齊，讀取文字比較順手 */
  align-items: center;
  text-align:center;
}
.stats-grid {     /*小白格子間*/
  display: grid;
  /* 關鍵：如果空間夠就排兩列，不夠就自動換行 */
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); 
  gap: 16px;
}


/**==========卡身補充圖片區================*/
.section-title {    /*圖名格式*/
  text-align: left;
  width: 100%;
  margin-top: 0px;
  margin-bottom: 6.5px;
  font-weight: 700;
}
.image-section {    /*圖片*/
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  /* 關鍵：確保內部的標題與圖片都置中 */
  align-items: center;
  width: 100%;
}
.detail-image {   /*圖片細節調整*/
  margin-top: 7px; 
  max-width: 100%; 
  /* height: 220px;      /* 保持比例 */
  border-radius: 16px;
  /*object-fit: cover;*/
  box-shadow: 0 3px 11px rgba(0,0,0,0.1);
  display: block;
  width: auto; 
  max-width: 100%;

  /* 2. 高度：這是關鍵！限制一個適中的高度，確保不用捲動就能看完整張 */
  /* 建議設定在 250px - 350px 之間，視妳卡片剩餘空間而定 */
  max-height: 205px;
  object-fit: contain;
  max-width: 100%;

}


/**==========卡身地圖補充區================*/
.map-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 14px;
  border-radius: 15px;
  margin-bottom: 2px;
 /* 🎯 關鍵一：確保父容器絕對不會阻擋或吞掉任何滑動手勢 */
  pointer-events: auto !important;
  touch-action: auto !important;
}
.card-body::-webkit-scrollbar {
  width: 6px;
}
.card-body::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}


/**==========卡身推文區================**/
.twitter-section {
  width: 100%;
}
.section-title{
  margin-top: 21px;
}
.twitter-container {
  display: flex;
  justify-content: center; /* 讓推文卡片在中間 */
  width:100%;
  border-radius: 16px;
  height: 379px !important;
  overflow: hidden;
}
/* 確保推文寬度不會撐破卡片 */
.twitter-container :deep(.twitter-tweet) {
  margin: 0 auto !important;
  transform: scale(0.61) !important;
  transform-origin: top center !important;
}

/*==============引用&參考資料區========*/
.source-section {  /*藍色參考資料div區塊*/
  background: #f8fafc;
  padding: 14px 17px 14px 16px;
  border-radius: 11px;
}
.source-label {   /*Reference & Resorces*/
  font-size: 9px;
  font-weight: 800;
  color: #94a8c3;
  letter-spacing: 0.1em;
  margin-bottom:3.1px;
}
.source-links {
  /* links之間 */
  display: flex;         /* 啟動彈性佈局 */
  flex-wrap: wrap;       /* 核心：允許內容折行 */
  width: 100%;           /* 確保撐滿寬度 */
  line-height: 1.4;
}
.source-link {
  /* link本身 */
  flex-direction: column;
  color: #2563eb;
  text-decoration: none;
  font-size: 11px;
  font-weight: 550;
  margin-right: 16px;
}


/**=====翻頁區=========*/
.pagination {   /*翻頁區div區塊*/
  display: flex;
  justify-content: space-between; 
  align-items: center;
  border-top: 0px solid #f1f5f9; 
  margin-top: 5px; /* border線段和R&R的距離 */
  padding-top: 5px; /* 按鈕和線段距離 */
}
.page-indicator {   /**頁碼*/
  margin-top:-1px;
  font-size: 12px;
  font-weight: 800;
  color: #64748b;
  letter-spacing: 0.2em;
  margin-left: -10px;

}
.nav-btn {    /*PREV按鈕*/
  background: none;
  border: none;
  color: #64748b;
  font-weight: 900;
  font-size: 11px;
  cursor: pointer;
  transition: color 0.2s;
  padding: 8px 10px 8px 10px;
}
.nav-btn1{
  background: #3b82f6;      /* 藍色背景 (與你的 flood 標籤同色) */
  border: none;
  color: #ffffff;           /* 白色箭頭 */
  cursor: pointer;
  transition: all 0.2s ease;
  width: 39px;
  height: 39px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 0 1px;
  margin-bottom: -2px;
  margin-right: -2px;
}
.nav-btn1:not(:disabled):hover {
  background: #2563eb;
}
/* 禁用 (Disabled) 狀態：改成淺灰色底、白色箭頭，並降低不透明度 */
.nav-btn1:disabled {
  background: #cbd5e1;      /* 淺灰色底 */
  color: #ffffff;
  opacity: 0.6;
  cursor: not-allowed;
}
.nav-btn:disabled {   /**按鈕顏色控制*/
  opacity: 0.2; cursor: not-allowed;}
@media (max-width: 800px) {
  .close-btn {
  width: 33px; height: 33px; background: rgba(0, 0, 0, 0.3);
  border-radius: 50%; border: none; cursor: pointer !important;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
  padding: 0;
  margin-left: auto;
  }
  .close-icon {
  font-size: 17px;      /* 調整叉叉的大小 */
  line-height: 1;       /* 避免行高影響置中 */
  font-family: Arial, sans-serif; /* 確保不同裝置看到的叉叉形狀一致 */
  color: white;
  pointer-events: none; /* 讓叉叉符號本身不接收點擊，點擊會直接傳給外層的 button */
  user-select: none;    /* 防止被選取成 I 游標 */
  }
  .badge {
  padding: px 10px;
  border-radius: 9px;
  color: rgb(255, 255, 255);
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  opacity: 0.9;
  }
  .title {
  color: white;
  font-size: 22px;
  font-weight: 550;
  margin-top:8px;
  margin-bottom: 5px;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1;
  letter-spacing: 0.01em;
  }
  .info-row {
  display: flex;
  gap: 12px;
  align-items: center;
  color: rgba(255,255,255,0.9);
  font-size: 10px;
  padding: 2px 0px 1px 0px
  }
  .date-tag {
  background: rgba(255,255,255,0.2);
  padding: 0px 6px;
  border-radius: 4px;
  margin-top: 1.8px;
  }
.subtitle-tag {
  margin-top: 5px;
  font-size: 9px;         /* 調整文字大小，可以根據需要改為 12px 或 14px */
  font-weight: 400;       /* 文字加粗 */
  color: #f8fafc;         /* 設定成接近白色的淺灰色，配合深色圖片背景 */
  letter-spacing: 0.05em; /* 稍微增加字母間距，更有設計感 */
  font-style: italic;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.2;
  }

  .card-body {
  margin-top: 0px;
  padding: 20px 32px 21px 34px; 
  overflow-y: auto; 
  flex: 1;
  display: flex;
  flex-direction: column;
 }
 .content-scroll {   /*卡身文字樣式*/
  color: #434952;
  line-height: 1.7;
  font-size: 12px;
  margin-bottom: 13px;/* 主資料 <=> 和R&R的距離 */
 }

  .pagination {   /*翻頁區div區塊*/
  display: flex;
  justify-content: space-between; 
  align-items: center;
  border-top: 0px solid #f1f5f9; 
  margin-top: 7px; /* border線段和R&R的距離 */
  padding-top: 7px; /* 按鈕和線段距離 */
  margin-left: -2px;
  }
  .page-indicator {   /**頁碼*/
  margin-top:0px;
  font-size: 10.5px;
  font-weight: 900;
  color: #64748b;
  letter-spacing: 0.2em;
  margin-left:-3px;
  margin-bottom:2px;
  }
  .nav-btn {    /*NEXT按鈕*/
  background: none;
  border: none;
  color: #64748b;
  font-weight: 900;
  font-size: 10px;
  cursor: pointer;
  transition: color 0.2s;
  padding: 8px 10px 8px 10px;
  }
  .nav-btn1{
  background: #3b82f6;      /* 藍色背景 (與你的 flood 標籤同色) */
  border: none;
  color: #ffffff;           /* 白色箭頭 */
  cursor: pointer;
  transition: all 0.2s ease;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 0 1px;
  margin-right: -3px;
  margin-top: -3px;
 }
  .source-links {
  /* links之間 */
  display: flex;         /* 啟動彈性佈局 */
  flex-wrap: wrap;       /* 核心：允許內容折行 */
  width: 100%;           /* 確保撐滿寬度 */
  line-height: 1.3;
  }
}
</style>
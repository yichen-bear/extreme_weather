<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">Climate Ascent</router-link>
      
      <div class="nav-links">
        <router-link to="/dashboard" class="nav-item">儀表板</router-link>
        <router-link to="/gamehome" class="nav-item">遊戲</router-link>

        <div class="auth-section">
          <template v-if="!isLoggedIn">
            <button class="btn-nav primary" @click="goToLogin">登入</button>
          </template>
          
          <template v-else>
            <div class="user-info">
              <span class="user-status">歡迎回來，玩家</span>
              <div class="user-avatar"></div>
            </div>
            <button class="btn-nav logout" @click="handleLogout">登出</button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 暫時測試用的狀態
const isLoggedIn = ref(false)

const goToLogin = () => {
  // 導向登入頁面，讓玩家在該頁面選擇「訪客」或「帳號登入」
  router.push('/login')
  
  // 測試 UI 用：
  // isLoggedIn.value = true
}

const handleLogout = () => {
  if(confirm('確定要登出嗎？')) {
    isLoggedIn.value = false
    router.push('/') // 登出後回首頁
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--nav-height);
  background: rgba(10, 21, 32, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 229, 255, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
}

.nav-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-family: var(--font-disp);
  font-size: 1.2rem;
  color: var(--c-accent);
  letter-spacing: 2px;
  text-shadow: 0 0 15px rgba(0, 229, 255, 0.6);
  cursor: pointer;
}

.nav-logo:hover {
    background-color: transparent;
}

.nav-links {
  display: flex;
  gap: 1.5rem; /* 拉開導覽項目的間距 */
  align-items: center;
}

/* 儀表板與遊戲按鈕樣式 */
.nav-item {
  color: var(--c-text);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-item:hover {
  color: var(--c-accent);
  background-color: transparent;
}

/* 點擊後的底線效果 (Vue Router 自動添加的 class) */
.router-link-active:not(.nav-logo)::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--c-accent);
  box-shadow: 0 0 8px var(--c-accent);
}

.auth-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-left: 2px solid rgba(200, 220, 232, 0.2);
  padding-left: 1.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-status {
  color: var(--c-muted);
  font-size: 0.9rem;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: var(--c-surface);
  border: 1px solid var(--c-accent);
  border-radius: 50%;
}

.btn-nav {
  background: transparent;
  border: 1px solid rgba(200, 220, 232, 0.3);
  color: var(--c-text);
  padding: 0.4rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-nav.primary {
  background: var(--c-accent);
  color: var(--c-bg);
  border: none;
  font-weight: bold;
}

.btn-nav.primary:hover {
  background: #c4f3ff;
  box-shadow: 0 0 15px rgba(0, 229, 255, 0.4);
}

.btn-nav.logout {
  color: var(--c-warn);
  border-color: rgba(255, 107, 53, 0.3);
}

.btn-nav.logout:hover {
  border-color: var(--c-warn);
  background: rgba(255, 107, 53, 0.1);
}
</style>
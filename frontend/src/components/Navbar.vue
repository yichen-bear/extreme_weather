<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-logo">Climate Ascent</div>
      
      <div class="nav-links">
        <template v-if="!isLoggedIn">
          <button class="btn-nav guest" @click="handleGuestLogin">訪客登入</button>
          <button class="btn-nav primary" @click="handleLogin">玩家登入</button>
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
  </nav>
</template>

<script setup>
import { ref } from 'vue'

// 暫時用來測試 UI 切換的響應式變數
const isLoggedIn = ref(false)

const handleGuestLogin = () => {
  console.log('執行訪客登入邏輯...')
  // 這裡可以寫 localStorage 的邏輯
}

const handleLogin = () => {
  console.log('彈出登入視窗...')
  // 測試：點擊後切換成登入狀態
  isLoggedIn.value = true 
}

const handleLogout = () => {
  if(confirm('確定要登出嗎？')) {
    isLoggedIn.value = false
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
  font-size: 1rem;
  color: var(--c-accent);
  letter-spacing: 2px;
  text-shadow: 0 0 15px rgba(0, 229, 255, 0.6);
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 0.9rem;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: 0.5rem;
}

.user-status {
  color: var(--c-muted);
  font-size: 0.9rem;
  font-weight: 500;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: var(--c-surface);
  border: 1px solid var(--c-accent);
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(0, 229, 255, 0.2);
}

.btn-nav {
  background: transparent;
  border: 1px solid rgba(200, 220, 232, 0.3);
  color: var(--c-text);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  font-family: var(--font-body);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-nav:hover {
  border-color: var(--c-accent);
  color: var(--c-accent);
  background: rgba(0, 229, 255, 0.05);
  box-shadow: 0 0 12px rgba(0, 229, 255, 0.2);
}

.btn-nav.primary {
  background: var(--c-accent);
  color: var(--c-bg);
  border: none;
  font-weight: bold;
}

.btn-nav.primary:hover {
  background: #c4f3ff;
  color: var(--c-bg);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
  transform: translateY(-1px);
}

.btn-nav.logout {
  border-color: rgba(255, 107, 53, 0.4);
  color: var(--c-warn);
}

.btn-nav.logout:hover {
  background: rgba(255, 107, 53, 0.1);
  border-color: var(--c-warn);
}
</style>
<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="nav-logo" @click="closeMenu">Climate Ascent</router-link>

      <button class="hamburger" :class="{ 'is-active': isMenuOpen }" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="nav-links" :class="{ 'is-open': isMenuOpen }">
        <button
          v-on:click="handleStartMap"
          class="nav-item"
          :class="{ 'router-link-active': route.path === '/map' }"
          style="margin-bottom: 3px"
        >
          地圖
        </button>
        <button
          v-on:click="handleStartGame"
          class="nav-item"
          :class="{ 'router-link-active': route.path === '/game' }"
          style="margin-bottom: 3px"
        >
          遊戲
        </button>
        <router-link to="/leaderboard" class="nav-item" @click="closeMenu">排行榜</router-link>

        <div class="auth-section">
          <template v-if="!authStore.isLoggedIn">
            <router-link to="/loginview" class="btn-nav primary" @click="closeMenu"
              >登入</router-link
            >
          </template>

          <template v-else>
            <router-link to="/profile" class="user-info-link" @click="closeMenu">
              <div class="user-info">
                <span class="user-status">{{
                  authStore.isGuest ? '訪客' : authStore.username
                }}</span>
                <div class="user-avatar">
                  <img :src="enforceHttps(authStore.avatar) || '/user.png'" class="avatar-img" />
                </div>
              </div>
            </router-link>
            <button class="btn-nav logout" @click="handleLogout">登出</button>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { authStore } from '../stores/user'

const router = useRouter()
const route = useRoute()
// 新增選單開關狀態
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleLogout = () => {
  if (confirm('確定要登出嗎？')) {
    authStore.logout()
    closeMenu() // 登出後關閉選單
    router.push('/')
  }
}

const handleStartGame = () => {
  closeMenu() // 點擊遊戲後關閉選單
  if (!authStore.isLoggedIn) {
    alert('請先登入以進入遊戲！')
    router.push({ path: '/loginview', query: { redirect: 'play' } })
    return
  }
  router.push('/game')
}

const handleStartMap = () => {
  closeMenu() // 點擊遊戲後關閉選單
  if (!authStore.isLoggedIn) {
    alert('請先登入以進入遊戲！')
    router.push({ path: '/loginview', query: { redirect: 'map' } })
    return
  }
  router.push('/map')
}

const enforceHttps = (url) => {
  if (!url) return ''
  if (typeof url === 'string' && url.startsWith('http://')) {
    return url.replace('http://', 'https://')
  }
  return url
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--nav-height, 60px);
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
  font-family: var(--font-disp, 'Bebas Neue', sans-serif);
  font-size: 1.2rem;
  color: var(--c-accent, #00e5ff);
  letter-spacing: 2px;
  text-shadow: 0 0 15px rgba(0, 229, 255, 0.6);
  cursor: pointer;
  text-decoration: none;
  z-index: 1001; /* 確保在選單上方 */
}

.nav-logo:hover {
  background-color: transparent;
}

/* 漢堡按鈕 (預設隱藏) */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1001; /* 確保在選單上方 */
  padding: 0;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 3px;
  background-color: var(--c-accent, #00e5ff);
  border-radius: 3px;
  transition: all 0.3s ease;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-item {
  color: var(--c-text, #fff);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
  background-color: transparent;
  border: none;
  padding: 3px;
  cursor: pointer;
}

.nav-item:hover {
  color: var(--c-accent, #00e5ff);
}

.nav-item.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--c-accent, #00e5ff);
  box-shadow: 0 0 8px var(--c-accent, #00e5ff);
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
  color: var(--c-muted, #aaa);
  font-size: 0.9rem;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: var(--c-surface, #222);
  border: 1px solid var(--c-accent, #00e5ff);
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-nav {
  background: transparent;
  border: 1px solid rgba(200, 220, 232, 0.3);
  color: var(--c-text, #fff);
  padding: 0.4rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;
}

.btn-nav.primary.router-link-active {
  background: var(--c-accent, #00e5ff);
  box-shadow: none;
  color: var(--c-bg, #000);
  border: none;
  font-weight: bold;
}

.btn-nav.primary:hover {
  background: #c4f3ff;
  box-shadow: 0 0 15px rgba(0, 229, 255, 0.4);
}

.btn-nav.logout {
  color: var(--c-warn, #ff6b35);
  border-color: rgba(255, 107, 53, 0.3);
}

.btn-nav.logout:hover {
  border-color: var(--c-warn, #ff6b35);
  background: rgba(255, 107, 53, 0.1);
}

/* ================================
   響應式設計 (RWD) 斷點 768px
================================ */
@media screen and (max-width: 768px) {
  .nav-container {
    padding: 0 1.5rem;
  }

  /* 顯示漢堡按鈕 */
  .hamburger {
    display: flex;
  }

  /* 漢堡按鈕點擊後的動畫 (打叉) */
  .hamburger.is-active span:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }
  .hamburger.is-active span:nth-child(2) {
    opacity: 0;
  }
  .hamburger.is-active span:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }

  /* 導覽列變為側邊滑出選單 */
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%; /* 預設藏在畫面右側外 */
    width: 250px;
    height: 100vh;
    background: rgba(10, 21, 32, 0.95);
    backdrop-filter: blur(15px);
    border-left: 1px solid rgba(0, 229, 255, 0.2);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.5);
  }

  /* 選單展開狀態 */
  .nav-links.is-open {
    right: 0;
  }

  /* 調整 auth-section 為垂直排版 */
  .auth-section {
    flex-direction: column;
    border-left: none;
    border-top: 1px solid rgba(200, 220, 232, 0.2);
    padding-left: 0;
    padding-top: 1.5rem;
    width: 80%;
  }

  .user-info {
    flex-direction: column;
    margin-bottom: 10px;
  }
}
.user-info-link {
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.user-info-link:hover {
  opacity: 0.8;
}
</style>

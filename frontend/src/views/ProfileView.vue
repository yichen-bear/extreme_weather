<template>
  <div class="page-container profile-view">
    <header class="page-header">
      <div class="sdg-badge">User Settings</div>
      <h2 class="page-title">個人<span>設定</span></h2>
      <router-link to="/" class="back-link">← 返回控制台</router-link>
    </header>

    <div v-if="authStore.isGuest" class="profile-card guest-warning">
      <h3>⚠️ 訪客模式</h3>
      <p>訪客無法修改個人資料或密碼，請先註冊或登入正式帳號以啟用完整功能。</p>
      <router-link to="/loginview" class="submit-btn redirect-btn">前往登入 / 註冊</router-link>
    </div>

    <div v-else class="profile-card">
      
      <section class="form-section">
        <h3 class="section-title">基本資料</h3>
        
        <div class="avatar-preview-container">
          <div class="user-avatar-large">
            <img :src="profileForm.avatar || '/user.png'" alt="Avatar" class="avatar-img">
          </div>
        </div>

        <div class="input-group">
          <label>頭像連結 (AVATAR URL)</label>
          <input
            v-model="profileForm.avatar"
            type="text"
            placeholder="請輸入圖片網址 (URL)..."
            :disabled="isLoading"
          />
        </div>

        <div class="input-group">
          <label>玩家名稱 (USERNAME)</label>
          <input
            v-model="profileForm.username"
            type="text"
            placeholder="輸入新的玩家名稱"
            :disabled="isLoading"
          />
        </div>

        <button class="submit-btn" :disabled="isLoading" @click="handleUpdateProfile">
          <span>儲存基本資料</span>
        </button>
      </section>

      <div class="divider"></div>

      <section class="form-section">
        <h3 class="section-title">安全設定</h3>
        
        <div class="input-group">
          <label>舊密碼 (OLD PASSWORD)</label>
          <input
            v-model="passwordForm.oldPassword"
            type="password"
            placeholder="輸入目前的密碼"
            :disabled="isLoading"
          />
        </div>

        <div class="input-group">
          <label>新密碼 (NEW PASSWORD)</label>
          <input
            v-model="passwordForm.newPassword"
            type="password"
            placeholder="輸入新密碼"
            :disabled="isLoading"
          />
        </div>

        <div class="input-group">
          <label>確認新密碼 (CONFIRM PASSWORD)</label>
          <input
            v-model="passwordForm.confirmPassword"
            type="password"
            placeholder="再次輸入新密碼"
            :disabled="isLoading"
          />
        </div>

        <button class="submit-btn warning-btn" :disabled="isLoading" @click="handleUpdatePassword">
          <span>更新密碼</span>
        </button>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { authStore } from '../stores/user'

const isLoading = ref(false)

// 基本資料表單狀態
const profileForm = reactive({
  username: '',
  avatar: ''
})

// 密碼表單狀態
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 初始化載入當前使用者的資料
onMounted(() => {
  if (!authStore.isGuest) {
    profileForm.username = authStore.username
    profileForm.avatar = authStore.avatar
  }
})

// 處理更新基本資料
const handleUpdateProfile = async () => {
  if (!profileForm.username) return alert('玩家名稱不能為空！')
  
  isLoading.value = true
  try {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    // 假設你的後端 API 是 /api/user/profile
    const res = await axios.put(`${baseURL}/api/user/profile`, {
      username: profileForm.username,
      avatar: profileForm.avatar
    }, {
      headers: { Authorization: `Bearer ${authStore.token}` } // 記得帶上 token
    })

    // 更新前端狀態
    authStore.username = profileForm.username
    authStore.avatar = profileForm.avatar
    alert('基本資料更新成功！')
  } catch (err) {
    console.error(err)
    alert(err.response?.data?.message || '更新失敗')
  } finally {
    isLoading.value = false
  }
}

// 處理更新密碼
const handleUpdatePassword = async () => {
  if (!passwordForm.oldPassword || !passwordForm.newPassword) {
    return alert('請填寫完整密碼資訊！')
  }
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    return alert('新密碼與確認密碼不一致！')
  }

  isLoading.value = true
  try {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    // 假設你的後端 API 是 /api/user/password
    const res = await axios.put(`${baseURL}/api/user/password`, {
      oldPassword: passwordForm.oldPassword,
      newPassword: passwordForm.newPassword
    }, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })

    alert('密碼更新成功！請牢記您的新密碼。')
    passwordForm.oldPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
  } catch (err) {
    console.error(err)
    alert(err.response?.data?.message || '密碼更新失敗，請確認舊密碼是否正確。')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.page-container {
  padding: 100px 40px 40px; /* 增加上方 padding 避開 Navbar */
  max-width: 1000px;
  margin: 0 auto;
  z-index: 5;
  position: relative;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 30px;
}

.sdg-badge {
  color: var(--c-muted, #aaa);
  font-size: 12px;
  letter-spacing: 2px;
  margin-bottom: 5px;
}

.page-title {
  font-family: var(--font-disp, 'Bebas Neue', sans-serif);
  font-size: 48px;
  margin-bottom: 10px;
  color: #fff;
}

.page-title span {
  color: var(--c-accent, #00e5ff);
  margin-left: 10px;
  text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
}

.back-link {
  color: var(--c-muted, #aaa);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.back-link:hover {
  color: var(--c-accent, #00e5ff);
}

/* 卡片主體設計 */
.profile-card {
  background: rgba(15, 31, 46, 0.6);
  border: 1px solid rgba(0, 229, 255, 0.2);
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  max-width: 600px;
  margin: 0 auto;
}

.guest-warning {
  text-align: center;
  border-color: rgba(255, 107, 53, 0.5);
}

.guest-warning h3 {
  color: var(--c-warn, #ff6b35);
  margin-bottom: 15px;
  font-size: 24px;
}

.guest-warning p {
  color: #ccc;
  margin-bottom: 25px;
}

.section-title {
  font-size: 1.2rem;
  color: var(--c-accent, #00e5ff);
  margin-bottom: 20px;
  letter-spacing: 1px;
}

.form-section {
  display: flex;
  flex-direction: column;
}

/* 頭像預覽 */
.avatar-preview-container {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}

.user-avatar-large {
  width: 100px;
  height: 100px;
  background: var(--c-surface, #222);
  border: 2px solid var(--c-accent, #00e5ff);
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 229, 255, 0.3);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 輸入框共用樣式 (延續 LoginView) */
.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-size: 11px;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 8px;
}

.input-group input {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px;
  color: #fff;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.input-group input:focus {
  border-color: var(--c-accent, #00e5ff);
}

.input-group input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 按鈕樣式 */
.submit-btn {
  width: 100%;
  padding: 14px;
  background: rgba(0, 229, 255, 0.1);
  color: var(--c-accent, #00e5ff);
  border: 1px solid var(--c-accent, #00e5ff);
  border-radius: 4px;
  letter-spacing: 2px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  background: var(--c-accent, #00e5ff);
  color: #000;
  box-shadow: 0 0 15px rgba(0, 229, 255, 0.4);
}

.submit-btn.warning-btn {
  border-color: var(--c-warn, #ff6b35);
  color: var(--c-warn, #ff6b35);
  background: rgba(255, 107, 53, 0.1);
}

.submit-btn.warning-btn:hover:not(:disabled) {
  background: var(--c-warn, #ff6b35);
  color: #fff;
  box-shadow: 0 0 15px rgba(255, 107, 53, 0.4);
}

.redirect-btn {
  display: inline-block;
  text-decoration: none;
  text-align: center;
  box-sizing: border-box;
}

.submit-btn:disabled {
  border-color: #555;
  color: #555;
  background: transparent;
  cursor: not-allowed;
}

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 35px 0;
}

/* RWD */
@media screen and (max-width: 768px) {
  .page-container {
    padding: 80px 20px 20px;
  }
  .profile-card {
    padding: 25px 20px;
  }
}
</style>
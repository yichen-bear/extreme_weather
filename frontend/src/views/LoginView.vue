<template>
  <div class="auth-overlay">
    <div class="auth-card">
      <div class="auth-header">
        <h2 class="auth-title">{{ isLogin ? 'Login' : 'Sign Up' }}</h2>
        <div class="title-line"></div>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <div v-if="!isLogin" class="input-group">
          <label>USERNAME</label>
          <input v-model="formData.username" type="text" placeholder="輸入玩家名稱" :disabled="isLoading" required />
        </div>

        <div class="input-group">
          <label>EMAIL</label>
          <input v-model="formData.email" type="email" placeholder="輸入電子郵件" :disabled="isLoading" required />
        </div>

        <div class="input-group">
          <label>PASSWORD</label>
          <input v-model="formData.password" type="password" placeholder="輸入密碼" :disabled="isLoading" required />
        </div>

        <button type="submit" class="submit-btn" :disabled="isLoading">
          <span v-if="isLoading">伺服器喚醒中，請稍候 (約60秒)...</span>
          <span v-else>{{ isLogin ? '進入系統' : '建立帳號' }}</span>
        </button>

        <button type="button" class="guest-btn" @click="handleGuestLogin" :disabled="isLoading">
          以訪客身分快速體驗
        </button>

        <div class="google-btn-wrapper" :style="{ pointerEvents: isLoading ? 'none' : 'auto', opacity: isLoading ? 0.5 : 1 }">
          <img
            class="googlepic"
            src="../assets/google.jpg"
            alt="Google Login"
            @click="handleCustomGoogleLogin"
          />
        </div>
      </form>

      <div class="auth-footer">
        <button @click="isLogin = !isLogin" class="switch-btn" :disabled="isLoading">
          {{ isLogin ? '還沒有帳號？點此註冊' : '已有帳號？返回登入' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { authStore } from '../stores/user'

const router = useRouter()
const route = useRoute()
const isLogin = ref(true)

// 💡 步驟 1：新增控制載入狀態的變數
const isLoading = ref(false)

const formData = reactive({
  username: '',
  email: '',
  password: '',
})

const handleRedirect = () => {
  const target = route.query.redirect
  if (target === 'play') {
    router.push('/game')
  } else if (target === 'map') {
    router.push({ path: '/map', query: { view: 'map' } })
  } else {
    router.push('/')
  }
}

const handleSubmit = async () => {
  const endpoint = isLogin.value ? '/api/auth/login' : '/api/auth/register'
  
  // 💡 步驟 2：發送請求前，開啟載入狀態
  isLoading.value = true
  
  try {
    // 這裡整合了你先前搬到環境變數的寫法
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    const res = await axios.post(`${baseURL}${endpoint}`, formData)
    
    if (isLogin.value) {
      authStore.login(res.data.token, res.data.username, res.data.avatar)
      alert('登入成功！')
      handleRedirect()
    } else {
      alert('註冊成功，請登入')
      isLogin.value = true
    }
  } catch (err) {
    console.error(err)
    alert(err.response?.data?.message || '操作失敗')
  } finally {
    // 💡 步驟 3：不論成功或失敗（try 或 catch 結束後），都要關閉載入狀態
    isLoading.value = false
  }
}

const handleGuestLogin = () => {
  authStore.guestLogin()
  alert('以訪客身分進入，遊戲進度會有遺失風險')
  handleRedirect()
}

// 修正後的 Google 登入處理
const handleGoogleResponse = async (response) => {
  // 💡 Google 登入同樣需要控管載入狀態
  isLoading.value = true
  try {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    const res = await axios.post(`${baseURL}/api/auth/google`, {
      idToken: response.credential
    })
    authStore.login(res.data.token, res.data.username, res.data.avatar)
    alert('Google 登入成功！')
    handleRedirect()
  } catch (err) {
    console.error('Google 驗證失敗詳情:', err.response?.data)
    alert('Google 驗證失敗')
  } finally {
    isLoading.value = false
  }
}

// 手動觸發 Google 視窗
const handleCustomGoogleLogin = () => {
  /* global google */
  if (typeof google !== 'undefined') {
    google.accounts.id.prompt(); 
  } else {
    console.error("Google SDK 尚未載入完成");
  }
}

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  script.onload = () => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "1012315695384-9483vdppk63dktojlbutl4joa53sdsqn.apps.googleusercontent.com",
      callback: handleGoogleResponse,
      itp_support: true, 
      use_fedcm_for_prompt: false,
      auto_select: false,
      context: 'signin'
    });
  }
  document.head.appendChild(script)
})
</script>

<style scoped>
.auth-overlay {
  padding-top: 100px;
  height: calc(100vh - 36px); 
  display: flex;
  align-items: flex-start; 
  justify-content: center;
  background: transparent;
  color: #fff;
  overflow-y: auto; 
  padding: 45px 20px; 
  box-sizing: border-box;

  scrollbar-width: none;
  -ms-overflow-style: none;
}

.auth-overlay::-webkit-scrollbar {
  display: none;
}

.auth-card {
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(0, 229, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.auth-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.5rem;
  letter-spacing: 4px;
  text-align: center;
  margin-left: 0;
  padding: 0 150px;
  color: #00e5ff;
  text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
}

.title-line {
  width: 50px;
  height: 2px;
  background: #ff5722;
  margin: 10px auto 30px;
}

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
}

.input-group input:focus {
  border-color: #00e5ff;
}

.submit-btn {
  width: 100%;
  padding: 16px;
  background: #ff6435;
  color: white;
  border: none;
  border-radius: 4px;
  letter-spacing: 2px;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  margin-top: 10px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 87, 34, 0.4);
}

.submit-btn:disabled {
  background: #555555;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

.switch-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  width: 100%;
  margin-top: 20px;
  cursor: pointer;
}

.switch-btn:hover {
  color: #00e5ff;
}

.guest-btn {
  width: 100%;
  padding: 12px;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  margin-top: 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.guest-btn:hover {
  color: #fff;
  border-color: #00e5ff;
  background: rgba(0, 229, 255, 0.05);
}

.guest-btn:disabled {
  border-color: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.2);
  cursor: not-allowed;
}

.google-btn-wrapper {
  width: 100%;
  display: flex;         
  justify-content: center;
  margin-top: 15px;       
}

.custom-google-btn {
  width: 100%;           
  max-width: 400px;      
  height: auto;
  cursor: pointer;
  transition: transform 0.2s, filter 0.2s;
}

.custom-google-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);    
}

.googlepic {
  width: 55px;
  border-radius: 50px;
  cursor: pointer;
}
</style>

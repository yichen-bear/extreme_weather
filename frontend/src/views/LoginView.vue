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
          <input v-model="formData.username" type="text" placeholder="輸入玩家名稱" required />
        </div>

        <div class="input-group">
          <label>EMAIL</label>
          <input v-model="formData.email" type="email" placeholder="輸入電子郵件" required />
        </div>

        <div class="input-group">
          <label>PASSWORD</label>
          <input v-model="formData.password" type="password" placeholder="輸入密碼" required />
        </div>

        <button type="submit" class="submit-btn">
          {{ isLogin ? '進入系統' : '建立帳號' }}
        </button>

        <button type="button" class="guest-btn" @click="handleGuestLogin">
          以訪客身分快速體驗
        </button>

        <div class="google-btn-wrapper">
          <img
            class="googlepic"
            src="../assets/google.jpg"
            alt="Google Login"
            @click="handleCustomGoogleLogin"
          />
        </div>
      </form>

      <div class="auth-footer">
        <button @click="isLogin = !isLogin" class="switch-btn">
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
const formData = reactive({
  username: '',
  email: '',
  password: '',
})

const handleRedirect = () => {
  const target = route.query.redirect
  if (target === 'play') {
    router.push('/play')
  } else if (target === 'map') {
    router.push({ path: '/gamehome', query: { view: 'map' } })
  } else {
    router.push('/gamehome')
  }
}

const handleSubmit = async () => {
  const endpoint = isLogin.value ? '/api/auth/login' : '/api/auth/register'
  try {
    const res = await axios.post(`http://localhost:3000${endpoint}`, formData)
    if (isLogin.value) {
      authStore.login(res.data.token, res.data.username)
      alert('登入成功！')
      handleRedirect()
    } else {
      alert('註冊成功，請登入')
      isLogin.value = true
    }
  } catch (err) {
    console.error(err)
    alert(err.response?.data?.message || '操作失敗')
  }
}

const handleGuestLogin = () => {
  authStore.guestLogin()
  alert('以訪客身分進入，遊戲進度會有遺失風險')
  handleRedirect()
}

// 修正後的 Google 登入處理
const handleGoogleResponse = async (response) => {
  try {
    // response.credential 是 Google 回傳的 ID Token
    const res = await axios.post(`http://localhost:3000/api/auth/google`, {
      idToken: response.credential
    })
    authStore.login(res.data.token, res.data.username)
    alert('Google 登入成功！')
    handleRedirect()
  } catch (err) {
    console.error('Google 驗證失敗詳情:', err.response?.data)
    alert('Google 驗證失敗')
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
      auto_select: false,
      context: 'signin'
    });
  }
  document.head.appendChild(script)
})
</script>

<style scoped>
.auth-overlay {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #fff;
}

.auth-card {
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

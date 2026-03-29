<template>
  <div class="auth-overlay">
    <div class="auth-card">
      <div class="auth-header">
        <h2 class="auth-title">{{ isLogin ? 'PLAYER LOGIN' : 'NEW CLIMBER' }}</h2>
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
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLogin = ref(true)
const formData = reactive({
  username: '',
  email: '',
  password: ''
})

const handleSubmit = async () => {
  const endpoint = isLogin.value ? '/api/auth/login' : '/api/auth/register'
  try {
    const res = await axios.post(`http://localhost:3000${endpoint}`, formData)
    
    if (isLogin.value) {
      // 登入成功：存入 Token 並導向遊戲頁面
      localStorage.setItem('token', res.data.token)
      alert('登入成功，歡迎回來！')
      router.push('/gamehome')
    } else {
      // 註冊成功：切換回登入頁
      alert('註冊成功，請登入')
      isLogin.value = true
    }
  } catch (err) {
    alert(err.response?.data?.message || '操作失敗')
  }
}
</script>

<style scoped>
.auth-overlay {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #080c10;
  color: #fff;
}

.auth-card {
  width: 100%;
  max-width: 400px;
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
  margin: 0;
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
  padding: 14px;
  background: #ff5722;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
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
</style>
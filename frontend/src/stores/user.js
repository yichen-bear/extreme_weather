// src/stores/user.js 內容
import { reactive } from 'vue'

export const authStore = reactive({
  isLoggedIn: !!localStorage.getItem('token'),
  username: localStorage.getItem('username') || '玩家',
  isGuest: localStorage.getItem('isGuest') === 'true', // 新增：標記是否為訪客

  login(token, username) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('isGuest', 'false');
    this.isLoggedIn = true;
    this.username = username;
    this.isGuest = false;
  },

  guestLogin() {
    const guestName = `GUEST_${Math.floor(Math.random() * 9000) + 1000}`; // 產生隨機 ID
    localStorage.setItem('username', guestName);
    localStorage.setItem('isGuest', 'true');
    // 訪客不需要 token，但我們設定 isLoggedIn 為 true 讓 Navbar 變換
    this.isLoggedIn = true;
    this.username = guestName;
    this.isGuest = true;
  },

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.username = '玩家';
    this.isGuest = false;
  }
});
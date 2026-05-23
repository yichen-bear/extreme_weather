import { reactive } from 'vue'

export const authStore = reactive({
  isLoggedIn: !!localStorage.getItem('token') || localStorage.getItem('isGuest') === 'true',
  token: localStorage.getItem('token') || '', // 💡 新增：從 localStorage 讀取 token
  username: localStorage.getItem('username') || '玩家',
  isGuest: localStorage.getItem('isGuest') === 'true', // 標記是否為訪客
  avatar: localStorage.getItem('avatar') || '',

  login(token, username, avatar) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('isGuest', 'false');
    localStorage.setItem('avatar', avatar || ''); 
    this.isLoggedIn = true;
    this.token = token; // 💡 新增：登入時將 token 存入 store
    this.username = username;
    this.isGuest = false;
    this.avatar = avatar || '';
  },

  guestLogin() {
    const guestName = `GUEST_${Math.floor(Math.random() * 9000) + 1000}`; // 產生隨機 ID
    localStorage.setItem('username', guestName);
    localStorage.setItem('isGuest', 'true');
    localStorage.setItem('avatar', '/user.png');
    this.isLoggedIn = true;
    this.token = ''; // 💡 新增：訪客沒有 token
    this.username = guestName;
    this.isGuest = true;
    this.avatar = '/user.png'
  },

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.token = ''; // 💡 新增：登出時清空 token
    this.username = '玩家';
    this.isGuest = false;
    this.avatar = '';
  }
});
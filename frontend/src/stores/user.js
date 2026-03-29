import { reactive } from 'vue'

export const authStore = reactive({
  isLoggedIn: !!localStorage.getItem('token'),
  username: localStorage.getItem('username') || '玩家',
  
  login(token, username) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    this.isLoggedIn = true;
    this.username = username;
  },
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.isLoggedIn = false;
    this.username = '玩家';
  }
});
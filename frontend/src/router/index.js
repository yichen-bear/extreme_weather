import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import GameHome from '../views/GameHome.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', component: Dashboard },
  { path: '/gamehome', component: GameHome },
  { path: '/loginview', component: LoginView },
  { path: '/play', component: { template: '<div>遊戲畫面開發中...</div>' } },
  { path: '/map', component: { template: '<div>地圖畫面開發中...</div>' } }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

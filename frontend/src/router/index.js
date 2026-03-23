import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import GameHome from '../views/GameHome.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', component: Dashboard },
  { path: '/gamehome', component: GameHome },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
// import Dashboard from '../views/Dashboard.vue'
import GameHome from '../views/GameHome.vue'
import LoginView from '../views/LoginView.vue'
import Leaderboard from '../views/Leaderboard.vue'
import Game from '../views/Game.vue'
import Rules from '../views/Rules.vue'

const routes = [
  { path: '/', component: GameHome },
  { path: '/loginview', component: LoginView },
  { path: '/game', 
    component: Game,
    meta: { hideAppComponents: true },
  },
  { path: '/rules', component: Rules },
  { path: '/map', component: { template: '<div>地圖畫面開發中...</div>' } },
  { path: '/leaderboard', component: Leaderboard },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

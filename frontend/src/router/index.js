import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
// import Dashboard from '../views/Dashboard.vue'
import GameHome from '../views/GameHome.vue'
import LoginView from '../views/LoginView.vue'
import Leaderboard from '../views/Leaderboard.vue'
import Game from '../views/Game.vue'
import Rules from '../views/Rules.vue'
import MapView from '../views/MapView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  { path: '/', component: GameHome },
  { path: '/loginview', component: LoginView },
  { path: '/game', component: Game, meta: { hideAppComponents: true } },
  { path: '/rules', component: Rules },
  { path: '/map', component: MapView },
  { path: '/leaderboard', component: Leaderboard },
  { path: '/profile', component: ProfileView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

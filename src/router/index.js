import { createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Game from '../views/GameView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/game/:id',
      name: 'game',
      component: Game
    }
  ]
})

export default router

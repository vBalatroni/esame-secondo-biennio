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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/game/:id',
      name: 'game',
      component: Game
    }
  ]
})

export default router

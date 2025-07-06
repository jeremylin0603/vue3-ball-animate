import { createRouter, createWebHistory } from 'vue-router'
import BallAnimate from '../views/BallAnimate'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BallAnimate,
    }
  ],
})

export default router

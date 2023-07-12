import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NowShowingView from '../views/NowShowingView.vue'
import ComingSoonView from '../views/ComingSoonView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/nowshowing',
      name: 'nowshowing',
      component: NowShowingView
    },
    {
      path: '/comingsoon',
      name: 'comingsoon',
      component: ComingSoonView
    },
    {
      path:'/moviedetail/:id',
      name:'moviedetail',
      component: () => import('../views/detailMovieView.vue')
    },
    {
      path:'/trailer/:id',
      name:'trailer',
      component: () => import('../views/videoView.vue')
    }
  ]
})

export default router

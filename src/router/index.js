import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NowShowingView from '../views/NowShowingView.vue'
import ComingSoonView from '../views/ComingSoonView.vue'
import DetailMovieView from '../views/DetailMovieView.vue'
import VideoView from '../views/VideoView.vue'
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
      component: DetailMovieView
    },
    {
      path:'/trailer/:id',
      name:'trailer',
      component: VideoView
    }
  ]
})

export default router

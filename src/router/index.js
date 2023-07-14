import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NowShowingView from '../views/NowShowingView.vue'
import ComingSoonView from '../views/ComingSoonView.vue'
import DetailMovieView from '../views/DetailMovieView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import VideoView from '../views/VideoView.vue'
import WishListView from '../views/WishListView.vue'
import ViewSeatView from '../views/SeatView.vue'
import TicketBookView from '../views/TicketBookView.vue'
import { ElNotification } from 'element-plus'
import { useAuthStore } from '../stores/auth'

const routes = [
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
    path: '/moviedetail/:id',
    name: 'moviedetail',
    component: DetailMovieView
  },
  {
    path: '/trailer/:id',
    name: 'trailer',
    component: VideoView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: (to, from, next) => {
      if (useAuthStore().authToken) {
        next({ name: 'home' })
        ElNotification.info({
          title: 'info',
          message: `You have been logged in as ${useAuthStore().username}`
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    beforeEnter: (to, from, next) => {
      if (useAuthStore().authToken) {
        next({ name: 'home' })
        ElNotification.info({
          title: 'info',
          message: `You have been logged in as ${useAuthStore().username}`
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: WishListView
  },
  {
    path:'/seatview/:id',
    name:'seatview',
    component: ViewSeatView
  },
  {
    path:'/bookedticket',
    name:'bookedticket',
    component: TicketBookView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

const checkAvailableRoute = (destination, routes) => {
  for (const route of routes) {
    if (route.name === destination) {
      return true
    }
    if (route.children && route.children.length > 0) {
      const childResult = checkAvailableRoute(destination, route.children)
      if (childResult) {
        return true
      }
    }
  }
  return false
}

router.beforeEach((to, from, next) => {
  if (!from.name) {
    useAuthStore().authRequest()
  }
  if (checkAvailableRoute(to.name, routes)) {
    next()
  } else {
    ElNotification.warning({
      title: '404',
      message: 'Page not found'
    })
    next({ name: 'home' })
  }
})

export default router

<template>
  <div class="hero bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <img
        src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
        class="max-w-sm rounded-lg shadow-2xl"
      />
      <div>
        <h1 class="text-5xl font-bold">Welcome To Your Wishlisht Movies!</h1>
        <p class="py-6">
          Disini, kamu dapat melihat dan menyesuaikan wishlist yang sudah kamu tambahkan sebelumnya.
        </p>
      </div>
    </div>
  </div>
  <div class="flex flex-col items-center justify-center p-10">
    <span class="loading loading-dots loading-lg" v-if="isLoading"></span>
    <div class="grid md:grid-cols-5 sm:grid-cols-1 gap-4" v-else>
      <div class="card w-auto bg-neutral shadow-xl" v-for="movie in movie_list" :key="movie.id">
        <figure>
          <img :src="movie.image" :alt="movie.title" class="mx-auto rounded px-0 w-full" />
        </figure>
        <div class="card-body">
          <h2 class="text-center content-center card-title text-md">{{ movie.title }}</h2>
          <div class="justify-end card-actions mt-auto">
            <RouterLink
              class="btn btn-info hover:scale-90 hover:btn-success w-full"
              :to="`/moviedetail/${movie.id}`"
              >View Detail</RouterLink
            >
            <button
              class="btn btn-error hover:scale-90 hover:btn-success w-full"
              @click="removeMovie(movie.id)"
            >
              Remove From Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { ElNotification,ElMessageBox,ElLoading } from 'element-plus'
export default {
  name: 'WishListView',
  components: [RouterLink],
  data() {
    return {
      movie_list: [],
      loading: false,
      loadingScreen:false
    }
  },
  computed: {
    isLoading() {
      return this.loading
    }
  },
  async mounted (){
      this.loading = true
      let res = await useAuthStore().getWishlist()
      if (res.success){
        this.movie_list = res.data
        this.loading = false
      }
      else{
        this.loading = false
        if(res.message == 'Please Login First'){
          this.$router.push('/login')
        }
        else{
          this.$router.push('/')
        }
        ElNotification.info({
        title: 'info',
        message: res.message,
        timeout:false
      })
      }
},
  methods: {
    removeMovie(id) {
      ElMessageBox.confirm('Movie will be deleted from your wishlist,continue?', 'Warning', {
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async () => {
          this.loadingScreen = ElLoading.service({
            fullscreen: true,
            text: 'Loading',
            lock: true,
            background: 'rgba(0, 0, 0, 0.7)'
          })
          let res = await useAuthStore().deleteWishList(id)
          if(res.success){
            this.movie_list = this.movie_list.filter((movie) => movie.id !== id)
            ElNotification.success({
              title: 'success',
              message: 'Delete completed'
            })
            this.loadingScreen.close()
          }
          else{
            ElNotification.info({
              title: 'info',
              message: res.message,
              timeout:false
            })
            this.loadingScreen.close()
          }
        })
        .catch(() => {
          ElNotification.info({
            title: 'info',
            message: 'Delete canceled'
          })
          this.loadingScreen.close()
        })
    }
  }
}
</script>

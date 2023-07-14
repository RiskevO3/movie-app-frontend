<template>
  <div class="hero bg-base-200">
    <div class="hero-content flex-col text-center justify-center mt-5">
      <div>
        <h1 class="text-5xl font-bold">Welcome To Your Booked Ticket Page!</h1>
        <p class="py-6">Disini, kamu dapat melihat seluruh ticket yang sudah kamu pesan.</p>
      </div>
    </div>
  </div>
  <div class="flex flex-col items-center justify-center p-10">
    <div class="grid md:grid-cols-5 sm:grid-cols-1 gap-4">
        <div class="card w-auto bg-neutral shadow-xl" v-for="index in 5" :key="index">
          <figure>
            <img src="http://localhost:5001/movie-images/23BARE.jpg" alt="barbie" class="mx-auto rounded px-0 w-full"/>
          </figure>
          <div class="card-body">
            <h2 class="text-center content-center card-title text-md">Barbie</h2>
            <p class="font-semibold mt-0">Total Price: </p>
            <p class="font-semibold">Seat Number: </p>
            <div class="justify-end card-actions mt-auto">
              <button class="btn btn-error hover:scale-90 hover:btn-success w-full">Reffund</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<!-- <script>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { ElNotification, ElMessageBox, ElLoading } from 'element-plus'
export default {
  name: 'TicketBookView',
  components: [RouterLink],
  data() {
    return {
      movie_list: [],
      loading: false,
      loadingScreen: false
    }
  },
  computed: {
    isLoading() {
      return this.loading
    }
  },
  async mounted() {
    this.loading = true
    let res = await useAuthStore().getWishlist()
    if (res.success) {
      this.movie_list = res.data
      this.loading = false
    } else {
      this.loading = false
      if (res.message == 'Please Login First') {
        this.$router.push('/login')
      } else {
        this.$router.push('/')
      }
      ElNotification.info({
        title: 'info',
        message: res.message,
        timeout: false
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
          if (res.success) {
            this.movie_list = this.movie_list.filter((movie) => movie.id !== id)
            ElNotification.success({
              title: 'success',
              message: 'Delete completed'
            })
            this.loadingScreen.close()
          } else {
            ElNotification.info({
              title: 'info',
              message: res.message,
              timeout: false
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
</script> -->

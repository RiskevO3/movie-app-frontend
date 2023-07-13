<template>
    <div class="flex flex-col items-center justify-center p-10">
      <span class="loading loading-dots loading-lg" v-if="isLoading"></span>
      <div class="grid md:grid-cols-5 sm:grid-cols-1 gap-4" v-else>
        <div class="card w-auto bg-neutral shadow-xl" v-for="movie in movie_list" :key="movie.id">
          <figure>
            <img :src="movie.image" :alt="movie.title" class="mx-auto rounded px-0 w-full"/>
          </figure>
          <div class="card-body">
            <h2 class="text-center content-center card-title text-md">{{ movie.title }}</h2>
            <div class="justify-end card-actions mt-auto">
              <button class="btn btn-warning hover:scale-90 hover:btn-success w-full" @click="insertWishList(movie.id)">Add To Wishlist</button>
            <RouterLink class="btn btn-info hover:scale-90 hover:btn-success w-full" :to="`/moviedetail/${movie.id}`">View Detail</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { RouterLink } from 'vue-router';
  import {useAuthStore} from '../stores/auth';
  import { ElNotification,ElLoading } from 'element-plus';
  export default{
    name:'ComingSoonView',
    components:[
    RouterLink
    ],
    data(){
      return{
        movie_list : [],
        loading:false,
        loadingScreen:false
      }
    },
    computed:{
      isLoading(){
        return this.loading
      }
    },
    async mounted (){
      this.loading = true
      let res = await useAuthStore().getComingSoon()
      if (res.success){
        this.movie_list = res.data
        this.loading = false
      }
      else{
        this.loading = false
        if(res.message == ''){
          this.$router.push('/login')
        }
        else{
          this.$router.push('/')
        }
        ElNotification.info({
        title: 'Error',
        message: res.message,
        timeout:false
      })
      }
    },
    methods:{
      async insertWishList(id){
        this.loadingScreen = ElLoading.service({
            fullscreen: true,
            text: 'Loading',
            lock: true,
            background: 'rgba(0, 0, 0, 0.7)'
        })
        let res = await useAuthStore().insertWishList(id)
        if (res.success){
          ElNotification.success({
            title: 'Success',
            message: res.message,
            timeout:false
          })
          this.movie_list = this.movie_list.filter((movie) => movie.id !== id)
          this.loadingScreen.close()
        }
        else{
          ElNotification.error({
            title: 'Error',
            message: res.message,
            timeout:false
          })
          this.loadingScreen.close()
        }
      }
    }
  }
  </script>
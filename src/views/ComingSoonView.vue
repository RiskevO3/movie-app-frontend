<template>
    <div class="flex flex-col items-center justify-center p-10">
      <span class="loading loading-dots loading-lg" v-if="isLoading"></span>
      <div class="grid md:grid-cols-5 sm:grid-cols-1 gap-4" v-else>
        <div class="card w-auto bg-neutral shadow-xl" v-for="movie in movie_list" :key="movie.id">
          <figure>
            <img :src="movie.image" :alt="movie.title" class="mx-auto rounded overflow-hidden"/>
          </figure>
          <div class="card-body">
            <h2 class="text-center content-center card-title text-md">{{ movie.title }}</h2>
            <div class="justify-end card-actions mt-auto">
              <button class="btn btn-warning hover:scale-90 w-full">Add To Wishlist</button>
              <RouterLink class="btn btn-info hover:scale-90 w-full" :to="`/moviedetail/${movie.id}`">View Detail</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { RouterLink } from 'vue-router';
  import {useAuthStore} from '../stores/auth';
  import { ElNotification } from 'element-plus';
  export default{
    name:'ComingSoonView',
    components:[
    RouterLink
    ],
    data(){
      return{
        movie_list : [],
        loading:false
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
      if (res){
        this.movie_list = res
        this.loading = false
      }
      else{
        this.loading = false
        this.$router.push('/')
        ElNotification.warning({
        title: 'Error',
        message: 'Page doesnt work',
        timeout:false
      })
      }
    }
  }
  </script>
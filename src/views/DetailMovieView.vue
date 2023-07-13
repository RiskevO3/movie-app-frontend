<template>
  <div class="mt-10 grid place-items-center font-mono">
    <span class="loading loading-dots loading-lg" v-if="isLoading"></span>
    <div class="bg-neutral rounded-md bg-gray-800 shadow-lg" v-else>
      <div class="md:flex px-4 leading-none max-w-4xl">
        <div class="flex-none">
          <img
            :src="data.image"
            alt="pic"
            class="h-72 w-56 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 shadow-lg"
          />
        </div>
        <div class="flex-col text-gray-300">
          <p class="md:tracking-tighter sm:tracking-tighter pt-4 text-2xl font-bold text-center">{{ data.title }}</p>
          <p class="md:tracking-tighter sm:tracking-tighter pt-4 font-bold text-center">{{ data.duration }} min | {{ data.genre }}</p>
          <hr class="hr-text" data-content="" />
          <p class="flex text-md px-4 my-2">
            <span class="font-semibold sm:block sm:text-center md:text-left">Director:</span>
            <span class="sm:block sm:text-center md:text-left">{{ data.director }}</span>
          </p>
          <p class="md:block sm:block px-4 my-5 text-left">
            <span class="font-semibold">Sinposis:</span>{{ data.description }}
          </p>
        </div>
      </div>
      <div class="justify-end items-center w-full px-5 py-2">
          <button type="button" class="btn btn-outline btn-warning hover:scale-90 px-4 py-2 m-2 w-full" v-if="!isWishlist" @click="insertWishList(data.id)">
            Add To Wishlist
          </button>
          <RouterLink
            :to="`/trailer/${data.id}`"
            type="button"
            class="btn btn-outline btn-info hover:scale-90 px-4 py-2 m-2 w-full"
            >View Trailer
          </RouterLink>
      </div>
    </div>
  </div>
</template>
<style>
@import 'https://fonts.googleapis.com/icon?family=Material+Icons';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&display=swap');


.hr-text {
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  opacity: 0.5;
}
.hr-text:before {
  content: '';
  background: linear-gradient(to right, transparent, #818078, transparent);
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
}
.hr-text:after {
  content: attr(data-content);
  position: relative;
  display: inline-block;
  color: black;
  padding: 0 0.5em;
  line-height: 1.5em;
  color: #818078;
  background-color: #fcfcfa;
}
</style>
<script>
import {useAuthStore} from '../stores/auth';
import {RouterLink} from 'vue-router';
import {ElNotification,ElLoading} from 'element-plus';
export default{
  name:'DetailMovieView',
  data(){
    return{
      data:{},
      loading:false,
      wishList:false,
    }
  },
  components:[
    RouterLink
  ],
  computed:{
    isLoading(){
      return this.loading
    },
    isWishlist(){
      return this.wishList
    }
  },
  async mounted (){
    let id = this.$route.params.id
    this.loading = true
    let res = await useAuthStore().getMovieDetail(id)
    if (res.success){
      this.data = res.data
      this.wishList = res.data.saved
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
          this.wishList = true
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

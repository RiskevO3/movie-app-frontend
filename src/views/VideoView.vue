<template>
<div class="flex flex-col items-center justify-center">
  <span class="loading loading-dots loading-lg content-center mt-10" v-if="isLoading"></span>
  <video class="w-full" autoplay controls v-else>
  <source :src="videoUrl" type="video/mp4">
  Your browser does not support the video tag.
  </video>
</div>
</template>
<script>
import { useAuthStore } from '../stores/auth';
import {ElNotification} from 'element-plus';
export default{
  name:'VideoView',
  data(){
    return{
      loading:false,
      videoUrl:'',
      id:this.$route.params.id
    }
  },
  computed:{
    isLoading(){
      return this.loading
    }
  },
  async mounted(){
    this.loading = true
    let response = await useAuthStore().checkVideo(this.id)
    if (response){
      this.loading = false
      this.videoUrl = `${useAuthStore().ngrokUrl}/movie-trailer/${this.$route.params.id}`
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
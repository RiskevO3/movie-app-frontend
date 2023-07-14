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
    <span class="loading loading-dots loading-lg" v-if="isLoading"></span>
    <div class="grid md:grid-cols-5 sm:grid-cols-1 gap-4" v-else>
        <div class="card w-auto bg-neutral shadow-xl" v-for="movie,index in movie_list" :key="index">
          <figure>
            <img :src="movie.image" :alt="movie.title" class="mx-auto rounded px-0 w-full"/>
          </figure>
          <div class="card-body">
            <h2 class="text-center content-center text-md font-semibold">{{ movie.title }}</h2>
            <p class="font-semibold text-center">Price: Rp.{{ movie.price ? movie.price.toLocaleString('id-ID') : 0 }}</p>
            <p class="font-semibold text-center">Seat Number: {{ movie.seat_number }}</p>
            <div class="justify-end card-actions mt-auto">
              <button class="btn btn-error hover:scale-90 hover:btn-success w-full" @click="confirmReffund(movie.ticket_id)">Reffund</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import {useAuthStore} from '../stores/auth';
import { ElNotification,ElMessageBox } from 'element-plus';
export default{
  name:'TicketBookView',
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
    let res = await useAuthStore().getBookMovie()
    if (res.success){
      this.movie_list = res.data
      this.loading = false
    }
    else{
      this.loading = false
      if(res.message == 'Please Login First'){
        this.$router.replace('/login')
      }else{
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
    confirmReffund(ticket_id){
    ElMessageBox.confirm('Apakah anda yakin ingin mereffund ticket ini?', 'Reffund Confirmation', {
    confirmButtonText: 'Submit',
    cancelButtonText: 'Cancel',
    type: 'warning'
    }).then(() => {
      this.reffund(ticket_id)
    }).catch(() => {
      ElNotification.info({
        title: 'info',
        message: 'Reffund Canceled',
        timeout:false
      })
    })
    },
    async reffund(id){
      let res = await useAuthStore().reffundTicket(id)
      if(res.success){
        ElNotification.success({
          title: 'Success',
          message: res.message,
        })
        this.movie_list.filter((item,index)=>{
          if(item.ticket_id == id){
            this.movie_list.splice(index,1)
          }
        })
      }else{
        ElNotification.error({
          title: 'Error',
          message: res.message,
        })
      }
    }
  }
}
</script>
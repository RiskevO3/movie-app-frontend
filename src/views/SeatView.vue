<template>
  <div class="flex flex-col p-10 justify-center items-center">
    <span class="loading loading-dots loading-lg" v-if="isLoading"></span>
    <template v-else>
      <div class="hero-content text-center">
    <div class="grid md:grid-cols-1">
      <h1 class="text-5xl font-bold">Silahkan Pilih Kursimu!</h1>
      <p class="py-6">Silahkan pilih kursi untuk film: <span class="font-semibold">{{ title }}</span>, dengan harga <span class="font-semibold">Rp.{{ price.toLocaleString('id-ID') }}</span>.Kamu dapat memilih seluruh kursi selain yang berwarna <span class="text-error">Merah</span></p>
      <button class="btn w-full disabled:bg-white disabled:text-black" disabled>Layar</button>
    </div>
  </div>
    <div class="grid md:grid-cols-12 sm:grid-cols-6 grid-cols-3 gap-3">
      <div 
      class="card w-auto" 
      :class="{'hover:scale-90 bg-neutral':!movie.is_sold && !movie.is_book,'bg-error':movie.is_sold,'hover:scale-90 bg-amber-950':movie.is_book}" v-for="movie,index in seatList" :key="movie.seat_number"
      @click="movie.is_book && !movie.is_sold ? unselectSeat(index) : selectSeat(index)"
      :disabled="movie.is_sold"
      >
        <div class="card-body">
          <p class="text-center font-semibold">{{ movie.seat_number }}</p>
        </div>
      </div>
    </div>
    <p class="text-2xl font-semibold text-start">Total Harga: Rp. {{ totalPrice.toLocaleString('id-ID') }} </p>
    <button class="btn btn-success w-1/2 mt-3 hover:scale-90" @click="confirmSeat">Pesan</button>  
    </template>
  </div>
</template>
<script>
import { ElNotification,ElMessageBox } from 'element-plus';
import { useAuthStore } from '../stores/auth';
export default{
  name:'SeatView',
  data(){
    return{
      movie_id:this.$route.params.id,
      seatList : [],
      loading:false,
      ticketPrice:0,
      total_price:0,
      movie_title:'',
      selectedSeat:[]
    }
  },
  computed:{
    isLoading(){
      return this.loading
    },
    title(){
      return this.movie_title
    },
    price(){
      return this.ticketPrice
    },
    totalPrice(){
      return this.total_price
    }
  },
  async mounted(){
    this.loading = true
    let response = await useAuthStore().getMovieSeat(this.$route.params.id)
    if(response.success){
      this.movie_title = response.movie_title
      this.ticketPrice = response.price
      this.seatList = response.data
      this.loading = false
    }else{
      this.loading = false
      this.$router.push('/')
      ElNotification.info({
        title: 'info',
        message: response.message ? response.message : 'there was an error',
      })
    }
  },
  methods:{
    selectSeat(index){
      if(!this.seatList[index].is_sold){
        if(this.selectedSeat.length >= 6){
          ElNotification.error({
            title:'error',
            message:'you can only select max 6 seats'
        })
        return
        }
        this.total_price += this.ticketPrice
        this.seatList[index].is_book = true
        this.selectedSeat.push(this.seatList[index].seat_number)
      }
    },
    unselectSeat(index){
      this.total_price -= this.ticketPrice
      this.seatList[index].is_book = false
      this.selectedSeat.splice(this.selectedSeat.indexOf(this.seatList[index].seat_number),1)
    },
    async submitSeat(){
      if(this.selectedSeat.length < 1){
        ElNotification.error({
          title:'error',
          message:'you must select at least 1 seat'
        })
        return
      }
      this.loading = true
      await useAuthStore().submitSeat(this.movie_id,this.selectedSeat).then(response=>{
        if(response.success){
          this.loading = false
          this.$router.push('/bookedticket')
          ElNotification.success({
            title:'success',
            message:response.message
          })
        }else{
          this.loading = false
          ElNotification.error({
            title:'error',
            message:response.message
          })
        }
      })
    },
    confirmSeat(){
      if(useAuthStore().balance < this.totalPrice){
        ElNotification.error({
          title:'error',
          message:'your balance is not enough'
        })
        return
      }
      ElMessageBox.confirm('Apakah anda yakin untuk melakukan checkout?','Checkout Confirmation',{
        confirmButtonText:'Yes',
        cancelButtonText:'No',
        type:'warning'
      }).then(()=>{
        this.submitSeat()
      }).catch(()=>{
        ElNotification.info({
          title:'info',
          message:'you canceled the submission'
        })
      })
    }
  }
}
</script>

import { defineStore } from 'pinia'
import axios from 'axios'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    ngrokUrl: import.meta.env.VITE_SERVER_HOST,
    username: localStorage.getItem('username') ? localStorage.getItem('username') : null,
    balance:localStorage.getItem('balance') ? localStorage.getItem('balance') : 0,
    authToken: localStorage.getItem('authToken') ? localStorage.getItem('authToken') : null
  }),
  actions: {
    async authRequest() {
      if (this.authToken) {
        try {
          let response = await axios.post(`${this.ngrokUrl}/auth`, {
            authToken: this.authToken
          })
          if (response.data.success) {
            this.username = response.data.username
            this.balance = response.data.balance
            localStorage.setItem('balance', this.balance)
          } else {
            localStorage.removeItem('username')
            localStorage.removeItem('authToken')
            localStorage.removeItem('balance')
            this.authToken = null
            this.username = null
            this.balance = null
          }
        } catch (error) {
          localStorage.removeItem('username')
          localStorage.removeItem('authToken')
          localStorage.removeItem('balance')
          this.authToken = null
          this.username = null
        }
      }
    },
    async registerRequest(username, password) {
      try {
        let response = await axios.post(`${this.ngrokUrl}/register`, {
          username: username,
          password: password
        })
        if (response.data.success) {
          this.authToken = response.data.data.authToken
          this.username = response.data.data.username
          this.balance = response.data.data.balance
          localStorage.setItem('authToken', this.authToken)
          localStorage.setItem('username', this.username)
          localStorage.setItem('balance', this.balance)
          return {message: 'Success', success: true}
        } 
        return {message: response.data.data.message, success: false}
      } catch (error) {
        return {message: 'Something went wrong', success: false}
      }
    },
    async loginRequest(username,password) {
      try {
        let response = await axios.post(`${this.ngrokUrl}/login`, {
          username: username,
          password: password
        })
        if (response.data.success) {
          this.authToken = response.data.data.authToken
          this.username = response.data.data.username
          this.balance = response.data.data.balance
          localStorage.setItem('authToken', this.authToken)
          localStorage.setItem('username', this.username)
          localStorage.setItem('balance', this.balance)
          return true
        }
      } catch (error) {
        return false
      }
    },
    async logoutRequest(){
      try {
        let response = await axios.get(`${this.ngrokUrl}/logout`,{
          headers:{
            Authorization:`Bearer ${this.authToken}`
          }
        })
        if(response.data.success){
          localStorage.removeItem('username')
          localStorage.removeItem('authToken')
          localStorage.removeItem('balance')
          this.authToken = null
          this.username = null
          this.balance = null
          return true
        }
        return false
      } catch (error) {
        return false
      }
    },
    async getNowShowing() {
      try {
        if (!this.authToken) {
          return { message: 'Please Login First', success: false }
        }
        let response = await axios.get(`${this.ngrokUrl}/nowshowing`, {
          headers: {
            Authorization: `Bearer ${this.authToken}`
          }
        })
        if (response.data.success) {
          return { data: response.data.data, success: true }
        } else if (response.data.message == 'Unauthorized') {
          return { message: 'Please Login First', success: false }
        }
        return { message: 'Something went wrong', success: false }
      } catch (error) {
        return { message: 'Something went wrong', success: false }
      }
    },
    async getWishlist() {
      try {
        if (!this.authToken) {
          return { message: 'Please Login First', success: false }
        }
        let response = await axios.get(`${this.ngrokUrl}/wishlist`, {
          headers: {
            Authorization: `Bearer ${this.authToken}`
          }
        })
        if (response.data.success) {
          return { data: response.data.data, success: true }
        } else if (response.data.message == 'Unauthorized') {
          return { message: 'Please Login First', success: false }
        }
        return { message: 'Something went wrong', success: false }
      } catch (error) {
        return { message: 'Something went wrong', success: false }
      }
    },
    async getComingSoon() {
      try {
        if (!this.authToken) {
          return { message: 'Please Login First', success: false }
        }
        let response = await axios.get(`${this.ngrokUrl}/comingsoon`, {
          headers: {
            Authorization: `Bearer ${this.authToken}`
          }
        })
        if (response.data.success) {
          return { data: response.data.data, success: true }
        } else if (response.data.message == 'Unauthorized') {
          return { message: 'Please Login First', success: false }
        }
        return { message: 'Something went wrong', success: false }
      } catch (error) {
        return { message: 'Something went wrong', success: false }
      }
    },
    async getMovieDetail(id) {
      try {
        if (!this.authToken) {
          return { message: 'Please Login First', success: false }
        }
        let response = await axios.get(`${this.ngrokUrl}/moviedetail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.authToken}`
          }
        })
        if (response.data.success) {
          return { data: response.data.data, success: true }
        } else if (response.data.message == 'Unauthorized') {
          return { message: 'Please Login First', success: false }
        }
        return { message: 'Something went wrong', success: false }
      } catch (error) {
        return { message: 'Something went wrong', success: false }
      }
    },
    async getMovieSeat(id){
      try {
        if (!this.authToken) {
          return { message: 'Please Login First', success: false }
        }
        let response = await axios.get(`${this.ngrokUrl}/seatlist/${id}`, {
          headers: {
            Authorization: `Bearer ${this.authToken}`
          }
        })
        if (response.data.success) {
          return { data: response.data.data, success: true ,movie_title:response.data.movie_title,price:response.data.price}
        } else if (response.data.message == 'Unauthorized') {
          return { message: 'Please Login First', success: false }
        }
        return { message: 'Something went wrong', success: false }
      } catch (error) {
        return { message: 'Something went wrong', success: false }
      }
    },
    async getBookMovie(){
      try {
        if (!this.authToken) {
          return { message: 'Please Login First', success: false }
        }
        let response = await axios.get(`${this.ngrokUrl}/bookedticket`, {
          headers: {
            Authorization: `Bearer ${this.authToken}`
          }
        })
        if (response.data.success) {
          return { data: response.data.data, success: true }
        } else if (response.data.message == 'Unauthorized') {
          return { message: 'Please Login First', success: false }
        }
        return { message: 'Something went wrong', success: false }
      } catch (error) {
        return { message: 'Something went wrong', success: false }
      }
    },
    async reffundTicket(ticketId){
      try {
        let response = await axios.post(`${this.ngrokUrl}/reffundticket`,{
          ticket_id:ticketId
        },{headers:{
          Authorization:`Bearer ${this.authToken}`
        }})
        if (response.data.success){
          this.balance = response.data.balance
          localStorage.setItem('balance', this.balance)
          return {message:'Tiket berhasil di refund!',success:true}
        }
        return {message:response.data.message?response.data.message:'something went wrong',success:false}
      } catch (error) {
          return { message: 'Something went wrong', success: false }
      }
    },
    async checkVideo(id) {
      try {
        if (!this.authToken) {
          return { message: 'Please Login First', success: false }
        }
        let response = await axios.get(`${this.ngrokUrl}/checkvideo/${id}`, {
          headers: {
            Authorization: `Bearer ${this.authToken}`
          }
        })
        if (response.data.success) {
          return { data: response.data.data, success: true }
        } else if (response.data.message == 'Unauthorized') {
          return { message: 'Please Login First', success: false }
        }
        return { message: 'Something went wrong', success: false }
      } catch (error) {
        return { message: 'Something went wrong', success: false }
      }
    },
    async insertWishList(id){
      if(!this.authToken){
        return {message:'Please Login First',success:false}
      }
      try {
        let response = await axios.post(`${this.ngrokUrl}/insertwishlist`,{
          id:id
        },{
          headers:{
            Authorization:`Bearer ${this.authToken}`
          }
        })
        if(response.data.success){
          return {message:'Success',success:true}
        }
        return {message:'Something went wrong',success:false}
      } catch (error) {
        return {message:'Something went wrong',success:false}
      }
    },
    async deleteWishList(id){
      if(!this.authToken){
        return {message:'Please Login First',success:false}
      }
      try {
        let response = await axios.post(`${this.ngrokUrl}/deletewishlist`,{
          id:id
        },{
          headers:{
            Authorization:`Bearer ${this.authToken}`
          }
        })
        if(response.data.success){
          return {message:'Success',success:true}
        }
        return {message:'Something went wrong',success:false}
      } catch (error) {
        return {message:'Something went wrong',success:false}
      }
    },
    async topupBalance(amount){
      try {
        let response = await axios.post(`${this.ngrokUrl}/topup`,{
          amount:amount
        },{headers:{
          Authorization:`Bearer ${this.authToken}`
        }})
        if (response.data.success) {
          this.balance = response.data.balance
          localStorage.setItem('balance', this.balance)
          return {message:'Success',success:true}
        }
        return {message:'Something went wrong',success:false}
      } catch (error) {
        return {message:'Something went wrong',success:false}
      }
    },
    async withdrawBalance(amount){
      try {
        let response = await axios.post(`${this.ngrokUrl}/withdraw`,{
          amount:amount
        },{headers:{
          Authorization:`Bearer ${this.authToken}`
        }})
        if(response.data.success){
          this.balance = response.data.balance
          localStorage.setItem('balance', this.balance)
          return {message:'Success',success:true}
        }
        return {message:response.data.message?response.data.message:'something went wrong',success:false}
      } catch (error) {
        return {message:'Something went wrong',success:false}
      }
    },
    async submitSeat(movieId,seatList){
      try {
        let response = await axios.post(`${this.ngrokUrl}/bookticket`,{
          list_seat:seatList,
          movie_id:movieId
        },{headers:{
          Authorization:`Bearer ${this.authToken}`
        }})
        if (response.data.success){
          this.balance = response.data.balance
          return {message:'Tiket berhasil dibeli!',success:true}
        }
        return {
          message: response.data.message ? response.data.message : 'Something went wrong',
          success: false
        }
      } catch (error) {
        return {message:'Something went wrong',success:false}
      }
    }
  }
})

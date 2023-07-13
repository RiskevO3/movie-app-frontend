import { defineStore } from 'pinia'
import axios from 'axios'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    ngrokUrl: import.meta.env.VITE_SERVER_HOST,
    username: localStorage.getItem('username') ? localStorage.getItem('username') : null,
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
          } else {
            localStorage.removeItem('username')
            localStorage.removeItem('authToken')
            this.authToken = null
            this.username = null
          }
        } catch (error) {
          localStorage.removeItem('username')
          localStorage.removeItem('authToken')
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
          localStorage.setItem('authToken', this.authToken)
          localStorage.setItem('username', this.username)
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
          localStorage.setItem('authToken', this.authToken)
          localStorage.setItem('username', this.username)
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
          this.authToken = null
          this.username = null
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
    }
  }
})

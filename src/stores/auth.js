// import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
export const useAuthStore = defineStore('auth', () => {

  const ngrokUrl = import.meta.env.VITE_SERVER_HOST

  const getNowShowing = async () =>{
    try {
      let response = await axios.get(`${ngrokUrl}/nowshowing`)
      if (response.data.success){
        return response.data.data
      }
      return false      
    } catch (error) {
      return false
    }
  }

  const getComingSoon = async () =>{
    try {
      let response = await axios.get(`${ngrokUrl}/comingsoon`)
      if (response.data.success){
        return response.data.data
      }
      return false 
    } catch (error) {
      return false
    }
  }

  const getMovieDetail = async (id) =>{
    try {
      let response = await axios.get(`${ngrokUrl}/moviedetail/${id}`)
      if (response.data.success){
        return response.data.data
      }
      return false
    } catch (error) {
      return false
    }
  }

  const checkVideo = async (id) =>{
    try {
      let response = await axios.get(`${ngrokUrl}/checkvideo/${id}`)
      if (response.data.success){
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  return { getNowShowing,getComingSoon,getMovieDetail,checkVideo,ngrokUrl }
})

<template>
    <section class="dark:bg-transparent space-y-0">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
            class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white"
            >
              Create Your Account
            </h1>
            <form class="space-y-4 md:space-y-6" @submit.prevent="registerRequest">
              <div>
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-white dark:text-white"
                  >Username</label
                >
                <input
                  type="username"
                  name="username"
                  id="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
                  placeholder="username"
                  v-model="username"
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password
                  </label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
                  v-model="password"
                  />
              </div>
              <div>
                <label
                  for="repassword"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Retype Password
                  </label
                >
                <input
                  type="password"
                  name="repassword"
                  id="repassword"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
                  v-model="retypepassword"
                />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-start"></div>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-info dark:hover:bg-success dark:disabled:hover:bg-info dark:disabled:opacity-50"
              >
                Sign Up
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                have an account?
                <RouterLink to="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Sign In
                  </RouterLink
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </template>
  <script>
  import { RouterLink } from 'vue-router';
  import {ElLoading,ElNotification} from 'element-plus';
  import { useAuthStore } from '../stores/auth';
  export default {
    name: 'RegisterView',
    components:[
    RouterLink
    ],
    data() {
      return {
        username: '',
        password: '',
        retypepassword:'',
        loading: false,
      }
    },
    methods: {
      async registerRequest(){
        this.loading = ElLoading.service({
          fullscreen: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.8)',
          lock: true
        })
        if(!this.username || !this.password || !this.retypepassword){
          this.username = this.password = this.retypepassword = ''
          this.loading.close()
          ElNotification.info({
            title: 'info',
            message: 'Please fill all the form',
          })
        }
        if(this.password != this.retypepassword){
          this.password = this.retypepassword = this.retypepassword = ''
          this.loading.close()
          ElNotification.info({
            title: 'info',
            message: 'Password and Retype Password must be same',
          })
        }
        else{
          let response = await useAuthStore().registerRequest(this.username,this.password)
          if(response.success){
            this.loading.close()
            ElNotification.success({
              title: 'Success',
              message: 'Register Success',
            })
            this.$router.push('/login')
          }
          else{
            this.loading.close()
            ElNotification.error({
              title: 'Error',
              message: response.message,
            })
          }
        }
      }
    }
  }
  </script>
  
<template>
  <section class="dark:bg-transparent space-y-0">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <form class="p-6 space-y-4 md:space-y-6 sm:p-8" @submit.prevent="login">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>
          <div class="space-y-4 md:space-y-6">
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                Username
                </label
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
            <div class="flex items-center justify-between">
              <div class="flex items-start"></div>
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-info dark:hover:bg-success dark:disabled:hover:bg-info dark:disabled:opacity-50"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <RouterLink to="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Sign up
              </RouterLink
              >
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
import {RouterLink} from 'vue-router';
import {useAuthStore} from '../stores/auth';
import {ElNotification} from 'element-plus';
import { ElLoading } from 'element-plus';
export default {
  name: 'LoginView',
  components:[
    RouterLink
  ],
  data() {
    return {
      username: '',
      password: '',
      loading: false
    }
  },
  methods: {
    async login() {
      this.loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      if(!this.username || !this.password){
        ElNotification.warning({
          title: 'Error',
          message: 'Username atau Password tidak boleh kosong',
          timeout: false
        })
        return
      }
      let res = await useAuthStore().loginRequest(this.username, this.password)
      if (res) {
        this.$router.push('/')
        ElNotification.success({
          title: 'Success',
          message: `Selamat Datang ${useAuthStore().username}`,
          timeout: false
        })
        this.loading.close()
      } else {
        this.username = ''
        this.password = ''
        ElNotification.warning({
          title: 'Error',
          message: 'Username atau Password Salah',
          timeout: false
        })
        this.loading.close()
      }
    }
  }
}
</script>

<template>
    <section class="dark:bg-transparent space-y-0">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              Create Your Account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="username"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Username</label
                >
                <input
                  type="username"
                  name="username"
                  id="username"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
                  placeholder="username"
                  v-model="username"
                  @change="checkUsername"
                  :disabled="infoAlert"
                />
                <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="errorAlert">
                  <span class="font-medium">Oops!</span> {{ errorAlert }}
                </p>
                <p class="mt-2 text-sm text-info dark:text-info font-medium" v-if="infoAlert">
                  {{ infoAlert }}
                </p>
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
                  type="repassword"
                  name="repassword"
                  id="password"
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
                disabled
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
  export default {
    name: 'RegisterView',
    components:[
    RouterLink
    ],
    data() {
      return {
        list_username: ['dono', 'kasino', 'indro'],
        username: '',
        password: '',
        retypepassword:'',
        errorMessage: null,
        infoMessage: null
      }
    },
    computed: {
      errorAlert() {
        return this.errorMessage
      },
      infoAlert() {
        return this.infoMessage
      }
    },
    methods: {
      checkUsername() {
        this.errorMessage = null
        this.infoMessage = 'Memeriksa username'
        setTimeout(() => {
          this.infoMessage = null
          if (this.list_username.includes(this.username)) {
            this.errorMessage = 'Username sudah digunakan!'
          } else if (this.username.length > 20) {
            this.errorMessage = 'username tidak dapat lebih dari 20 karakter.'
          } else {
            this.errorMessage = null
          }
        }, 2000)
      }
    }
  }
  </script>
  
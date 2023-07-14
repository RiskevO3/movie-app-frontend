<template>
  <div class="navbar bg-neutral">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52"
        >
          <template v-if="useAuthStore().authToken">
            <li>
              <div class="disabled:btn disabled:btn-ghost" disabled>
                <p class="font-semibold">{{ useAuthStore().username }}</p>
              </div>
            </li>
            <li>
              <RouterLink to="/nowshowing" class="text-white hover:text-success active:text-success"
                >Now Showing</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/comingsoon" class="text-white hover:text-success active:text-success"
                >Coming Soon</RouterLink
              >
            </li>
            <li>
              <button
                to="/register"
                class="text-error hover:text-success active:text-success"
                @click="logout"
              >
                Logout
              </button>
            </li>
          </template>
          <template v-else>
            <li>
              <RouterLink to="/login" class="text-white hover:text-success active:text-success"
                >Login</RouterLink
              >
            </li>
            <li>
              <RouterLink to="/register" class="text-white hover:text-success active:text-success"
                >Register</RouterLink
              >
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
    </div>
    <div class="navbar-end">
      <template v-if="useAuthStore().authToken">
        <RouterLink to="/bookedticket" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <i class="fa-solid fa-ticket text-info"></i>
          </div>
        </RouterLink>
        <RouterLink to="/wishlist" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <i class="fa-solid fa-basket-shopping text-warning"></i>
          </div>
        </RouterLink>
        <div class="dropdown">
          <label tabindex="0">
            <div class="btn btn-ghost"
        >
          <div class="indicator">
            <i class="fa-solid fa-database text-error"></i>
            <p class="pl-1 font-semibold">Rp. {{ getBalance.toLocaleString('id-ID')  }}</p>
          </div>
        </div>
          </label>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-[1] p-1 shadow bg-black rounded-box w-25"
          >
            <li>
              <button @click="topup" class="text-white hover:text-success active:text-success"
                >Top Up</button
              >
            </li>
            <li>
              <button @click="withdraw" class="text-white hover:text-success active:text-success"
                >withdraw
                </button
              >
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import {computed} from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElNotification,ElLoading } from 'element-plus'

let getBalance = computed(() => {
  return useAuthStore().balance
})

const route = useRouter()
const logout = async () => {
  let response = await useAuthStore().logoutRequest()
  if (response) {
    ElNotification.success({
      title: 'Success',
      message: 'Logout Success'
    })
    route.replace('/')
  } else {
    ElNotification.warning({
      title: 'Error',
      message: 'Logout Failed'
    })
  }
}

const withdraw = () => {
  ElMessageBox.prompt('How Much You Want Withdraw?', 'Withdraw Balance', {
    confirmButtonText: 'Submit',
    cancelButtonText: 'Cancel',
    inputType: 'number',
  })
    .then(async ({ value }) => {
      let loading = ElLoading.service({
        fullscreen: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.8)'
      })
      let amount = parseInt(value)
      let response = await useAuthStore().withdrawBalance(amount)
      if (response.success) {
        loading.close()
        ElNotification.success({
          title: 'Success',
          message: 'Withdraw Success'
        })
      } else {
        loading.close()
        ElNotification.warning({
          title: 'Error',
          message: response.message ? response.message : 'Withdraw Falied'
        })
      }
      
    })
    .catch(() => {
      ElNotification.info({
        title: 'Info',
        message: 'Input canceled'
      })
    })
}

const topup = () => {
  ElMessageBox.prompt('How Much You Want topup?', 'Topup Balance', {
    confirmButtonText: 'Submit',
    cancelButtonText: 'Cancel',
    inputType: 'number',
  })
    .then(async ({ value }) => {
      let loading = ElLoading.service({
        fullscreen: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.8)'
      })
      let amount = parseInt(value)
      let response = await useAuthStore().topupBalance(amount)
      if (response) {
        loading.close()
        ElNotification.success({
          title: 'Success',
          message: 'Topup Success'
        })
      } else {
        loading.close()
        ElNotification.warning({
          title: 'Error',
          message: 'Topup Failed'
        })
      }
      
    })
    .catch(() => {
      ElNotification.info({
        title: 'Info',
        message: 'Input canceled'
      })
    })
}
</script>
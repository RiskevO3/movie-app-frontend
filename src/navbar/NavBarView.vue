<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
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
</script>
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
      <RouterLink to="/" class="btn btn-ghost normal-case text-xl">MovieAPP</RouterLink>
    </div>
    <div class="navbar-end">
      <template v-if="useAuthStore().authToken">
        <p class="font-semibold">{{ useAuthStore().username }}</p>
        <RouterLink to="/wishlist" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <i class="fa-solid fa-basket-shopping text-warning"></i>
          </div>
        </RouterLink>
      </template>
    </div>
  </div>
</template>

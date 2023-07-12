<script setup>
import { RouterLink } from 'vue-router'
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
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li><RouterLink to="/nowshowing">Now Showing</RouterLink></li>
          <li><RouterLink to="/comingsoon">Coming Soon</RouterLink></li>
        </ul>
      </div>
    </div>
    <div class="navbar-center">
      <RouterLink to="/" class="btn btn-ghost normal-case text-xl">MovieAPP</RouterLink>
    </div>
    <div class="navbar-end">
      <button class="btn btn-ghost btn-circle">
        <div class="indicator">
          <i class="fa-solid fa-cart-shopping text-warning"></i>
        </div>
      </button>
    </div>
  </div>
</template>

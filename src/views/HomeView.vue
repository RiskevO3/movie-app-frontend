<template>
<div class="hero mt-10">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Selamat Datang di MovieApp!</h1>
      <p class="py-6">Disini, Kamu dapat menambahkan wishlist dengan berbagai macam film yang sedang tayang, ataupun yang akan datang.</p>
      <RouterLink class="btn btn-success hover:scale-90 hover:btn-info w-full" to="/nowshowing">Mulai</RouterLink>
    </div>
  </div>
</div>
</template>
<script setup>
import {RouterLink} from 'vue-router';
</script>
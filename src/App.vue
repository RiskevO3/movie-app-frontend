<script setup>
import navBarView from './navbar/NavBarView.vue'
</script>

<template>
  <navBarView />
  <div class="mb-auto">
    <RouterView />
  </div>
  <footer class="end-0 right-0 bottom-0 content-right p-4 bg-transparent text-base-content fixed">
    <div>
      <p>made with ❤️ by <a href="https://www.instagram.com/rizqimltzm/" target="_blank"><span class="text-blue-500 font-semibold hover:text-blue-700">rizqi</span></a></p>
    </div>
  </footer>
</template>
<style></style>

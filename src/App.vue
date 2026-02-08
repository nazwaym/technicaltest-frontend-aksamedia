<script setup>
import { RouterView, useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const route = useRoute()
</script>

<template>
  <!-- Login page without layout -->
  <RouterView v-if="route.name === 'login'" />
  
  <!-- All other pages with MainLayout -->
  <MainLayout v-else>
    <RouterView />
  </MainLayout>
</template>

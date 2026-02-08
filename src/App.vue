<script setup>
import { RouterView, useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

const route = useRoute()
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="page-fade" mode="out-in">
      <div v-if="route.name === 'login'" :key="route.path">
        <component :is="Component" />
      </div>
      <MainLayout v-else :key="'layout-' + route.path">
        <component :is="Component" />
      </MainLayout>
    </Transition>
  </RouterView>
</template>

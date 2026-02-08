<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="min-h-screen bg-[var(--color-bg-secondary)]">
    <Navbar />
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

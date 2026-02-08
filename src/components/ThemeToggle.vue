<script setup>
import { ref } from 'vue'
import { useClickOutside } from '@/composables/useClickOutside'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const dropdownRef = ref(null)
const isOpen = ref(false)

useClickOutside(dropdownRef, () => {
  isOpen.value = false
})

const options = [
  { value: 'light', label: 'Terang', icon: 'sun' },
  { value: 'dark', label: 'Gelap', icon: 'moon' },
  { value: 'system', label: 'Sistem', icon: 'computer' }
]

const selectTheme = (value) => {
  themeStore.setMode(value)
  isOpen.value = false
}

const currentOption = () => {
  return options.find(o => o.value === themeStore.mode) || options[2]
}
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
      :title="`Tema: ${currentOption().label}`"
    >
      <!-- Sun Icon -->
      <svg v-if="themeStore.mode === 'light'" class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <!-- Moon Icon -->
      <svg v-else-if="themeStore.mode === 'dark'" class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
      <!-- System Icon -->
      <svg v-else class="w-5 h-5 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <span class="hidden sm:inline text-sm text-[var(--color-text-secondary)]">
        {{ currentOption().label }}
      </span>
      <svg class="w-4 h-4 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-40 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg shadow-lg py-1 z-50"
      >
        <button
          v-for="option in options"
          :key="option.value"
          @click="selectTheme(option.value)"
          class="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-[var(--color-bg-tertiary)] transition-colors"
          :class="themeStore.mode === option.value ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-primary)]'"
        >
          <!-- Sun -->
          <svg v-if="option.icon === 'sun'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <!-- Moon -->
          <svg v-else-if="option.icon === 'moon'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <!-- Computer -->
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {{ option.label }}
          <!-- Check -->
          <svg v-if="themeStore.mode === option.value" class="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

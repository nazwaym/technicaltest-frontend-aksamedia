<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useClickOutside } from '@/composables/useClickOutside'
import ThemeToggle from './ThemeToggle.vue'

const router = useRouter()
const authStore = useAuthStore()

const userDropdownRef = ref(null)
const isUserDropdownOpen = ref(false)
const isMobileMenuOpen = ref(false)

useClickOutside(userDropdownRef, () => {
  isUserDropdownOpen.value = false
})

const handleLogout = () => {
  authStore.logout()
  isUserDropdownOpen.value = false
  router.push({ name: 'login' })
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <nav class="sticky top-0 z-40 bg-[var(--color-bg-primary)]/80 backdrop-blur-lg border-b border-[var(--color-border)]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Left: Logo & Nav Links -->
        <div class="flex items-center gap-8">
          <!-- Logo -->
          <RouterLink to="/" class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="font-semibold text-lg text-[var(--color-text-primary)] hidden sm:inline">
              Aksamedia
            </span>
          </RouterLink>
          
          <!-- Desktop Nav Links -->
          <div class="hidden md:flex items-center gap-1">
            <RouterLink
              to="/"
              class="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--color-bg-tertiary)]"
              :class="$route.name === 'home' ? 'text-[var(--color-accent)] bg-[var(--color-accent)]/10' : 'text-[var(--color-text-secondary)]'"
            >
              Dashboard
            </RouterLink>
            <RouterLink
              to="/crud"
              class="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--color-bg-tertiary)]"
              :class="$route.path.startsWith('/crud') ? 'text-[var(--color-accent)] bg-[var(--color-accent)]/10' : 'text-[var(--color-text-secondary)]'"
            >
              Data Karyawan
            </RouterLink>
          </div>
        </div>
        
        <!-- Right: Theme Toggle & User Menu -->
        <div class="flex items-center gap-2">
          <!-- Theme Toggle -->
          <ThemeToggle />
          
          <!-- User Dropdown -->
          <div ref="userDropdownRef" class="relative">
            <button
              @click="isUserDropdownOpen = !isUserDropdownOpen"
              class="flex items-center gap-2 p-1.5 pr-3 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
            >
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                {{ authStore.user?.fullName?.charAt(0).toUpperCase() || 'A' }}
              </div>
              <span class="hidden sm:inline text-sm font-medium text-[var(--color-text-primary)]">
                {{ authStore.user?.fullName || 'User' }}
              </span>
              <svg class="w-4 h-4 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- User Dropdown Menu -->
            <Transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="isUserDropdownOpen"
                class="absolute right-0 mt-2 w-56 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded-lg shadow-lg py-1 z-50"
              >
                <!-- User Info -->
                <div class="px-4 py-3 border-b border-[var(--color-border)]">
                  <p class="text-sm font-medium text-[var(--color-text-primary)]">{{ authStore.user?.fullName }}</p>
                  <p class="text-xs text-[var(--color-text-muted)]">{{ authStore.user?.email }}</p>
                </div>
                
                <!-- Menu Items -->
                <RouterLink
                  to="/profile"
                  @click="isUserDropdownOpen = false"
                  class="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] transition-colors"
                >
                  <svg class="w-4 h-4 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Edit Profil
                </RouterLink>
                
                <div class="border-t border-[var(--color-border)] my-1"></div>
                
                <button
                  @click="handleLogout"
                  class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </Transition>
          </div>
          
          <!-- Mobile Menu Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
          >
            <svg v-if="!isMobileMenuOpen" class="w-6 h-6 text-[var(--color-text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6 text-[var(--color-text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden border-t border-[var(--color-border)] py-3">
          <RouterLink
            to="/"
            @click="closeMobileMenu"
            class="block px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            :class="$route.name === 'home' ? 'text-[var(--color-accent)] bg-[var(--color-accent)]/10' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'"
          >
            Dashboard
          </RouterLink>
          <RouterLink
            to="/crud"
            @click="closeMobileMenu"
            class="block px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            :class="$route.path.startsWith('/crud') ? 'text-[var(--color-accent)] bg-[var(--color-accent)]/10' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'"
          >
            Data Karyawan
          </RouterLink>
        </div>
      </Transition>
    </div>
  </nav>
</template>

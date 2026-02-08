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
  <nav class="sticky top-0 z-40 bg-[var(--color-bg-primary)]/80 backdrop-blur-lg border-b border-[var(--color-border)] glass">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Left: Logo & Nav Links -->
        <div class="flex items-center gap-8">
          <!-- Logo -->
          <RouterLink to="/" class="flex items-center gap-2 group">
            <div class="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 p-1.5 border border-[var(--color-border)]">
              <img 
                src="@/assets/images/aksamedia.png" 
                alt="Aksamedia Logo"  
                class="w-full h-full object-contain"
              />
            </div>
            <span class="font-black text-xl tracking-tight text-[var(--color-text-primary)] hidden sm:inline relative">
              Aksamedia
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </RouterLink>
          
          <!-- Desktop Nav Links -->
          <div class="hidden md:flex items-center gap-1">
            <RouterLink
              to="/"
              class="px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 relative group"
              :class="$route.name === 'home' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'"
            >
              Dashboard
              <span v-if="$route.name === 'home'" class="absolute bottom-1 left-4 right-4 h-0.5 bg-[var(--color-accent)] rounded-full animate-fade-in"></span>
              <span v-else class="absolute bottom-1 left-4 right-4 h-0.5 bg-[var(--color-accent)] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </RouterLink>
            <RouterLink
              to="/crud"
              class="px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 relative group"
              :class="$route.path.startsWith('/crud') ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'"
            >
              Data Karyawan
              <span v-if="$route.path.startsWith('/crud')" class="absolute bottom-1 left-4 right-4 h-0.5 bg-[var(--color-accent)] rounded-full animate-fade-in"></span>
              <span v-else class="absolute bottom-1 left-4 right-4 h-0.5 bg-[var(--color-accent)] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </RouterLink>
          </div>
        </div>
        
        <!-- Right: Theme Toggle & User Menu -->
        <div class="flex items-center gap-3">
          <!-- Theme Toggle -->
          <div class="p-1 bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)]">
            <ThemeToggle />
          </div>
          
          <!-- User Dropdown -->
          <div ref="userDropdownRef" class="relative">
            <button
              @click="isUserDropdownOpen = !isUserDropdownOpen"
              class="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-[var(--color-bg-tertiary)] transition-all duration-300 border border-transparent hover:border-[var(--color-border)] group"
            >
              <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:shadow-cyan-500/20 transition-all">
                {{ authStore.user?.fullName?.charAt(0).toUpperCase() || 'A' }}
              </div>
              <div class="hidden sm:flex flex-col items-start leading-tight">
                <span class="text-xs text-[var(--color-text-muted)] font-bold uppercase tracking-wider">Administrator</span>
                <span class="text-sm font-bold text-[var(--color-text-primary)]">
                  {{ authStore.user?.fullName || 'User' }}
                </span>
              </div>
              <svg class="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- User Dropdown Menu -->
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95 -translate-y-2"
              enter-to-class="transform opacity-100 scale-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="transform opacity-100 scale-100 translate-y-0"
              leave-to-class="transform opacity-0 scale-95 -translate-y-2"
            >
              <div
                v-if="isUserDropdownOpen"
                class="absolute right-0 mt-3 w-64 bg-[var(--color-bg-primary)]/95 backdrop-blur-xl border border-[var(--color-border)] rounded-2xl shadow-2xl py-2 z-50 overflow-hidden animate-scale-in"
              >
                <!-- User Info Section -->
                <div class="px-5 py-4 bg-gradient-to-br from-[var(--color-bg-secondary)] to-transparent border-b border-[var(--color-border)] mb-1">
                  <p class="text-xs text-[var(--color-text-muted)] font-black uppercase tracking-widest mb-1">Profil Anda</p>
                  <p class="text-sm font-black text-[var(--color-text-primary)] truncate">{{ authStore.user?.fullName }}</p>
                  <p class="text-xs text-[var(--color-text-muted)] truncate">{{ authStore.user?.email }}</p>
                </div>
                
                <!-- Menu Items -->
                <div class="px-2 space-y-1">
                  <RouterLink
                    to="/profile"
                    @click="isUserDropdownOpen = false"
                    class="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-[var(--color-text-primary)] hover:bg-[var(--color-accent)] hover:text-white rounded-xl transition-all group/item"
                  >
                    <div class="w-8 h-8 rounded-lg bg-[var(--color-bg-tertiary)] flex items-center justify-center group-hover/item:bg-white/20 transition-colors">
                      <svg class="w-4 h-4 text-[var(--color-accent)] group-hover/item:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    Edit Profil
                  </RouterLink>
                  
                  <button
                    @click="handleLogout"
                    class="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white rounded-xl transition-all group/logout"
                  >
                    <div class="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center group-hover/logout:bg-white/20 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    Keluar Sesi
                  </button>
                </div>
              </div>
            </Transition>
          </div>
          
          <!-- Mobile Menu Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2.5 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300 shadow-sm active-spring"
          >
            <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden absolute left-4 right-4 top-20 bg-[var(--color-bg-primary)]/95 backdrop-blur-xl border border-[var(--color-border)] p-2 rounded-2xl shadow-2xl z-40 space-y-1">
          <RouterLink
            to="/"
            @click="closeMobileMenu"
            class="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all"
            :class="$route.name === 'home' ? 'text-white bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/25' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'"
          >
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </RouterLink>
          <RouterLink
            to="/crud"
            @click="closeMobileMenu"
            class="flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all"
            :class="$route.path.startsWith('/crud') ? 'text-white bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/25' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'"
          >
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Data Karyawan
          </RouterLink>
        </div>
      </Transition>
    </div>
  </nav>
</template>

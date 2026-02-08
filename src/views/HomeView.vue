<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCrudStore } from '@/stores/crud'

const authStore = useAuthStore()
const crudStore = useCrudStore()
</script>

<template>
  <div class="animate-fade-in space-y-10">
    <!-- Welcome Section -->
    <div class="mb-4 group">
      <h1 class="text-4xl sm:text-5xl font-black text-[var(--color-text-primary)] tracking-tight animate-fade-in-up">
        Selamat Datang, <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">{{ authStore.user?.fullName }}</span>!
      </h1>
      <p class="text-lg text-[var(--color-text-secondary)] mt-3 font-medium animate-fade-in-up" style="animation-delay: 100ms;">
        Berikut ringkasan data pada sistem Aksamedia Panel untuk hari ini.
      </p>
    </div>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Karyawan -->
      <div class="bg-[var(--color-bg-primary)] rounded-3xl border border-[var(--color-border)] p-7 shadow-sm transition-all duration-500 hover-lift group animate-scale-in glass" style="animation-delay: 200ms;">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <p class="text-xs font-black text-[var(--color-text-muted)] uppercase tracking-widest group-hover:text-[var(--color-accent)] transition-colors">Total Karyawan</p>
            <p class="text-5xl font-black text-[var(--color-text-primary)] tracking-tighter">{{ crudStore.items.length }}</p>
          </div>
          <div class="w-16 h-16 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 dark:from-cyan-500/20 dark:to-blue-600/20 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
            <svg class="w-8 h-8 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Developer -->
      <div class="bg-[var(--color-bg-primary)] rounded-3xl border border-[var(--color-border)] p-7 shadow-sm transition-all duration-500 hover-lift group animate-scale-in glass" style="animation-delay: 300ms;">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <p class="text-xs font-black text-[var(--color-text-muted)] uppercase tracking-widest group-hover:text-emerald-500 transition-colors">Developer</p>
            <p class="text-5xl font-black text-[var(--color-text-primary)] tracking-tighter">
              {{ crudStore.items.filter(i => i.jabatan.includes('Developer')).length }}
            </p>
          </div>
          <div class="w-16 h-16 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 dark:from-emerald-500/20 dark:to-teal-600/20 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
            <svg class="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Designer -->
      <div class="bg-[var(--color-bg-primary)] rounded-3xl border border-[var(--color-border)] p-7 shadow-sm transition-all duration-500 hover-lift group animate-scale-in glass" style="animation-delay: 400ms;">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <p class="text-xs font-black text-[var(--color-text-muted)] uppercase tracking-widest group-hover:text-pink-500 transition-colors">Designer</p>
            <p class="text-5xl font-black text-[var(--color-text-primary)] tracking-tighter">
              {{ crudStore.items.filter(i => i.jabatan.includes('Designer')).length }}
            </p>
          </div>
          <div class="w-16 h-16 bg-gradient-to-br from-pink-500/10 to-rose-600/10 dark:from-pink-500/20 dark:to-rose-600/20 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
            <svg class="w-8 h-8 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Manager -->
      <div class="bg-[var(--color-bg-primary)] rounded-3xl border border-[var(--color-border)] p-7 shadow-sm transition-all duration-500 hover-lift group animate-scale-in glass" style="animation-delay: 500ms;">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <p class="text-xs font-black text-[var(--color-text-muted)] uppercase tracking-widest group-hover:text-amber-500 transition-colors">Manager</p>
            <p class="text-5xl font-black text-[var(--color-text-primary)] tracking-tighter">
              {{ crudStore.items.filter(i => i.jabatan.includes('Manager')).length }}
            </p>
          </div>
          <div class="w-16 h-16 bg-gradient-to-br from-amber-500/10 to-orange-600/10 dark:from-amber-500/20 dark:to-orange-600/20 rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
            <svg class="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Quick Actions -->
    <div class="bg-[var(--color-bg-primary)] rounded-[2.5rem] border border-[var(--color-border)] p-10 shadow-sm glass animate-fade-in" style="animation-delay: 600ms;">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div>
          <h2 class="text-3xl font-black text-[var(--color-text-primary)] tracking-tight">Aksi Cepat</h2>
          <p class="text-[var(--color-text-secondary)] font-medium mt-1">Kelola sistem dengan sekali klik</p>
        </div>
        <div class="flex gap-3">
          <div class="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></div>
          <div class="w-3 h-3 rounded-full bg-blue-500 animate-pulse" style="animation-delay: 200ms;"></div>
          <div class="w-3 h-3 rounded-full bg-purple-500 animate-pulse" style="animation-delay: 400ms;"></div>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <RouterLink
          to="/crud"
          class="flex items-center gap-5 p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-3xl hover:bg-[var(--color-bg-tertiary)] transition-all duration-300 group hover-lift active-spring"
        >
          <div class="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <p class="font-black text-[var(--color-text-primary)] text-lg">Data Karyawan</p>
            <p class="text-xs text-[var(--color-text-muted)] font-black uppercase tracking-widest mt-0.5">Pantau Seluruh Tim</p>
          </div>
        </RouterLink>
        
        <RouterLink
          to="/crud/create"
          class="flex items-center gap-5 p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-3xl hover:bg-[var(--color-bg-tertiary)] transition-all duration-300 group hover-lift active-spring"
        >
          <div class="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <p class="font-black text-[var(--color-text-primary)] text-lg">Tambah Karyawan</p>
            <p class="text-xs text-[var(--color-text-muted)] font-black uppercase tracking-widest mt-0.5">Rekrut Talenta Baru</p>
          </div>
        </RouterLink>
        
        <RouterLink
          to="/profile"
          class="flex items-center gap-5 p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-3xl hover:bg-[var(--color-bg-tertiary)] transition-all duration-300 group hover-lift active-spring"
        >
          <div class="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p class="font-black text-[var(--color-text-primary)] text-lg">Edit Profil</p>
            <p class="text-xs text-[var(--color-text-muted)] font-black uppercase tracking-widest mt-0.5">Pengaturan Akun</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

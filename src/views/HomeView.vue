<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCrudStore } from '@/stores/crud'

const authStore = useAuthStore()
const crudStore = useCrudStore()
</script>

<template>
  <div class="animate-fade-in">
    <!-- Welcome Section -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-[var(--color-text-primary)]">
        Selamat Datang, {{ authStore.user?.fullName }}!
      </h1>
      <p class="text-[var(--color-text-secondary)] mt-2">
        Berikut ringkasan data pada sistem Aksamedia Panel.
      </p>
    </div>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Karyawan -->
      <div class="bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-[var(--color-text-secondary)]">Total Karyawan</p>
            <p class="text-3xl font-bold text-[var(--color-text-primary)] mt-1">{{ crudStore.items.length }}</p>
          </div>
          <div class="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Developer -->
      <div class="bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-[var(--color-text-secondary)]">Developer</p>
            <p class="text-3xl font-bold text-[var(--color-text-primary)] mt-1">
              {{ crudStore.items.filter(i => i.jabatan.includes('Developer')).length }}
            </p>
          </div>
          <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Designer -->
      <div class="bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-[var(--color-text-secondary)]">Designer</p>
            <p class="text-3xl font-bold text-[var(--color-text-primary)] mt-1">
              {{ crudStore.items.filter(i => i.jabatan.includes('Designer')).length }}
            </p>
          </div>
          <div class="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Manager -->
      <div class="bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-[var(--color-text-secondary)]">Manager</p>
            <p class="text-3xl font-bold text-[var(--color-text-primary)] mt-1">
              {{ crudStore.items.filter(i => i.jabatan.includes('Manager')).length }}
            </p>
          </div>
          <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Quick Actions -->
    <div class="bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] p-6 shadow-sm">
      <h2 class="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Aksi Cepat</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <RouterLink
          to="/crud"
          class="flex items-center gap-3 p-4 bg-[var(--color-bg-secondary)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors group"
        >
          <div class="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <p class="font-medium text-[var(--color-text-primary)]">Data Karyawan</p>
            <p class="text-sm text-[var(--color-text-secondary)]">Kelola data karyawan</p>
          </div>
        </RouterLink>
        
        <RouterLink
          to="/crud/create"
          class="flex items-center gap-3 p-4 bg-[var(--color-bg-secondary)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors group"
        >
          <div class="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <p class="font-medium text-[var(--color-text-primary)]">Tambah Karyawan</p>
            <p class="text-sm text-[var(--color-text-secondary)]">Buat data baru</p>
          </div>
        </RouterLink>
        
        <RouterLink
          to="/profile"
          class="flex items-center gap-3 p-4 bg-[var(--color-bg-secondary)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors group"
        >
          <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p class="font-medium text-[var(--color-text-primary)]">Edit Profil</p>
            <p class="text-sm text-[var(--color-text-secondary)]">Ubah data profil</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

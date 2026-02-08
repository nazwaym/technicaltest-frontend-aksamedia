<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const fullName = ref(authStore.user?.fullName || '')
const isSaving = ref(false)
const showSuccess = ref(false)

const handleSubmit = async () => {
  if (!fullName.value.trim()) return
  
  isSaving.value = true
  
  // Simulate slight delay for UX
  await new Promise(resolve => setTimeout(resolve, 600))
  
  authStore.updateProfile({ fullName: fullName.value.trim() })
  
  isSaving.value = false
  showSuccess.value = true
  
  // Brief delay to show success state before redirecting to dashboard
  setTimeout(() => {
    router.push('/')
  }, 800)
}
</script>

<template>
  <div class="animate-fade-in max-w-2xl mx-auto">
    <!-- Header -->
    <div class="mb-6">
      <button
        @click="router.back()"
        class="inline-flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-4"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali
      </button>
      <h1 class="text-2xl font-bold text-[var(--color-text-primary)]">Edit Profil</h1>
      <p class="text-[var(--color-text-secondary)] mt-1">Perbarui informasi profil Anda</p>
    </div>
    
    <!-- Success Alert -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="showSuccess"
        class="mb-6 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2"
      >
        <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        Profil berhasil diperbarui!
      </div>
    </Transition>
    
    <!-- Profile Card -->
    <div class="bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] overflow-hidden">
      <!-- Avatar Section -->
      <div class="bg-gradient-to-br from-indigo-500 to-purple-600 px-6 py-8 text-center">
        <div class="w-20 h-20 mx-auto rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white text-3xl font-bold">
          {{ authStore.user?.fullName?.charAt(0).toUpperCase() || 'A' }}
        </div>
        <h2 class="mt-4 text-xl font-semibold text-white">{{ authStore.user?.fullName }}</h2>
        <p class="text-white/70">{{ authStore.user?.email }}</p>
      </div>
      
      <!-- Form Section -->
      <div class="p-6">
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Username (Read-only) -->
          <div>
            <label class="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
              Username
            </label>
            <input
              type="text"
              :value="authStore.user?.username"
              disabled
              class="w-full px-4 py-2.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-muted)] cursor-not-allowed"
            />
            <p class="mt-1 text-xs text-[var(--color-text-muted)]">Username tidak dapat diubah</p>
          </div>
          
          <!-- Email (Read-only) -->
          <div>
            <label class="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
              Email
            </label>
            <input
              type="email"
              :value="authStore.user?.email"
              disabled
              class="w-full px-4 py-2.5 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-muted)] cursor-not-allowed"
            />
            <p class="mt-1 text-xs text-[var(--color-text-muted)]">Email tidak dapat diubah</p>
          </div>
          
          <!-- Full Name (Editable) -->
          <div>
            <label for="fullName" class="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
              Nama Lengkap <span class="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              v-model="fullName"
              type="text"
              placeholder="Masukkan nama lengkap"
              class="w-full px-4 py-2.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
            />
            <p class="mt-1 text-xs text-[var(--color-text-muted)]">
              Nama ini akan ditampilkan di navbar
            </p>
          </div>
          
          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              :disabled="isSaving || !fullName.trim()"
              class="w-full px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg v-if="isSaving" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

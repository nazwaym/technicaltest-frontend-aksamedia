<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  
  if (!username.value.trim() || !password.value.trim()) {
    error.value = 'Username dan password harus diisi!'
    return
  }
  
  isLoading.value = true
  
  // Simulate slight delay for UX
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const result = authStore.login(username.value, password.value)
  
  isLoading.value = false
  
  if (result.success) {
    router.push({ name: 'home' })
  } else {
    error.value = result.message
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-8 overflow-hidden relative">
    <!-- Sophisticated background (Seamless) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <!-- Animated Mesh Gradient Blobs -->
      <div class="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-400/10 rounded-full blur-[120px] animate-float opacity-70"></div>
      <div class="absolute top-[10%] right-[-5%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-float opacity-70" style="animation-delay: -5s;"></div>
      
      <!-- Subtle Textured Grid -->
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgba(0,0,0,0.02) 1px, transparent 0); background-size: 32px 32px;"></div>
    </div>

    <div class="w-full max-w-md relative z-10 transition-all duration-500">
      <!-- Logo/Brand -->
      <div class="text-center mb-10 animate-fade-in-up">
        <div class="inline-flex items-center justify-center mb-6 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-[var(--color-border)] animate-float animate-pulse-subtle">
          <img 
            src="@/assets/images/aksamedia.png" 
            alt="Aksamedia Logo"  
            class="h-20 w-auto object-contain"
          />
        </div>
        <h1 class="text-4xl font-extrabold text-[var(--color-text-primary)] mb-2 tracking-tight">
          Aksamedia <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Panel</span>
        </h1>
        <p class="text-[var(--color-text-secondary)] font-medium">Silakan masuk untuk melanjutkan</p>
      </div>
      
      <!-- Login Card -->
      <div class="bg-[var(--color-bg-primary)] rounded-3xl shadow-2xl border border-[var(--color-border)] p-8 animate-scale-in delay-200 glass">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Error Alert -->
          <Transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform -translate-y-2 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="transform translate-y-0 opacity-100"
            leave-to-class="transform -translate-y-2 opacity-0"
          >
            <div 
              v-if="error" 
              class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
            >
              <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              {{ error }}
            </div>
          </Transition>
          
          <!-- Username Field -->
          <div class="space-y-1.5">
            <label for="username" class="block text-sm font-semibold text-[var(--color-text-primary)] px-1">
              Username
            </label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-muted)] group-focus-within:text-[var(--color-accent)] transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="username"
                v-model="username"
                type="text"
                placeholder="Masukkan username"
                class="w-full pl-10 pr-4 py-3.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all shadow-sm focus:shadow-md"
              />
            </div>
          </div>
          
          <!-- Password Field -->
          <div class="space-y-1.5">
            <label for="password" class="block text-sm font-semibold text-[var(--color-text-primary)] px-1">
              Password
            </label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--color-text-muted)] group-focus-within:text-[var(--color-accent)] transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                v-model="password"
                type="password"
                placeholder="Masukkan password"
                class="w-full pl-10 pr-4 py-3.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all shadow-sm focus:shadow-md"
              />
            </div>
          </div>
          
          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-4 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform active-spring active:shadow-inner"
          >
            <svg v-if="isLoading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'Memproses...' : 'Masuk ke Dashboard' }}
          </button>
        </form>
        
        <!-- Hint -->
        <div class="mt-8 pt-6 border-t border-[var(--color-border)]">
          <p class="text-xs text-[var(--color-text-muted)] text-center font-medium">
            Gunakan <span class="font-mono bg-[var(--color-bg-tertiary)] px-2 py-1 rounded text-[var(--color-text-primary)]">admin</span> / 
            <span class="font-mono bg-[var(--color-bg-tertiary)] px-2 py-1 rounded text-[var(--color-text-primary)]">admin123</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

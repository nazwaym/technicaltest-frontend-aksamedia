<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCrudStore } from '@/stores/crud'

const route = useRoute()
const router = useRouter()
const crudStore = useCrudStore()

// Determine if editing
const isEditing = computed(() => !!route.params.id)
const pageTitle = computed(() => isEditing.value ? 'Edit Karyawan' : 'Tambah Karyawan')

// Form state
const form = ref({
  nama: '',
  email: '',
  jabatan: '',
  tanggalBergabung: ''
})

const errors = ref({})
const isSubmitting = ref(false)

// Load data if editing
onMounted(() => {
  if (isEditing.value) {
    const item = crudStore.getItemById(route.params.id)
    if (item) {
      form.value = { ...item }
    } else {
      // Item not found, redirect
      router.push({ name: 'crud-index' })
    }
  } else {
    // Default date for new entries
    form.value.tanggalBergabung = new Date().toISOString().split('T')[0]
  }
})

// Validation
const validate = () => {
  errors.value = {}
  
  if (!form.value.nama.trim()) {
    errors.value.nama = 'Nama harus diisi'
  }
  
  if (!form.value.email.trim()) {
    errors.value.email = 'Email harus diisi'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Format email tidak valid'
  }
  
  if (!form.value.jabatan.trim()) {
    errors.value.jabatan = 'Jabatan harus diisi'
  }
  
  if (!form.value.tanggalBergabung) {
    errors.value.tanggalBergabung = 'Tanggal bergabung harus diisi'
  }
  
  return Object.keys(errors.value).length === 0
}

// Submit handler
const handleSubmit = async () => {
  if (!validate()) return
  
  isSubmitting.value = true
  
  // Simulate slight delay for UX
  await new Promise(resolve => setTimeout(resolve, 300))
  
  if (isEditing.value) {
    crudStore.updateItem(parseInt(route.params.id), form.value)
  } else {
    crudStore.addItem(form.value)
  }
  
  isSubmitting.value = false
  router.push({ name: 'crud-index' })
}

// Jabatan options
const jabatanOptions = [
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer',
  'Mobile Developer',
  'UI/UX Designer',
  'DevOps Engineer',
  'QA Engineer',
  'Data Analyst',
  'System Analyst',
  'Project Manager',
  'HR Manager',
  'IT Support',
  'Content Writer'
]
</script>

<template>
  <div class="animate-fade-in max-w-2xl mx-auto py-4">
    <!-- Header -->
    <div class="mb-10 animate-fade-in-up">
      <button
        @click="router.back()"
        class="inline-flex items-center gap-2 text-sm font-black text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-all mb-6 group active-spring"
      >
        <div class="w-8 h-8 rounded-lg bg-[var(--color-bg-secondary)] flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        KEMBALI
      </button>
      <h1 class="text-3xl font-black text-[var(--color-text-primary)] tracking-tight">{{ pageTitle }}</h1>
      <p class="text-[var(--color-text-secondary)] mt-1.5 font-medium">
        {{ isEditing ? 'Perbarui informasi detail karyawan Anda' : 'Lengkapi data untuk menambahkan karyawan baru' }}
      </p>
    </div>
    
    <!-- Form Card -->
    <div class="bg-[var(--color-bg-primary)] rounded-[2.5rem] border border-[var(--color-border)] p-8 sm:p-10 shadow-sm glass animate-fade-in-up" style="animation-delay: 100ms;">
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Nama -->
        <div class="space-y-2">
          <label for="nama" class="block text-xs font-black text-[var(--color-text-muted)] uppercase tracking-[0.2em] ml-1">
            Nama Lengkap <span class="text-red-500">*</span>
          </label>
          <input
            id="nama"
            v-model="form.nama"
            type="text"
            placeholder="Masukkan nama lengkap"
            class="w-full px-6 py-4 bg-[var(--color-bg-secondary)] border rounded-2xl text-[var(--color-text-primary)] font-bold placeholder-[var(--color-text-muted)] focus:outline-none transition-all"
            :class="errors.nama ? 'border-red-500 shadow-lg shadow-red-500/10' : 'border-[var(--color-border)]'"
          />
          <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0">
            <p v-if="errors.nama" class="text-xs font-bold text-red-500 ml-1">{{ errors.nama }}</p>
          </Transition>
        </div>
        
        <!-- Email -->
        <div class="space-y-2">
          <label for="email" class="block text-xs font-black text-[var(--color-text-muted)] uppercase tracking-[0.2em] ml-1">
            Email Perusahaan <span class="text-red-500">*</span>
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="contoh@aksamedia.com"
            class="w-full px-6 py-4 bg-[var(--color-bg-secondary)] border rounded-2xl text-[var(--color-text-primary)] font-bold placeholder-[var(--color-text-muted)] focus:outline-none transition-all"
            :class="errors.email ? 'border-red-500 shadow-lg shadow-red-500/10' : 'border-[var(--color-border)]'"
          />
          <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0">
            <p v-if="errors.email" class="text-xs font-bold text-red-500 ml-1">{{ errors.email }}</p>
          </Transition>
        </div>
        
        <!-- Jabatan -->
        <div class="space-y-2">
          <label for="jabatan" class="block text-xs font-black text-[var(--color-text-muted)] uppercase tracking-[0.2em] ml-1">
            Jabatan <span class="text-red-500">*</span>
          </label>
          <select
            id="jabatan"
            v-model="form.jabatan"
            class="w-full px-6 py-4 bg-[var(--color-bg-secondary)] border rounded-2xl text-[var(--color-text-primary)] font-bold focus:outline-none transition-all cursor-pointer"
            :class="errors.jabatan ? 'border-red-500 shadow-lg shadow-red-500/10' : 'border-[var(--color-border)]'"
          >
            <option value="" disabled>Pilih jabatan</option>
            <option v-for="opt in jabatanOptions" :key="opt" :value="opt">{{ opt }}</option>
          </select>
          <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0">
            <p v-if="errors.jabatan" class="text-xs font-bold text-red-500 ml-1">{{ errors.jabatan }}</p>
          </Transition>
        </div>
        
        <!-- Tanggal Bergabung -->
        <div class="space-y-2">
          <label for="tanggal" class="block text-xs font-black text-[var(--color-text-muted)] uppercase tracking-[0.2em] ml-1">
            Tanggal Bergabung <span class="text-red-500">*</span>
          </label>
          <input
            id="tanggal"
            v-model="form.tanggalBergabung"
            type="date"
            class="w-full px-6 py-4 bg-[var(--color-bg-secondary)] border rounded-2xl text-[var(--color-text-primary)] font-bold focus:outline-none transition-all cursor-pointer"
            :class="errors.tanggalBergabung ? 'border-red-500 shadow-lg shadow-red-500/10' : 'border-[var(--color-border)]'"
          />
          <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-1" enter-to-class="opacity-100 translate-y-0">
            <p v-if="errors.tanggalBergabung" class="text-xs font-bold text-red-500 ml-1">{{ errors.tanggalBergabung }}</p>
          </Transition>
        </div>
        
        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="button"
            @click="router.back()"
            class="flex-1 px-6 py-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-[var(--color-bg-tertiary)] transition-all active-spring"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 active-spring"
          >
            <svg v-if="isSubmitting" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? 'MEMPROSES...' : (isEditing ? 'PERBARUI DATA' : 'SIMPAN DATA') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

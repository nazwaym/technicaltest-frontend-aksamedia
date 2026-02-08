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
      <h1 class="text-2xl font-bold text-[var(--color-text-primary)]">{{ pageTitle }}</h1>
      <p class="text-[var(--color-text-secondary)] mt-1">
        {{ isEditing ? 'Perbarui informasi karyawan' : 'Isi data karyawan baru' }}
      </p>
    </div>
    
    <!-- Form Card -->
    <div class="bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] p-6">
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <!-- Nama -->
        <div>
          <label for="nama" class="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
            Nama Lengkap <span class="text-red-500">*</span>
          </label>
          <input
            id="nama"
            v-model="form.nama"
            type="text"
            placeholder="Masukkan nama lengkap"
            class="w-full px-4 py-2.5 bg-[var(--color-bg-secondary)] border rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
            :class="errors.nama ? 'border-red-500' : 'border-[var(--color-border)]'"
          />
          <p v-if="errors.nama" class="mt-1 text-sm text-red-500">{{ errors.nama }}</p>
        </div>
        
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
            Email <span class="text-red-500">*</span>
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="contoh@email.com"
            class="w-full px-4 py-2.5 bg-[var(--color-bg-secondary)] border rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
            :class="errors.email ? 'border-red-500' : 'border-[var(--color-border)]'"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
        </div>
        
        <!-- Jabatan -->
        <div>
          <label for="jabatan" class="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
            Jabatan <span class="text-red-500">*</span>
          </label>
          <select
            id="jabatan"
            v-model="form.jabatan"
            class="w-full px-4 py-2.5 bg-[var(--color-bg-secondary)] border rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
            :class="errors.jabatan ? 'border-red-500' : 'border-[var(--color-border)]'"
          >
            <option value="" disabled>Pilih jabatan</option>
            <option v-for="opt in jabatanOptions" :key="opt" :value="opt">{{ opt }}</option>
          </select>
          <p v-if="errors.jabatan" class="mt-1 text-sm text-red-500">{{ errors.jabatan }}</p>
        </div>
        
        <!-- Tanggal Bergabung -->
        <div>
          <label for="tanggal" class="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
            Tanggal Bergabung <span class="text-red-500">*</span>
          </label>
          <input
            id="tanggal"
            v-model="form.tanggalBergabung"
            type="date"
            class="w-full px-4 py-2.5 bg-[var(--color-bg-secondary)] border rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
            :class="errors.tanggalBergabung ? 'border-red-500' : 'border-[var(--color-border)]'"
          />
          <p v-if="errors.tanggalBergabung" class="mt-1 text-sm text-red-500">{{ errors.tanggalBergabung }}</p>
        </div>
        
        <!-- Actions -->
        <div class="flex gap-3 pt-4">
          <button
            type="button"
            @click="router.back()"
            class="flex-1 px-4 py-2.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg v-if="isSubmitting" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isSubmitting ? 'Menyimpan...' : (isEditing ? 'Perbarui' : 'Simpan') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

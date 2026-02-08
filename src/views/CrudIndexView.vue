<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useCrudStore } from '@/stores/crud'
import Pagination from '@/components/Pagination.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

const route = useRoute()
const router = useRouter()
const crudStore = useCrudStore()

// State from URL query
const search = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(5)
const showDeleteModal = ref(false)
const itemToDelete = ref(null)

// Initialize from URL
onMounted(() => {
  const query = route.query
  if (query.search) search.value = query.search
  if (query.page) currentPage.value = parseInt(query.page) || 1
  if (query.perPage) itemsPerPage.value = parseInt(query.perPage) || 5
})

// Update URL when state changes
const updateUrl = () => {
  const query = {}
  if (search.value) query.search = search.value
  if (currentPage.value > 1) query.page = currentPage.value.toString()
  if (itemsPerPage.value !== 5) query.perPage = itemsPerPage.value.toString()
  
  router.replace({ query })
}

// Watch for changes
watch([search, currentPage, itemsPerPage], () => {
  updateUrl()
})

// Reset to page 1 when search changes
watch(search, () => {
  currentPage.value = 1
})

// Filtered items
const filteredItems = computed(() => {
  return crudStore.getFilteredItems(search.value)
})

// Paginated items
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredItems.value.slice(start, end)
})

// Total pages
const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / itemsPerPage.value)
})

// Handlers
const handlePageChange = (page) => {
  currentPage.value = page
}

const confirmDelete = (item) => {
  itemToDelete.value = item
  showDeleteModal.value = true
}

const handleDelete = () => {
  if (itemToDelete.value) {
    crudStore.deleteItem(itemToDelete.value.id)
    showDeleteModal.value = false
    itemToDelete.value = null
    
    // Adjust page if necessary
    if (paginatedItems.value.length === 0 && currentPage.value > 1) {
      currentPage.value--
    }
  }
}

// Format date
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<template>
  <div class="animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
      <div class="animate-fade-in-up">
        <h1 class="text-3xl font-black text-[var(--color-text-primary)] tracking-tight">Data Karyawan</h1>
        <p class="text-[var(--color-text-secondary)] mt-1.5 font-medium">Kelola seluruh informasi talenta dalam satu panel</p>
      </div>
      <RouterLink
        to="/crud/create"
        class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/25 transition-all duration-300 active-spring animate-fade-in-up"
        style="animation-delay: 100ms;"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Tambah Karyawan
      </RouterLink>
    </div>
    
    <!-- Search & Filters -->
    <div class="bg-[var(--color-bg-primary)] rounded-[2rem] border border-[var(--color-border)] p-6 mb-8 glass animate-fade-in-up shadow-sm" style="animation-delay: 200ms;">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Search Input -->
        <div class="relative flex-1 group">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-accent)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="search"
            type="text"
            placeholder="Cari nama, email, atau jabatan..."
            class="w-full pl-12 pr-4 py-3.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl text-[var(--color-text-primary)] font-medium placeholder-[var(--color-text-muted)] focus:outline-none transition-all"
          />
        </div>
        
        <!-- Per Page Selector -->
        <div class="flex items-center gap-3">
          <label class="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider whitespace-nowrap">Show:</label>
          <select
            v-model="itemsPerPage"
            class="px-4 py-3.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl text-[var(--color-text-primary)] font-bold focus:outline-none transition-all cursor-pointer min-w-[100px]"
          >
            <option :value="5">5 baris</option>
            <option :value="10">10 baris</option>
            <option :value="25">25 baris</option>
          </select>
        </div>
      </div>
      
      <!-- Results Info -->
      <div class="mt-4 flex items-center justify-between text-xs font-black text-[var(--color-text-muted)] uppercase tracking-widest">
        <span>Total: {{ filteredItems.length }} data ditemukan</span>
        <span v-if="search" class="text-[var(--color-accent)]">Filter: "{{ search }}"</span>
      </div>
    </div>
    
    <!-- Table (Desktop) -->
    <div class="hidden md:block bg-[var(--color-bg-primary)] rounded-[2rem] border border-[var(--color-border)] overflow-hidden mb-8 shadow-sm glass animate-fade-in" style="animation-delay: 300ms;">
      <table class="w-full">
        <thead>
          <tr class="bg-[var(--color-bg-tertiary)]/50">
            <th class="px-8 py-5 text-left text-xs font-black text-[var(--color-text-secondary)] uppercase tracking-[0.2em]">Karyawan</th>
            <th class="px-8 py-5 text-left text-xs font-black text-[var(--color-text-secondary)] uppercase tracking-[0.2em]">Kontak</th>
            <th class="px-8 py-5 text-left text-xs font-black text-[var(--color-text-secondary)] uppercase tracking-[0.2em]">Jabatan</th>
            <th class="px-8 py-5 text-left text-xs font-black text-[var(--color-text-secondary)] uppercase tracking-[0.2em]">Join Date</th>
            <th class="px-8 py-5 text-right text-xs font-black text-[var(--color-text-secondary)] uppercase tracking-[0.2em]">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[var(--color-border)]">
          <tr 
            v-for="(item, index) in paginatedItems" 
            :key="item.id" 
            class="hover:bg-[var(--color-bg-secondary)]/80 transition-all duration-300 group animate-fade-in-up"
            :style="`animation-delay: ${400 + (index * 50)}ms;`"
          >
            <td class="px-8 py-5">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  {{ item.nama.charAt(0).toUpperCase() }}
                </div>
                <span class="font-bold text-[var(--color-text-primary)] text-lg tracking-tight">{{ item.nama }}</span>
              </div>
            </td>
            <td class="px-8 py-5">
              <span class="text-[var(--color-text-secondary)] font-medium">{{ item.email }}</span>
            </td>
            <td class="px-8 py-5">
              <span class="inline-flex px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 shadow-sm">
                {{ item.jabatan }}
              </span>
            </td>
            <td class="px-8 py-5">
              <span class="text-[var(--color-text-secondary)] font-medium">{{ formatDate(item.tanggalBergabung) }}</span>
            </td>
            <td class="px-8 py-5 text-right">
              <div class="flex items-center justify-end gap-3">
                <RouterLink
                  :to="`/crud/edit/${item.id}`"
                  class="p-2.5 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-tertiary)] rounded-xl transition-all active-spring"
                  title="Edit Data"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </RouterLink>
                <button
                  @click="confirmDelete(item)"
                  class="p-2.5 text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all active-spring"
                  title="Hapus Data"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          
          <!-- Empty State -->
          <tr v-if="paginatedItems.length === 0">
            <td colspan="5" class="px-8 py-20 text-center">
              <div class="animate-pulse-subtle">
                <svg class="w-20 h-20 mx-auto text-[var(--color-text-muted)]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="mt-6 text-xl font-bold text-[var(--color-text-secondary)]">
                  {{ search ? `Pencarian untuk "${search}" tidak ditemukan` : 'Data karyawan masih kosong' }}
                </p>
                <RouterLink
                  v-if="!search"
                  to="/crud/create"
                  class="inline-flex items-center gap-2 mt-6 px-6 py-2.5 bg-[var(--color-accent)] text-white font-bold rounded-xl hover:bg-[var(--color-accent-hover)] transition-all active-spring"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Tambah Karyawan Baru
                </RouterLink>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Cards (Mobile) -->
    <div class="md:hidden space-y-5 mb-8">
      <div
        v-for="(item, index) in paginatedItems"
        :key="item.id"
        class="bg-[var(--color-bg-primary)] rounded-[2rem] border border-[var(--color-border)] p-6 glass shadow-sm animate-fade-in-up"
        :style="`animation-delay: ${index * 100}ms;`"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
              {{ item.nama.charAt(0).toUpperCase() }}
            </div>
            <div>
              <p class="font-black text-[var(--color-text-primary)] text-lg tracking-tight">{{ item.nama }}</p>
              <p class="text-xs font-black uppercase tracking-widest text-[var(--color-accent)] mt-0.5">{{ item.jabatan }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <RouterLink
              :to="`/crud/edit/${item.id}`"
              class="p-3 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] bg-[var(--color-bg-secondary)] rounded-2xl active-spring"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </RouterLink>
            <button
              @click="confirmDelete(item)"
              class="p-3 text-[var(--color-text-muted)] hover:text-red-500 bg-[var(--color-bg-secondary)] rounded-2xl active-spring"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <div class="mt-6 pt-6 border-t border-[var(--color-border)] flex items-center justify-between">
          <div class="space-y-1">
            <p class="text-[0.65rem] font-black text-[var(--color-text-muted)] uppercase tracking-[0.2em]">Join Date</p>
            <p class="text-sm font-bold text-[var(--color-text-secondary)]">{{ formatDate(item.tanggalBergabung) }}</p>
          </div>
          <div class="text-right space-y-1">
            <p class="text-[0.65rem] font-black text-[var(--color-text-muted)] uppercase tracking-[0.2em]">Contact</p>
            <p class="text-sm font-bold text-[var(--color-text-secondary)]">{{ item.email }}</p>
          </div>
        </div>
      </div>
      
      <!-- Empty State Mobile -->
      <div v-if="paginatedItems.length === 0" class="bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] p-8 text-center">
        <svg class="w-12 h-12 mx-auto text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="mt-4 text-[var(--color-text-secondary)]">
          {{ search ? `Tidak ada hasil untuk "${search}"` : 'Belum ada data' }}
        </p>
      </div>
    </div>
    
    <!-- Pagination -->
    <Pagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="handlePageChange"
    />
    
    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      :show="showDeleteModal"
      title="Hapus Karyawan"
      :message="`Apakah Anda yakin ingin menghapus data ${itemToDelete?.nama}? Tindakan ini tidak dapat dibatalkan.`"
      confirm-text="Hapus"
      cancel-text="Batal"
      variant="danger"
      @confirm="handleDelete"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

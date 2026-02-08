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
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-[var(--color-text-primary)]">Data Karyawan</h1>
        <p class="text-[var(--color-text-secondary)] mt-1">Kelola data karyawan perusahaan</p>
      </div>
      <RouterLink
        to="/crud/create"
        class="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Tambah Karyawan
      </RouterLink>
    </div>
    
    <!-- Search & Filters -->
    <div class="bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] p-4 mb-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Search Input -->
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="search"
            type="text"
            placeholder="Cari nama, email, atau jabatan..."
            class="w-full pl-10 pr-4 py-2.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
          />
        </div>
        
        <!-- Per Page Selector -->
        <div class="flex items-center gap-2">
          <label class="text-sm text-[var(--color-text-secondary)] whitespace-nowrap">Tampilkan:</label>
          <select
            v-model="itemsPerPage"
            class="px-3 py-2.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent"
          >
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="25">25</option>
          </select>
        </div>
      </div>
      
      <!-- Results Info -->
      <div class="mt-3 text-sm text-[var(--color-text-muted)]">
        Menampilkan {{ paginatedItems.length }} dari {{ filteredItems.length }} data
        <span v-if="search">(filter: "{{ search }}")</span>
      </div>
    </div>
    
    <!-- Table (Desktop) -->
    <div class="hidden md:block bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] overflow-hidden mb-6">
      <table class="w-full">
        <thead class="bg-[var(--color-bg-tertiary)]">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Nama</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Jabatan</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Bergabung</th>
            <th class="px-6 py-3 text-right text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[var(--color-border)]">
          <tr v-for="item in paginatedItems" :key="item.id" class="hover:bg-[var(--color-bg-secondary)] transition-colors">
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-medium">
                  {{ item.nama.charAt(0).toUpperCase() }}
                </div>
                <span class="font-medium text-[var(--color-text-primary)]">{{ item.nama }}</span>
              </div>
            </td>
            <td class="px-6 py-4 text-[var(--color-text-secondary)]">{{ item.email }}</td>
            <td class="px-6 py-4">
              <span class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                {{ item.jabatan }}
              </span>
            </td>
            <td class="px-6 py-4 text-[var(--color-text-secondary)]">{{ formatDate(item.tanggalBergabung) }}</td>
            <td class="px-6 py-4 text-right">
              <div class="flex items-center justify-end gap-2">
                <RouterLink
                  :to="`/crud/edit/${item.id}`"
                  class="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
                  title="Edit"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </RouterLink>
                <button
                  @click="confirmDelete(item)"
                  class="p-2 text-[var(--color-text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Hapus"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          
          <!-- Empty State -->
          <tr v-if="paginatedItems.length === 0">
            <td colspan="5" class="px-6 py-12 text-center">
              <svg class="w-12 h-12 mx-auto text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="mt-4 text-[var(--color-text-secondary)]">
                {{ search ? `Tidak ada data yang cocok dengan "${search}"` : 'Belum ada data karyawan' }}
              </p>
              <RouterLink
                v-if="!search"
                to="/crud/create"
                class="inline-flex items-center gap-2 mt-4 text-[var(--color-accent)] hover:underline"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tambah karyawan pertama
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Cards (Mobile) -->
    <div class="md:hidden space-y-4 mb-6">
      <div
        v-for="item in paginatedItems"
        :key="item.id"
        class="bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] p-4"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-medium text-lg">
              {{ item.nama.charAt(0).toUpperCase() }}
            </div>
            <div>
              <p class="font-semibold text-[var(--color-text-primary)]">{{ item.nama }}</p>
              <p class="text-sm text-[var(--color-text-muted)]">{{ item.email }}</p>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <RouterLink
              :to="`/crud/edit/${item.id}`"
              class="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] rounded-lg"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </RouterLink>
            <button
              @click="confirmDelete(item)"
              class="p-2 text-[var(--color-text-muted)] hover:text-red-500 rounded-lg"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <div class="mt-4 flex flex-wrap items-center gap-2">
          <span class="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
            {{ item.jabatan }}
          </span>
          <span class="text-xs text-[var(--color-text-muted)]">
            Bergabung {{ formatDate(item.tanggalBergabung) }}
          </span>
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

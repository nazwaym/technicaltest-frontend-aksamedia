<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  maxVisible: {
    type: Number,
    default: 5
  }
})

const emit = defineEmits(['page-change'])

// Generate page numbers with ellipsis
const pageNumbers = computed(() => {
  const pages = []
  const total = props.totalPages
  const current = props.currentPage
  const maxVisible = props.maxVisible
  
  if (total <= maxVisible) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)
    
    if (current > 3) {
      pages.push('...')
    }
    
    // Show pages around current
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    
    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i)
      }
    }
    
    if (current < total - 2) {
      pages.push('...')
    }
    
    // Always show last page
    if (!pages.includes(total)) {
      pages.push(total)
    }
  }
  
  return pages
})

const goToPage = (page) => {
  if (page !== '...' && page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}

const goToPrev = () => {
  if (props.currentPage > 1) {
    emit('page-change', props.currentPage - 1)
  }
}

const goToNext = () => {
  if (props.currentPage < props.totalPages) {
    emit('page-change', props.currentPage + 1)
  }
}
</script>

<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--color-bg-primary)] rounded-xl border border-[var(--color-border)] px-4 py-3">
    <!-- Info -->
    <div class="text-sm text-[var(--color-text-secondary)]">
      Halaman <span class="font-medium text-[var(--color-text-primary)]">{{ currentPage }}</span> 
      dari <span class="font-medium text-[var(--color-text-primary)]">{{ totalPages }}</span>
    </div>
    
    <!-- Pagination Controls -->
    <div class="flex items-center gap-1">
      <!-- Previous Button -->
      <button
        @click="goToPrev"
        :disabled="currentPage === 1"
        class="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-bg-tertiary)]"
        :class="currentPage === 1 ? '' : 'text-[var(--color-text-primary)]'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <!-- Page Numbers -->
      <template v-for="page in pageNumbers" :key="page">
        <span
          v-if="page === '...'"
          class="px-3 py-2 text-[var(--color-text-muted)]"
        >
          ...
        </span>
        <button
          v-else
          @click="goToPage(page)"
          class="min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium transition-colors"
          :class="page === currentPage 
            ? 'bg-[var(--color-accent)] text-white shadow-sm' 
            : 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'"
        >
          {{ page }}
        </button>
      </template>
      
      <!-- Next Button -->
      <button
        @click="goToNext"
        :disabled="currentPage === totalPages"
        class="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-bg-tertiary)]"
        :class="currentPage === totalPages ? '' : 'text-[var(--color-text-primary)]'"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

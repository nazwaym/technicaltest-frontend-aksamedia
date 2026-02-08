<script setup>
import { watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Konfirmasi'
  },
  message: {
    type: String,
    default: 'Apakah Anda yakin?'
  },
  confirmText: {
    type: String,
    default: 'Ya'
  },
  cancelText: {
    type: String,
    default: 'Batal'
  },
  variant: {
    type: String,
    default: 'primary' // 'primary' | 'danger'
  }
})

const emit = defineEmits(['confirm', 'cancel'])

// Lock body scroll when modal is open
watch(() => props.show, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-black/50 backdrop-blur-sm"
          @click="emit('cancel')"
        ></div>
        
        <!-- Modal -->
        <div class="flex min-h-full items-center justify-center p-4">
          <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div 
              v-if="show"
              class="relative w-full max-w-md bg-[var(--color-bg-primary)] rounded-2xl shadow-xl border border-[var(--color-border)] p-6"
            >
              <!-- Icon -->
              <div 
                class="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4"
                :class="variant === 'danger' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-indigo-100 dark:bg-indigo-900/30'"
              >
                <svg 
                  v-if="variant === 'danger'"
                  class="w-6 h-6 text-red-600 dark:text-red-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <svg 
                  v-else
                  class="w-6 h-6 text-indigo-600 dark:text-indigo-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <!-- Content -->
              <div class="text-center">
                <h3 class="text-lg font-semibold text-[var(--color-text-primary)]">
                  {{ title }}
                </h3>
                <p class="mt-2 text-sm text-[var(--color-text-secondary)]">
                  {{ message }}
                </p>
              </div>
              
              <!-- Actions -->
              <div class="mt-6 flex gap-3">
                <button
                  @click="emit('cancel')"
                  class="flex-1 px-4 py-2.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
                >
                  {{ cancelText }}
                </button>
                <button
                  @click="emit('confirm')"
                  class="flex-1 px-4 py-2.5 font-medium rounded-lg transition-colors"
                  :class="variant === 'danger' 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white'"
                >
                  {{ confirmText }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

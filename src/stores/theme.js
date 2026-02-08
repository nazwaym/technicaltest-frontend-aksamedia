import { defineStore } from 'pinia'
import { ref, computed, watch, onMounted } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // State: 'light' | 'dark' | 'system'
  const mode = ref('system')
  const resolvedTheme = ref('light')
  
  // Media query for OS preference
  let mediaQuery = null
  
  const initMediaQuery = () => {
    if (typeof window !== 'undefined') {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    }
  }
  
  // Get OS preference
  const getSystemTheme = () => {
    if (mediaQuery) {
      return mediaQuery.matches ? 'dark' : 'light'
    }
    return 'light'
  }
  
  // Apply theme to document
  const applyTheme = () => {
    if (mode.value === 'system') {
      resolvedTheme.value = getSystemTheme()
    } else {
      resolvedTheme.value = mode.value
    }
    
    // Apply to document
    if (typeof document !== 'undefined') {
      if (resolvedTheme.value === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }
  
  // Set theme mode
  const setMode = (newMode) => {
    mode.value = newMode
    localStorage.setItem('theme_mode', newMode)
    applyTheme()
  }
  
  // Initialize
  const init = () => {
    initMediaQuery()
    
    // Load from localStorage
    const stored = localStorage.getItem('theme_mode')
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      mode.value = stored
    }
    
    // Apply initial theme
    applyTheme()
    
    // Listen for OS theme changes
    if (mediaQuery) {
      mediaQuery.addEventListener('change', () => {
        if (mode.value === 'system') {
          applyTheme()
        }
      })
    }
  }
  
  // Computed
  const isDark = computed(() => resolvedTheme.value === 'dark')
  
  // Initialize on store creation
  init()
  
  return {
    mode,
    resolvedTheme,
    isDark,
    setMode
  }
})

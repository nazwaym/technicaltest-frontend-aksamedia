import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// Static credentials (hardcoded as per requirement)
const VALID_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
}

// Default user data
const DEFAULT_USER = {
  username: 'admin',
  fullName: 'Administrator',
  email: 'admin@aksamedia.com'
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  
  // Computed
  const isAuthenticated = computed(() => user.value !== null)
  
  // Initialize from localStorage
  const init = () => {
    const stored = localStorage.getItem('auth_user')
    if (stored) {
      try {
        user.value = JSON.parse(stored)
      } catch (e) {
        localStorage.removeItem('auth_user')
      }
    }
  }
  
  // Actions
  const login = (username, password) => {
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
      // Check if user data exists in storage (preserve edits)
      const storedUser = localStorage.getItem('user_profile')
      if (storedUser) {
        user.value = JSON.parse(storedUser)
      } else {
        user.value = { ...DEFAULT_USER }
        localStorage.setItem('user_profile', JSON.stringify(user.value))
      }
      localStorage.setItem('auth_user', JSON.stringify(user.value))
      return { success: true }
    }
    return { success: false, message: 'Username atau password salah!' }
  }
  
  const logout = () => {
    user.value = null
    localStorage.removeItem('auth_user')
  }
  
  const updateProfile = (updates) => {
    if (user.value) {
      user.value = { ...user.value, ...updates }
      localStorage.setItem('auth_user', JSON.stringify(user.value))
      localStorage.setItem('user_profile', JSON.stringify(user.value))
    }
  }
  
  // Watch for changes and persist
  watch(user, (newUser) => {
    if (newUser) {
      localStorage.setItem('auth_user', JSON.stringify(newUser))
    }
  }, { deep: true })
  
  // Initialize on store creation
  init()
  
  return {
    user,
    isAuthenticated,
    login,
    logout,
    updateProfile
  }
})

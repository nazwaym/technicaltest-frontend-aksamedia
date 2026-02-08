import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

// Default seed data
const DEFAULT_EMPLOYEES = [
  { id: 1, nama: 'Budi Santoso', email: 'budi@company.com', jabatan: 'Frontend Developer', tanggalBergabung: '2024-01-15' },
  { id: 2, nama: 'Siti Rahayu', email: 'siti@company.com', jabatan: 'Backend Developer', tanggalBergabung: '2024-02-20' },
  { id: 3, nama: 'Agus Pratama', email: 'agus@company.com', jabatan: 'UI/UX Designer', tanggalBergabung: '2024-03-10' },
  { id: 4, nama: 'Dewi Lestari', email: 'dewi@company.com', jabatan: 'Project Manager', tanggalBergabung: '2023-11-05' },
  { id: 5, nama: 'Rudi Hermawan', email: 'rudi@company.com', jabatan: 'DevOps Engineer', tanggalBergabung: '2024-04-01' },
  { id: 6, nama: 'Maya Sari', email: 'maya@company.com', jabatan: 'QA Engineer', tanggalBergabung: '2024-05-15' },
  { id: 7, nama: 'Andi Wijaya', email: 'andi@company.com', jabatan: 'Mobile Developer', tanggalBergabung: '2024-06-20' },
  { id: 8, nama: 'Rina Kusuma', email: 'rina@company.com', jabatan: 'Data Analyst', tanggalBergabung: '2024-07-10' },
  { id: 9, nama: 'Hendra Gunawan', email: 'hendra@company.com', jabatan: 'System Analyst', tanggalBergabung: '2024-08-01' },
  { id: 10, nama: 'Putri Handayani', email: 'putri@company.com', jabatan: 'HR Manager', tanggalBergabung: '2023-09-15' },
  { id: 11, nama: 'Joko Susilo', email: 'joko@company.com', jabatan: 'IT Support', tanggalBergabung: '2024-09-20' },
  { id: 12, nama: 'Lina Wulandari', email: 'lina@company.com', jabatan: 'Content Writer', tanggalBergabung: '2024-10-05' }
]

export const useCrudStore = defineStore('crud', () => {
  // State
  const items = ref([])
  
  // Initialize from localStorage
  const init = () => {
    const stored = localStorage.getItem('crud_items')
    if (stored) {
      try {
        items.value = JSON.parse(stored)
      } catch (e) {
        items.value = [...DEFAULT_EMPLOYEES]
        saveToStorage()
      }
    } else {
      // Seed with default data
      items.value = [...DEFAULT_EMPLOYEES]
      saveToStorage()
    }
  }
  
  // Save to localStorage
  const saveToStorage = () => {
    localStorage.setItem('crud_items', JSON.stringify(items.value))
  }
  
  // Generate next ID
  const getNextId = () => {
    if (items.value.length === 0) return 1
    return Math.max(...items.value.map(item => item.id)) + 1
  }
  
  // Actions
  const addItem = (item) => {
    const newItem = {
      ...item,
      id: getNextId()
    }
    items.value.push(newItem)
    saveToStorage()
    return newItem
  }
  
  const updateItem = (id, updates) => {
    const index = items.value.findIndex(item => item.id === id)
    if (index !== -1) {
      items.value[index] = { ...items.value[index], ...updates }
      saveToStorage()
      return items.value[index]
    }
    return null
  }
  
  const deleteItem = (id) => {
    const index = items.value.findIndex(item => item.id === id)
    if (index !== -1) {
      items.value.splice(index, 1)
      saveToStorage()
      return true
    }
    return false
  }
  
  const getItemById = (id) => {
    return items.value.find(item => item.id === parseInt(id))
  }
  
  // Computed: filtered and paginated
  const getFilteredItems = (search = '') => {
    if (!search) return items.value
    const searchLower = search.toLowerCase()
    return items.value.filter(item =>
      item.nama.toLowerCase().includes(searchLower) ||
      item.email.toLowerCase().includes(searchLower) ||
      item.jabatan.toLowerCase().includes(searchLower)
    )
  }
  
  // Initialize
  init()
  
  return {
    items,
    addItem,
    updateItem,
    deleteItem,
    getItemById,
    getFilteredItems
  }
})

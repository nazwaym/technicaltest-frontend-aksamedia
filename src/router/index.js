import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Lazy load views
const LoginView = () => import('@/views/LoginView.vue')
const HomeView = () => import('@/views/HomeView.vue')
const CrudIndexView = () => import('@/views/CrudIndexView.vue')
const CrudFormView = () => import('@/views/CrudFormView.vue')
const ProfileView = () => import('@/views/ProfileView.vue')

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/crud',
    name: 'crud-index',
    component: CrudIndexView,
    meta: { requiresAuth: true }
  },
  {
    path: '/crud/create',
    name: 'crud-create',
    component: CrudFormView,
    meta: { requiresAuth: true }
  },
  {
    path: '/crud/edit/:id',
    name: 'crud-edit',
    component: CrudFormView,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login if not authenticated
    next({ name: 'login' })
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    // Redirect to home if already authenticated
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router

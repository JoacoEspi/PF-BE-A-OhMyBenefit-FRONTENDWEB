import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import PasswordResetEmailView from '../views/PasswordResetEmailView.vue'
import PasswordResetCodeView from '../views/PasswordResetCodeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path:'/recover/email',
      name: 'recover-email',
      component: PasswordResetEmailView
    },
    {
      path:'/recover/code',
      name: 'recover-code',
      component: PasswordResetCodeView
    }

  ]
})

export default router

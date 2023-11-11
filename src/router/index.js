import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import AboutView from '../views/AboutView.vue'
import ProductDetail from '../views/ProductDetail.vue'
import HomeUsuario from '../views/HomeUsuario.vue'
import LoginView from "../views/LoginView.vue";
import PasswordResetView from "../views/PasswordResetView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: '/user/registry',
      name: 'register',
      component: RegisterView
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/recover-password",
      name: "recover-password",
      component: PasswordResetView,
    },
    {
      path: "/product/:id/:idUsuario",
      name: "product-detail",
      component: ProductDetail,
    },
    {
      path: '/home', 
      name: 'home-login', //Hace referencia al Home del Usuario Logueado
      component: HomeUsuario,
    }
  ]
})

export default router;

import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import middleware from '../services/middleware'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/registrarLogin',
    name: 'RegistrarLogin',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegistrarLogin.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin',
    name: 'Admin',
    beforeEnter: middleware.auth,
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  },
  {
    path: '/todosartigos',
    name: 'TodosArtigos',
    component: () => import(/* webpackChunkName: "about" */ '../views/TodosArtigos.vue')
  },
  {
    path: '/artigoespecifico/:id',
    name: 'ArtigoEspecifico',
    component: () => import(/* webpackChunkName: "about" */ '../views/ArtigoEspecifico.vue')
  },
  {
    path: '/editarartigo/:id',
    name: 'EditarArtigo',
    beforeEnter: middleware.auth,
    component: () => import(/* webpackChunkName: "about" */ '../views/EditarArtigo.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

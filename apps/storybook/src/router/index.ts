import { createRouter, createWebHistory } from 'vue-router'
import Docs from '../views/docs.vue'
import Index from '../views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: Index,
      name: 'index',
      path: '/',
    },
    {
      component: Docs,
      name: 'docs',
      path: '/docs/:slug+',
    },
    {
      path: '/docs',
      redirect: '/docs/introduction',
    },
  ],
})

export default router

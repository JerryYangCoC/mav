import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/copy', // 文案管理
    children: [
      {
        path: '',
        name: 'copy',
        component: () => import('../views/CopyView.vue'),
      },
      {
        path: 'add',  // 新增文案
        name: 'addCopy',
        component: () => import('../views/AddCopyView.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

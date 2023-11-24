import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/copy'
  //   // component: HomeView
  // },
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
      },
      {
        path: 'edit', // 修改文案
        name: 'editCopy',
        component: () => import('../views/EditCopyView.vue')
      }
    ],
  },
  {
    path: '/copy/copy',
    redirect: '/copy'
  },
  {
    path: '/copy/copy/add',
    redirect: '/copy/add'
  },
  {
    path: '/copy/copy/edit',
    redirect: '/copy/edit'
  },
  {
    path: '/journey',
    children: [
      {
        path: '',
        name: 'journey',
        component: () => import('../views/JourneyView.vue')
      },
      {
        path: 'add',
        name: 'addJourney',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'edit',
        name: 'editJourney',
        component: () => import('../views/EditJourneyView.vue')
      }
    ]
  },
  {
    path: '/journey/journey',
    redirect: '/journey',
  },
  {
    path: '/journey/journey/add',
    redirect: '/journey/add'
  },
  {
    path: '/journey/journey/edit',
    redirect: '/journey/edit'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

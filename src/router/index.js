import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    children: [{
      path: '/',
      name: 'Dashboard',
      component: () => import('@/views/index')
    }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

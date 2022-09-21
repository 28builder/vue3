import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getRouter } from '../http/api'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: 'order',
    children: []
    //   {
    //     path: 'order',
    //     name: 'order',
    //     meta: {
    //       isShow: true,
    //       title: '订单列表'
    //     },
    //     component: () => import(/* webpackChunkName: "order" */ '../views/OrderView.vue')
    //   },
    //   {
    //     path: 'user',
    //     name: 'user',
    //     meta: {
    //       isShow: true,
    //       title: '用户列表'
    //     },
    //     component: () => import(/* webpackChunkName: "user" */ '../views/UserView.vue')
    //   }
    // ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由拦截
router.beforeEach(async(to) => {
  // const routerObj = await getRouter()
  // console.log('routerObj' ,routerObj)
  // 是否有登录
  const token: string | null = localStorage.getItem('token')
  if(!token && to.path != '/login') {
    return 'login'
  } else if (to.path != '.login' && token) {
    if (router.getRoutes().length === 3) {
      // 动态路由
    const routerData: any = await getRouter()
    console.log('routerData', routerData)
    routerData.data.forEach((v: any) => {
      const routerObj: RouteRecordRaw = {
        path: v.name,
        name: v.name,
        meta: v.meta,
        component: () => import(/* webpackChunkName: "[request]" */ `../views/${v.path}.vue`)
      }
      router.addRoute('home', routerObj)
    })
    router.replace(to.path)
    console.log('routerrouter', router, router.getRoutes())
    }
  } else if (to.path == '.login' && token) {
    return '/'
  }
})

export default router

import { createRouter, createWebHashHistory, RouteRecordRaw, } from 'vue-router'
import { store } from '@/store/index'
import { NewMenusObj } from '@/type/common'
import {pushToNav, clearNav} from '@/utils/pushToNav'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    //懒加载
    component: () => import('../views/login/login.vue')
  },

  {
    path: '/:catchAll(.*)',
    //访问主页的时候 重定向到index页面
    component: import('../views/404.vue')
  },
  // {
  //   path: '/404',
  //   name: '/404',
  //   component: import('../views/404.vue')
  // }
]
const router = createRouter({
  routes,
  history: createWebHashHistory()
})

//动态加载路由规则
const getRoute = () => {
  const genMenus: NewMenusObj = store.getters.genMenus;
  for (let key in genMenus) {
    let menusObj = genMenus[key]
    const routeObj: RouteRecordRaw = {
      path: '/' + menusObj.name,
      name: menusObj.name,
      component: () => import('@/views/homepage/homepage.vue'),
      children: []
    }
    if (menusObj.children) {
      for (let index in menusObj.children) {
        let menuName: string = menusObj.children[index].name
        const childObj: RouteRecordRaw = {
          path: menuName,
          name: menuName,
          component: () => import(`../views/${menusObj.name}/${menuName}.vue`)
        }
        routeObj.children!.push(childObj) //为一级路由中添加二级路由
      }
    }
    router.addRoute(routeObj)//添加一级路由

  }
  router.addRoute({
    path: '/',
    name: 'Homepage',
    component: () => import('@/views/homepage/homepage.vue'),
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index/index.vue')
      },
    ]
  })
}


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userinfo = store.state.userinfo
  //login的优先级最高， 如果有登陆过，则会自动跳到index
  if(to.path == '/login'){
    if(token) next('/index')
    else next()
  }
  else if(!token){
    next('/login')
  }
  //登陆过后刷新重新获取vuex的值和生成路由规则
  else if (token && !userinfo) { 
    //获取当前用户信息
    store.dispatch('FETCHUSERINFO').then(() => {
      //resolve的情况
      //生成路由规则
      getRoute()
      //动态添加了路由规则，但没有立刻生效，可以多进去to一次，下次直接走最外层else中的next
      //这样子刷新的时候可以确保动态路由规则已经生效，不会刷出空白页面
      
      next({...to})
    }).catch(() => {
      //reject的情况
      localStorage.clear()
      next('/login')
    })
  }
  //第一次登陆过来的， 也需要动态加载路由规则
  else if (token && userinfo && from.path == '/login' && to.path == '/homepage') {
    getRoute()
    next('/index')
  }
  else if(token && userinfo && to.path == '/'){
    next('/index')
  }
  else if(token && userinfo && to.path == '/login'){
    next('/index')
  }
  else {
    if(to.name && to.path!='/login'){
      if(to.path.includes('/ums') || to.path.includes('/other')){
        pushToNav({path: to.path, name: to.name.toString()})
      }
      else{
        clearNav(0)
      }
    }
    next()
  }

})

export default router
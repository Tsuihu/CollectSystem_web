import Vue from "vue";
import Router from "vue-router";
import Login from './views/Login.vue'
import { Toast } from "vant";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: Login
    },
    {
      path: "/login",
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: "/registe",
      name: "registe",
      component: () => import('./views/Registe.vue')
    },
    {
      path: "/point",
      name: "point",
      component: () => import('./views/Point.vue')
    },
    {
      path: "/boxlist",
      name: "boxlist",
      component: () => import('./views/BoxList.vue')
    },
    {
      path: "/tubelist",
      name: "tubelist",
      component: () => import('./views/TubeList.vue')
    },
    {
      path: "/people",
      name: "people",
      component: () => import('./views/People.vue'),
    },
    {
      path: "/addpeople",
      name: "addpeople",
      component: () => import('./views/AddPeople.vue'),
    }
  ],
});

router.beforeEach((to,from,next) => {
  // 判断是否需要权限
  if(to.path == '/login' || to.path == '/' || to.path == '/registe') {
    next()
  }else {
    if(sessionStorage.getItem('collectors')){
      next()
    }else{
      Toast('请登录')
      next('/login')
    }
  }
})

export default router
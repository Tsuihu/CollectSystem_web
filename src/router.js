import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Registe from "./views/Registe.vue"
import Point from "./views/Point.vue"
import BoxList from "./views/BoxList.vue"
import TubeList from "./views/TubeList.vue"
import People from "./views/People.vue"
import AddPeople from "./views/AddPeople.vue"

import notFound from "./components/404.vue";
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
      component: Login,
    },
    {
      path: "/registe",
      name: "registe",
      component: Registe
    },
    {
      path: "/point",
      name: "point",
      component: Point
    },
    {
      path: "/boxlist",
      name: "boxlist",
      component: BoxList
    },
    {
      path: "/tubelist",
      name: "tubelist",
      component: TubeList
    },
    {
      path: "/people",
      name: "people",
      component: People,
    },
    {
      path: "/addpeople",
      name: "addpeople",
      component: AddPeople,
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
import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Lndex from "./views/Index.vue"
import Registe from "./views/Registe.vue"
import Point from "./views/Point.vue"

import notFound from "./components/404.vue";

Vue.use(Router);

export default new Router({
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
      path: "/index",
      component: Lndex,
      children: [
        {
          path: "/404",
          component: notFound,
        },
        {
          path: "*",
          redirect: "/404",
        },
      ],
    },
  ],
});

import Vue from "vue";
import Router from "vue-router";
import Login from "./views/login.vue";
import index from "./views/index.vue"

import notFound from "./components/404.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: 'login',
      component: Login,
    },
    {
      path: "/index",
      component: index,
      // beforeEnter: (to, from, next) => {
      //   if (!window.sessionStorage.userInfo) {
      //     next({
      //       path: "/login",
      //     });
      //   } else {
      //     next();
      //   }
      // },
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

import Vue from "vue";
import Router from "vue-router";

const asyncImport = file => () => import(`@/views/${file}`);

Vue.use(Router);

export const constantRouterMap = [
  { path: "/myguess", component: asyncImport("caiwu/myguess") },
  { path: "/guess", component: asyncImport("caiwu/guess") },
  { path: "/public", component: asyncImport("caiwu/public") },
  { path: "/details", component: asyncImport("caiwu/details") },

  { path: "*", redirect: "/404", hidden: true }
];

export default new Router({
  mode: "history",
  // base: "guess",
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

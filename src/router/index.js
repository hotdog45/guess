import Vue from "vue";
import Router from "vue-router";

const asyncImport = file => () => import(`@/views/${file}`);

Vue.use(Router);
const myguess = resolve => require(['@/views/caiwu/myguess'], resolve)
const guess = resolve => require(['@/views/caiwu/guess'], resolve)
const pub = resolve => require(['@/views/caiwu/public'], resolve)
const details = resolve => require(['@/views/caiwu/details'], resolve)
export const constantRouterMap = [
  { path: "/myguess", component: myguess },
  { path: "/guess", component: guess },
  { path: "/public", component: pub },
  { path: "/details", component: details },
  // { path: "/test", component: asyncImport("caiwu/test") },

  { path: "*", redirect: "/404", hidden: true }
];

export default new Router({
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

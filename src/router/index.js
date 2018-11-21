import Vue from "vue";
import Router from "vue-router";

const asyncImport = file => () => import(`@/views/${file}`);

Vue.use(Router);

export const constantRouterMap = [
  // { path: "/guess", component: asyncImport("caiwu/guess") },
  { path: "/myguess", component: asyncImport("caiwu/myguess") },
  { path: "/guess", component: asyncImport("caiwu/test") },
  { path: "/public", component: asyncImport("caiwu/public") },

  // {
  //   path: "/",
  //   name: "Tab",
  //   component: asyncImport("Business/Tab"),
  //   redirect: "/home", //重定向到首页
  //   children: [
  //     { path: "/home", component: asyncImport("Business/home") },
  //     { path: "/order", component: asyncImport("Business/order") },
  //     { path: "/code", component: asyncImport("Business/code") },
  //     { path: "/my", component: asyncImport("Business/my") }
  //   ]
  // },
  //
  // { path: "/choose", component: asyncImport("Business/choose") },
  // { path: "/desc", component: asyncImport("Business/orderDesc") },
  // { path: "/bindpay", component: asyncImport("Business/bind") },
  // { path: "/drawal", component: asyncImport("Business/godrawal") },
  // { path: "/withdrawal", component: asyncImport("Business/withdrawal") },
  // { path: "/audit", component: asyncImport("Business/audit") },
  // { path: "/test2", component: asyncImport("Business/test") },
  // { path: "/bill", component: asyncImport("Business/bill") },
  // { path: "/certification", component: asyncImport("Business/certification") },
  //
  // { path: "/package", component: asyncImport("Shares/packageDetail") },
  // {
  //   path: "/ordersettlement",
  //   component: asyncImport("Shares/OrderSettlement")
  // },
  // { path: "/invitation", component: asyncImport("Shares/invitation") },
  // { path: "/pay", component: asyncImport("Shares/pay") },
  // { path: "/bindphone", component: asyncImport("Shares/regist") },
  // { path: "/addadress", component: asyncImport("Shares/AddAddress") },
  // { path: "/addresslist", component: asyncImport("Shares/AddressList") },
  // { path: "/payafter", component: asyncImport("Shares/payafter") },
  // { path: "/agreement", component: asyncImport("Shares/agreement") },
  //
  // { path: "/test", component: asyncImport("Shares/test") },
  //
  // //////////////////////////////////////////////////////////////////////////////////////
  //
  // {
  //   path: "/loginIn/login/:path?",
  //   component: asyncImport("loginIn/Login"),
  //   hidden: true
  // },
  // {
  //   path: "/loginIn/regist/:path?",
  //   component: asyncImport("loginIn/regist"),
  //   hidden: true
  // },
  // {
  //   path: "/loginIn/rule",
  //   component: asyncImport("loginIn/rule"),
  //   hidden: true
  // },

  { path: "*", redirect: "/404", hidden: true }
];

export default new Router({
  mode: "history",
  // base: "guess",
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

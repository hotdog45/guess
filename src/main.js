// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import FastClick from "fastclick";
import VConsole from "vconsole";
import Vant from "vant";
import "vant/lib/vant-css/index.css";

import "./styles/index.scss";
import "./vux";

// import Vuex from 'vuex'
// import store from './store/store'
//
// Vue.use(Vuex)

Vue.use(Vant);
import router from "./router";

Vue.config.productionTip = false;

// 处理移动端click事件300毫秒延迟
FastClick.attach(document.body);

import * as filter from "./filter"; // global filters
import "./utils/bridge";
import brower from  "./utils/brower";
Vue.use(brower)
import touch from "./utils/swipe";
Vue.use(touch)

// components
import { install } from "./components/index"; // all global components
install(Vue);

import "./utils/close-pixelate";
import { ClosePixelation } from "./utils/close-pixelate";


import axios from "axios";

Vue.prototype.$axios = axios;
axios.defaults.baseURL = "/host";


Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key]);
});
// vsconsole
const DEBUG = false;
// false 绿色的按钮消失
if (DEBUG) {
  const vconsole = new VConsole();
}
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// NProgress.configure({ease:'ease',speed:500});
// router.beforeEach((to, from, next) => {
//   if(to.path == '/') {
//     sessionStorage.clear();
//   }
//   NProgress.start();
//   next()
// });
// router.afterEach(transition => {
//   NProgress.done();
// });
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  // store,
  axios,
  components: { App },
  template: "<App/>"
});

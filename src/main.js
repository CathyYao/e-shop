// 入口文件
import Vue from 'vue'

import VueRouter from 'vue-router' // vue-router
Vue.use(VueRouter)
import router from './router.js'

import VueResource from 'vue-resource'
Vue.use(VueResource)

import app from './App.vue'

import {Header,Swipe,SwipeItem} from 'mint-ui';
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

const vm=new Vue({
  el:'#app',
  render:c=>c(app),
  router
})
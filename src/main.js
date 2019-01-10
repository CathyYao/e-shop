// 入口文件
import Vue from 'vue'

import VueRouter from 'vue-router' // vue-router
Vue.use(VueRouter)
import router from './router.js'

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root='http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON=true;

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import app from './App.vue' // 根组件

/*import {Header,Swipe,SwipeItem,Button,Lazyload} from 'mint-ui'; // Mint-UI
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Button.name,Button);
Vue.use(Lazyload)*/
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

import './lib/mui/css/mui.min.css' // MUI
import './lib/mui/css/icons-extra.css'

import moment from "moment" // 格式化日期

Vue.filter('dateFormat',function(dateStr,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(dateStr).format(pattern);
});

const vm=new Vue({
  el:'#app',
  render:c=>c(app),
  router
})
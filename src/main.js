// 入口文件
import Vue from 'vue'

import VueRouter from 'vue-router' // vue-router
Vue.use(VueRouter)
import router from './router.js'

import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root='http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON=true;

import Vuex from 'vuex'
Vue.use(Vuex)

let goodsList=JSON.parse(localStorage.getItem("goodsList")||'[]');
const store=new Vuex.Store({
  state:{
    goodsList:goodsList, // 购物车中商品数据
  },
  getters:{
    getAllCounts:state=>{
      let count=0;
      state.goodsList.forEach(item=>{
        count+=item.count;
      })
      return count;
    },
    getCountById:state=>{ // 返回一个对象，商品id为属性，商品数量count为属性值
      const obj={};
      state.goodsList.forEach(item=>{
        obj[item.id]=item.count;
      });
      // console.log(obj); // {88: 2, 90: 4}
      return obj;
    },
    getSelectedById:state=>{ // 返回一个对象，商品id为属性，商品selected为属性值
      const obj={};
      state.goodsList.forEach(item=>{
        obj[item.id]=item.selected;
      });
      // console.log(obj); // {88: true, 90: true}
      return obj;
    },
    getSelectedCountsAndAmount:state=>{
      const obj={count:0,amount:0};
      state.goodsList.forEach(item=>{
        if(item.selected){
          obj.count+=item.count;
          obj.amount+=item.count*item.price;
        }
      })
      return obj;
    }
  },
  mutations:{
    addToShopCart(state,goodsInfo){
      // goodsInfo包含的属性：id、count、price、selected
      let flag=false;
      
      state.goodsList.some(item=>{ // 如果购物车中已有该商品，更新商品数量
        if(item.id==goodsInfo.id){
          item.count+=parseInt(goodsInfo.count);
          flag=true;
          return true;
        }
      })
      if(!flag){ // 否则，将该商品添加至购物车
        state.goodsList.unshift(goodsInfo);
      }

      localStorage.setItem('goodsList',JSON.stringify(state.goodsList)); // 保存至本地
    },
    updateGoodsList(state,goodsInfo){ // 在购物车中修改商品数量
      state.goodsList.some(item=>{
        if(item.id==goodsInfo.id){
          item.count=parseInt(goodsInfo.count);
          return true;
        }
      })
      localStorage.setItem('goodsList',JSON.stringify(state.goodsList));
    },
    deleteGoods(state,id){ // 删除购物车中的某个商品
      state.goodsList.some((item,i)=>{
        if(item.id==id){
          state.goodsList.splice(i,1);
          return true;
        }
      })
      localStorage.setItem('goodsList',JSON.stringify(state.goodsList));
    },
    updateSelected(state,goodsInfo){
      state.goodsList.some(item=>{
        if(item.id==goodsInfo.id){
          item.selected=goodsInfo.selected;
          return true;
        }
      })
      localStorage.setItem('goodsList',JSON.stringify(state.goodsList));
    }
  },
})

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import app from './App.vue' // 根组件

/*import {Header,Swipe,SwipeItem,Button,Switch,Lazyload} from 'mint-ui'; // Mint-UI
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Button.name,Button);
Vue.component(Switch.name, Switch);
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
  router,
  store
})
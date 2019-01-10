import VueRouter from 'vue-router'

import home from './components/tabbar/Home.vue'
import member from './components/tabbar/Member.vue'
import cart from './components/tabbar/Cart.vue'
import search from './components/tabbar/Search.vue'
import newslist from './components/newslist/NewsList.vue'
import newsinfo from './components/newslist/NewsInfo.vue'
import photolist from './components/photolist/PhotoList.vue'
import photoinfo from './components/photolist/PhotoInfo.vue'
import goodslist from './components/goodslist/GoodsList.vue'
import goodsinfo from './components/goodslist/GoodsInfo.vue'
import goodsdesc from './components/goodslist/GoodsDesc.vue'
import goodscomment from './components/goodslist/GoodsComment.vue'

var router=new VueRouter({
  routes:[
    {path:'/',redirect:'/home'},
    {path:'/home',component:home},
    {path:'/member',component:member},
    {path:'/cart',component:cart},
    {path:'/search',component:search},
    {path:'/home/newslist',component:newslist},
    {path:'/home/newslist/:id',component:newsinfo},
    {path:'/home/photolist',component:photolist},
    {path:'/home/photolist/:id',component:photoinfo},
    {path:'/home/goodslist',component:goodslist},
    {path:'/home/goodslist/:id',component:goodsinfo,name:"goodsinfo"},
    {path:'/home/goodsdesc/:id',component:goodsdesc},
    {path:'/home/goodscomment/:id',component:goodscomment},
  ],
  linkActiveClass:"mui-active"
})

export default router
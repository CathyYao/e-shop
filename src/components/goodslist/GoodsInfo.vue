<template>
  <div class="goodsinfo-container">
    <transition
    @before-enter="beforeEnter" 
    @enter="enter"
    @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 商品轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :swipeList="swipeList" :isFull="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;
            销售价：<span class="price-now">￥{{goodsInfo.sell_price}}</span>
          </p>
          <p>购买数量：
            <numbox @getcount="getSelectedCount" :numboxMax="goodsInfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCart">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsInfo.goods_no}}</p>
          <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
          <p>上架时间：{{goodsInfo.add_time|dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="getGoodsDesc(goodsInfo.id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="getGoodsComment(goodsInfo.id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui';
import swiper from '../Swiper.vue' // 轮播图组件
import numbox from './GoodsInfo_numbox.vue' // numbox组件

export default{
  data(){
    return {
      id:this.$route.params.id,
      swipeList:[], // 轮播图数据
      goodsInfo:{}, // 商品信息
      ballFlag:false, // 小球的显示与隐藏
      selectedCount:1, // 选中的商品数
    }
  },
  methods:{
    getSwiperList(){
      this.$http.get("api/getthumimages/"+this.id).then(response=>{
        // console.log(response.body);
        if(response.body.status===0){
          response.body.message.forEach(item=>{
            item.img=item.src;
          });
          this.swipeList=response.body.message;
        }else{
          Toast("加载轮播图失败");
        }
      },response=>{
        Toast("加载轮播图失败");
      })
    },
    getGoodsInfo(){
      this.$http.get("api/goods/getinfo/"+this.id).then(response=>{
        // console.log(response.body);
        if(response.body.status===0){
          this.goodsInfo=response.body.message[0];
        }else{
          Toast("加载商品信息失败");
        }
      },response=>{
        Toast("加载商品信息失败");
      })
    },
    getGoodsDesc(id){ // 编程式导航
      this.$router.push('/home/goodsdesc/'+id);
    },
    getGoodsComment(id){ // 编程式导航
      this.$router.push('/home/goodscomment/'+id);
    },
    addToShopCart(){ // 加入购物车
      this.ballFlag=!this.ballFlag;
    },
    beforeEnter(el){ // 半场动画
      el.style.transform='translate(0,0)';
    },
    enter(el,done){
      el.offsetWidth;

      const ballPosition=this.$refs.ball.getBoundingClientRect(); // 小球位置
      const badgePosition=document.getElementById("badge") // 徽标位置
      .getBoundingClientRect();
      const xDist=badgePosition.left-ballPosition.left;
      const yDist=badgePosition.top-ballPosition.top;
      el.style.transform=`translate(${xDist}px,${yDist}px)`;

      el.style.transition="all 0.6s cubic-bezier(0.4,-0.3,1,0.68)";

      done();
    },
    afterEnter(el){
      this.ballFlag=!this.ballFlag;
    },
    getSelectedCount(count){ // 获取子组件的商品数量
      this.selectedCount=count;
    }
  },
  created(){
    this.getSwiperList();
    this.getGoodsInfo()
  },
  components:{
    swiper,
    numbox
  }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
  background-color:#eee;
  overflow:hidden;
  .ball{
    width:18px;
    height:18px;
    border-radius:50%;
    background-color:#f00;
    position:absolute;
    top:408px;
    left:147px;
    z-index:99;
  }
  .price-now{
    color:#f00;
    font-size:16px;
    font-weight:bold;
  }
  .mui-card-footer{
    display:block;
    button{
      margin:15px 0;
    }
  }
}
</style>
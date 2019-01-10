<template>
  <div>
    <!-- 轮播图 -->
    <swiper :swipeList="swipeList" :isFull="true"></swiper>
    <!-- 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-6">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
      <router-link to="/home/newslist">
        <img src="../../images/grid/menu1.png" alt="">
        <div class="mui-media-body">新闻资讯</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
      <router-link to="/home/photolist">
        <img src="../../images/grid/menu2.png" alt="">
        <div class="mui-media-body">图片分享</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
      <router-link to="/home/goodslist">
        <img src="../../images/grid/menu3.png" alt="">
        <div class="mui-media-body">商品购买</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
        <img src="../../images/grid/menu4.png" alt="">
        <div class="mui-media-body">留言反馈</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
        <img src="../../images/grid/menu5.png" alt="">
        <div class="mui-media-body">视频专区</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a href="#">
        <img src="../../images/grid/menu6.png" alt="">
        <div class="mui-media-body">联系我们</div></a></li>
    </ul> 
  </div>
</template>

<script>
import {Toast} from 'mint-ui';
import swiper from '../Swiper.vue'

export default {
  data(){
    return {
      swipeList:[] // 轮播图数据
    }
  },
  methods:{
    getSwipe(){ // 获取轮播图数据
      this.$http.get("api/getlunbo").then(response=>{
        // console.log(response.body);
        if(response.body.status===0){ //成功返回
          this.swipeList=response.body.message;
        }else{
          Toast("加载轮播图失败");
        }
      },response=>{
        Toast("加载轮播图失败");
      })
    }  
  },
  created(){
    this.getSwipe();
  },
  components:{
    swiper
  }
}
</script>

<style lang="scss" scoped>
.mui-grid-view{
  img{
    height:60px;
    width:60px;
  }
  .mui-media-body{
    font-size:13px !important;
  }
}
</style>
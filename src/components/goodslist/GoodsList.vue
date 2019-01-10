<template>
  <div class="goods-list">
    <!-- 两列布局 -->
    <div class="goods-item" v-for="item in goodsList" :key="item.id" 
    @click="goDetail(item.id)" :img_url="item.url">
      <img :src="item.img_url" alt="">
      <h4 class="title">{{item.title}}</h4>
      <div class="info">
        <div class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </div>
        <div class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getGoodsList()">加载更多</mt-button>
  </div>
</template>

<script>
import {Toast} from 'mint-ui';

export default{
  data(){
    return {
      pageIndex:1,
      goodsList:[],
    }
  },
  methods:{
    getGoodsList(){
      this.$http.get('api/getgoods?pageindex='+this.pageIndex).then(response=>{
        // console.log(response.body);
        if(response.body.status===0){
          this.goodsList.push(...response.body.message);
          this.pageIndex++;
        }else{
          Toast("获取商品列表失败");
        }
      },response=>{
        Toast("获取商品列表失败");
      })
    },
    goDetail(id){ // router的编程式导航
      this.$router.push({name:'goodsinfo',params:{id}});
    }
  },
  created(){
    this.getGoodsList();
  }
}
</script>

<style lang="scss" scoped>
.goods-list{
  display:flex;
  flex-wrap:wrap;
  padding:7px;
  justify-content:space-between;
  .goods-item{
    width:49%;
    border:1px solid #ccc;
    padding:3px;
    box-shadow:0 0 8px #ccc;
    margin:4px 0;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    min-height:290px;
    img{
      width:100%;
      height:190px;
    }
    .title{
      font-size:14px;
    }
    .info{
      background-color:#eee;
      padding:5px;
      line-height:30px;
      color:#666;
      .price{
        .now{
          font-size:16px;
          color:#f00;
          font-weight:bold;
        }
        .old{
          text-decoration:line-through;
          font-size:12px;
          margin-left:10px;
        }
      }
      .sell{
        display:flex;
        justify-content:space-between;
        font-size:13px;
      }
    }
  }
}
</style>
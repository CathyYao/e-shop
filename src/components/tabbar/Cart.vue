<template>
  <div class="cart-container">
    <!-- 商品列表 -->
    <div class="goodslist">
      <div class="mui-card" v-for="(item,i) in shopcarList" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getSelectedById[item.id]" 
            @change="selectedChanged(item.id,$store.getters.getSelectedById[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h4>{{item.title}}</h4>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <cart-numbox :initcount="$store.getters.getCountById[item.id]" :id="item.id"></cart-numbox>
                <a href="#" @click.prevent="deleteGoods(item.id,i)">删除</a>
              </p>
            </div>
					</div>
				</div>
			</div>
    </div>
    <!-- 结算 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner pay">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品<span class="red">{{$store.getters.getSelectedCountsAndAmount.count}}</span>件，
              总价：<span class="red">￥{{$store.getters.getSelectedCountsAndAmount.amount}}</span>
            </p>
          </div>
          <div class="right">
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui';
import cartNumbox from '../cart/Cart_numbox.vue'

export default {
  data(){
    return {
      shopcarList:[],
    }
  },
  methods:{
    getShopcarList(){ // 根据多个id获取购物车商品列表数据
      let ids=this.$store.state.goodsList.map(item=>item.id);
      if(ids.length===0){ // 购物车没有商品则不需要请求数据
        return;
      }

      this.$http.get('api/goods/getshopcarlist/'+ids.join(",")).then(response=>{
        // console.log(response.body);
        if(response.body.status===0){
          this.shopcarList=response.body.message;
        }else{
          Toast("获取购物车商品列表失败");
        }
      },response=>{
        Toast("获取购物车商品列表失败");
      })
    },
    deleteGoods(id,i){ // 根据id删除store中的商品，根据i删除当前组件的商品
      this.shopcarList.splice(i,1);
      this.$store.commit("deleteGoods",id);
    },
    selectedChanged(id,val){ // 根据id将store中的selected更新为val
      this.$store.commit("updateSelected",{id,selected:val});
    }
  },
  created(){
    this.getShopcarList();
  },
  components:{
    cartNumbox,
  }
}
</script>

<style lang="scss" scoped>
.cart-container{
  .goodslist{
    background-color:#eee;
    overflow:hidden;
    .mui-card-content-inner{
      display:flex;
      align-items:center;
      img{
        width:66px;
        height:66px;
        margin:0 15px;
      }
      .info{
        flex-grow:1;
        height:66px;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        h4{
          font-size:13px;
          line-height:18px;
          margin:0;
        }
        p{
          margin:0;
          .price{
            font-size:14px;
            color:#f00;
          }
        }
      }
    }
  }
  .pay{
    display:flex;
    justify-content:space-between;
    align-items:center;
    .left{
      font-size:16px;
      .red{
        font-size:18px;
        color:#f00;
        font-weight:bold;
      }
    }
  }
}
</style>
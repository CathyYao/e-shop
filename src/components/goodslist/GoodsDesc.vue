<template>
  <div class="goodsdesc-container">
    <h4 class="title">{{goodsDesc.title}}</h4>
    <hr>
    <div class="content" v-html="goodsDesc.content"></div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      id:this.$route.params.id,
      goodsDesc:{}
    }
  },
  methods:{
    getGoodsDesc(){
      this.$http.get("api/goods/getdesc/"+this.id).then(response=>{
        console.log(response.body);
        if(response.body.status===0){
          this.goodsDesc=response.body.message[0];
        }else{
          Toast("加载图文介绍失败");
        }
      },response=>{
        Toast("加载图文介绍失败");
      })
    },
  },
  created(){
    this.getGoodsDesc();
  }
}
</script>

<style lang="scss">
.goodsdesc-container{
  padding:4px;
  .title{
    color:#226aff;
    font-size:16px;
    text-align:center;
    margin:15px 0;
  }
  .content{
    img{
      width:100%;
    }
  }
}
</style>
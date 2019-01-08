<template>
  <div class="newsinfo-container">
    <!-- 标题 -->
    <h3 class="title">{{newsInfo.title}}</h3>
    <!-- 发表时间与点击次数 -->
    <p class="discriptor">
      <span>发表时间：{{newsInfo.add_time|dateFormat("YYYY-MM-DD")}}</span>
      <span>点击：{{newsInfo.click}}次</span>
    </p>
    <hr>
    <!-- 内容 -->
    <div class="content" v-html="newsInfo.content"></div>
    <!-- 评论 -->
    <comments :id='id'></comments>
  </div>
</template>

<script>
import {Toast} from 'mint-ui';
import comments from '../Comments.vue' // 评论组件

export default{
  data(){
    return {
      id:this.$route.params.id,
      newsInfo:{}
    }
  },
  methods:{
    getNewsInfo(){
      this.$http.get("api/getnew/"+this.id).then(response=>{
        // console.log(response.body);
        if(response.body.status===0){
          this.newsInfo=response.body.message[0];
        }else{
          Toast("加载新闻详情失败");
        }
      },response=>{
        Toast("加载新闻详情失败");
      })
    }
  },
  created(){
    this.getNewsInfo();
  },
  components:{
    comments
  }
}
</script>

<style lang="scss" scoped>
.newsinfo-container{
  margin:0 4px;
  .title{
    font-size:16px;
    color:#f00;
    text-align:center;
    margin:15px 0;
  }
  .discriptor{
    font-size:13px;
    color:#226aff;
    display:flex;
    justify-content:space-between;
  }
  .content{
    img{
      width:100%
    }
  }
}
</style>
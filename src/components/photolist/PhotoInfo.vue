<template>
  <div class="photoinfo-container">
    <h3 class="title">{{photoInfo.title}}</h3>
    <p class="discriptor">
      <span>发表时间：{{photoInfo.add_time|dateFormat("YYYY-MM-DD")}}</span>
      <span>点击：{{photoInfo.click}}次</span>
    </p>
    <hr>
    <!-- 缩略图 -->
    <div class="thumb-list">
      <vue-preview :slides="thumbList"></vue-preview>
      <!--<img class="preview-img" v-for="item in thumbList" :src="item.src"
      height="100" @click="$preview.open(index,thumbList)" :key="item.src">-->
    </div>
    <!-- 图片内容 -->
    <div class="content" v-html="photoInfo.content"></div>
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
      photoInfo:{},
      thumbList:[]
    }
  },
  methods:{
    getPhotoInfo(){
      this.$http.get("api/getimageInfo/"+this.id).then(response=>{
        // console.log(response.body);
        if(response.body.status===0){
          this.photoInfo=response.body.message[0];
        }else{
          Toast("加载图片详情失败");
        }
      },response=>{
        Toast("加载图片详情失败");
      })
    },
    getThumbs(){
      this.$http.get("api/getthumimages/"+this.id).then(response=>{
        // console.log(response.body);
        if(response.body.status===0){
          response.body.message.forEach(item=>{
            item.w=600;
            item.h=400;
            item.msrc=item.src;
          })
          this.thumbList=response.body.message;
        }else{
          Toast("加载缩略图失败");
        }
      },response=>{
        Toast("加载缩略图失败");
      })
    },
  },
  created(){
    this.getPhotoInfo();
    this.getThumbs();
  },
  components:{
    comments
  }
}
</script>

<style lang="scss">
.photoinfo-container{
  margin:0 4px;
  .title{
    font-size:15px;
    color:#26A2FF;
    text-align:center;
    margin:15px 0;
  }
  .discriptor{
    font-size:13px;
    display:flex;
    justify-content:space-between;
  }
  .thumb-list{
    figure{
      display:inline-block;
      width:100px;
      height:100px;
      margin:17px;
      box-shadow:0 0 8px #999;
      img{
        width:100px;
        height:100px;
      }
    }
  }
  .content{
    font-size:13px;
    line-height:30px;
  }
}
</style>
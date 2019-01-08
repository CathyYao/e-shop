<template>
  <ul class="mui-table-view">
    <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
      <router-link :to="'/home/newslist/'+item.id">
        <img class="mui-media-object mui-pull-left" :src="item.img_url">
        <div class="mui-media-body">
          <h4>{{item.title}}</h4>
          <p class='mui-ellipsis'>
            <span>发表时间：{{item.add_time|dateFormat}}</span>
            <span>点击：{{item.click}}次</span>
          </p>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
import {Toast} from 'mint-ui';

export default {
  data(){
    return {
      newsList:[]
    }
  },
  methods:{
    getNewsList(){
      this.$http.get("api/getnewslist").then(response=>{
        // console.log(response.body);
        if(response.body.status===0){
          this.newsList=response.body.message;
        }else{
          Toast("加载新闻列表失败");
        }
      },response=>{
        Toast("加载新闻列表失败");
      })
    }
  },
  created(){
    this.getNewsList();
  }
}
</script>

<style lang="scss" scoped>
.mui-table-view{
  .mui-media-body{
    h4{font-size:14px;}
    .mui-ellipsis{
      font-size:12px;
      color:#226aff;
      display:flex;
      justify-content:space-between;
    }
  }
}
</style>
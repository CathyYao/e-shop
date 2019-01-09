<template>
  <div>
    <!-- 顶部滑动区域 -->
    <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item',item.id===0?'mui-active':'']" 
            v-for="item in cates" :key="item.id" @click="getImgsById(item.id)">
              {{item.title}}
            </a>
					</div>
				</div>
			</div>
    <!-- 图片列表 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photolist/'+item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h4 class="info-title">{{item.title}}</h4>
          <div class="info-content">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import {Toast} from 'mint-ui';
import mui from '../../lib/mui/js/mui.min.js'

export default{
  data(){
    return {
      cates:[],
      list:[],
      cateid:'',
    }
  },
  methods:{
    getCategories(){
      this.$http.get('api/getimgcategory').then(response=>{
        // console.log(response.body);
        if(response.body.status===0){
          response.body.message.unshift({id:0,title:"全部"}); // 手动添加“全部”选项
          this.cates=response.body.message;
        }else{
          Toast("获取图片分类失败");
        }
      },response=>{
        Toast("获取图片分类失败");
      })
    },
    getImgsById(cateid){
      this.$http.get('api/getimages/'+cateid).then(response=>{
        // console.log(response.body);
        if(response.body.status===0){
          this.list=response.body.message;
        }else{
          Toast("获取图片列表失败");
        }
      },response=>{
        Toast("获取图片列表失败");
      })
    }
  },
  created(){
    this.getCategories();
    this.getImgsById(0);
  },
  mounted(){
    mui('.mui-scroll-wrapper').scroll({
      deceleration:0.0005
    });
  } 
}
</script>

<style lang="scss" scoped>
.photo-list{
  list-style:none;
  margin:0;
  padding:10px;
  padding-bottom:0;
  li{
    background-color:#ccc;
    text-align:center;
    margin-bottom:10px;
    box-shadow:0 0 9px #999;
    position:relative;
    img{
      width:100%;
      vertical-align:middle;
    }
    img[lazy=loading]{
      width:40px;
      height:300px;
      margin:auto;
    }
    .info{
      position:absolute;
      bottom:0;
      color:#fff;
      text-align:left;
      background-color:rgba(0,0,0,0.4);
      max-height:86px;
      .info-title{
        font-size:14px;
      }
      .info-content{
        font-size:13px;
      }
    }
  }
}
</style>
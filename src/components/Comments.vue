<template>
  <div class="cmts-container">
    <h3>发表评论</h3>
    <hr>
    <!-- 输入并发表评论 -->
    <textarea placeholder="请输入评论内容（最多140个字）" maxlength="140" v-model="cmtsContent"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <!-- 评论列表 -->
    <div class="cmts-list">
      <div class="cmts-item" v-for="(item,i) in cmtsList" :key="i">
        <div class="cmts-title">
          第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;
          发表时间：{{item.add_time|dateFormat}}
        </div>
        <div class="cmts-content">
          {{item.content||"此用户很懒，什么都没说"}}
        </div>
      </div>
    </div>
    <!-- 加载更改 -->
    <mt-button type="danger" plain size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import {Toast} from 'mint-ui';

export default {
  data(){
    return {
      pageIndex:1,
      cmtsList:[],
      cmtsContent:'',
    }
  },
  methods:{
    getCmtsList(){ // 加载评论列表
      this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(response=>{
        // console.log(response.body);
        if(response.body.status===0){
          this.cmtsList.push(...response.body.message);
        }else{
          Toast("加载评论列表失败");
        }
      },response=>{
        Toast("加载评论列表失败");
      })
    },
    getMore(){ // 加载更多
      this.pageIndex++;
      this.getCmtsList();
    },
    postComment(){ // 发表评论
      // 校验评论内容不为空
      if(this.cmtsContent.trim()===''){
        return Toast("评论内容不能为空");
      }

      this.$http.post('api/postcomment/'+this.$route.params.id,
        {content:this.cmtsContent.trim()}
      ).then(response=>{
        // console.log(response.body);
        if(response.body.status===0){
          Toast(response.body.message);
          // 拼接评论对象
          let comment={
            user_name:'匿名用户',
            add_time:Date.now,
            content:this.cmtsContent.trim()
          }
          this.cmtsList.unshift(comment);
          this.cmtsContent="";
        }else{
          Toast("评论未提交成功");
        }
      },response=>{
        Toast("评论未提交成功");
      })
    }
  },
  created(){
    this.getCmtsList();
  },
  props:['id']
}
</script>

<style lang="scss" scoped>
.cmts-container{
  h3{
    font-size:18px;
  }
  textarea{
    font-size:14px;
    height:86px;
    margin:0;
  }
  .cmts-list{
    margin:5px 0;
    .cmts-item{
      font-size:13px;
      .cmts-title{
        background-color:#ccc;
        line-height:30px;
      }
      .cmts-content{
        margin:8px 0;
        text-indent:2em;
      }
    }
  }
}
</style>
<template>
  <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" 
    :value="initcount" @change="countChanged" ref="numbox" readonly/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
  methods:{
    countChanged(){ // numbox中数据改变同步到store中
      this.$store.commit('updateGoodsList',{
        id:this.id,
        count:this.$refs.numbox.value
      });
    }
  },
  mounted(){
    mui('.mui-numbox').numbox(); // 初始化数字选择框组件
  },
  props:['initcount','id'],
}
</script>

<style lang="scss" scoped>
.mui-numbox{
  height:25px;
}
</style>
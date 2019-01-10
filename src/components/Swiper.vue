<template>
  <mt-swipe :auto="4000">
    <mt-swipe-item v-for="item in swipeList" :key="item.img">
      <img :src="item.img" alt="" :class="{full:isFull}">
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
export default {
  props:["swipeList","isFull"]
}
</script>

<style lang="scss" scoped>
.mint-swipe{
  height:200px;
  .mint-swipe-item{
    text-align:center;
    img{
      // width:100%;
      height:100%;
    }
  }
}

.full{
  width:100%;
}
</style>

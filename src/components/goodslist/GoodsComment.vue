<template>
  <div>
    <comments :id="$route.params.id"></comments>
  </div>
</template>

<script>
import comments from '../Comments.vue'

export default {
  components:{
    comments
  }
}
</script>

<style lang="scss" scoped>

</style>
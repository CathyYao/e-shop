<template>
  <div class="app-container">
    <!-- Header区域 -->
    <mt-header fixed title="电子商城">
			<span slot="left" @click="goBack" v-show="flag">
    		<mt-button icon="back">返回</mt-button>
  		</span>
		</mt-header>
    <!-- 路由区域 -->
		<transition>
			<router-view></router-view>
		</transition>
    <!-- Tabbar区域 -->
    <nav class="mui-bar mui-bar-tab" style="passiveListeners: false">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/cart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">{{$store.getters.getAllCounts}}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
import mui from './lib/mui/js/mui.min.js'

export default {
	data(){
		return {
			flag:false
		}
	},
	methods:{
		goBack(){
			this.$router.go(-1);
		}
	},
	watch:{
		'$route.path':function(newVal){
			this.flag=(newVal==='/home')?false:true;
		}
	},
	created(){
		this.flag=(this.$route.path==='/home')?false:true;
	},
	mounted(){
		mui('.mui-bar-tab').on('click','.mui-tab-item',function(){ // 使底部选项卡重新可点击
			document.location.href=this.href;
		});
	}
}
</script>

<style lang="scss" scoped>
*{touch-action:none;} // 去掉报错信息，触摸事件不会产生默认行为，但仍可触摸
.app-container{
	background-color:#fff;
  padding-top:40px;
	padding-bottom:50px;
	overflow-x:hidden;
}

.mint-header{
	z-index:999;
}

.v-enter{
	opacity:0;
	transform:translate(100%);
}
.v-leave-to{
	opacity:0;
	transform:translate(-100%);
	position:absolute;
}
.v-enter-active,
.v-leave-active{
	transition:all 0.5s ease;
}
</style>
<template>
	<view>
		<view class="btn-enter" @click="goHome">
			进入首页
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goHome(){
				uni.switchTab({
					url: '../main/main'
				});
			}
		}
	}
</script>

<style lang="less">
.btn-enter{
	width: 200upx;
	height: 90upx;
	background: firebrick;
}
</style>

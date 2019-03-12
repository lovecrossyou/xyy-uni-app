<template>
	<view class="more_wrapper">
		<modifiedData title="商务合作"></modifiedData>
		<modifiedData title="关于我们" @click="goAbout"></modifiedData>

		<button type="primary" class="quit_btn" @click="loginOut">退出登录</button>
	</view>
</template>

<script>
import modifiedData from '@/components/modifiedData.vue';
export default {
	data() {
		return {};
	},
	components: {
		modifiedData
	},
	computed: {},
	methods: {
		loginOut(){
			
		},
		goAbout(){
			uni.navigateTo({
				url:"./about"
			})
		}
	}
};
</script>

<style lang="less" scoped>
.more_wrapper {
	width: 100%;
	padding: 46upx 32upx;
	box-sizing: border-box;
	.quit_btn {
		width: 100%;
		height: 88upx;
		background-color: #7ca7d2;
		border-radius: 6upx;
		color: #ffffff;
		font-size: 28upx;
		text-align: center;
		line-height: 88upx;
		margin-top: 186upx;
	}
}
</style>

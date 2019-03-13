<template>
	<view class="feedback_wrapper">
		<textarea value="" placeholder="请输入您的宝贵意见" placeholder-style="color:#999;"/>
		<button type="primary" class="submit_btn">提交</button>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	components: {},
	computed: {},
	methods: {}
};
</script>

<style lang="less" scoped>
.feedback_wrapper {
	width: 100%;
	padding: 24upx;
	box-sizing: border-box;
	.submit_btn {
		width: 100%;
		height: 88upx;
		background-color: #3e87eb;
		border-radius: 6upx;
		color: #ffffff;
		font-size: 28upx;
		text-align: center;
		line-height: 88upx;
		margin-top: 148upx;
	}
}
.feedback_wrapper > textarea {
	width: 702px;
	height: 428px;
	background: rgba(255, 255, 255, 1);
	border-radius: 6px;
	border: 1px solid rgba(236, 236, 236, 1);
	font-size: 24px;
	color: #999999;
	padding: 24upx;
	box-sizing: border-box;
}
</style>

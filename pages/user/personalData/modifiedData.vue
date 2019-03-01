<template>
	<view class="modified_data_wrapper">
		<text class="user_name_text">{{title}}</text>
		<view class="modification_right">
			<text class="user_name">{{desc}}</text>
			<img src="http://qnimage.xiteng.com/right_icon@2x.png" alt="" class="user_head_img">
		</view>
	</view>
</template>

<script>
	import Vue from 'vue';
	export default {
		props:{
			title:String,
			desc:String
		},
		data() {
			return {

			}
		},
	}
</script>

<style lang="less" scoped>
	.modified_data_wrapper {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 24upx 0;
		box-sizing: border-box;
		border-bottom: 1upx solid #E0E0E0;
		align-items: center;

		.user_name_text {
			color: #333333;
			font-size: 30upx;
		}

		.modification_right {
			display: flex;
			flex-direction: row;
			align-items: center;

			.user_name {
				color: #999999;
				font-size: 24upx;
				margin-right: 16upx;
			}

			.user_head_img {
				width: 16upx;
				height: 26upx;
			}
		}
	}
</style>

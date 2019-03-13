<template>
	<view class="integral_wrapper">
		<view class="integral_header">
			<img src="http://qnimage.xiteng.com/jifenlan@2x.png" alt="" class="integral_img" />
			<view class="integral_num">2500积分</view>
		</view>
		<block v-for="(product, index) in list" :key="index">
			<view class="integral_shop_list">
				<img src="http://qnimage.xiteng.com/hu@2x.png" alt="" class="shop_img" />
				<view class="integral_shop_info">
					<view class="integral_shop_name">紫砂壶</view>
					<view class="integral_num_text">300积分</view>
				</view>
				<button class="conversion_btn">兑换</button>
			</view>
		</block>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [1, 2, 3, 4, 5]
		};
	},
	components: {},
	computed: {},
	methods: {}
};
</script>

<style lang="less" scoped>
.integral_wrapper {
	width: 100%;
	background-color: #f7f7f7;
	.integral_header {
		width: 100%;
		height: 360upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #dbeeff;
		.integral_img {
			width: 120upx;
			height: 120upx;
			margin-top: 76upx;
		}
		.integral_num {
			color: #7ca7d2;
			font-size: 34upx;
			margin-top: 40upx;
			font-weight: 500;
		}
	}
	.integral_shop_list {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 25upx;
		box-sizing: border-box;
		background-color: #fff;
		margin-top: 23upx;
		.shop_img {
			width: 132upx;
			height: 132upx;
			border: 1upx dashed #d2d2d2;
		}
		.integral_shop_info {
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
			margin-left: 20upx;
			.integral_shop_name {
				color: #333333;
				font-size: 30px;
				font-weight: 500;
			}
			.integral_num_text {
				color: #666666;
				font-size: 24px;
				margin-top: 28upx;
			}
		}
		.conversion_btn {
			width: 156upx;
			height: 56upx;
			border-radius: 6px;
			background-color: #3e87eb;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			color: #fff;
			font-weight: 500;
		}
	}
}
</style>

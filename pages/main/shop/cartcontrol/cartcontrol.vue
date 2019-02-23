<template>
	<view class="control-wrapper">
		<image class="icon" v-bind:src="add_icon" mode="aspectFit"></image>
		<view class="number">
			1
		</view>
		<image class="icon" v-bind:src="add_icon" mode="aspectFit"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				add_icon: '../../../static/shop/icon_add.png'
			}
		}
	}
</script>

<style lang="less">
	.control-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		height: 40upx;
		width: 180upx;

		.icon {
			width: 40upx;
			height: 40upx;
			overflow: hidden;
		}

		.number {
			font-size: 28upx;
			color: #333;
		}
	}
</style>

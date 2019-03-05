<template>
	<view class="wrapper">
		<view class="amend_name_wrapper">
			<text class="user_name">用户名</text>
			<input type="text" placeholder="chechero" class="input_area" placeholder-style="color:#999;">
			<img src="http://qnimage.xiteng.com/del_name@2x.png" alt="" class="delete_name_icon">
		</view>

		<button type="primary" class="affirm_change_btn">确认</button>

	</view>
</template>

<script>
	export default {
		data() {
		},
		components: {

		},
		computed: {

		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.wrapper {
		width: 100%;
		padding: 0 26upx;
		box-sizing: border-box;

		.amend_name_wrapper {
			width: 100%;
			height: 88upx;
			display: flex;
			flex-direction: row;
			border-bottom: 1upx solid #E5E5E5;
			align-items: center;
			padding-right: 30upx;
			box-sizing: border-box;

			.user_name {
				color: #333;
				font-size: 30upx;
			}

			.input_area {
				flex: 1;
				border: none;
				margin-left: 40upx;
				color: #999;
				font-size: 24upx;
			}

			.delete_name_icon {
				width: 34upx;
				height: 34upx;
			}
		}

		.affirm_change_btn {
			width: 100%;
			height: 74upx;
			background-color: #7CA7D2;
			font-size: 30upx;
			color: #ffffff;
			text-align: center;
			line-height: 74upx;
			margin-top: 66upx;
		}


	}
</style>

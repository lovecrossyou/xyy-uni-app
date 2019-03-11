<template>
	<view class="main">
		<view class="logo">
			<image src="../../../static/me/logo_80.png" ></image>
			<view class="name">
				鑫翼优本地生活服务
			</view>
		</view>
		<view class="footer">
			Copyright@2018-2019 北京汇格信息科技有限公司版权所有
		</view>
	</view>
</template>

<script>
</script>

<style lang="less" scoped>
	.main {
		position: relative;
		width: 100%;
		.logo{
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: auto;
			image{
				margin-top: 60upx;
				width: 160upx;
				height: 160upx;
				border-radius: 50%;
			}
			.name{
				text-align: center;
				font-size: 26upx;
				color: #666;
				margin-top: 16upx;
			}
		}

		.footer {
			position: absolute;
			bottom: 40upx;
			text-align: center;
			width: 100%;
			font-size: 24upx;
			color: #666;
		}
	}
</style>

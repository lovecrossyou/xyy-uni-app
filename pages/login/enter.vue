<template>
	<view class="enter_wrapper">
		<img src="http://qnimage.xiteng.com/Mask@2x.png" alt="" class="bg_img">
		<view class="enter_box_area">
			<view class="tel_area_wrapper">
				<input type="number"  value="" placeholder="请输入您的手机号码" placeholder-style="color:#7CA7D2;" />
			</view>
			<view class="tel_area_wrapper">
				<input type="number" value="" placeholder="请输入验证码" placeholder-style="color:#7CA7D2;" />
				<button type="primary" class="get_code_btn">获取验证码</button>
			</view>
		</view>

		<button class="login_btn">登录</button>
		
		<view class="third_party_area">
			<text class="third_party_text">第三方登录</text>
		</view>
		<view class="login_way">
			<img src="http://qnimage.xiteng.com/weixin@2x.png" alt="">
			<img src="http://qnimage.xiteng.com/qq@2x.png" alt="">
		</view>
		<view class="footer_text">注册或创建账户即同意《xxx用户注册协议书》 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
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
	.enter_wrapper {
		width: 100%;

		.bg_img {
			width: 100%;
			height: 396upx;
		}

		.enter_box_area {
			width: 100%;
			padding: 0 47upx;
			box-sizing: border-box;

			.tel_area_wrapper {
				width: 100%;
				height: 95upx;
				border-bottom: 1upx solid #7CA7D2;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.get_code_btn {
					width: 165upx;
					height: 60upx;
					background-color: #7CA7D2;
					color: #fff;
					font-size: 28upx;
					border-radius: 10upx;
					border: none;
					text-align: center;
					line-height: 60upx;
				}
			}

			.tel_area_wrapper>input {
				font-size: 28upx;
				color: #7CA7D2;
				flex: 1;
			}
		}
		.login_btn{
			width: 655upx;
			height: 90upx;
			border: none;
			background-color: #7CA7D2;
			color: #fff;
			text-align: center;
			line-height: 90upx;
			font-size: 28upx;
			border-radius: 40upx;
			margin-top: 100upx;
		}
		.third_party_area{
			width: 100%;
			border-top: 1upx dashed #F1F1F1;
			margin-top: 100upx;
			position: relative;
			.third_party_text{
				color: #A3A3A3;
				font-size: 24upx;
				position: absolute;
				left: 43%;
				top: -15upx;
			}
		}
		.login_way{
			width: 70%;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			margin: 65upx auto 0 auto;
		}
		.login_way image{
			width: 110upx;
			height: 110upx;
		}
		.footer_text{
			width: 100%;
			height: 25upx;
			color:#7CA7D2 ;
			font-size: 22upx;
			margin-top: 93upx;
			text-align: center;
		}
	}
</style>

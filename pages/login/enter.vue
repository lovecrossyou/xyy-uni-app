<template>
	<view class="enter_wrapper">
		<img src="http://qnimage.xiteng.com/WechatIMG2083.jpeg" alt="" class="bg_img">
		<!-- app登录 -->
		<!-- #ifdef APP-PLUS -->
		<view class="enter_box_area">
			<view class="tel_area_wrapper">
				<input type="number" v-model="userAccount" placeholder="请输入您的手机号码" placeholder-style="color:#7CA7D2;" />
			</view>
			<view class="tel_area_wrapper">
				<input type="number" v-model="passWord" placeholder="请输入密码" placeholder-style="color:#7CA7D2;" />
				<!-- <button type="primary" class="get_code_btn">获取验证码</button> -->
			</view>
			<view class="tel_area_wrapper">
				<input type="number" v-model="codeNumber" placeholder="请输入验证码" placeholder-style="color:#7CA7D2;" />
				<div class="img_change_img" @click="getCaptchaCode">
					<img style="width:80px;height:40px" v-show="captchaCodeImg" :src="captchaCodeImg">
				</div>
			</view>
		</view>
		<button class="login_btn" @click="simpleLogin">登录</button>
		<!-- #endif -->

		<!--微信 小程序登录 -->
		<!-- #ifdef MP-WEIXIN -->


		<view class="login_way">
			<button class="btn_auth" type="primary" open-type="getUserInfo" @getuserinfo="oauth('weixin')">
			</button>

			<view class="tips">
				微信授权登录
			</view>
		</view>


		<!-- #endif -->

		<view class="footer_text">注册或创建账户即同意《鑫翼优用户注册协议书》 </view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	import {
		mobileCode,
		checkExsis,
		sendLogin,
		getcaptchas,
		accountLogin,
		wxLogin
	} from '@/util/service/getData.js'

	export default {
		data() {
			return {
				providerList: [],
				userInfo: null, //获取到的用户信息
				userAccount: '', //用户名
				passWord: '', //密码
				captchaCodeImg: null, //验证码地址
				codeNumber: null, //验证码
			}
		},
		onLoad() {
			this.getCaptchaCode();
		},
		methods: {
			...mapMutations([
				'RECORD_USERINFO',
			]),
			...mapActions(['login', 'appLogin']),
			async getCaptchaCode() {
				let res = await getcaptchas();
				this.captchaCodeImg = res.code;
			},
			// 小程序登录
			async authLogin(code, avatarUrl, gender, nickName) {
				const res = await wxLogin(code, avatarUrl, gender, nickName);
				if (!res) return;
				this.userInfo = res;
				this.RECORD_USERINFO(this.userInfo);
				uni.reLaunch({
					url: '/pages/main/main'
				});
			},
			// app登录
			simpleLogin() {
				this.handleLogin(this.userAccount, this.passWord, this.codeNumber);
			},
			async handleLogin(userAccount, passWord, codeNumber, code) {
				if (userAccount.length === 0) {
					return;
				}
				if (passWord.length === 0) {
					return;
				}
				const res = await accountLogin(userAccount, passWord, codeNumber, code);
				if (!res) return;
				this.userInfo = res;
				this.RECORD_USERINFO(this.userInfo);
				uni.reLaunch({
					url: '/pages/main/main'
				});
			},
			// 微信授权
			oauth(value) {
				let that = this;
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								console.log('infoRes ', infoRes);
								console.log('res.code ', res.code);
								const {
									avatarUrl,
									gender,
									nickName
								} = infoRes.userInfo;
								// return;
								that.authLogin(res.code, avatarUrl, gender, nickName);
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			}
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

		.login_btn {
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

		.third_party_area {
			width: 100%;
			border-top: 1upx dashed #F1F1F1;
			margin-top: 100upx;
			position: relative;

			.third_party_text {
				color: #A3A3A3;
				font-size: 24upx;
				position: absolute;
				left: 43%;
				top: -15upx;
			}
		}

		.login_way {
			// width: 70%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			// justify-content: space-around;
			margin: 65upx auto 0 auto;

			image {
				width: 110upx;
				height: 110upx;
			}

			.btn_auth {
				width: 110upx;
				height: 110upx;
				// margin: auto;
				background: #7CA7D2;
				background-size: 110upx 110upx;
				background-repeat: no-repeat;
				border: none;
				background-image: url('http://qnimage.xiteng.com/weixin@2x.png');
				border-radius: 50%;
				background-color: #fff;
			}

			.tips {
				margin-top: 20upx;
				color: #333;
				font-size: 28upx;
			}

			.share {
				width: 100%;
				height: 80upx;
				// margin: auto;
				background: #7CA7D2;
				// background-size: 110upx 110upx;
				// background-repeat: no-repeat;
				border: none;
				// background-image: url('http://qnimage.xiteng.com/weixin@2x.png');
				// border-radius: 50%;
				// background-color: #fff;
			}
		}

		.footer_text {
			width: 100%;
			height: 25upx;
			color: #7CA7D2;
			font-size: 22upx;
			// margin-top: 20upx;
			position: fixed;
			bottom: 30upx;
			text-align: center;
		}
	}
</style>

<template>
	<view class="wrapper">
		<view class="header_wrapper" @click="upLoad">
			<view class="head_portraits_text">头像</view>
			<view class="header_right">
				<img mode="aspectFill" :src="userInfo.avatar" alt="" class="head_img" />
				<img src="http://qnimage.xiteng.com/right_icon@2x.png" alt="" class="right_icon" />
			</view>
		</view>

		<view>
			<view @click="amendName(amendName)">
				<modifiedData title="用户名" :desc="userInfo.username"></modifiedData>
			</view>
			<!-- <view @click="popMenu">
				<modifiedData title="性别" desc="女"></modifiedData>
			</view> -->
			<view @click="popMenu">
				<modifiedData title="手机" :desc="userInfo.mobile"></modifiedData>
			</view>
		</view>

		<button type="warn" class="quit_btn" @click="loginOut">退出登录</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import modifiedData from '@/components/modifiedData.vue';
	import {
		baseURL
	} from '@/util/request.js'
	export default {
		data() {
			return {
				src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
				animationData: {},
				showMenu: false,
			};
		},
		components: {
			modifiedData
		},
		computed: {
			...mapState(['userInfo', 'imgPath'])
		},
		methods: {
			amendName(amendName) {
				uni.navigateTo({
					url: 'amendName'
				});
			},
			popMenu() {
				uni.showActionSheet({
					itemList: ['男', '女'],
					success: function(res) {},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			loginOut() {
				uni.reLaunch({
					url: '/pages/login/enter'
				});
			},
			upLoad() {
				let that = this;
				uni.chooseImage({
					success: chooseImageRes => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: baseURL + 'eus/v1/users/' + this.userInfo.user_id + '/avatar', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							success: res => {
								const imgData = JSON.parse(res.data);
								that.userInfo.avatar = imgData.image_path;
							}
						});
					}
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	.wrapper {
		width: 750upx;
		padding: 19upx 26upx 0 26upx;
		box-sizing: border-box;

		.modal-shadow {
			background: rgba(0, 0, 0, 0.5);
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
		}

		.header_wrapper {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1upx solid #e0e0e0;
			padding: 15upx 0 15upx 26upx;
			box-sizing: border-box;

			.head_portraits_text {
				color: #272727;
				font-size: 30upx;
			}

			.header_right {
				display: flex;
				flex-direction: row;
				align-items: center;

				.head_img {
					width: 126upx;
					height: 126upx;
					border-radius: 50%;
					border: 1upx solid rgba(124, 167, 210, 1);
					margin-right: 16upx;
				}

				.right_icon {
					width: 16upx;
					height: 26upx;
				}
			}
		}

		.modal_box_wrapper {
			width: 100%;
			height: 330upx;
			background-color: #f5f5f5;
			position: absolute;
			bottom: 0;
			left: 0;

			.option_item {
				width: 100%;
				height: 100upx;
				background-color: #fff;
				margin-bottom: 1upx;
				text-align: center;
				line-height: 100upx;
				color: #333333;
				font-size: 30upx;
			}

			.cancel_btn {
				margin-top: 24upx;
			}
		}

		.quit_btn {
			margin-top: 180upx;
		}
	}
</style>

<template>
	<view class="content">
		<view class="header" @click="modification">
			<view class="left">
				<view class="image-content">
					<image style="width: 128upx; height: 128upx; background-color: #eee;" mode="aspectFill" :src="userInfo.userIconUrl"
					 @error="imageError"></image>
				</view>
				<view class="user-info">
					<view class="name">{{userInfo.nickName || userInfo.phoneNum}}</view>
					<view class="score">积分：0</view>
				</view>
			</view>
			<view class="right">
				<uni-icon type="arrowright" color="#bbb" size="20"></uni-icon>
			</view>
		</view>

		<view class="item-wrapper">
			<modifiedData title="收货地址" :thumb="icon_address" @click="toAddress"></modifiedData>
			<modifiedData title="我的优惠券" :thumb="icon_conpon" @click="toTickets"></modifiedData>
			<modifiedData title="我的收藏" :thumb="icon_collect" @click="toAddress"></modifiedData>
			<modifiedData title="我的积分" :thumb="icon_score" @click="integral"></modifiedData>
			<modifiedData title="意见反馈" :thumb="icon_feedback" @click="feedback"></modifiedData>
			<modifiedData title="更多" :thumb="icon_collect" @click="more"></modifiedData>
		</view>
		<view class="btn-row">
			<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import modifiedData from "@/components/modifiedData.vue";
	export default {
		data() {
			return {
				src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
				icon_address: '../../static/me/address.png',
				icon_collect: '../../static/me/collect.png',
				icon_feedback: '../../static/me/feedback.png',
				icon_more: '../../static/me/more.png',
				icon_score: '../../static/me/score.png',
				icon_conpon: '../../static/me/conpon.png',
			}
		},
		components: {
			modifiedData,
			uniIcon
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userInfo'])
		},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			toAddress() {
				//地址列表
				uni.navigateTo({
					url: '../address/chooseAddress'
				})
			},
			// 优惠卷
			toTickets() {
				return;
				uni.navigateTo({
					url: '../order/makeSureOrder/Tickets'
				})
			},
			bindLogout() {
				this.logout();
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/enter',
					});
				}
			},
			imageError(e) {
				console.error('image发生error事件，携带值为' + e.detail.errMsg)
			},
			modification() {
				return;
				uni.navigateTo({
					url: "personalData/personalData"
				})
			},
			feedback() {
				uni.navigateTo({
					url: "feedback/feedback"
				})
			},
			integral() {
				uni.navigateTo({
					url: 'integral/integral'
				});
			},
			more() {
				uni.navigateTo({
					url: "more/more"
				})
			}

		}
	}
</script>

<style lang="less">
	.content {
		padding: 0;

		.header {
			background-color: #3e87eb;
			justify-content: space-between;
			align-items: center;
			display: flex;
			padding: 35upx;
			height: 150upx;

			.left {
				display: flex;
				flex-direction: row;
				align-items: center;
				height: 100%;

				.image-content>image {
					border-radius: 50%;
					width: 100upx;
					height: 100upx;
				}

				.user-info {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 20upx;
					padding: 25upx 0;
					box-sizing: border-box;
					height: 126upx;

					.name {
						font-size: 30upx;
						font-family: PingFangSC-Medium;
						font-weight: 600;
						color: #fff;
					}

					.score {
						font-size: 26upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: #fff;
					}
				}
			}

		}

		.item-wrapper {
			padding: 0 24upx;
		}
	}
</style>

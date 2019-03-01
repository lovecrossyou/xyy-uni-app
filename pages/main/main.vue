<template>
	<view class="content">
		<view class="header">
			<view class="address-wrapper">
				<view class="address-icon"></view>
				<view class="address">{{addressName}}</view>
			</view>
			<view class="search-wrapper">
				<view class="search-box" @click="goSearch">
					<view class="label">
						搜索
					</view>
				</view>
			</view>
		</view>
		<view class="banner">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" indicator-dots="true">
						<block v-for="(banner,index) in banners" :key="index">
							<swiper-item>
								<image v-bind:src="banner.image" class="swiper-item" mode="scaleToFill"></image>
							</swiper-item>
						</block>
					</swiper>

				</view>
			</view>
		</view>
		<view class="entery">
			<view class="entery-item">
				<image src="../../static/main/main_shooping.png"></image>
				<view class="entery-text">商超便利</view>
			</view>
			<view class="entery-item">
				<image src="../../static/main/main_fruits.png"></image>
				<view class="entery-text">水果</view>
			</view>
			<view class="entery-item">
				<image src="../../static/main/main_water_check.png"></image>
				<view class="entery-text">水质检测</view>
			</view>
			<view class="entery-item">
				<image src="../../static/main/main_water.png"></image>
				<view class="entery-text">桶装水</view>
			</view>
			<view class="entery-item">
				<image src="../../static/main/main_dinner.png"></image>
				<view class="entery-text">夜宵</view>
			</view>
		</view>
		<view class="shop-info-wrapper" v-for="(shop, index) in shops" :key="index">
			<view class="shop-info" @click="goShop(shop)">
				<image :src="shop.imageUrl" class="shop-img"></image>
				<view class="shop-info-middle">
					<view class="shop-name">{{shop.name}}</view>
					<view class="shop-details">
						<view class="shop-score">
							<image src="../../static/main/star_icon.png"></image>
							<view class="shop-score-text">{{shop.score}}</view>
						</view>
						<view class="shop-sales-volume">月售{{shop.soldAmount}}</view>
					</view>
					<view class="distribution-num">起送¥20</view>
				</view>
				<view class="shop-info-right">
					<view class="distribution-gap">666m</view>
					<view class="distribution-time">30分钟</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import amap from '@/common/amap-wx.js';

	export default {
		data() {
			return {
				amapPlugin: null,
				key: '72239a17febe0f534f11c5b1fbd8ce4c',
				addressName: '获取中...',
			}
		},
		methods: {
			...mapActions({
				fetchBanners: 'main/banners', // 将 `this.fetchShops()` 映射为 `this.$store.dispatch('fetchShops')`
				fetchShops: 'main/bearByShops'
			}),
			getNearShops() {
				const params = {
					latitude: '20.111111',
					longitude: '113.09091',
					page: 1,
					pageSize: 10
				}
				this.fetchShops(params);
			},
			getBanner() {
				const params = {
					latitude: '20.111111',
					longitude: '113.09091'
				}
				this.fetchBanners(params);
			},
			gotoConfirmOrder() {
				uni.navigateTo({
					url: "../order/makeSureOrder/MakeSureOrder"
				})
			},
			gotoAddAddress() {
				uni.navigateTo({
					url: "../address/addAddress"
				})
			},
			gotoAddresslist() {
				uni.navigateTo({
					url: "../address/chooseAddress"
				})
			},
			goSearch() {
				uni.navigateTo({
					url: "../HM-search/HM-search"
				})
			},
			goShop(shop) {
				console.log(shop);
				uni.navigateTo({
					url: "shop/shop?shopId=" + shop.id
				})
			},
			getRegeo() {
				var that = this;
				uni.showLoading({
					title: '获取信息中.'
				});
				this.amapPlugin.getRegeo({
					success: (data) => {
						console.log(data)
						that.addressName = data[0].name;
						console.log("addressName ", that.addressName)
						uni.hideLoading();
					},
					fail: e => {
						uni.hideLoading();
						console.log(e)
					}
				});
			}
		},
		computed: {
			...mapState(['forcedLogin', 'hasLogin', 'userName']),
			banners() {
				return this.$store.state.main.banners
			},
			shops() {
				return this.$store.state.main.shops
			}
		},
		onLoad() {
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			});
			if (!this.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					/**
					 * 如果需要强制登录，不显示取消按钮
					 */
					showCancel: !this.forcedLogin,
					success: (res) => {
						if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/enter'
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					}
				});
			}
			this.getRegeo();
			this.getBanner();
			this.getNearShops();
		}
	}
</script>

<style lang="less">
	.content {
		.header {
			// height: 86upx;
			background-color: #fff;

			.address-wrapper {
				display: flex;
				flex-direction: row;
				align-items: center;

				.address {
					font-size: 28upx;
					font-family: PingFangSC-Medium;
					font-weight: 500;
					color: rgba(0, 0, 0, 1);
				}
			}

			.search-wrapper {
				.search-box {
					margin: 0 5%;
					width: 90%;
					height: 80upx;
					background-color: #fff;
					border-radius: 23px;
					border: 1upx solid rgba(124, 167, 210, 1);
					line-height: 80upx;
					text-align: center;

					.label {
						height: 80upx;
						font-size: 28upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(124, 167, 210, 1);
						line-height: 80upx;
					}
				}
			}
		}

		.banner {
			height: 320upx;
			margin-top: 12upx;

			.swiper-item {
				width: 100%;
				height: 100%;
			}
		}

		.entery {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;

			.entery-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				// margin-top: 36upx;

				image {
					width: 72upx;
					height: 72upx;
				}

				.entery-text {
					color: #000;
					font-size: 22upx;
					margin-top: 12upx
				}
			}
		}

		.shop-info {
			width: 100%;
			display: flex;
			flex-direction: row;
			margin-top: 30upx;

			.shop-img {
				width: 148upx;
				height: 112upx;
				border-radius: 8upx;
			}

			.shop-info-middle {
				width: 56%;
				height: 112upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 14upx;

				.shop-name {
					color: #2E2E2E;
					font-size: 30upx;
				}

				.shop-details {
					display: flex;
					flex-direction: row;
					align-items: center;
				}

				.shop-score {
					display: flex;
					flex-direction: row;
				}

				.shop-sales-volume {
					font-size: 20upx;
					color: #999;
					margin-left: 16upx;
				}

				.shop-score {
					image {
						width: 22upx;
						height: 20upx;
						margin-top: 7upx;
					}
				}

				.shop-score {
					.shop-score-text {
						font-size: 20upx;
						color: #FEA100;
					}
				}

				.distribution-num {
					font-size: 20upx;
					color: #999;
				}
			}

			.shop-info-right {
				width: 150upx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.distribution-gap {
					color: #676561;
					font-size: 20upx;
				}

				.distribution-time {
					color: #7CA7D2;
					font-size: 20upx;
				}
			}
		}
	}
</style>

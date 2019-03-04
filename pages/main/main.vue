<template>
	<view class="content">
		<view class="header">
			<view class="address-wrapper">
				<view class="address-icon"></view>
				<view class="address">{{location.name}}</view>
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
					<swiper class="swiper" circular="true" indicator-dots="true" autoplay="true" interval="3000" duration="500"
					 indicator-color="#2ca2f9" indicator-active-color="#d1c90e">
						<block v-for="(banner,index) in banners" :key="index">
							<swiper-item>
								<image v-bind:src="bannerIcon" class="swiper-item" mode="scaleToFill"></image>
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
	import service from "../../service.js"

	export default {
		data() {
			return {
				"bannerIcon":'http://qnimage.xiteng.com/home_banner.png'
			}
		},
		methods: {
			...mapActions({
				fetchBanners: 'main/banners', // 将 `this.fetchShops()` 映射为 `this.$store.dispatch('fetchShops')`
				fetchShops: 'main/nearByShops'
			}),
			getNearShops() {
				const params = {
					latitude: this.location.latitude,
					longitude: this.location.longitude,
					page: 1,
					pageSize: 10
				}
				this.fetchShops(params);
			},
			getBanner() {
				const params = {
					latitude: this.location.latitude,
					longitude: this.location.longitude,
				}
				this.$store.dispatch("main/banners", params)
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
			getRegeo(cb) {
				this.$store.dispatch('startLocate',cb);
			}
		},
		computed: {
			...mapState(['forcedLogin', 'hasLogin', 'userName','location']),
			banners() {
				return this.$store.state.main.banners
			},
			shops() {
				return this.$store.state.main.shops
			}
		},
		onLoad() {
			const userInfo = service.getInfo();
			if(userInfo){
				console.log('getInfo ',userInfo)
				this.$store.commit("setUserInfo",userInfo);
				this.$store.commit("setLogin",true);
			}
			if (!this.hasLogin) {
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/enter'
					});
				} else {
					uni.navigateTo({
						url: '../login/enter'
					});
				}
			}
			this.getRegeo(()=>{
				this.getBanner();
				this.getNearShops();
			});
		}
	}
</script>

<style lang="less">
	.content {
		.header {
			padding: 20upx;
			// height: 86upx;
			background-color: #fff;

			.address-wrapper {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding-bottom: 20upx;
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
			padding: 0 20upx;
			box-sizing: border-box;
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

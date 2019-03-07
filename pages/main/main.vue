<template>
	<view class="content">
		<view class="search_container">
			<view class="address-wrapper">
				<view class="address">{{location.name}}</view>
				<uni-icon type="arrowdown" size="20" color="#ffffff"></uni-icon>
			</view>
			<view class="search-wrapper" @click="goSearch">
				<view class="search-box" >
					<image src="../../static/img/search_home.png" class="search_home_icon"></image>
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
				<image src="../../static/main/main_shooping.png" mode="widthFix" ></image>
				<view class="entery-text">商超便利</view>
			</view>
			<view class="entery-item">
				<image src="../../static/main/main_fruits.png" mode="widthFix" ></image>
				<view class="entery-text">水果</view>
			</view>
			<view class="entery-item">
				<image src="../../static/main/main_water_check.png" mode="widthFix" ></image>
				<view class="entery-text">水质检测</view>
			</view>
			<view class="entery-item">
				<image src="../../static/main/main_water.png" mode="widthFix"></image>
				<view class="entery-text">桶装水</view>
			</view>
			<view class="entery-item">
				<image src="../../static/main/main_dinner.png" mode="widthFix"></image>
				<view class="entery-text">夜宵</view>
			</view>
		</view>
		<image src="../../static/main/home_commend.png" class="home_commend_icon"></image>
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
	import uniIcon from "@/components/uni-icon/uni-icon.vue"

	export default {
		components:{
			uniIcon
		},
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
		position: relative;
		.search_container{
			z-index: 999;
			display: flex;
			flex-direction: row;
			align-items: center;
			position: absolute;
			top: 0;
			padding: 30upx 32upx;
			box-sizing: border-box;
			width: 100%;
			background-color: transparent;
			.address-wrapper {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-right: 10upx;
				// padding-bottom: 20upx;
				.address {
					font-size: 28upx;
					font-family: PingFangSC-Medium;
					font-weight: 500;
					color: #FEFEFE;
				}
			}
			.search-wrapper {
				display: flex;
				flex: 1;
				background-color: rgba(255, 255, 255, 0.5);
				border-radius: 40px;
				.search-box {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin: 0 5%;
					height: 60upx;
					line-height: 60upx;
					text-align: center;
				
					.search_home_icon{
						width: 30upx;
						height: 30upx;
						margin-right: 18upx;
					}
					.label {
						height: 60upx;
						font-size: 28upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: #666666;
						line-height: 60upx;
					}
				}
			}
		}
		.banner {
			height: 461upx;
			background-color: #e6454a;
			.swiper{
				width: 100%;
				height: 461upx;
				.swiper-item {
					width: 100%;
					height: 461upx;
				}
			}
			
		}
		.home_commend_icon{
			width: 341upx;
			height: 42upx;
			align-self: center;
		}

		.entery {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			padding: 66upx 25upx 71upx 25upx;
			box-sizing: border-box;
			.entery-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				// margin-top: 36upx;

				image {
					width: 55upx;
					height: 55upx;
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
				width: 132upx;
				height: 132upx;
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

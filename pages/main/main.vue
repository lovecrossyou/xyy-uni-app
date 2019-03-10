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
					 indicator-color="#2ca2f9" indicator-active-color="#FFFFFF">
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
		<view class="sort-container">
			<view class="sort-composite">
				<view class="sort-title">综合排序</view> 
				<image src="../../static/main/sort_downarrow.png"></image>
			</view>
			<view class="sort-space">
				<view class="sort-title">距离最近</view> 
			</view>
			<view class="sort-sift">
				<view class="sort-title">筛选</view> 
				<image src="../../static/main/sort_sift_icon.png"></image>
			</view>
		</view>
		<view class="shop-info-wrapper" v-for="(shop, index) in shops" :key="index">
			
			<view class="shop-info" @click="goShop(shop)">
				<image :src="shop.imageUrl" class="shop-img"></image>
				<view class="shop-info-middle">
					<view class="shop-name">{{shop.name}}</view>
					<view class="shop-details">
						<view class="shop-score">
							<uniRate disabled="true" value="3.5" size="12"></uniRate>
							<view class="shop-score-text">{{shop.score}}</view>
						</view>
						<view class="shop-sales-volume">月售{{shop.soldAmount}}</view>
					</view>
					<view class="shop-middle-bottom">
						<view class="distribution-num">
							¥20起送 | 免费配送
						</view>
						<view class="distribution-num-r">
							1200m | 40分钟
						</view>
					</view>
					
				</view>
			</view>
			
			<view class="shop_info_line"></view>
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
	import uniRate from "@/components/uni-rate/uni-rate.vue";

	export default {
		components:{
			uniIcon,
			uniRate
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
		onShow() {
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
	
	.row_center{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.content {
		position: relative;
		width: 100%;
		overflow-x: hidden;
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
					width: 66upx;
					height: 66upx;
				}

				.entery-text {
					color: #000;
					font-size: 22upx;
					margin-top: 12upx
				}
			}
		}
		.sort-container{
			.row_center;
			margin-top: 20upx;
			width: 100%;
			.sort-title{
				font-size:28px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(102,102,102,1);
			}
			.sort-composite{
				.row_center;
				flex: 1;
				height: 60upx;

				image{
					width: 14upx;
					height: 8upx;
					margin-left: 10upx;
				}
			}
			.sort-space{
				.row_center;
				flex: 1;
				height: 60upx;

			}
			.sort-sift{
				.row_center;
				flex: 1;
				height: 60upx;

				image{
					width: 20upx;
					height: 18upx;
					margin-left: 10upx;
				}
			}

			
		}
		.shop-info-wrapper{
			.shop-info {
				padding: 30upx 30upx 0 30upx;
				box-sizing: border-box;
				width: 100%;
				display: flex;
				flex-direction: row;
				.shop-img {
					width: 132upx;
					height: 132upx;
				}
				.shop-info-middle {
					height: 132upx;
					display: flex;
					flex: 1;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 30upx;
			
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
			
							font-size:24px;
							font-family:PingFangSC-Regular;
							font-weight:400;
							color:rgba(136,136,136,1);
							line-height:24px;
							margin: 0 8upx 0 15upx;
						}
					}
					
					.shop-middle-bottom{
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-between;
						.distribution-num{
							height:26px;
							font-size:22px;
							font-family:PingFangSC-Regular;
							font-weight:400;
							color:rgba(136,136,136,1);
							line-height:26px;
						}
						.distribution-num-r{
							height:26px;
							font-size:22px;
							font-family:PingFangSC-Regular;
							font-weight:400;
							color:rgba(136,136,136,1);
							line-height:26px;
							margin-bottom: 5upx;
						}
					}
				}
			}
			.shop_info_line{
				width: 100%;
				height: 1upx;
				margin-top: 30upx;
				margin-left: 30upx;
				background-color: #D4D4D4;
			
			}
		}
		
	}
</style>

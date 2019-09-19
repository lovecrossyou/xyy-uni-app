<template>
	<view class="content">
		<view class="search_container">
			<view class="address-wrapper">
				<view class="address">{{addrName}}</view>
				<uni-icon type="arrowdown" size="20" color="#ffffff"></uni-icon>
			</view>
			<view class="search-wrapper" @click="goSearch">
				<view class="search-box">
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
					<swiper class="swiper" autoplay="true" interval="3000" duration="500" indicator-color="#2ca2f9"
					 indicator-active-color="#FFFFFF">
						<block v-for="(banner,index) in banners" :key="index">
							<swiper-item>
								<view class="banner-wrapper">
									<image v-bind:src="banner.image" class="swiper-item" mode="widthFix"></image>
									<!-- <view class="banner-footer">
									</view>
									<view class="banner-footer-text">
										{{banner.desc}}
									</view> -->
								</view>
							</swiper-item>
						</block>
					</swiper>

				</view>
			</view>
		</view>
		<uni-notice-bar show-icon="true" scrollable="true" single="true" text="北京市桶装饮用水销售行业协会有怡宝员工 老百姓最关心的是质量问题，而非标示">
		</uni-notice-bar>

		<!-- <image src="../../static/main/home_commend.png" class="home_commend_icon"></image> -->
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
		<view class="shop-info-wrapper" v-for="(shop, index) in shopListArr" :key="index">
			<view class="shop-info" @click="goShop(shop)">
				<image :src="shop.image_path" class="shop-img"></image>
				<view class="shop-info-middle">
					<view class="shop-name">{{shop.name}}</view>
					<view class="shop-details">
						<view class="shop-score">
							<uniRate disabled="true" :value="shop.rating" size="12"></uniRate>
							<view class="shop-score-text">{{shop.rating}}</view>
						</view>
						<view class="shop-sales-volume"></view>
					</view>
					<view class="shop-middle-bottom">
						<view class="distribution-num">
							{{shop.address}}
						</view>
						<view class="distribution-num-r">
							{{shop.distance}}
						</view>
					</view>
				</view>
			</view>
			<view class="shop_info_line"></view>
		</view>

		<uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction"
		 @trigger="trigger"></uni-fab>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import amap from '@/common/amap-wx.js';
	import service from "../../service.js"
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import uniRate from "@/components/uni-rate/uni-rate.vue";
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	import uniNoticeBar from "@/components/uni-notice-bar/uni-notice-bar.vue"
	import {
		uniSwiperDot
	} from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	import {
		shopList,
		msiteAddress,
		msiteFoodTypes,
		cityGuess
	} from "@/util/service/getData.js"

	export default {
		components: {
			uniIcon,
			uniRate,
			uniFab,
			uniSwiperDot,
			uniNoticeBar
		},
		data() {
			return {
				info: [{
					content: '内容 A'
				}, {
					content: '内容 B'
				}, {
					content: '内容 C'
				}],
				current: 0,
				mode: 'long',
				horizontal: 'left',
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: "#007AFF"
				},
				content: [{
					iconPath: '/static/report.png',
					selectedIconPath: '/static/report.png',
					text: '举报',
					active: false
				}],
				key: '72239a17febe0f534f11c5b1fbd8ce4c',
				banners: [{
					image: 'http://qnimage.xiteng.com/water_search_banner.jpeg',
					desc: '北京市桶装饮用水销售行业协会'
				}],
				offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
				shopListArr: [], // 店铺列表数据
				preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			}
		},
		methods: {
			...mapMutations(['RECORD_ADDRESS']),
			...mapActions([
				'getUserInfo'
			]),
			async fetchShops() {
				//获取数据
				let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
				this.shopListArr = res;
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
					url: "/pages/HM-search/HM-search"
				})
			},
			goShop(shop) {
				uni.navigateTo({
					url: "shop/shop?shopId=" + shop.id
				})
			},
			waterDetection() {
				uni.navigateTo({
					url: "../waterDetection/waterDetection"
				})
			},
			getRegeo(cb) {
				uni.showLoading({
					title: '获取信息中'
				});
				this.amapPlugin.getRegeo({
					success: (data) => {
						console.log(data)
						this.addressName = data[0].name;
						uni.hideLoading();
						cb(data[0]);
					}
				});
			},
			trigger(e) {
				//举报
				uni.navigateTo({
					url: "/pages/uni-feedback/uni-feedback?id=0"
				})
			}

		},
		computed: {
			...mapState([
				'latitude', 'longitude', 'userInfo', 'addrName'
			]),
		},
		async onShow() {
			//获取用户信息
			const res = await this.getUserInfo();
			if (this.userInfo === null) {
				uni.navigateTo({
					url: "/pages/login/enter"
				})
			}
		},
		onLoad() {
			let that = this;
			this.amapPlugin = new amap.AMapWX({
				key: this.key
			});
			this.getRegeo(data => {
				that.RECORD_ADDRESS(data);
				that.fetchShops();
			});
		}
	}
</script>

<style lang="less">
	.row_center {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.content {
		position: relative;
		width: 100%;
		overflow-x: hidden;

		.search_container {
			z-index: 999;
			display: flex;
			flex-direction: row;
			align-items: center;
			// position: absolute;
			// top: 0;
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
					// color: #FEFEFE;
				}
			}

			.search-wrapper {
				display: flex;
				flex: 1;
				background-color: #e1e1e1;

				border-radius: 40px;

				.search-box {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin: 0 5%;
					height: 60upx;
					line-height: 60upx;
					text-align: center;

					.search_home_icon {
						width: 30upx;
						height: 30upx;
						margin-right: 18upx;
					}

					.label {
						height: 60upx;
						font-size: 28upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: #333;
						line-height: 60upx;
					}
				}
			}
		}

		.banner {
			height: 240upx;

			.swiper {
				width: 100%;
				height: 240upx;

				.banner-wrapper {
					position: relative;
					height: 240upx;

					.banner-footer {
						position: absolute;
						bottom: 0;
						left: 0;
						right: 0;
						height: 66upx;
						background-color: #333;
						opacity: .5;

					}

					.banner-footer-text {
						position: absolute;
						bottom: 0;
						left: 0;
						right: 0;
						height: 66upx;
						color: #f1f1f1;
						text-align: center;
						line-height: 66upx;
						font-size: 24upx;
					}
				}


				.swiper-item {
					width: 100%;
					height: 240upx;
				}
			}

		}

		.home_commend_icon {
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

		.sort-container {
			.row_center;
			margin-top: 20upx;
			width: 100%;

			.sort-title {
				font-size: 28px;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
			}

			.sort-composite {
				.row_center;
				flex: 1;
				height: 60upx;

				image {
					width: 14upx;
					height: 8upx;
					margin-left: 10upx;
				}
			}

			.sort-space {
				.row_center;
				flex: 1;
				height: 60upx;

			}

			.sort-sift {
				.row_center;
				flex: 1;
				height: 60upx;

				image {
					width: 20upx;
					height: 18upx;
					margin-left: 10upx;
				}
			}


		}

		.shop-info-wrapper {
			.shop-info {
				padding: 30upx 30upx 0 30upx;
				box-sizing: border-box;
				width: 100%;
				display: flex;
				flex-direction: row;

				.shop-img {
					width: 132upx;
					height: 132upx;
					border: solid 1rpx #f1f1f1;
				}

				.shop-info-middle {
					height: 132upx;
					display: flex;
					flex: 1;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 30upx;

					.shop-name {
						font-size: 30upx;
						font-family: PingFangSC-Medium;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
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
						font-size: 24upx;
						color: #888;
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
							font-size: 24upx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: #888;
							margin: 0 8upx 0 15upx;
						}
					}

					.shop-middle-bottom {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: space-between;

						.distribution-num {
							height: 26px;
							font-size: 22px;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: rgba(136, 136, 136, 1);
							line-height: 26px;
						}

						.distribution-num-r {
							height: 26px;
							font-size: 22px;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: rgba(136, 136, 136, 1);
							line-height: 26px;
							margin-bottom: 5upx;
						}
					}
				}
			}

			.shop_info_line {
				width: 100%;
				height: 1upx;
				margin-top: 30upx;
				margin-left: 30upx;
				background-color: #D4D4D4;

			}
		}

	}
</style>

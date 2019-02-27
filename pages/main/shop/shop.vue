<template>
	<view class="content">
		<view class="shop-header">
			<view class="left">
				<view class="shop-logo">
					<image src="../../../static/main/avatar.png" mode="aspectFill"></image>
				</view>
				<view class="shop-info">
					<block v-if="shop">
						<view class="name">{{shop.info.name}}</view>
						<view class="score-wrapper">
							<view class="score">评分{{shop.info.score}}</view>
							<view class="saleinfo">月售{{shop.info.soldAmount}}单</view>
						</view>
					</block>
				</view>
			</view>
			<view class="right">
				<image class="share" src="../../../static/main/share.png" mode="aspectFit"></image>
				<image class="fav" src="../../../static/main/favourite.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="shop-content">
			<view class="tab-wrapper">
				<view v-for="(tab,index) in tabs" :key='index'>
					<view class="tab-item" @click="changeTab(index)">
						<view class="line" v-if="tab.index===activeTabIndex" />
						<view class="title">
							{{tab.title}}
						</view>
					</view>
				</view>
			</view>
			<swiper class="swiper" :current="activeTabIndex" :autoplay="false" @change="swiperChange">
				<block v-if="shop">
					<swiper-item>
						<goods :products="shop.products"></goods>
					</swiper-item>
				</block>
				<swiper-item>
					<judgement :judgementData="judgementData"></judgement>
				</swiper-item>
				<block v-if="shop">
					<swiper-item>
						<shop-info :shopInfo="shop"></shop-info>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<view class="footer">
			<view class="cart-wrapper">
				<image v-bind:src="cart_icon" mode="aspectFit"></image>
			</view>
			<view class="confirm-wrapper">
				<view class="limit">
					¥20起送
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import judgement from "./judgement.vue";
	import shopInfo from "./shop-info.vue";
	import goods from "./goods";
	import {
		getReqest
	} from '@/util/network.js'
	export default {
		data() {
			return {
				tabs: [{
						title: '购物',
						index: 0
					},
					{
						title: '评价',
						index: 1
					},
					{
						title: '商家',
						index: 2
					}
				],
				activeTabIndex: 0,
				cart_icon: '../../../static/shop/cart.png',
				shop: null,
				judgementData: {
					content: []
				}
			};
		},
		components: {
			judgement,
			shopInfo,
			goods
		},
		methods: {
			changeTab(index) {
				this.activeTabIndex = index;
			},
			swiperChange(e) {
				this.activeTabIndex = e.detail.current;
			},
			initShop(shopId) {
				const that = this;
				getReqest('shop/shopInfo/13', {}, res => {
					that.shop = res;
				})
			},
			initJudgement(shopId) {
				const that = this;
				getReqest('shop/comments', {
					"shopId": 13
				}, res => {
					that.judgementData = res;
				})
			}
		},
		onLoad: function(option) {
			console.log('shopId ', option)
			this.initShop(option.shopId)
			this.initJudgement(option.shopId)
		}
	}
</script>

<style lang="less">
	@footerHeight: 98upx;

	.content {
		padding: 0;
		margin: 0;
		position: relative;

		.shop-header {
			padding: 0 24upx;
			height: 192upx;
			background-color: #fff;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.left {
				display: flex;
				flex-direction: row;

				.shop-logo {
					background-color: #333333;

					image {
						width: 100upx;
						height: 100upx;
					}
				}

				.shop-info {
					margin-left: 20upx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;

					.name {
						color: #333333;
						font-size: 30upx;
					}

					.score-wrapper {
						display: flex;
						flex-direction: row;
						align-items: center;

						.score {
							font-size: 24upx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: #FFB30A;
						}

						.saleinfo {

							font-size: 18upx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: rgba(136, 136, 136, 1);
						}
					}
				}

			}

			.right {
				display: inline-block;

				.fav {
					width: 44upx;
					height: 38upx;
				}

				.share {
					width: 40upx;
					height: 40upx;
					margin-right: 36upx;

				}
			}
		}

		.shop-content {
			height: 100%;
			padding-bottom: @footerHeight;

			.tab-wrapper {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-around;
				background-color: #fff;
				height: 84upx;

				.tab-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					// justify-content: space-around;
					height: 84upx;
					position: relative;

					.line {
						position: absolute;
						bottom: 0;
						height: 4px;
						width: 52upx;
						background-color: #7CA7D2;
					}

					.title {
						color: #333;
						font-size: 24upx;
						line-height: 84upx;
					}
				}
			}

			.swiper {
				height: 100%;
				background-color: #fff;
			}
		}

		.footer {
			height: @footerHeight;
			background-color: #656565;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;

			.confirm-wrapper {
				width: 232upx;
				height: 100%;
				background-color: #727272;

				.limit {
					color: #fff;
					font-size: 32upx;
					line-height: @footerHeight;
					text-align: center;
				}
			}

			.cart-wrapper {
				flex: 1;
				position: relative;

				image {
					margin-left: 24upx;
					width: 110upx;
					height: 110upx;
					position: absolute;
					top: -20upx;
				}

			}
		}
	}
</style>

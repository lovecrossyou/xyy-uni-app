<template>
	<view class="content">
		<view class="shop-header">
			<view class="left">
				<view class="shop-logo">
					<image src="../../../static/main/avatar.png" mode="aspectFill"></image>
				</view>
				<view class="shop-info">
					<block v-if="shop">
						<view class="name">{{shop.info.name||""}}</view>
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
			<view class="cart-wrapper" @click="popMenu">
				<image v-bind:src="cart_icon" mode="aspectFit"></image>
				<view class="totalPrice">
					¥{{cartTotalPrice}}
				</view>
			</view>
			<view class="confirm-wrapper">
				<view class="limit" @click="toConfirmOrder">
					去结算
				</view>
			</view>
		</view>
		<view class="modal-shadow" v-show="showMenu" @click="hiddeMenu">
		</view>
		<view :animation="animationData" class="cart-modal">
			<view class="title" @click="hiddeMenu">
				<view class="left">
					已选商品
				</view>
				<view class="right">
					清空购物车
				</view>
			</view>
			<scroll-view scroll-y="true" class="cart-list-items">
				<block v-for="(product,index) in cartProducts" :key="index">
					<view class="cart-list-item">
						<view class="p-name">
							{{product.headName}}
						</view>
						<view class="right">
							<view class="price">
								¥{{product.price}}
							</view>
							<cartcontrol :food="product" @add="addFood"></cartcontrol>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	import judgement from "./judgement.vue";
	import shopInfo from "./shop-info.vue";
	import goods from "./goods";
	import cartcontrol from "./cartcontrol/cartcontrol.vue"
	import {
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'


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
				animationData: {},
				showMenu: false
			};
		},
		components: {
			judgement,
			shopInfo,
			goods,
			cartcontrol
		},
		computed: {
			...mapGetters({
				cartTotalPrice: 'cart/cartTotalPrice',
				cartProducts: 'cart/cartProducts'
			}),
			shop() {
				return this.$store.state.shop.shopInfo;
			},
			judgementData(){
				return this.$store.state.shop.comments;
			}
		},
		methods: {
			...mapActions({
				"fetchShopInfo": "shop/fetchShopInfo",
				"fetchComments": "shop/fetchComments",
			}),
			toConfirmOrder() {
				uni.navigateTo({
					url: '../../order/makeSureOrder/MakeSureOrder'
				})
			},
			popMenu() {
				var animation = uni.createAnimation({
					duration: 500,
					timingFunction: 'ease',
				})
				this.animation = animation
				animation.translateY(-200).step()
				this.animationData = animation.export()
				this.showMenu = true;
			},
			hiddeMenu() {
				var animation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease-in-out',
				})
				this.animation = animation
				animation.translateY(0).step()
				this.animationData = animation.export()
				this.showMenu = false;
			},
			changeTab(index) {
				this.activeTabIndex = index;
			},
			swiperChange(e) {
				this.activeTabIndex = e.detail.current;
			},
			initShop(shopId) {
				this.fetchShopInfo(shopId);
			},
			initJudgement(shopId) {
				var params = {
					page:1,
					pageSize:15,
					shopId:shopId
				}
				this.fetchComments(params);
			}
		},
		onLoad: function(option) {
			console.log('shopId ', option)
			var shopId = option.shopId;
			this.initShop(13)
			this.initJudgement(13)
			// this.$store.commit('cart/setShopId', shopId);
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
				background-color: #7CA7D2;

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

				.totalPrice {
					font-size: 32upx;
					color: #fff;
					margin-left: 150upx;
					line-height: @footerHeight;
					// text-align: center;
				}

			}
		}

		.modal-shadow {
			background: rgba(0, 0, 0, .5);
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
		}

		.cart-modal {
			background-color: #fff;
			height: 400upx;
			width: 100%;
			position: fixed;
			bottom: -400upx;


			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 92upx;
				padding: 0 24upx;
				box-sizing: border-box;
				border-bottom: solid #E4E4E4 2upx;

				.left {
					font-weight: 500;
					font-size: 28upx;
					color: #333;
				}

				.right {
					font-size: 24upx;
					color: #7CA7D2;
				}
			}

			.cart-list-items {
				// z-index: 11;
				height: 100%;
				padding-bottom: 92upx+24upx;
				box-sizing: border-box;

				.cart-list-item {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					padding: 0 24upx 0 34upx;
					height: 100upx;

					.title {
						font-size: 28upx;
						color: #333;
						font-weight: 400;
					}

					.right {
						// height: 100%;
						display: flex;
						flex-direction: row;
						align-items: center;

						// margin-right: 24upx;
						.price {
							// height: 100%;


							color: #E02C2C;
							font-size: 28upx;
							line-height: 100%;
						}
					}
				}
			}
		}
	}
</style>

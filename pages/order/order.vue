<template>
	<view class="shoppingcar">
		<view class="top_tab_option">
			<glanceSlideNavTabBar fontsize="14px" textcolor="#222222" activetextcolor="#3E87EB" underlinecolor="#3E87EB"
			 underlineheight="3px" underlinewidth="50px" topfixedval="0px" bgcolor="#FAFAFA" :topfixed="true" @clickitem="clickitem"
			 :data="[
					{ textcontent: '全部' },
					{ textcontent: '待付款' },
					{ textcontent: '已付款' },
					{ textcontent: '待收货' },
					{ textcontent: '待评价' }
				]"></glanceSlideNavTabBar>
		</view>
		<view v-if="orderList.length == 0" class="empty-data">
			<image src="../../static/order/order.png" class="img"></image>
			<view class="desc">您还没有相关的订单</view>
		</view>
		<view class="shopitem" v-for="(shop, index) in orderList" :key="index" @click.stop="toOrderDetail(shop)">
			<view class="shop_header">
				<view class="order_shop_name" @click.stop="toShop(shop)">
					<image src="../../static/img/order_shop_icon.png"></image>
					<view class="header-text">{{ shop.restaurant_name }}</view>
				</view>
				<view class="order_status_des">{{ shop.status_bar.title }}</view>
			</view>
			<!-- <view class="shop_content" v-for="(product, indexP) in shop.basket.group[0]" :key="indexP" :id="product.id">
				<view class="product_container" @click.stop="toOrderDetail(shop.orderNo)">
					<image :src="product.productImage"></image>
					<view class="product_info">
						<view class="product_name">{{ product.name }}</view>
						<view class="product_price">￥{{ product.price }}</view>
					</view>
				</view>
				<view v-if="indexP < shop.items.length - 1" class="space_line"></view>
			</view> -->
			<view class="shop_footer">
				<view class="price_info">
					{{shop.basket.group[0][0].name}} 共{{shop.basket.group[0].length}}件商品
				</view>
				<view class="opt_info">
					<view class="btn-one-more-order" @click.stop="oneMoreOrder">
						再来一单
					</view>
					<view class="btn-juegement" @click.stop="judge">
						评价
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import glanceSlideNavTabBar from '@/components/order/glance-SlideNavTabBar.vue';
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import orderApi from '@/util/apis/order.js';
	    import {getOrderList} from '@/util/service/getData'

	    import {mapState, mapMutations} from 'vuex'

	export default {
		onShow() {
			this.initData();
		},
		data() {
			return {
				orders: [],
				orderList: [], //订单列表
				offset: 0, 
			};
		},
		computed: {
            ...mapState([
                'userInfo', 'geohash'
            ]),
        },
        methods: {
             ...mapMutations([
               'SAVE_ORDER'
            ]),
            //初始化获取信息
            async initData(){
                if (this.userInfo && this.userInfo.user_id) {
                    let res = await getOrderList(this.userInfo.user_id, this.offset);
                    this.orderList = [...res];
                }
            },
			oneMoreOrder(){
				
			},
			judge(){
				
			},
			// 删除商品
			deletePro() {
				uni.showToast({
					icon: 'none',
					title: '删除'
				});
			},
			toShop(item) {
				uni.navigateTo({
					url: '/pages/main/shop/shop?shopId=' + item.restaurant_id
				});
			},
			toOrderDetail(item) {
				this.SAVE_ORDER(item);
				uni.navigateTo({
					url: './orderDetail/OrderDetail'
				});
			}
		},
		components: {
			uniIcon,
			glanceSlideNavTabBar
		},
		
	};
</script>

<style lang="less" scoped>
	.top_tab_option {
		width: 100%;
	}

	.empty-data {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;

		.img {
			margin-top: 224upx;
			width: 218upx;
			height: 218upx;
		}

		.desc {
			margin-top: 42upx;
			color: #666;
			font-size: 30upx;
		}
	}

	.numInput {
		overflow: hidden;
		float: right;

		text {
			float: left;
			color: #999;
			font-size: 22upx;
			line-height: 50upx;
		}

		input {
			display: inline-block;
			width: 80upx;
			float: left;
			text-align: center;
			color: #999;
		}

		.numbox-disabled {
			color: #c0c0c0;
		}
	}

	.shoppingcar {
		background-color: #f2f2f2;
		width: 100%;

		.shopitem {
			margin: 14upx 20upx;
			border-radius: 10upx;
			background-color: #ffffff;

			.shop_header {
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 19upx;
				box-sizing: border-box;
				justify-content: space-between;
				border-bottom: 1upx #e0e0e0 solid;

				.order_shop_name {
					display: flex;
					flex-direction: row;
					align-items: center;

					image {
						width: 34upx;
						height: 30upx;
						margin-right: 20upx;
					}

					.header-text {
						font-size: 28px;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(34, 34, 34, 1);
					}
				}

				.order_status_des {
					font-size: 28px;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(62, 135, 235, 1);
				}
			}

			.shop_content {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 20upx;
				box-sizing: border-box;
				width: 100%;
				position: relative;

				.space_line {
					position: absolute;
					bottom: 1upx;
					width: calc(100% - 40upx);
					height: 1upx;
					background-color: #e0e0e0;
				}

				.product_container {
					display: flex;
					flex-direction: row;
					align-items: center;
					width: 100%;

					image {
						width: 140upx;
						height: 140upx;
					}

					.product_info {
						display: flex;
						flex: 1;
						height: 140upx;
						flex-direction: row;
						align-items: center;
						justify-content: space-between;
						margin-left: 20upx;

						.product_name {
							font-size: 26px;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: rgba(51, 51, 51, 1);
						}

						.product_price {
							font-size: 26px;
							margin-right: 18upx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: rgba(34, 34, 34, 1);
						}
					}
				}
			}

			.shop_footer {
				height: 182upx;
				// background-color: #666;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				align-items: flex-end;
				padding-right: 18upx;
				box-sizing: border-box;

				.price_info {
					font-size: 26upx;
					color: #444444;
					text-align: right;
				}

				.opt_info {
					margin-top: 30upx;
					font-size: 26upx;
					color: #444444;
					display: flex;
					flex-direction: row;
					justify-content: flex-end;
					padding-bottom: 40upx;
					box-sizing: border-box;

					.btn-one-more-order {
						width: 160upx;
						height: 60upx;
						border: 1upx solid rgba(187, 187, 187, 1);
						border-radius: 30upx;
						text-align: center;
						line-height: 60upx;
						margin-right: 20upx;
					}

					.btn-juegement {
						width: 120upx;
						height: 60upx;
						border: 1upx solid rgba(187, 187, 187, 1);
						border-radius: 30upx;
						text-align: center;
						line-height: 60upx;
					}
				}
			}
		}
	}
</style>

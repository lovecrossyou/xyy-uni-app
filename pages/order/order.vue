<template>
	<view class="content">
		<view class="order-list" v-for="(order,index) in orders" :key='index'>
			<view class="order" v-for="(subOrder,s_index) in order.products" :key='s_index'>
				<view class="shop-info" v-on:click="goOrderDetail">
					<view class="left">
						<view class="icon">
							<image :src="subOrder.src" mode="aspectFit"></image>
						</view>
						<view class="name">
							鑫源水站(安贞桥)
						</view>
					</view>
					<view class="order-status">
						商家已接单
					</view>
				</view>
				<view class="p-info">
					<view class="p-name">
						农夫山泉
					</view>
					<view class="p-price">
						¥15.00
					</view>
				</view>
			</view>
			<view class="footer">
				<view class="more-order">
					再来一单
				</view>
				<view class="judgement">
					去评价
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
				orders: [{
					products: [{
						src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
					}, {
						src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
					}, {
						src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
					}]
				}]
			};
		},
		methods:{
			goOrderDetail(){
				uni.navigateTo({
					url: "orderDetail/OrderDetail"
				})
			}
		}
		
	}
</script>

<style lang="less">
	@shop_icon: 54upx;

	.content {
		padding: 20upx;
		.order-list {
			.order {
				height: 168upx;
				display: flex;
				flex-direction: column;

				.shop-info {
					display: flex;
					flex-direction: row;
					justify-content: space-between;

					.left {
						display: flex;
						flex-direction: row;
						// align-items: center;

						.icon {
							image {
								height: @shop_icon;
								width: @shop_icon;
								margin-right: 16upx;
								border: solid 2upx #e1e1e1;
							}
						}

						.name {
							color: #333;
							font-size: 28upx;
						}
					}

					.order-status {
						color: #333;
						font-size: 24upx;
					}
				}

				.p-info {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					padding-left: @shop_icon+20upx;

					.p-name {
						color: #666;
						font-size: 24upx;
					}

					.p-price {
						color: #333;
						font-size: 28upx;
					}
				}
			}

			.footer {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				padding: 5upx 0;
				margin-bottom: 30upx;

				.more-order {
					width: 136upx;
					height: 48upx;
					color: #7CA7D2;
					font-size: 24upx;
					border-radius: 6upx;
					border: 2upx solid rgba(112, 168, 213, 1);
					text-align: center;
					line-height: 48upx;
					margin-right: 20upx;
				}

				.judgement {
					width: 136upx;
					height: 48upx;
					color: #FD6B62;
					font-size: 24upx;
					border-radius: 6upx;
					border: 1px solid rgba(248, 113, 105, 1);
					text-align: center;
					line-height: 48upx;
					margin-right: 20upx;
				}
			}
		}
	}
</style>

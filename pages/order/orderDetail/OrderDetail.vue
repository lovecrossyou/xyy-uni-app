<template>
	<view class="detail">
		<view v-show="!isLoading">
			<OrderDetailHeader :orderInfo="orderDetailData" @orderAction="orderAction" />
			<view class="content_detail">
				<view class="item">
					<view class="img">
						<image :src="orderDetailData.shopImage" class="img"></image>
					</view>
					<view class="text">{{orderDetailData.shopName}}</view>
				</view>
				<view v-for="foodData in orderDetailData.productItems" :key="foodData.id">
					<view class="item">
						<view class="text">{{foodData.productName}}</view>
						<view class="num">x{{foodData.quantity}}</view>
						<view class="price">¥{{foodData.productPrice/100}}</view>
					</view>
				</view>
				<view class="item">
					<view class="text">配送费</view>
					<view class="price">¥{{orderDetailData.deliveryFee/100}}</view>
				</view>
				<view v-for="(extraData,index) in extra" :key="index">
					<view class="item">
						<view class="text">{{extraData.name}}</view>
						<view class="price">- ¥{{extraData.price/100}}</view>
					</view>
				</view>
				<view class="totoal">实付 ¥{{orderDetailData.price/100}}</view>
			</view>

			<view class="info">
				<view class="title">配送信息</view>
				<view class="desc">
					<view class="item">
						<view class="label">送达时间</view>
						<view class="text">{{orderDetailData.needDeliverTime}}</view>
					</view>
					<view class="item">
						<view class="label">送货地址</view>
						<view class="text">{{orderDetailData.fullAddress}}<br />{{orderDetailData.phone}}<br />{{orderDetailData.address}}</view>
					</view>
					<view class="item">
						<view class="label">配送方式</view>
						<view class="text">{{desc.delivery_company||''}}</view>
					</view>
					<!-- <view class="item">
						<view class="label">配送骑手</view>
						<view class="text">{{desc.rider_name}},{{desc.rider_phone}}</view>
					</view> -->
				</view>
			</view>
			<view class="info">
				<view class="title">订单信息</view>
				<view class="desc">
					<view class="item">
						<view class="label">订单号</view>
						<view class="text">{{orderDetailData.orderNo}}</view>
					</view>
					<view class="item">
						<view class="label">支付方式</view>
						<view class="text">在线支付</view>
					</view>
					<view class="item">
						<view class="label">下单时间</view>
						<view class="text">{{orderDetailData.payFinishTime||orderDetailData.createTime}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import {uniCountdown} from '@dcloudio/uni-ui'
	import OrderDetailHeader from "../components/OrderDetailHeader.vue"
	import orderApi from "@/util/apis/order.js"


	export default {
		components: {
			OrderDetailHeader
		},
		data() {
			return {
				src: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg",
				orders: [],
				orderDetailData: {
					orderStatus: ''
				},
				isLoading: true,
				food: [],
				extra: [],
				desc: {
					"delivery_company": "--",
					"delivery_type": "",
					"has_distribution_info": 0,
					"is_position_valid": 0,
					"is_rider_valid": 0
				},
			};
		},
		onLoad(option) {
			this.orderNo = option.orderNo;
			this.getData();
		},
		computed: {
			getfoodKey: function(index) {
				return index + "food"
			}
		},
		onPullDownRefresh() {
			this.getData();
		},
		methods: {
			goOrderDetail() {
				uni.navigateTo({
					url: "orderDetail/OrderDetail"
				});
			},
			orderAction(type) {
				// type 1继续支付  2去评价  3再来一单 4催单
				let showMessage = "";
				switch (type) {
					case "1":
						const orderInfo = {
							orderNo: this.orderNo
						}
						this.$store.dispatch('pay/startPay', orderInfo);
						showMessage = "取消订单"
						break;
					case "2":
						showMessage = "去评价"
						break;
					case "3":
						showMessage = "再来一单"
						break;
					case "4":
						showMessage = "催单"
						break;

				}
// 				uni.showToast({
// 					icon: "none",
// 					title: showMessage
// 				})
			},
			async getData() {
				uni.showLoading({
					title: "加载中..."
				})
				const res = await orderApi.requestOrderDetail({
					orderNo: this.orderNo
				});
				if (res && res.status === 'ok') {
					this.orderDetailData = res.data;
					this.isLoading = false;
				}
				// console.log('requestOrderDetail ', res);
			}
		}
	};
</script>

<style lang="less">
	@import "../../../common/theme.less";
	@import "../../../common/mixin.less";

	.center_column {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.between_center_row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.padding_my (@top: 0, @right: 0, @buttom: 0, @left: 0) {
		box-sizing: border-box;
		padding: @arguments;
	}

	.detail {
		width: 100%;
		height: 100%;
		background-color: @fill-body-darken;

		.content_detail {
			box-sizing: border-box;
			padding: 0 20px;
			box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
			background-color: @fill-body;

			.totoal {
				padding: 12px 0;
				box-sizing: border-box;
			}

			.item {
				display: flex;
				min-height: 88px;
				align-items: center;
				border-bottom: 1px @border-color solid;

				// box-shadow: 0 1px 1px -1px @border-color;
				.img {
					width: 40px;
					height: 40px;
					border-radius: 40px;
					background-color: @fill-body-darken;
					margin-right: 20px;

					img {
						width: 100%;
						border-radius: 100%;
					}
				}

				.text {
					flex: 1;
					width: 0;
					.no-wrap;
					font-size: @font-size-medium;
					font-weight: @font-weight-small;
					line-height: 40px;
					color: @color-title;
				}

				.num,
				.price {
					text-align: right;
					font-size: @font-size-small;
					font-weight: @font-weight-small;
					line-height: 40px;
					color: @color-title;

					&.red {
						color: #ff5339;
					}
				}

				.num {
					flex: 0 0 80px;
					width: 60px;
				}

				.price {
					flex: 0 0 130px;
					width: 100px;
				}
			}

			.total {
				text-align: right;
				font-size: @font-size-large;
				color: @color-base;
				line-height: 100px;
			}
		}

		.info {
			margin-top: 30px;
			box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
			background-color: @fill-body;

			.title {
				box-sizing: border-box;
				padding: 0 30px;
				box-shadow: 0 1px 1px -1px @border-color;
				line-height: 88px;
				font-size: @font-size-medium;
				font-weight: @font-weight-small;
				color: @color-title;
			}

			.desc {
				box-sizing: border-box;
				padding-left: 30px;

				.item {
					display: flex;
					min-height: 68px;
					padding: 10px 0;
					align-items: center;
					border-bottom: 1px @border-color solid;

					.label {
						flex: 0 0 130px;
						width: 130px;
						margin-right: 20px;
						font-size: @font-size-small;
						font-weight: @font-weight-small;
						line-height: 40px;
						color: @color-title;
					}

					.text {
						flex: 1;
						width: 0;
						font-size: @font-size-small;
						font-weight: @font-weight-small;
						line-height: 40px;
						color: @color-base;
						.no-wrap;
					}
				}
			}
		}
	}
</style>

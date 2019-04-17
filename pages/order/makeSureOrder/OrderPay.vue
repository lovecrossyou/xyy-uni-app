<template>
	<view class="container">
		<view class="order_content">
			<view class="order_pay_top">
				<view class="order_pay_top_time">支付剩余时间{{remaining}}</view>
				<view class="order_pay_top_amount">¥{{orderMessage.data.total_amount}}</view>
			</view>
			<view>
				<block v-for="(channel,index) in paychannels" :key="index">
					<view class="p_option" @click="changePay(index)">
						<view class="p_option_left">
							<image v-bind:src="channel.icon" class="pay_icon">
							</image>
							<view class="p_option_title">{{channel.title}}</view>
						</view>
						<image v-if="selectIndex==index" v-bind:src="channel.selIcon" class="pay_icon_right" @click="selectIndex=index"></image>
						<image v-else v-bind:src="channel.unselIcon" class="pay_icon_right" @click="selectIndex=index"></image>
					</view>
				</block>
			</view>
		</view>
		<view class="confirm_footer" @click="confirmPay">确认支付</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	import {
		payRequest,
		wxPay,
		orderQuery
	} from '@/util/service/getData'

	export default {
		onLoad(opt) {
			//清除购物车中当前商铺的信息
			if (this.shopid) {
				this.CLEAR_CART(this.shopid);
			}
		},
		onShow() {
			this.remainingTime();
		},
		computed: {
			...mapState([
				'orderMessage', 'userInfo', 'shopid', 'cartPrice'
			]),
			//时间转换
			remaining: function() {
				let minute = parseInt(this.countNum / 60);
				if (minute < 10) {
					minute = '0' + minute;
				}
				let second = parseInt(this.countNum % 60);
				if (second < 10) {
					second = '0' + second;
				}
				return '00 : ' + minute + ' : ' + second;
			}
		},
		methods: {
			...mapMutations([
				'CONFIRM_INVOICE', 'CLEAR_CART'
			]),
			changePay(index) {
				if (index === 1) return;
				this.selectIndex = index;
			},
			//倒计时
			remainingTime() {
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					this.countNum--;
					if (this.countNum == 0) {
						clearInterval(this.timer);
						this.showAlert = true;
						this.alertText = '支付超时';
					}
				}, 1000);
			},
			//确认付款
			async confirmPay() {
				const orderNo = this.orderMessage.data.id;
				uni.showLoading({
					mask: true
				})
				let res = null;
				// #ifdef APP-PLUS
				res = await payRequest(this.userInfo.user_id, orderNo, 'APP');
				if(res){
					this.nativePay(res.data);
				}
				// #endif

				// #ifdef MP-WEIXIN
				res = await payRequest(this.userInfo.user_id, orderNo, 'MP-WEIXIN');
				if(res){
					console.log('payRequest ##', res);
					this.wxpay(res.data,orderNo);
				}
				// #endif
			},
			// 微信小程序支付
			wxpay(wexinSpec,orderNo) {
				let that = this;
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: wexinSpec.timeStamp,
					nonceStr: wexinSpec.nonceStr,
					package: wexinSpec.package,
					signType: wexinSpec.signType,
					paySign: wexinSpec.paySign,
					success: async function(res) {
						uni.hideLoading();
						const orderQueryRes = await orderQuery(orderNo);
						uni.redirectTo({
							url: "/pages/order/orderDetail/OrderDetail?orderNo=" + orderNo
						})
					},
					fail: function(err) {
						uni.hideLoading();
						uni.redirectTo({
							url: "/pages/order/orderDetail/OrderDetail?orderNo=" + orderNo
						})
					}
				});
			},

			// app支付
			nativePay(orderInfo) {
				let that = this;
				const payParams = {
					appid: orderInfo.appid,
					noncestr: orderInfo.noncestr,
					package: orderInfo.package,
					partnerid: orderInfo.partnerid,
					prepayid: orderInfo.prepayid,
					sign: orderInfo.sign,
					timestamp: orderInfo.timestamp,
				}
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: JSON.stringify(payParams),
					success: function(res) {
						uni.redirectTo({
							url: "/pages/order/orderDetail/OrderDetail?orderNo=" + that.orderMessage.data.id
						})
					},
					fail: function(err) {
						uni.redirectTo({
							url: "/pages/order/orderDetail/OrderDetail?orderNo=" + that.orderMessage.data.id
						})
					}
				})
			}
		},
		data() {
			return {
				selectIndex: 0,
				paychannels: [{
					icon: '../../../static/order/pay_icon_weixin@2x.png',
					selIcon: '../../../static/order/pay_btn_selected_weixin@2x.png',
					title: "微信支付",
					unselIcon: '../../../static/order/pay_btn@2x.png'
				}, {
					icon: '../../../static/order/pay_icon_zhifubao@2x.png',
					selIcon: '../../../static/order/pay_btn_selected_zhifubao@2x.png',
					title: "支付宝付款(暂不支持)",
					unselIcon: '../../../static/order/pay_btn@2x.png'
				}],

				payDetail: false, //付款信息详情
				showAlert: false,
				alertText: null,
				payWay: 1, //付款方式
				countNum: 900, //倒计时15分钟
				gotoOrders: false, //去付款
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #f5f5f5;
		width: 100%;

		.order_content {
			height: 718upx;
			margin: 20upx 40upx;
			background-color: #ffffff;
			padding: 0 29upx;
			border-radius: 20upx;
			box-sizing: border-box;

			.order_pay_top {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-bottom: 101upx;

				.order_pay_top_time {
					margin-top: 6upx;
					height: 23upx;
					font-size: 24upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(153, 153, 153, 1);
					line-height: 23upx;
					margin-top: 50upx
				}

				.order_pay_top_amount {
					margin-top: 39upx;
					height: 55upx;
					font-size: 73upx;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(31, 31, 31, 1);
					line-height: 73upx;
				}
			}
		}

		.p_option {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			height: 117upx;

			.p_option_left {
				display: flex;
				flex-direction: row;
				align-items: center;
				height: 117upx;

				.pay_icon {
					width: 38upx;
					height: 38upx;
				}

				.p_option_title {
					height: 97upx;
					font-size: 28upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(31, 31, 31, 1);
					line-height: 97upx;
					margin-left: 20upx;
				}
			}

			.pay_icon_right {
				width: 44upx;
				height: 44upx;
			}
		}

		.confirm_footer {
			height: 98upx;
			background: #3e87eb;
			position: fixed;
			bottom: 0;
			width: 100%;
			font-size: 32upx;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: #ffffff;
			line-height: 98upx;
			text-align: center;
		}
	}
</style>

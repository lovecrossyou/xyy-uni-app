<template>
	<view class="place-order">
		<div v-if="!showLoading">
			<view class="makeOrder_content">
				<AddressChoose :mydata="choosedAddress" @chooseAddAction="chooseAddAction"></AddressChoose>
				<ArriveAndPay :mydata="arriveAndPayData1"></ArriveAndPay>
				<ArriveAndPay :mydata="arriveAndPayData2"></ArriveAndPay>
				<view class="water_store_info">
					<view class="water_store_h_t">水站信息</view>
					<view v-for="(listItem,index) in productItemList" :key='index'>
						<WaterStoreItem :shopProduct="listItem"></WaterStoreItem>
					</view>
				</view>
			</view>
			<view class="bottom_white">
				<view class="space10" />
				<OrderInfoItemAction itemTitle="使用优惠券" :itemContent="getTicketName" :showArrow="true" @itemCallBack="chooseTickets"></OrderInfoItemAction>
				<OrderInfoItemAction itemTitle="立减优惠" :itemContent="getTicketMoney" :showArrow="false" valueColor="#FB5147"></OrderInfoItemAction>
				<view class="space30" />
				<OrderInfoItemAction itemTitle="订单备注" valueColor="#999999" titleColor="#2E2E2E" :itemContent="getOrderRemark"
				 :showArrow="true" @itemCallBack="orderRemarkInput"> </OrderInfoItemAction>
			</view>
		</div>
		<BottomBar @toPay="toPay"></BottomBar>
	</view>
</template>

<script>
	import Vue from 'vue'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	import AddressChoose from "../components/AddressChoose.vue"
	import WaterStoreItem from "../components/WaterStoreItem.vue"
	import OrderInfoItemAction from "../components/OrderInfoItemAction.vue"
	import ArriveAndPay from "../components/ArriveAndPay.vue"
	import BottomBar from "../components/BottomBar.vue"
	import api from '@/util/api.js'
	import service from "../../../service.js"

	export default {
		components: {
			AddressChoose,
			ArriveAndPay,
			WaterStoreItem,
			OrderInfoItemAction,
			BottomBar,
		},
		computed: {
			...mapState({
				"choosedAddress": state => state.address.choosedAddress,
				"ticket": state => state.orderConfirm.ticket,
				"orderRemark": state => state.orderConfirm.orderRemark
			}),
			...mapGetters({
				cartConfirmInfo: 'cart/cartConfirmInfo',
				getTicketName: 'orderConfirm/getTicketName',
				getTicketMoney: 'orderConfirm/getTicketMoney',
				getOrderRemark: 'orderConfirm/getOrderRemark'
			}),
		},
		methods: {
			...mapMutations({
				GET_DEFAULT_ADDRESS: 'address/GET_DEFAULT_ADDRESS',
				setPayInfo: 'orderConfirm/setPayInfo',
				setOrderInfo: 'orderConfirm/setOrderInfo'
			}),
			async queryResult(params, cb) {
				const d = await api.queryResult(params);
				cb();
			},
			// 选择地址
			chooseAddAction() {
				uni.navigateTo({
					url: "../../address/chooseAddress?isChoose=true"
				})
			},
			// 选择优惠券
			chooseTickets() {
				uni.navigateTo({
					url: "Tickets?isChoose=true"
				})
			},
			//添加备注
			orderRemarkInput() {
				uni.navigateTo({
					url: "OrderRemark"
				})
			},
			//获取默认地址
			async getDefaultAddress() {
				const defaultAddressRes = await api.getDefaultAddress({});
				if (defaultAddressRes.status === 'ok') {
					console.log('defaultAddressRes', JSON.stringify(defaultAddressRes));
					this.GET_DEFAULT_ADDRESS(defaultAddressRes.data);
				}
			},
			//获取确认订单信息
			async requestOrderData() {
				const res = await api.requestCartClient(this.cartConfirmInfo);
				this.info = res.data;
				this.productItemList = res.data.productItemList;
				this.showLoading = false;
				uni.hideLoading();
			},
			async toPay() {
				var that = this;
				let params = Object.assign({}, this.cartConfirmInfo);
				params.deliverAddressId = this.choosedAddress.id;
				params.needDeliverTime = "尽快送达";
				//生成订单信息
				const createRes = await api.shopOrderCreate(params);
				const userInfo = service.getInfo();
				// #ifndef MP-WEIXIN
				//传递支付信息
				let confirmParams = {
					// "openId": userInfo.openId,
					"payChannel": "WeixinPay",
					"payOrderNo": createRes.data.orderNo
				}
				this.setPayInfo(confirmParams); //
				this.setOrderInfo(createRes.data);
				uni.navigateTo({
					url: "/pages/order/makeSureOrder/OrderPay"
				})
				return;
				// #endif

				if (this.choosedAddress.id) {
					let confirmParams = {
						"openId": userInfo.openId,
						"payChannel": "WeixinMiniProgramPay",
						"payOrderNo": createRes.data.orderNo
					}
					console.log("confirmParams", JSON.stringify(confirmParams))
					const confirmRes = await api.keplerPayConfirm(confirmParams)
					console.log("confirmRes", JSON.stringify(confirmRes))
					const payOrderNo = confirmRes.payOrderNo;
					if (confirmRes.status === 'ok' && confirmRes.data.wexinSpec) {
						const wexinSpec = confirmRes.data.wexinSpec;
						uni.requestPayment({
							provider: 'wxpay',
							timeStamp: wexinSpec.timestamp,
							nonceStr: wexinSpec.noncestr,
							package: 'prepay_id=' + wexinSpec.prepay_id,
							signType: 'MD5',
							paySign: wexinSpec.sign,
							success: function(res) {
								console.log('requestPayment res', res);
								that.queryResult(confirmParams, () => {
									uni.redirectTo({
										url: "../orderDetail/OrderDetail?orderNo=" + createRes.data.orderNo
									})
								})
							},
							fail: function(err) {
								console.log('requestPayment err', err);
								uni.redirectTo({
									url: "../orderDetail/OrderDetail?orderNo=" + createRes.data.orderNo
								})
							}
						});
					} else {

					}
				} else {
					uni.showToast({
						title: '请选择地址',
						icon: 'none',
						duration: 2000
					});
				}

			}
		},
		data() {
			return {
				arriveAndPayData1: {
					title: "送达时间",
					value: "尽快送达"
				},
				arriveAndPayData2: {
					title: "支付方式",
					value: "在线支付"
				},
				addressData: {

				},
				info: {},
				showLoading: true,
				alertText: '',
				productItemList: [],
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			this.requestOrderData();
			this.getDefaultAddress();
			console.log('cartConfirmInfo', this.cartConfirmInfo);
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../common/theme.less';
	@import '../../../common/mixin.less';

	.row_center {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.row_between {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.display_b {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.column_between {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.place-order {
		position: absolute;
		width: 100%;
		background: linear-gradient(to bottom, @primary-color 50%, white 80%, white);

		.makeOrder_content {
			background-color: transparent;

			.water_store_info {
				margin: 20upx 24upx 0 24upx;
				padding: 24upx;
				box-sizing: border-box;
				background-color: white;

				.water_store_h_t {
					width: 100%;
					height: 80upx;
					text-align: left;
					font-size: 28upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					line-height: 80upx;
					color: #333333;
					border-bottom: 1upx #EDEBEB solid;
				}
			}
		}

		.bottom_white {
			width: 100%;
			background-color: white;
			padding: 0 48upx;
			margin-bottom: 108upx;
			box-sizing: border-box;

			.space10 {
				width: 100%;
				height: 10upx;
			}

			.space30 {
				width: 100%;
				height: 30upx;
			}
		}
	}

	.orderInfo_item_right_v_style {
		color: #D19B5C !important;
	}

	.orderInfo_item_left_style {
		color: #7CA7D2 !important;
	}

	.orderInfo_color_red {
		color: rgba(251, 81, 71, 1) !important;
	}

	.orderInfo_color_gray9 {
		color: #999999 !important;
	}

	.orderInfo_color_gray2e {
		color: #2E2E2E !important;
	}
</style>

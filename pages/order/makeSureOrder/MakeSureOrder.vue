<template>
	<view class="place-order">
		<div v-if="checkoutData">
			<view class="makeOrder_content">
				<AddressChoose :mydata="choosedAddress" @chooseAddAction="chooseAddAction"></AddressChoose>
				<ArriveAndPay :mydata="arriveAndPayData1"></ArriveAndPay>
				<ArriveAndPay :mydata="arriveAndPayData2"></ArriveAndPay>
				<view class="water_store_info" v-if="checkoutData">
					<view class="water_store_h_t">商品信息</view>
					<WaterStoreItem :cart="checkoutData.cart" :shopProduct="listItem"></WaterStoreItem>
				</view>
			</view>
			<view class="bottom_white">
				<view class="space10" />
				<OrderInfoItemAction itemTitle="使用优惠券" :itemContent="getTicketName" :showArrow="true" @itemCallBack="chooseTickets"></OrderInfoItemAction>
				<OrderInfoItemAction itemTitle="立减优惠" :itemContent="getTicketMoney" :showArrow="false" valueColor="#FB5147"></OrderInfoItemAction>
				<OrderInfoItemAction itemTitle="配送费" :itemContent="deliveryFee" :showArrow="false" valueColor="#999"></OrderInfoItemAction>

				<view class="space30" />
				<OrderInfoItemAction itemTitle="订单备注" valueColor="#999999" titleColor="#2E2E2E" :itemContent="getOrderRemark"
				 :showArrow="true" @itemCallBack="orderRemarkInput"> </OrderInfoItemAction>
			</view>
		</div>
		<BottomBar v-if="checkoutData" :cart="checkoutData.cart" @toPay="toPay"></BottomBar>
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

	import {
		checkout,
		getAddress,
		placeOrders,
		getAddressList
	} from '@/util/service/getData.js'


	export default {
		components: {
			AddressChoose,
			ArriveAndPay,
			WaterStoreItem,
			OrderInfoItemAction,
			BottomBar,
		},
		computed: {
			...mapState([
				'cartList', 'remarkText', 'inputText', 'invoice', 'choosedAddress', 'userInfo'
			]),
			deliveryFee(){
				if(!this.checkoutData)return '¥ 0';
				return '¥'+this.checkoutData.cart.deliver_amount
			},
			//备注页返回的信息进行处理
			remarklist: function() {
				let str = new String;
				if (this.remarkText) {
					Object.values(this.remarkText).forEach(item => {
						str += item[1] + '，';
					})
				}
				//是否有自定义备注，分开处理
				if (this.inputText) {
					return str + this.inputText;
				} else {
					return str.substr(0, str.lastIndexOf('，'));
				}
			},
		},
		methods: {
			...mapMutations([
				'INIT_BUYCART', 'SAVE_GEOHASH', 'CHOOSE_ADDRESS', 'NEED_VALIDATION', 'SAVE_CART_ID_SIG', 'SAVE_ORDER_PARAM',
				'ORDER_SUCCESS', 'SAVE_SHOPID'
			]),
			//初始化数据
			async initData() {
				let newArr = new Array;
				Object.values(this.shopCart).forEach(categoryItem => {
					Object.values(categoryItem).forEach(itemValue => {
						Object.values(itemValue).forEach(item => {
							newArr.push({
								attrs: [],
								extra: {},
								id: item.id,
								name: item.name,
								packing_fee: item.packing_fee,
								price: item.price,
								quantity: item.num,
								sku_id: item.sku_id,
								specs: [item.specs],
								stock: item.stock,
							})
						})
					})
				})
				//检验订单是否满足条件
				this.checkoutData = await checkout(this.geohash, [newArr], this.shopId);
				this.SAVE_CART_ID_SIG({
					cart_id: this.checkoutData.cart.id,
					sig: this.checkoutData.sig
				})
				this.initAddress();
				this.showLoading = false;
			},
			//获取地址信息，第一个地址为默认选择地址
			async initAddress() {
				if (this.userInfo && this.userInfo.user_id) {
					const addressRes = await getAddressList(this.userInfo.user_id);
					if (addressRes instanceof Array && addressRes.length) {
						this.CHOOSE_ADDRESS({
							address: addressRes[0],
							index: 0
						});
					}
				}
			},
			// 选择地址
			chooseAddAction() {
				const id = this.checkoutData.cart.id;
				const sig = this.checkoutData.sig;
				uni.navigateTo({
					url: "../../address/chooseAddress?isChoose=true&id=" + id + '&sig=' + sig
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
				if (!this.choosedAddress || !this.choosedAddress.id) {
					uni.showToast({
						title: '请添加收货地址',
						icon: 'none',
						duration: 2000
					});
					return;
				}

				//保存订单
				this.SAVE_ORDER_PARAM({
					user_id: this.userInfo.user_id,
					cart_id: this.checkoutData.cart.id,
					address_id: this.choosedAddress.id,
					description: this.remarklist,
					entities: this.checkoutData.cart.groups,
					geohash: this.geohash,
					sig: this.checkoutData.sig,
				});
				//发送订单信息
				let orderRes = await placeOrders(this.userInfo.user_id, this.checkoutData.cart.id, this.choosedAddress.id, this.remarklist,
					this.checkoutData.cart.groups, this.geohash, this.checkoutData.sig);
				//第一次下单的手机号需要进行验证，否则直接下单成功
				if (orderRes.need_validation) {
					this.NEED_VALIDATION(orderRes);
					// this.$router.push('/confirmOrder/userValidation');
				} else {
					this.ORDER_SUCCESS(orderRes);
					// this.$router.push('/confirmOrder/payment');
				}
				uni.navigateTo({
					url: "/pages/order/makeSureOrder/OrderPay"
				})
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
				productItemList: [],

				geohash: '', //geohash位置信息
				shopId: null, //商店id值
				showLoading: true, //显示加载动画
				checkoutData: null, //数据返回值
				shopCart: null, //购物车数据
				// imgBaseUrl, //图片域名
				showPayWay: false, //显示付款方式
				payWayId: 1, //付款方式
				showAlert: false, //弹出框
				alertText: null, //弹出框内容
			}
		},
		onLoad(opt) {
			this.geohash = opt.geohash;
			//获取上个页面传递过来的shopid值
			this.shopId = opt.shopId;
			this.INIT_BUYCART();
			this.SAVE_SHOPID(this.shopId);
			//获取当前商铺购物车信息
			this.shopCart = this.cartList[this.shopId];
			if (this.geohash) {
				this.initData();
				this.SAVE_GEOHASH(this.geohash);
			}
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

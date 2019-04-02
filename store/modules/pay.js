import service from "../../service.js"
import mainApi from '@/util/apis/main'
import api from '@/util/api'

async function queryResult(params, cb) {
	const d = await api.queryResult(params);
	cb();
}

//小程序支付
async function wxpay(payInfo) {
	const confirmRes = await api.keplerPayConfirm(payInfo)
	const wexinSpec = confirmRes.data.wexinSpec;
	uni.requestPayment({
		provider: 'wxpay',
		timeStamp: wexinSpec.timestamp,
		nonceStr: wexinSpec.noncestr,
		package: 'prepay_id=' + wexinSpec.prepay_id,
		signType: 'MD5',
		paySign: wexinSpec.sign,
		success: function(res) {
			queryResult(confirmParams, () => {
				uni.redirectTo({
					url: "../orderDetail/OrderDetail?orderNo=" + payInfo.payOrderNo
				})
			})
		},
		fail: function(err) {
			uni.redirectTo({
				url: "../orderDetail/OrderDetail?orderNo=" + payInfo.payOrderNo
			})
		}
	});
}

//App支付
async function nativepay(payInfo) {
	const params = await api.keplerPayConfirm(payInfo);
	const orderInfo = params.data.wexinSpec;
	const payOrderNo = payInfo.payOrderNo;
	const payParams = {
		appid: orderInfo.appid,
		noncestr: orderInfo.noncestr,
		package: orderInfo.packageValue,
		partnerid: orderInfo.partnerid,
		prepayid: orderInfo.prepay_id,
		sign: orderInfo.sign,
		timestamp: orderInfo.timestamp,
	}
	uni.requestPayment({
		provider: 'wxpay',
		orderInfo: JSON.stringify(payParams),
		success: function(res) {
			uni.redirectTo({
				url: "../orderDetail/OrderDetail?orderNo=" + payOrderNo
			})
		},
		fail: function(err) {
			uni.redirectTo({
				url: "../orderDetail/OrderDetail?orderNo=" + payOrderNo
			})
		}
	})
}

const getPayParams = (orderInfo,channel = 'WeixinMiniProgramPay') => {
	if (channel === 'WeixinMiniProgramPay') {
		const userInfo = service.getInfo();
		return {
			"openId": userInfo.openId,
			"payChannel": "WeixinMiniProgramPay",
			"payOrderNo": orderInfo.orderNo
		}
	} else {
		return {
			"payChannel": "WeixinPay",
			"payOrderNo": orderInfo.orderNo
		}
	}
}
export default {
	namespaced: true,
	state: {
		payInfo: null,
		orderInfo: null
	},
	mutations: {

	},
	actions: {
		async fetchShopInfo({
			commit,
			state
		}, shopId) {
			const res = await mainApi.shopInfo(shopId);
			commit('saveShopInfo', res.data);
		},
		async startPay({
			commit,
			state
		}, orderInfo) {
			// ------------APP支付逻辑-----------
			// #ifndef MP-WEIXIN
			//传递支付信息
			let payInfo = getPayParams(orderInfo,'WeixinPay');
			nativepay(payInfo);
			// #endif
			// ------------小程序支付逻辑-----------
			// #ifdef MP-WEIXIN
			const userInfo = service.getInfo();
			let payInfo = getPayParams(orderInfo);
			wxpay(payInfo);
			// #endif
		}
	}
}

import request from './request'

const api = {

	requestCartClient: (params) => request.post("client/shop/cartClient", params),
	deliveryAddressList: (params) => request.post("client/deliveryAddress/list", params),
	deliveryAddressCreate: (params) => request.post("client/deliveryAddress/create", params),
	searchNearby: (params) => request.get("client/common/searchAddress", params),
	deliveryAddressEdit: (params) => request.post("client/deliveryAddress/edit", params),
	shopOrderCreate: (params) => request.post("client/shopOrder/create", params),
	keplerPayConfirm: (params) => request.post("client/keplerPay/confirm", params),
	getDefaultAddress: (params) => request.post("client/deliveryAddress/getDefault", params),
	//支付成功后的结果查询
	queryResult: (params) => request.post("client/keplerPay/queryResult", params),

	//支付测试
	payTest: (cb) => {
		uni.request({
			url: 'http://192.168.1.235:8004/order/wxpay',
			success: (res) => {
				cb(res.data);
			}
		});
	}

}
export default api

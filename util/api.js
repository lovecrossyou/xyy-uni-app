import request from './request'

const api = {

	requestCartClient: (params) => request.get("cart/list"),
	deliveryAddressList: (params) => request.get("shipping/list"),
	searchNearby: (params) => request.post("map/search", params),
	deliveryAddressEdit: (params) => request.post("client/deliveryAddress/edit", params),
	shopOrderCreate: (params) => request.post("client/shopOrder/create", params),
	keplerPayConfirm: (params) => request.post("client/keplerPay/confirm", params),
	getDefaultAddress: (params) => request.post("client/deliveryAddress/getDefault", params),
	//支付成功后的结果查询
	queryResult: (params) => request.post("client/keplerPay/queryResult", params),

	addCart: params => request.post('cart/update', params),
	cartList: params => request.get('cart/list'),
	createOrder: params => request.post('order/create', params),
	orderList: params => request.get('order/list'),
	wxpay : params => request.post('order/wxpay', params),
	addAddress: (params) => request.post("shipping/add", params)
}
export default api

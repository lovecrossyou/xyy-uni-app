import request from './request'
const baseURL = 'https://api.kuaimayoupin.com/client/'
request.config.baseURL = baseURL
const api = {
	requestCartClient: (params) => request.post("shop/cartClient", params),
	deliveryAddressList: (params) =>request.post("deliveryAddress/list",params),
	deliveryAddressCreate: (params) =>request.post("deliveryAddress/create",params),
	searchNearby: (params) => request.get("common/searchAddress",params),
	deliveryAddressEdit:(params) => request.post("deliveryAddress/edit",params),
	shopOrderCreate:(params) => request.post("shopOrder/create",params),
	keplerPayConfirm:(params)=> request.post("keplerPay/confirm",params),
}
export default api

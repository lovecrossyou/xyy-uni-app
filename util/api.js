import request from './request'
const baseURL = 'http://47.94.209.108:7002/client/'
request.config.baseURL = baseURL
const api = {
	requestCartClient: (params) => request.post("shop/cartClient", params),
	deliveryAddressList: (params) =>request.post("deliveryAddress/list",params),
	deliveryAddressCreate: (params) =>request.post("deliveryAddress/create",params),
	searchNearby: (params) => request.get("common/searchAddress",params),
	deliveryAddressEdit:(params) => request.post("deliveryAddress/edit",params),
}
export default api

import request from './request'
const baseURL = 'https://api.kuaimayoupin.com/client/'
request.config.baseURL = baseURL
const api = {
	requestCartClient: (params) => request.post("shop/cartClient", params),
	deliveryAddressList: (params) =>request.post("deliveryAddress/list",params),
	deliveryAddressCreate: (params) =>request.post("deliveryAddress/create",params),
}
export default api

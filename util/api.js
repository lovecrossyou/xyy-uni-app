import request from './request'

const api = {
	requestCartClient: (params) => request.post("client/shop/cartClient", params),
	deliveryAddressList: (params) =>request.post("client/deliveryAddress/list",params),
	deliveryAddressCreate: (params) =>request.post("client/deliveryAddress/create",params),
	searchNearby: (params) => request.get("client/common/searchAddress",params),
	deliveryAddressEdit:(params) => request.post("client/deliveryAddress/edit",params),
}
export default api

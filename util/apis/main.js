import request from '../request'

export default {
	banners: (params) => request.get("client/banner/list", params),
	nearByShops:(params)=>request.get("client/shop/nearShops", params),
}

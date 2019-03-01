import request from '../request'

export default {
	banners: (params) => request.get("client/banner/list", params),
	nearByShops: (params) => request.get("client/shop/nearShops", params),
	shopInfo: (shopId) => request.get(`client/shop/shopInfo/${shopId}`, {}),
	comments: (params) => request.get("client/shop/comments", params),
}

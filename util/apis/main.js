import request from '../request'

export default {
	banners: (params) => request.get("manage/banner/list", params),
	nearByShops: (params) => request.post("shop/shopListNearBy", params),
	shopInfo: (shopId) => request.get(`shop/shopInfo?shopId=${shopId}`, {}),
	comments: (params) => request.get("client/shop/comments", params),
}

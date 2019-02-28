import getters from './getters.js'
import actions from './action.js'
import mutations from './mutations.js'
const state = {
	/**
	 * 是否需要强制登录
	 */
	forcedLogin: false,
	hasLogin: true,
	userName: "",
	cartList: {},
	latitude: '', // 当前位置纬度
	longitude: '', // 当前位置经度
	userInfo: {userId:13}, //用户信息
	editAddress:null,//需要编辑的地址
	searchAddress:null,//搜索的地址
	newAddress:null, //确认订单新增加的地址
	choosedAddress:{}, //选择的地址
	addressIndex: null,//选择地址的索引值
	removeAddress:[],//移除地址
	
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}

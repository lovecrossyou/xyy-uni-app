import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart.js'
import address from './modules/address/index.js'
import user from './modules/user.js'
import main from "./modules/main.js"
import shop from "./modules/shop.js"
import orderConfirm from './modules/orderConfirm.js'
import service from "../service.js"
// import amap from '@/common/amap-wx.js'


// amapPlugin: null,
// 				key: '72239a17febe0f534f11c5b1fbd8ce4c',
const amapKey = '72239a17febe0f534f11c5b1fbd8ce4c';

import loginApi from "../util/apis/login.js"

Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		cart,
		address,
		user,
		main,
		shop,
		orderConfirm
	},
	state: {
		count: 0,
		hasLogin: true,
		forcedLogin: true,
		banners: [],
		shops: [],
		userInfo: null,
		location: {
			latitude: '',
			longitude: '',
			name: '定位中...'
		}
	},
	mutations: {
		setUserInfo(state, info) {
			state.userInfo = info;
		},
		setLoginOut(state) {

		},
		setLogin(state, isLogin) {
			state.hasLogin = isLogin;
		},
		setLocation(state, location) {
			state.location = location;
		}
	},
	actions: {
		async login({
			commit,
			dispatch,
			state
		}, params) {
			const res = await loginApi.login(params);
			console.log("actions login res", JSON.stringify(res));
			if (res.status !== 'ok') return;
			service.addInfo(res.data);
			commit('setUserInfo', res.data);
			commit('setLogin', true);
			return res;
		},
		async appLogin({
			commit,
			dispatch,
			state
		}, params) {
			const res = await loginApi.login(params);
			if (res.status !== 0) return;
			commit('setLogin', true);
			return res;
		},
		startLocate({
			commit
		}, callback) {
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					var locationInfo = {
						latitude: res.latitude,
						longitude: res.longitude,
						name: ''
					}
					console.log('getLocation ',res);
					commit('setLocation', locationInfo);
					callback();
				}
			});
			
		}
	}
})

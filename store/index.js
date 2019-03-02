import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart.js'
import address from './modules/address/index.js'
import user from './modules/user.js'
import main from "./modules/main.js"
import shop from "./modules/shop.js"
import service from "../service.js"

import loginApi from "../util/apis/login.js"

Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		cart,
		address,
		user,
		main,
		shop
	},
	state: {
		count: 0,
		hasLogin: false,
		forcedLogin: false,
		banners: [],
		shops: [],
		userInfo:null
	},
	mutations: {
		setUserInfo(state,info){
			state.userInfo = info ;
		},
		setLogin(state,isLogin){
			state.hasLogin = isLogin ;
		}
	},
	actions: {
		async login({
			commit,
			state
		}, params) {
			const res = await loginApi.login(params);
			if (res.status !== 'ok')return;
			service.addInfo(res.data);
			commit('setUserInfo',res.data);
			commit('setLogin',true);
			return res;
		}
	}
})

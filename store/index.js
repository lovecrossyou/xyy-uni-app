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
		shops: []
	},
	mutations: {
		login(state, params) {
			console.log('login ', params);
		}
	},
	actions: {
		async login({
			commit,
			state
		}, params) {
			const res = await loginApi.login(params);
			service.addInfo(res.data);
		}
	}
})

import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart.js'
import address from './modules/address/index.js'
import user from './modules/user.js'
import loginApi from "../util/apis/login.js"

Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		cart,
		address,
		user
	},
	state: {
		count: 0,
		hasLogin: false
	},
	mutations: {
		login(state, params) {
			loginApi.login();
			
// 			state.count++,
// 			console.log('login ', params);
		}
	}
})

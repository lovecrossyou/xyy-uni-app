import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart.js'
import address from './modules/address/index.js'
import user from './modules/user.js'
import main from "./modules/main.js"
import loginApi from "../util/apis/login.js"

Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		cart,
		address,
		user,
		main
	},
	state: {
		count: 0,
		hasLogin: false,
		forcedLogin:true,
		banners:[],
		shops:[]
	},
	mutations: {
		login(state, params) {
			console.log('login ', params);
			loginApi.login();
		}
	}
})


import {setStore, getStore} from '@/util/config/mUtils'

const  RECORD_USERINFO = "RECORD_USERINFO";
const GET_USERINFO = 'GET_USERINFO';
const RETSET_NAME = 'RETSET_NAME';

const state = {
	userInfo:{ "userId": 13},
	login: true,//是否登录
}
// getters
const getters = {

}

// actions
const actions = {

}

// mutations
const mutations = {
	// 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		setStore('user_id', info.user_id);
	},
	//获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		if (state.userInfo && (state.userInfo.username !== info.username)) {
			return;
		};
		if (!state.login) {
			return
		}
		if (!info.message) {
			state.userInfo = {...info};
		} else {
			state.userInfo = null;
		}
	},
	//修改用户名
	[RETSET_NAME](state,username) {
		state.userInfo = Object.assign({}, state.userInfo,{username})
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
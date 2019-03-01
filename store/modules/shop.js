import mainApi from '@/util/apis/main'

const state = {
 	shopInfo: null,
	comments:{
		content:[]
	}
 }

 const actions = {
 	async fetchShopInfo({
 		commit,
 		state
 	}, shopId) {
		const res = await mainApi.shopInfo(shopId);
		commit('saveShopInfo', res.data);
 	},
	async fetchComments({
		commit,
		state
	}, params) {
		const res = await mainApi.comments(params);
		commit('saveComments', res.data);
	}
 }

 const mutations = {
	 saveShopInfo(state, params) {
	 	state.shopInfo = params;
	 },
	 saveComments(state, params) {
	 	state.comments = params;
	 },
 }
 export default {
 	namespaced: true,
 	state,
 	actions,
 	mutations
 }

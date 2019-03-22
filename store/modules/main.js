import mainApi from '@/util/apis/main'

const state = {
	banners: [],
	shops: []
}

const actions = {
	async banners({
		commit,
		state
	}, params) {
		const res = await mainApi.banners(params);
		console.log('banners ',res);
		if (res) {
			commit('saveBanners', res.data);
		}
	},
	async nearByShops({
		commit
	}, params) {
		const res = await mainApi.nearByShops(params);
		if (res) {
			commit('saveShops', res.data.content);
		}
	}
}

const mutations = {
	saveBanners(state, params) {
		state.banners = params;
	},
	saveShops(state, params) {
		state.shops = params;
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}

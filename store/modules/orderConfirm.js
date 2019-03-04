const  CHOOSETICKET = "CHOOSETICKET";


const state = {
	ticket:{},
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
	[CHOOSETICKET](state, ticket) {
		state.ticket = ticket;
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
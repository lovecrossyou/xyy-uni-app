const  CHOOSETICKET = "CHOOSETICKET";
const ADD_REMARK = "ADD_REMARK";

const state = {
	ticket:{},
	orderRemark:null
}
// getters
const getters = {
		getTicketName(state){
			let name = "不使用"
			if(state.ticket){
				name = state.ticket.name || "不使用"
			}
			return name;
		},
		getTicketMoney(state){
			let money = "- ¥0"
			if(state.ticket){
				money = "- ¥" + (state.ticket.money||"0")
			}
			return money;
		},
		getOrderRemark(state){
			let remark = "请输入备注"
			if(state.orderRemark){
				remark = state.orderRemark||"请输入备注"
			}
			return remark;
		}
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
	[ADD_REMARK](state, remark) {
		state.orderRemark = remark;
	},
	
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
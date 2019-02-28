// initial state
// items: [{ product }]
const state = {
	items: [],
	shopId: 13
}

// getters
const getters = {
	cartProducts: (state, getters, rootState) => {

	},

	cartTotalPrice: (state, getters) => {
		var products = state.items.filter(p => parseInt(p.shopId) === parseInt(state.shopId));
		var total = products.reduce((total, product) => {
			return total + product.price * product.count
		}, 0)
		console.log('getters cartTotalPrice ', total)
		return total;
	}
}

// actions
const actions = {

}

// mutations
const mutations = {
	addCart(state, product) {
		console.log('mutations addCart ', product);
		var existFlag = false;
		state.items.forEach(p => {
			if (product.id === p.id) {
				p.count = product.count;
				existFlag = true;
			}
		})
		if (existFlag === false) {
			state.items.push(product);
		}
	},
	decrease(state, product) {
		console.log('mutations decrease ', product);
		state.items.forEach(p => {
			if (product.id === p.id) {
				p.count = product.count;
			}
		})
	},
	setShopId(state, shopId) {
		state.shopId = shopId;
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}

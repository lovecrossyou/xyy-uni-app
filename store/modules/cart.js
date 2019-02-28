// initial state
// shape: [{ id, quantity }]
const state = {
	items: [],
	checkoutStatus: null
}

// getters
const getters = {
	cartProducts: (state, getters, rootState) => {
		return state.items.map(({
			id,
			quantity
		}) => {
			const product = rootState.products.all.find(product => product.id === id)
			return {
				title: product.title,
				price: product.price,
				quantity
			}
		})
	},

	cartTotalPrice: (state, getters) => {
		return getters.cartProducts.reduce((total, product) => {
			return total + product.price * product.quantity
		}, 0)
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
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}

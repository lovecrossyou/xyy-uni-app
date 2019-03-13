// initial state
// items: [{ product }]
const state = {
	items: [],
	shopId: null
}

// getters
const getters = {
	productsOrderByShop: (state, getters, rootState) => {
		var products = state.items;
		var carts = {};
		var len = products.length;
		for (var i = 0; i < len; i++) {
			var product = products[i];
			var shopId = product.shopId;
			if (!carts[shopId]) {
				carts[shopId] = [];
			}
			carts[shopId].push(Object.assign({}, product));
		}
		var allKeys = Object.keys(carts);
		console.log("products",JSON.stringify(products));
		var lists = [];
		var index = 0;
		for (var obj in carts) {
			var products = carts[allKeys[index]];
			lists.push({
				shopId: allKeys[index],
				shopName:products[0].shopName,
				products: products
			});
			index++;
		}
		return lists;
	},
	cartProducts: (state, getters, rootState) => {
		return state.items.filter(p => parseInt(p.shopId) === parseInt(state.shopId) && p.count != 0);
	},
	cartTotalPrice: (state, getters) => {
		return getters.cartProducts.reduce((total, product) => {
			return total + product.price * product.count
		}, 0)
	},
	cartConfirmInfo: (state, getters) => {
		var products = getters.cartProducts.map(p => {
			return {
				quantity: p.count,
				productId: p.id
			}
		});
		return {
			"shopId": state.shopId,
			"products": products
		}
	}
}

// actions
const actions = {

}

// mutations
const mutations = {
	addCart(state, pInfo) {
		const {
			product,
			shop
		} = pInfo;
		console.log('mutations product ###',product);
		var existFlag = false;
		state.items.forEach(p => {
			if (product.id === p.id) {
				p.count = product.count;
				existFlag = true;
			}
		})
		if (existFlag === false) {
			product.shopName = shop.info.name ;
			state.items.push(product);
		}
	},
	decrease(state, pInfo) {
		const {
			product,
			shop
		} = pInfo;
		console.log('shop ',shop);
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

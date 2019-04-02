import api from '@/util/api'


const state = {
	items: [],
	shopId: null,
	cart:null
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
		console.log("products", JSON.stringify(products));
		var lists = [];
		var index = 0;
		for (var obj in carts) {
			var products = carts[allKeys[index]];
			lists.push({
				shopId: allKeys[index],
				shopName: products[0].shopName,
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
	},
}

// actions
const actions = {
	async addCart({
		commit
	}, product) {
		const res = await api.addCart({
			count:1,
			productId:product.id
		});
		const rest = await api.shopCartList(product.shopId,'列表');
		commit('setCart',rest.data);
	},
	async cartList({commit}){
		const res = await api.cartList();
		commit('setCart',res.data);
	},
	async shopCartList({commit},shopId){
		const res = await api.shopCartList(shopId, '列表');
		commit('setCart',res.data);
	}
}

// mutations
const mutations = {
	addCart(state, pInfo) {
		const {
			product,
			shop
		} = pInfo;
		console.log('mutations product ###', product);
		var existFlag = false;
		state.items.forEach(p => {
			if (product.id === p.id) {
				p.count = product.count;
				existFlag = true;
			}
		})
		if (existFlag === false) {
			product.shopName = shop.info.name;
			state.items.push(product);
		}
	},
	decrease(state, pInfo) {
		const {
			product,
			shop
		} = pInfo;
		console.log('shop ', shop);
		state.items.forEach(p => {
			if (product.id === p.id) {
				p.count = product.count;
			}
		})
	},
	setShopId(state, shopId) {
		state.shopId = shopId;
	},
	setCart(state,cart){
		state.cart = cart;
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}

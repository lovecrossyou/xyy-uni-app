import {
  RECORD_ADDRESS,
  ADD_CART,
  REDUCE_CART,
  INIT_BUYCART,
  CLEAR_CART,
  CHOOSE_SEARCH_ADDRESS,
  CONFIRM_ADDRESS,
  CHOOSE_ADDRESS,
  OUT_LOGIN,
  RETSET_NAME,
	EDIT_ADDRESS,
	RECORD_USERINFO,
	GET_USERINFO,
	SAVE_ADDRESS,
} from './mutation-types.js';

import {
  setStore,
  getStore
} from '../util/config/mUtils.js';

import {
  localapi,
  proapi
} from '../util/config/env.js';

export default {
  // 记录当前经度纬度
  [RECORD_ADDRESS](state, {
    latitude,
    longitude
  }) {
    state.latitude = latitude;
    state.longitude = longitude;
  },
  // 加入购物车
  [ADD_CART](state, {
    shopid,
    category_id,
    item_id,
    food_id,
    name,
    price,
    specs,
    packing_fee,
    sku_id,
    stock
  }) {
    let cart = state.cartList;
    let shop = cart[shopid] = (cart[shopid] || {});
    let category = shop[category_id] = (shop[category_id] || {});
    let item = category[item_id] = (category[item_id] || {});
    if (item[food_id]) {
      item[food_id]['num']++;
    } else {
      item[food_id] = {
        "num": 1,
        "id": food_id,
        "name": name,
        "price": price,
        "specs": specs,
        "packing_fee": packing_fee,
        "sku_id": sku_id,
        "stock": stock
      };
    }
    state.cartList = {
      ...cart
    };
    //存入localStorage
    setStore('buyCart', state.cartList);
  },
  // 移出购物车
  [REDUCE_CART](state, {
    shopid,
    category_id,
    item_id,
    food_id,
    name,
    price,
    specs,
  }) {
    let cart = state.cartList;
    let shop = (cart[shopid] || {});
    let category = (shop[category_id] || {});
    let item = (category[item_id] || {});
    if (item && item[food_id]) {
      if (item[food_id]['num'] > 0) {
        item[food_id]['num']--;
        state.cartList = {
          ...cart
        };
        //存入localStorage
        setStore('buyCart', state.cartList);
      } else {
        //商品数量为0，则清空当前商品的信息
        item[food_id] = null;
      }
    }
  },
  //网页初始化时从本地缓存获取购物车数据
  [INIT_BUYCART](state) {
    let initCart = getStore('buyCart');
    if (initCart) {
      state.cartList = JSON.parse(initCart);
    }
  },
  //清空当前商品的购物车信息
  [CLEAR_CART](state, shopid) {
    state.cartList[shopid] = null;
    state.cartList = {
      ...state.cartList
    };
    setStore('buyCart', state.cartList);
  },
  // 记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.hasLogin = true;
    setStore('user_id', info.user_id);
  },
  //获取用户信息存入vuex
  [GET_USERINFO](state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return;
    };
    if (!state.hasLogin) {
      return
    }
    if (!info.message) {
      state.userInfo = {
        ...info
      };
    } else {
      state.userInfo = null;
    }
  },
  //修改用户名
  [RETSET_NAME](state, username) {
    state.userInfo = Object.assign({}, state.userInfo, {
      username
    })
  },

  //选择搜索的地址
  [CHOOSE_SEARCH_ADDRESS](state, place) {
    state.searchAddress = place;
  },
  //确认订单页添加新的的地址
  [CONFIRM_ADDRESS](state, newAddress) {
    state.newAddress.push(newAddress);
  },
  //选择的地址
  [CHOOSE_ADDRESS](state, {
    address,
    index
  }) {
    state.choosedAddress = address;
    state.addressIndex = index;
  },
	//删除地址列表
  [SAVE_ADDRESS](state, newAdress) {
    state.removeAddress = newAdress
  },
	
	//需要编辑的地址
	[EDIT_ADDRESS](state,address){
		state.editAddress = address
	},
  //退出登录
  [OUT_LOGIN](state) {
    state.userInfo = {};
    state.hasLogin = false;
  },
	
}

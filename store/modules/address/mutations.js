import {
	CHOOSE_SEARCH_ADDRESS,
	CONFIRM_ADDRESS,
	CHOOSE_ADDRESS,
	SAVE_ADDRESS,
	EDIT_ADDRESS,
	RECORD_ADDRESS,
	GET_DEFAULT_ADDRESS,
} from './mutation-types.js';
export default {
	
	[RECORD_ADDRESS](state, {
		positionX,
		positionY
	}) {
		state.positionX = positionX;
		state.positionY = positionY;
	},
	//获得默认的地址
	[GET_DEFAULT_ADDRESS](state,address){
		state.choosedAddress = address;
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
}

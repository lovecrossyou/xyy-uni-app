import request from '../request'

export default {
	requestOrderList: (params) => request.post("client/shopOrder/shopOrderList", params),
	requestOrderDetail: (orderNo) => request.get(`client/shopOrder/shopOrderInfo?orderNo=${orderNo}`, {}),
}

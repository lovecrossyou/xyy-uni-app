const baseUrl = 'http://47.94.209.108:7002/client/'
const getReqest = (url, params, cb) => {
	uni.request({
		url: baseUrl + url,
		data: params,
		method: 'GET',
		success: (res) => {
			const data = res.data ;
			if (data.status === 'ok') {
				cb(data.data);
				console.log('success ##',data);
			}
			else{
				uni.showToast({
					title:data.message
				})
			}
		}
	});
}
const postRequest = (url, params, cb) => {
	uni.request({
		url: baseUrl + url,
		method: 'POST',
// 		header: {
// 			'content-type': 'application/json;charset=UTF-8' //自定义请求头信息
// 		},
		data: params,
		success: (res) => {
			cb(res.data);
		},
		fail(e) {

		}
	});
}
module.exports = {
	getReqest,
	postRequest
}

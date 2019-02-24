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
		data: params,
		method: 'POST',
		success: (res) => {
			cb(res);
		},
		fail(e) {

		}
	});
}
module.exports = {
	getReqest,
	postRequest
}

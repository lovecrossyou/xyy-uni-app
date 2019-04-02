import Fly from 'flyio/dist/npm/wx'
import service from "../service"
const request = new Fly()
// const baseURL = 'https://api.kuaimayoupin.com/'
// const baseURL = 'http://47.94.169.143:8004/';
// const baseURL = 'http://192.168.199.101:8004/';
const baseURL = 'http://192.168.1.235:8004/'
request.config.baseURL = baseURL

const errorPrompt = (err) => {
	console.log("err-----", JSON.stringify(err))
	if (err.data.status === "10") {

		console.log('999#### ')
		//需要登录权限
		goLoginPage();
	} else {
		uni.showToast({
			title: err.data.msg || 'fetch data error.',
			mask: false,
			duration: 1500
		});
	}
}

request.interceptors.request.use((request) => {
	let cookie = wx.getStorageSync('cookieKey');
	if (cookie) {
		request.headers['Cookie'] = cookie;
	}
	return request;
})

const goLoginPage = () => {
	uni.redirectTo({
		url: '/pages/login/enter'
	});
}

request.interceptors.response.use(
	(response) => {
		if (response && response.headers && response.headers['set-cookie']) {
			wx.setStorageSync('cookieKey', response.headers['set-cookie'][0]); //保存Cookie到Storage
		}
		//只将请求结果的data字段返回
		uni.hideLoading()
		if (!(response.data.data)) {
			if (response.data.status === 10) {
				//需要登录权限
				goLoginPage();
			} else {
				errorPrompt(response)
			}
			return Promise.resolve(null);
		}
		return Promise.resolve(response.data);
	},
	(err) => {
		//发生网络错误后会走到这里
		uni.hideLoading()
		errorPrompt(err.response)
		return Promise.resolve(null);
	}
)

export default request

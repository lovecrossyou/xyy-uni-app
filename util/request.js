import Fly from 'flyio/dist/npm/wx'
import service from "../service"
const request = new Fly()

// export const baseURL = 'http://47.94.169.143:8004/'
// export const baseURL = 'https://api.kuaimayoupin.com/'
// 192.168.199.101。
// export const baseURL = 'http://192.168.1.235:8004/'
export const baseURL = 'http://10.100.1.115:7001/'
// export const baseURL = 'http://192.168.199.101:8004/'

request.config.baseURL = baseURL

const errorPrompt = (err) => {
	if(err.type === 'GET_USER_INFO_FAIELD'){
		uni.navigateTo({
			url:"/pages/login/enter"
		})
		return;
	}
	uni.showToast({
		title: err.message || 'fetch data error.',
		mask: false,
		duration: 1500
	});
}

request.interceptors.request.use((request) => {
	let cookie = uni.getStorageSync('cookieKey');
	if (cookie) {
		request.headers['Cookie'] = cookie;
	}
	return request
})

const goLoginPage = () => {
	uni.redirectTo({
		url: '/pages/login/login'
	});
}

request.interceptors.response.use(
	(response) => {
		//只将请求结果的data字段返回
		uni.hideLoading()
		if (response && response.headers && response.headers['set-cookie']) {
			uni.setStorageSync('cookieKey', response.headers['set-cookie'][0]); //保存Cookie到Storage
		}
		
		console.log('response ',response.status);
		if (!(response.data.status ===1)) {
			if (response.data.status === "-999") {
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

import Fly from 'flyio/dist/npm/wx'
import {
	baseURL
} from '../request'
const request = new Fly()
request.config.baseURL = baseURL

request.interceptors.request.use((request) => {
	// request.headers["accessToken"] = service.getToken();
	// uni.showLoading();
	return request
})

const errorPrompt = (err) => {
	if (err.data.status === "-999") {		
		//需要登录权限
		// goLoginPage();
	} else {
		uni.showToast({
			title: err.data.message || 'fetch data error.',
			mask: false,
			duration: 1500
		});
	}
}


request.interceptors.response.use(
	(response) => {
		//只将请求结果的data字段返回
		// uni.hideLoading()
		console.log('response ', response.status);
		return Promise.resolve(response.data);
	},
	(err) => {
		//发生网络错误后会走到这里
		// uni.hideLoading()
		errorPrompt(err.response)
		return Promise.resolve(null);
	}
)


export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	if (type == 'GET') {
		return request.get(url, data);
	} else {
		return request.post(url, data);
	}
}

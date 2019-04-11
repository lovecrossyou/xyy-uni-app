import Fly from 'flyio/dist/npm/wx'
import {
	baseURL
} from '../request'
const request = new Fly()
request.config.baseURL = baseURL

request.interceptors.request.use((request) => {
	let cookie = uni.getStorageSync('cookieKey');
	if (cookie) {
		request.headers['Cookie'] = cookie;
	}
	return request
})

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


request.interceptors.response.use(
	(response) => {
		//只将请求结果的data字段返回
		if (response && response.headers && response.headers['set-cookie']) {
			uni.setStorageSync('cookieKey', response.headers['set-cookie'][0]); //保存Cookie到Storage
		}
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

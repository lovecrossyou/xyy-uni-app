import Fly from 'flyio/dist/npm/wx'
import service from "../service"
const request = new Fly()
// const baseURL = 'https://api.kuaimayoupin.com/'
export const baseURL = 'http://localhost:8000/'
request.config.baseURL = baseURL

const errorPrompt = (err) => {
	if (err.data.status === "-999") {		
		//需要登录权限
		goLoginPage();
	} else {
		uni.showToast({
			title: err.data.message || 'fetch data error.',
			mask: false,
			duration: 1500
		});
	}
}

request.interceptors.request.use((request) => {
	request.headers["accessToken"] = service.getToken();
	uni.showLoading();
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
		console.log('response ',response.status);
		if (!(response.data.status === "ok")) {
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

import Fly from 'flyio/dist/npm/wx'
import service from "../service"
const request = new Fly()
const baseURL = 'https://api.kuaimayoupin.com/'
request.config.baseURL = baseURL

const errorPrompt = (err) => {
	console.log("errorPrompt err ", err)
	if (err.status === "-999") {
		//需要登录权限
		goLoginPage();
	} else {
		uni.showToast({
			title: err.message || 'fetch data error.',
			icon: 'none'
		})
	}
}

request.interceptors.request.use((request) => {
	request.headers["accessToken"] = service.getToken();
	uni.showLoading();
	return request
})

const goLoginPage = () => {
	uni.redirectTo({
		url: '/pages/login/enter'
	});
}

request.interceptors.response.use((response, promise) => {
	uni.hideLoading()
	if (!(response.data.status === "ok")) {
		if (response.data.status === "-999") {
			//需要登录权限
			goLoginPage();
		} else {
			errorPrompt(response.data)
		}
	}
	return promise.resolve(response.data)
}, (err, promise) => {
	uni.hideLoading()
	errorPrompt(err.response.data)
	return promise.reject(err.response.data)
})

export default request

import Fly from 'flyio/dist/npm/wx'
import service from "../service"
const request = new Fly()
<<<<<<< HEAD
const baseURL = 'https://api.kuaimayoupin.com/'
=======
const baseURL = 'https://api.kuaimayoupin.com/'
>>>>>>> f7e4388a7a6310d3b7e3ae1be6548f37533f715f
// const baseURL = 'http://47.94.209.108:7002/'
request.config.baseURL = baseURL
request.config.headers = {
	"content-type": "application/json",
	"accessToken": service.getToken()
}

const errorPrompt = (err) => {
	uni.showToast({
		title: err.data.message || 'fetch data error.',
		icon: 'none'
	})
}

request.interceptors.request.use((request) => {
	uni.showNavigationBarLoading()
	return request
})

request.interceptors.response.use((response, promise) => {
	uni.hideNavigationBarLoading()
	if (!(response.data.status === "ok")) {
		errorPrompt(response)
	}
	return promise.resolve(response.data)
}, (err, promise) => {
	uni.hideNavigationBarLoading()
	errorPrompt(err)
	return promise.reject(err)
})

export default request

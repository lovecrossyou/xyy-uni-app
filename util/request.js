import Fly from 'flyio/dist/npm/wx'

const request = new Fly()
const baseURL = 'https://api.kuaimayoupin.com/'
request.config.baseURL = baseURL
request.config.headers = {
	"content-type": "application/json"
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

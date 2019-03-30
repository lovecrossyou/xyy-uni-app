import request from '../request'

export default {
	
	login: (params) => request.post("user/login", params),
	appLogin: (params) => request.post("auth/clientLogin", params),
	simpleLogin: (params) => request.post("auth/simpleLogin ", params),
}

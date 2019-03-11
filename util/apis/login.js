import request from '../request'

export default {
	
	login: (params) => request.post("auth/login", params),
	appLogin: (params) => request.post("auth/clientLogin", params),
	simpleLogin: (params) => request.post("auth/simpleLogin ", params),
}

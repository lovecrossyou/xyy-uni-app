import request from '../request'

export default {
	login: (params) => request.post("auth/login", params),
	simpleLogin: (params) => request.post("auth/simpleLogin ", params),
}

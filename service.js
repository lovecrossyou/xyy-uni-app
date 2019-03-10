// 管理账号信息
const TOKEN_KEY = 'TOKEN_KEY';
const INFO_KEY = 'INFO_KEY';

const getToken = function() {
	let ret = '';
	ret = uni.getStorageSync(TOKEN_KEY);
	if (!ret) {
		ret = null;
	}
	return ret;
}

const addToken = function(token) {
	uni.setStorageSync(TOKEN_KEY, token);
}


const getInfo = function() {
	let ret = '';
	ret = uni.getStorageSync(INFO_KEY);
	if (!ret) return null;
	return JSON.parse(ret);
}

const addInfo = function(info) {
	if (!info) return;
	uni.setStorageSync(INFO_KEY, JSON.stringify(info));
	addToken(info.accessToken);
}

export default {
	getToken,
	getInfo,
	addToken,
	addInfo
}

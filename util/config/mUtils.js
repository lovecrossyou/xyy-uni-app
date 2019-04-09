/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	uni.setStorageSync(name,content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return uni.getStorageSync(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	uni.removeStorageSync(name);
}

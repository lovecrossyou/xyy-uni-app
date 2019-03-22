<template>
	<view>
		<view class="btn-enter" @click="goNext">
			支付测试
		</view>
	</view>
</template>

<script>
	import api from '@/util/api.js'
	export default {
		data() {
			return {};
		},
		methods: {
			goHome() {
				uni.switchTab({
					url: '../main/main'
				});
			},
			goNext() {
				console.log('xx');
				api.payTest(params => {
					console.log(JSON.stringify(params.data));
					const orderInfo = params.data;
					const payParams = {
						// appid: orderInfo.appid,
						partnerid: orderInfo.partnerid,
						noncestr: orderInfo.noncestr,
						package: orderInfo.package,
						timestamp: orderInfo.timestamp,
						sign: orderInfo.sign,
						prepayid: orderInfo.prepayid
					}

					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: JSON.stringify(payParams),
						success: function(res) {
							console.log('success:' + JSON.stringify(res));
						},
						fail: function(err) {
							console.log('fail:' + JSON.stringify(err.errMsg));
							if (err.errMsg.indexOf('配置的支付appid和生成订单使用的appid不一致') !== -1) {
								uni.showToast({
									title: 'appid不一致',
									mask: false,
									duration: 1500
								});
							} else {
								uni.showToast({
									title: JSON.stringify(err.errMsg),
									mask: false,
									duration: 1500
								});
							}

						}
					})
				})
			}
		}
	}
</script>

<style lang="less">
	.btn-enter {
		width: 200upx;
		height: 90upx;
		background: firebrick;
	}
</style>

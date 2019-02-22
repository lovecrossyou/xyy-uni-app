<template>
	<view class="content">
		<view class="header">
			<view class="left">
				<view class="image-content">
					<image style="width: 128upx; height: 128upx; background-color: #eeeeee;" mode="aspectFill" :src="src" @error="imageError"></image>
				</view>
				<view class="user-info">
					<view class="name">任蕊芳</view>
					<view class="score">积分：2500</view>
				</view>
			</view>
			<view class="right">
				>
			</view>
		</view>

		<uni-list>
			<uni-list-item title="收货地址" thumb="http://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
			<uni-list-item title="我的优惠券" thumb="http://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
			<uni-list-item title="我的优惠券" thumb="http://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
			
			<uni-list-item title="我的积分" thumb="http://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
			<uni-list-item title="意见反馈" thumb="http://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
			<uni-list-item title="我的优惠券" thumb="http://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png"></uni-list-item>
		</uni-list>
		<view class="btn-row">
			<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			<button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'


	export default {
		data() {
			return {
				src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg'
			}
		},
		components: {
			uniList,
			uniListItem
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
		},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			bindLogout() {
				this.logout();
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			},
			imageError(e) {
				console.error('image发生error事件，携带值为' + e.detail.errMsg)
			}
		}
	}
</script>

<style lang="less">
	.content{
		padding: 0;
		.header {
			background-color: #fff;
			justify-content: space-between;
			align-items: center;
			display: flex;
			padding: 35upx;
			.left {
				display: flex;
				flex-direction: row;
				align-items: center;
				height: 100%;
		
				.user-info {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					height: 100%;
					margin-left: 10upx;
		
					.name {
						font-size: 14px;
						font-family: PingFangSC-Medium;
						font-weight: 500;
						color: rgba(39, 39, 39, 1);
						line-height: 20px;
					}
		
					.score {
						font-size: 12px;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						line-height: 17px;
					}
				}
			}
		
		}
	}
</style>

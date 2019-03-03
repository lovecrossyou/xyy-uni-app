<template>
	<view class="content">
		 <view class="header" @click="modification(modification)">
			<view class="left">
				<view class="image-content">
					<image style="width: 128upx; height: 128upx; background-color: #eee;" mode="aspectFill" :src="src" @error="imageError"></image>
				</view>
				<view class="user-info">
					<view class="name">chechero</view>
					<view class="score">积分：2500</view>
				</view>
			</view>
			<view class="right">
			   <uni-icon type="arrowright" color="#bbb" size="20"></uni-icon>
			</view>
		</view>

		<uni-list>
			<uni-list-item title="收货地址" thumb="http://qnimage.xiteng.com/dizhi@2x.png"></uni-list-item>
			<uni-list-item title="我的优惠券" thumb="http://qnimage.xiteng.com/kabao@2x.png"></uni-list-item>
			<uni-list-item title="我的收藏" thumb="http://qnimage.xiteng.com/shoucang@2x.png"></uni-list-item>
			
			<uni-list-item title="我的积分" thumb="http://qnimage.xiteng.com/jifen@2x.png"></uni-list-item>
			<uni-list-item title="意见反馈" thumb="http://qnimage.xiteng.com/fankui@2x.png"></uni-list-item>
			<uni-list-item title="更多" thumb="http://qnimage.xiteng.com/gengduo@2x.png"></uni-list-item>
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
	import uniIcon from '@/components/uni-icon/uni-icon.vue'


	export default {
		data() {
			return {
				src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
				icon_address:'../../static/me/address.png'
			}
		},
		components: {
			uniList,
			uniListItem,
			uniIcon
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
						url: '../login/enter',
					});
				}
			},
			imageError(e) {
				console.error('image发生error事件，携带值为' + e.detail.errMsg)
			},
			modification(modification) {
				uni.navigateTo({
					url:"personalData/personalData"
				})
			},
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
			height: 200upx;
			.left {
				display: flex;
				flex-direction: row;
				align-items: center;
				height: 100%;
				
				.image-content>image{
					border-radius: 50%;
				}
		
				.user-info {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 20upx;
					padding: 25upx 0;
					box-sizing: border-box;
					height: 126upx;
		
					.name {
						font-size: 28upx;
						font-family: PingFangSC-Medium;
						font-weight: 500;
						color: rgba(39, 39, 39, 1);
						// line-height: 20px;
					}
		
					.score {
						font-size: 24upx;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						// line-height: 17px;
					}
				}
			}
		
		}
	}
</style>

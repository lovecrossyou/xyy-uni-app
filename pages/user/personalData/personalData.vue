<template>
	<view class="wrapper">
		<view class="header_wrapper">
			<view class="head_portraits_text">头像</view>
			<view class="header_right">
				<img mode="aspectFill" :src="src" alt="" class="head_img">
				<img src="http://qnimage.xiteng.com/right_icon@2x.png" alt="" class="right_icon">
			</view>
		</view>
		
		<view>
			<modifiedData title="用户名" desc="chechero" ></modifiedData>
			<modifiedData title="性别"  desc="女"></modifiedData>
		</view>
		
	</view>
</template>

<script>
	import modifiedData from "./modifiedData.vue";
	export default {
		data() {
			return {
				src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
			}
		},
		components: {
			modifiedData
			
		},
		computed: {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
	.wrapper{
		width: 750upx;
		padding: 19upx 26upx 0 26upx;
		box-sizing: border-box;
		
		.header_wrapper{
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1upx solid #E0E0E0;
			padding: 15upx 0;
			box-sizing: border-box;
			
			.head_portraits_text{
				color: #272727;
				font-size: 30upx;
			}
			.header_right{
				display: flex;
				flex-direction: row;
				align-items: center;
				
				.head_img{
					width: 126upx;
					height: 126upx;
					border-radius: 50%;
					border:1upx solid rgba(124,167,210,1);
					margin-right: 16upx;
				}
				.right_icon{
					width:16upx;
					height:26upx;
				}
			}
		}
	}
	
</style>

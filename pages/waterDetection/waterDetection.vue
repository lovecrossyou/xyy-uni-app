<template>
	<view class="water_detection_wrapper">
		<view class="detection_list_wrapper_one" @click="detectionAnalysis">
			<view class="top_text_arae">
				<img src="http://qnimage.xiteng.com/duobianxing@2x.png" alt="" />
				<view class="title_text">生活用水检测</view>
			</view>
			<view class="bottom_title">
				生活用水标准从保护人体健康出发，<br>
				对生活用水中的物理、<br>
				化学和生物等污染 <br>
				进行检测。<br>
			</view>
		</view>
		<view class="detection_list_wrapper_two">
			<view class="top_text_arae">
				<img src="http://qnimage.xiteng.com/duobianxing@2x.png" alt="" />
				<view class="title_text">二次供水检测</view>
			</view>
			<view class="bottom_title">
				住宅小区中二次供水设备，把蓄水<br>
				池的水加压后，送到每家<br>
				每户，而自来水多数<br>
				来自二次供水。<br>
			</view>
		</view>
		<view class="detection_list_wrapper_three">
			<view class="top_text_arae">
				<img src="http://qnimage.xiteng.com/duobianxing@2x.png" alt="" />
				<view class="title_text">排水许可证检测</view>
			</view>
			<view class="bottom_title">
				《城市排水许可管理办法》规定，像<br>
				公共排水管网及其附属设排<br>
				放污水的经营者都需办<br>
				理排水许可证。<br>
			</view>
		</view>
		<view class="detection_list_wrapper_four">
			<view class="top_text_arae">
				<img src="http://qnimage.xiteng.com/duobianxing@2x.png" alt="" />
				<view class="title_text">水质检测</view>
			</view>
			<view class="bottom_title">
				水为生命之源，水质检测作为水<br>
				污染控制工作中的基础工作，<br>
				是证水质安全的重<br>
				要手段。<br>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		components: {
		},
		computed: {
			
		},
		methods: {
			detectionAnalysis(){
				uni.navigateTo({
					url:"./detectionAnalysis"
				})
			}
				
		}
	}
</script>

<style scoped>
	.water_detection_wrapper{
		width: 100%;
	}
	.detection_list_wrapper_one {
		width: 100%;
		height: 840upx;
		background: url(http://qnimage.xiteng.com/life@2x.png) no-repeat center center;
		background-size: 750upx 100%;
		padding: 70upx 80upx;
		box-sizing: border-box;
	}
	.detection_list_wrapper_two {
		width: 100%;
		height: 840upx;
		background: url(http://qnimage.xiteng.com/gongshui@2x.png) no-repeat center center;
		background-size: 750upx 100%;
		padding: 70upx 80upx;
		box-sizing: border-box;
	}
	.detection_list_wrapper_three {
		width: 100%;
		height: 840upx;
		background: url(http://qnimage.xiteng.com/paishui@2x.png) no-repeat center center;
		background-size: 750upx 100%;
		padding: 70upx 80upx;
		box-sizing: border-box;
	}
	.detection_list_wrapper_four{
		width: 100%;
		height: 840upx;
		background: url(http://qnimage.xiteng.com/shuizhi@2x.png) no-repeat center center;
		background-size: 750upx 100%;
		padding: 70upx 80upx;
		box-sizing: border-box;
	}
	.top_text_arae {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.top_text_arae > image {
		width: 18upx;
		height: 18upx;
	}
	.title_text {
		color: #fff;
		font-size: 32upx;
		margin-left: 10upx;
	}
	.bottom_title{
		color: #F1F1F1;
		font-size: 26upx;
		margin: 35upx 0 0 20upx;
		line-height: 40upx;
	}
</style>

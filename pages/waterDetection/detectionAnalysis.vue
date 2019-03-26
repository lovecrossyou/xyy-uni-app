<template>
	<view class="detection_analysis_wrapper">
		<view class="top_bg"></view>
		<view class="progress_area"></view>
		<view class="main_content">
			<view class="block_title">
				<img src="../../static/water/juxing@2x.png" alt="" />
				<view class="block_title_text">检测项目</view>
			</view>
		</view>
		<view class="partition">基本项目（必检）</view>
		<view class="detection_items_list">
			<view class="detection_item">感官和一般化学指标</view>
			<view class="detection_item">毒理学指标</view>
			<view class="detection_item">微生物指标</view>
			<view class="detection_item"><button>查看更多</button></view>
		</view>
		<view class="choosable_option">
			<view class="partition">可选项目</view>
			<view class="detection_items_bottom_list">
				<img src="../../static/water/tuoyuan1.png" alt="" />
				<view class="left_text">感官和一般化学指标</view>
				<view class="right_price">¥ 300</view>
			</view>
			<view class="detection_items_bottom_list">
				<img src="../../static/water/tuoyuan1.png" alt="" />
				<view class="left_text">毒理学指标</view>
				<view class="right_price">¥ 600</view>
			</view>
			<view class="detection_items_bottom_list">
				<img src="../../static/water/tuoyuan1.png" alt="" />
				<view class="left_text">微生物指标</view>
				<view class="right_price">¥ 600</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	components: {},
	computed: {},
	methods: {}
};
</script>

<style scoped>
.detection_analysis_wrapper {
	width: 100%;
}
.top_bg {
	width: 100%;
	height: 250upx;
	background: url('http://qnimage.xiteng.com/top_bg_img.png') no-repeat center center;
	background-size: 100% 100%;
}
.progress_area {
	width: 100%;
	height: 274upx;
	background: url('http://qnimage.xiteng.com/fenxi@2x.png') no-repeat center center;
	background-size: 100% 100%;
	margin-top: -160upx;
}
.block_title {
	width: 100%;
	height: 100upx;
	display: flex;
	flex-direction: row;
	padding: 0 30upx;
	box-sizing: border-box;
	align-items: center;
}
.block_title > image {
	width: 8upx;
	height: 36upx;
	margin-right: 20upx;
}
.block_title_text {
	color: #111;
	font-size: 32upx;
	font-weight: 500;
}
.partition {
	width: 100%;
	height: 40upx;
	background-color: #e6f1ff;
	padding: 0 30upx;
	box-sizing: border-box;
	color: #74b1ff;
	font-size: 24upx;
	line-height: 40upx;
}
.detection_items_list {
	width: 100%;
	padding: 0 30upx;
	box-sizing: border-box;
}
.detection_item {
	width: 100%;
	height: 90upx;
	line-height: 90upx;
	border-bottom: 1upx dashed #e0e0e0;
	color: #333333;
	font-size: 26upx;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.detection_item > button {
	width: 150upx;
	height: 55upx;
	color: #3e87eb;
	font-size: 24upx;
	border-radius: 25upx;
	border: 1upx solid rgba(62, 135, 235, 1);
	line-height: 55upx;
}
.choosable_option{
	width: 100%;
	height: 90upx;
	padding: 0 30upx;
	box-sizing: border-box;
}
.detection_items_bottom_list{
	width: 100%;
	height: 90upx;
	display: flex;
	flex-direction: row;
	align-items: center;
	border-bottom: 1upx dashed #e0e0e0;
}
.detection_items_bottom_list>image{
	width: 32upx;
	height: 32upx;
}
.left_text{
	color: #333;
	font-size: 26upx;
	flex: 1;
	margin-left: 20upx;
}
.right_price{
	color: #FF6B6B;
	font-size: 26upx;
}
</style>

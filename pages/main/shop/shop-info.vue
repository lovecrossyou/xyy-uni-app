<template>
	<view class="info">
		<view class="info_wrapper">
			<view class="info_title">店铺信息 </view>
			<view class="info-row">
				<view class="info_sub1">月销单量 </view>
				<view class="info_sub">{{shopInfo.soldAmount}}</view>
			</view>
			<view class="info-row">
				<view class="info_sub1">关注人数 </view>
				<view class="info_sub">{{shopInfo.followers}}人</view>
			</view>
			<view class="info-row">
				<view class="info_sub1">营业时间 </view>
				<view class="info_sub">{{shopInfo.openTime}}</view>
			</view>
			<view class="info-row">
				<view class="info_sub1">门店地址 </view>
				<view class="info_sub">{{shopInfo.address}}</view>
			</view>
			<view class="info-row">
				<view class="info_sub1">门店电话 </view>
				<view class="info_phone">{{shopInfo.telephone}}</view>
			</view>
		</view>
		<view class="space"></view>
		<view class="info_wrapper">
			<view class="info_title">公告</view>
			<view class="info-row">
				<view class="info_sub">{{shopInfo.summary}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			shopInfo:Object,
		}
	}
</script>

<style lang="less" scoped>
	@import "../../../common/mixin.less";
	
	.info{
		background-color: white;
		.space{
			width: 100%;
			height: 20upx;
			background-color: #FDFDFD;
		}
		.info_wrapper{
			padding: 22upx 26upx;
			box-sizing: border-box;
			.info-row{
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-top: 30upx;
				.info_title{
					height:40upx;
					font-size:28upx;
					font-family:PingFangSC-Medium;
					font-weight:500;
					color:rgba(51,51,51,1);
					line-height:40upx;
				}
				.info_sub1{
					height:34upx;
					font-size:24upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height:34upx;
				}
				.info_sub{
					margin-left: 10upx;
					height:34upx;
					font-size:24upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(51,51,51,1);
					line-height:34upx;
				}
				.info_phone{
					margin-left: 10upx;
					height:34upx;
					font-size:24upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:#7CA7D2;
					line-height:34upx;
				}
			}
			
		}
	}
</style>

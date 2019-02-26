<template>
	<view class="content">
		<view class="header">
			<view class="grade_wrap">
				<view class="grade">4.8</view>
				<view class="grade_title">综合评分</view>
			</view>
			<view class="grade_wrap">
				<view class="grade">999</view>
				<view class="grade_title">评论总数</view>
			</view>
		</view>
		<view class="gradelist" v-for="(item,index) in judgementData.content" :key='index'>
			<view class="grade_item">
				<image src="http://static.tuexing.com/image_15452994474541" class="img_user"></image>
				<view class="item_right">
					<view class="item_header">
						<view class="item_header_name">{{item.userName}}</view>
						<view class="item_header_time">{{item.createTime}}</view>
					</view>
					<view>
						<uniRate value="8" size="12"></uniRate>
					</view>
					<view class="grade_content">
						{{item.commentInfo}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue";
	export default {
		components: {  
			uniRate  
		},
		props: {
			judgementData: Object
		},
		onLoad() {
			console.log(this.judgementData);
		}
	}
	
</script>

<style lang="less" scoped>
	@import "../../../common/mixin.less";
	.content{
		width: 100%;
		height: 100%;
		background-color: white;
		.header{
			.flex-center;
			.grade_wrap{
				.flex-center;
				flex-direction: column;
				margin: 28upx 56upx;
				.grade{
					height:56upx;
					font-size:40upx;
					font-family:PingFangSC-Medium;
					font-weight:500;
					color:rgba(51,51,51,1);
					line-height:56upx;
				}
				.grade_title{
					margin-top: 10upx;
					height:34upx;
					font-size:24upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:34upx;
				}
				
			}
		}
		.gradelist{
			.grade_item{
				padding: 20upx 24upx;
				box-sizing: border-box;
				display: flex;
				flex: row;
				.img_user{
					width: 70upx;
					height: 70upx;
					border-radius: 35upx;
				}
				.item_right{
					width: 100%;
					margin-left: 10upx;
					.item_header{
						.flex-row-between;
						width: 100%;
						.item_header_name{
							height:36upx;
							font-size:26upx;
							font-family:PingFangSC-Regular;
							font-weight:400;
							color:rgba(153,153,153,1);
							line-height:36upx;
						}
						.item_header_time{
							height:28px;
							font-size:20px;
							font-family:PingFangSC-Regular;
							font-weight:400;
							color:rgba(51,51,51,1);
							line-height:28px;
						}
					}
					.grade_content{
						margin-top: 20upx;
						font-size:28px;
						font-family:PingFangSC-Regular;
						font-weight:400;
						color:rgba(102,102,102,1);
						line-height:40px;
					}
				}
			}
		}
		
		
		
		
	}
</style>

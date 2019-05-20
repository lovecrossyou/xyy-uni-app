<template>
	<view class="content">
		<view class="header">
			<view class="line">
				
			</view>
			<view class="grade_wrap">
				<view class="score-wrapper">
					<view class="grade_title">综合评分</view>
					<view class="grade">{{ratingScoresData.compare_rating}}</view>
				</view>
				<view class="rate-wrapper">
					<uniRate value="8" size="12"></uniRate>
				</view>
			</view>
			<view class="comment_wrapper">
				<view class="grade_title">评论总数</view>
				<view class="grade">{{ratingScoresData.order_rating_amount}}</view>
			</view>
		</view>
		<view class="gradelist" v-for="(item,index) in ratingList" :key='index'>
			<view class="grade_item">
				<image src="http://static.tuexing.com/image_15452994474541" class="img_user"></image>
				<view class="item_right">
					<view class="item_header">
						<view class="item_header_name">{{item.username}}</view>
						<view class="item_header_time">{{item.time_spent_desc}}</view>
					</view>
					<view>
						<uniRate value="8" size="12"></uniRate>
					</view>
					<view class="grade_content">
						{{item.rating_text}}
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
			judgementData: Object,
			ratingScoresData: Object
		},
		onLoad() {
			// console.log(this.judgementData);
		}
	}
</script>

<style lang="less" scoped>
	@import "../../../common/mixin.less";

	.content {
		width: 100%;
		// height: 100%;
		background-color: #F2F2F2;

		.header {
			background: #FFFFFF;
			display: flex;
			flex-direction: row;
			height: 122upx;
			
			.line{
				position: absolute;
				left: 375upx;
				top: 28rpx;
				width: 1upx;
				height: 69upx;
				background: #E0E0E0;
			}

			.grade_wrap {
				// .flex-center;
				height: 60upx;
				flex: 1;
				.score-wrapper {
					display: flex;
					flex-direction: row;
					align-items: center;
					height: 40upx;
				}

				.rate-wrapper {
					margin-top: 18upx;
				}

				flex-direction: column;
				margin: 28upx 56upx;

				.grade {
					margin-left: 10upx;
					font-size: 28upx;
					font-family: PingFangSC-Medium;
					font-weight: 500;
					color: #FF6B6B;
				}

				.grade_title {
					font-size: 24upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: #444444;
				}

			}

			.comment_wrapper {
				display: flex;
				flex-direction: row;
				align-items: center;
				height: 100%;
				flex: 1;
				justify-content: center;
				.grade {
					margin-left: 10upx;
					font-size: 28upx;
					font-family: PingFangSC-Medium;
					font-weight: 500;
					color: #FF6B6B;
				}

				.grade_title {
					font-size: 24upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: #444444;
				}
			}
		}

		.gradelist {
			margin-top: 20upx;
			background: #FFFFFF;

			.grade_item {
				padding: 20upx 24upx;
				box-sizing: border-box;
				display: flex;
				flex: row;

				.img_user {
					width: 70upx;
					height: 70upx;
					border-radius: 35upx;
				}

				.item_right {
					width: 100%;
					margin-left: 10upx;

					.item_header {
						.flex-row-between;
						width: 100%;

						.item_header_name {
							height: 36upx;
							font-size: 26upx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: #333333;
							line-height: 36upx;
						}

						.item_header_time {
							height: 28px;
							font-size: 24px;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: #666666;
							line-height: 28px;
						}
					}

					.grade_content {
						margin-top: 20upx;
						font-size: 28px;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
						line-height: 40px;
					}
				}
			}
		}




	}
</style>

<template>
	<view class="content">
		<view class="shop-header">
			<view class="left">
				<view class="shop-logo">
					<image src="../../../static/main/avatar.png" mode=""></image>
				</view>
				<view class="shop-info">
					<view class="name">利强水店</view>
					<view class="score-wrapper">
						<view class="score">评分4.5</view>
						<view class="saleinfo">月售6555单</view>
					</view>
				</view>
			</view>
			<view class="right">
				<image class="share" src="../../../static/main/share.png" mode="aspectFit"></image>
				<image class="fav" src="../../../static/main/favourite.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="shop-content">
			<view class="tab-wrapper">
				<view v-for="(tab,index) in tabs" :key='index'>
					<view class="tab-item" @click="changeTab(index)">
						<view class="line" v-if="tab.index===activeTabIndex"/>
						<view class="title">
							{{tab.title}}
						</view>
					</view>
				</view>
			</view>
			<swiper class="swiper" :current="activeTabIndex" :autoplay="false" @change="swiperChange">
				<swiper-item>
					<view class="swiper-item uni-bg-red">A</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-green">B</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item uni-bg-blue">C</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [{
						title: '购物',
						index: 0
					},
					{
						title: '评价',
						index: 1
					},
					{
						title: '商家',
						index: 2
					}
				],
				activeTabIndex:0
			};
		},
		methods:{
			changeTab(index){
				this.activeTabIndex = index ;
			},
			swiperChange(e){
				this.activeTabIndex =  e.detail.current ;
			}
		}
	}
</script>

<style lang="less">
	.content {
		padding: 0;

		.shop-header {
			padding: 0 24upx;
			height: 192upx;
			background-color: aqua;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.left {
				display: flex;
				flex-direction: row;

				.shop-logo {
					image {
						width: 100upx;
						height: 100upx;
					}
				}

				.shop-info {
					margin-left: 20upx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.name {
						color: #333;
						font-size: 30upx;
					}

					.score-wrapper {
						display: flex;
						flex-direction: row;

						.score {
							font-size: 24upx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: #FFB30A;
						}

						.saleinfo {

							font-size: 18upx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: rgba(136, 136, 136, 1);
						}
					}
				}

			}

			.right {
				display: inline-block;

				.fav {
					width: 44upx;
					height: 38upx;
				}

				.share {
					width: 40upx;
					height: 40upx;
					margin-right: 36upx;

				}
			}
		}

		.shop-content {
			height: 100%;

			.tab-wrapper {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-around;
				background-color: #fff;
				height: 84upx;

				.tab-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					// justify-content: space-around;
					height: 84upx;
					position: relative;

					.line {
						position: absolute;
						bottom: 0;
						height: 2px;
						width: 52upx;
						background-color: #7CA7D2;
					}

					.title {
						color: #333;
						font-size: 24upx;
						line-height: 84upx;
					}
				}
			}

			.swiper {
				height: 100%;
				background-color: #FFB30A;
			}
		}
	}
</style>

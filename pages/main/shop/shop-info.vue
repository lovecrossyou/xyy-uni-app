<template>
	<view class="info">
		<view class="shop-summary">
			<view class="item">
				<image class="item-logo" :src="item_icon"></image>
				<view class="item-title">
					店铺信息
				</view>
			</view>
		</view>
		<view class="shop-address">
			<view class="item">
				<image class="item-logo" :src="item_icon"></image>
				<view class="item-title">
					地址
				</view>
			</view>
			<view class="item-content">
				{{shopInfo.address||''}}
			</view>
		</view>

		<view class="shop-phone">
			<view class="item">
				<image class="item-logo" :src="item_icon"></image>
				<view class="item-title">
					座机
				</view>
			</view>
			<view class="item-content">
				{{shopInfo.phone}}
			</view>
		</view>
		<view class="shop-phone">
			<view class="item">
				<image class="item-logo" :src="item_icon"></image>
				<view class="item-title">
					移动电话
				</view>
			</view>
			<view class="item-content">
				{{shopInfo.phone}}
			</view>
		</view>
		<view class="shop-opentime">
			<view class="item">
				<image class="item-logo" :src="item_icon"></image>
				<view class="item-title">
					营业时间
				</view>
			</view>
			<view class="item-content">
				{{shopInfo.opening_hours}}
			</view>
		</view>
		
		<view class="shop-summary">
			<view class="item">
				<image class="item-logo" :src="item_icon"></image>
				<view class="item-title">
					店铺简介
				</view>
			</view>
		</view>
		<view class="jianjie">
			{{shopInfo.description}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			shopInfo: Object,
		},
		data() {
			return {
				item_icon: "../../../static/shop/icon_shop_info_item.png"
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../../common/mixin.less";

	.info {
		padding: 0 30upx;
		background-color: white;

		.shop-summary {
			margin-bottom: 10upx;
			border-bottom: solid 1upx #e1e1e1;

			.item {
				height: 90upx;
				display: flex;
				flex-direction: row;
				align-items: center;

				.item-logo {
					width: 29upx;
					height: 22upx;
				}

				.item-title {
					font-size: 26upx;
					color: #333;
					margin-left: 15upx;
					font-weight: 500;
				}
			}

			.item-content {
				margin-bottom: 30upx;
				font-size: 24upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(85, 85, 85, 1);

			}
		}

		.shop-address {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-bottom: solid 1upx #e1e1e1;

			.item {
				height: 90upx;
				display: flex;
				flex-direction: row;
				align-items: center;

				.item-logo {
					width: 29upx;
					height: 22upx;
				}

				.item-title {
					font-size: 26upx;
					color: #333;
					margin-left: 15upx;
					font-weight: 500;
				}
			}

			.item-content {
				font-size: 24upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(85, 85, 85, 1);

			}
		}

		.shop-phone {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-bottom: solid 1upx #e1e1e1;

			.item {
				height: 90upx;
				display: flex;
				flex-direction: row;
				align-items: center;

				.item-logo {
					width: 29upx;
					height: 22upx;
				}

				.item-title {
					font-size: 26upx;
					color: #333;
					margin-left: 15upx;
					font-weight: 500;
				}
			}

			.item-content {
				font-size: 24upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #7ca7d2;

			}
		}

		.shop-opentime {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-bottom: solid 1upx #e1e1e1;

			.item {
				height: 90upx;
				display: flex;
				flex-direction: row;
				align-items: center;

				.item-logo {
					width: 29upx;
					height: 22upx;
				}

				.item-title {
					font-size: 26upx;
					color: #333;
					margin-left: 15upx;
					font-weight: 500;
				}
			}

			.item-content {
				font-size: 24upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(85, 85, 85, 1);

			}
		}
	
	     .jianjie{
			 padding-top: 20upx;
			 box-sizing: border-box;
			 font-size: 24upx;
			 font-family: PingFangSC-Regular;
			 font-weight: 400;
			 color: #7ca7d2;
		 }
	}
</style>

<template>
	<view class="content">
		<view class="shop-wrapper" v-for="(cart,index) in carts" :key='index'>
			<view class="header">
				<uni-list-item title="家乐福"></uni-list-item>
			</view>
			<view class="product-list">
				<view class="product-item">
					<view class="icon">
						<image v-bind:src="p_icon" mode="aspectFit"></image>
					</view>
					<view class="price">
						¥ 12.00
					</view>
				</view>
				<view class="product-item">
					<view class="icon">
						<image v-bind:src="p_icon" mode="aspectFit"></image>
					</view>
					<view class="price">
						¥ 12.00
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'

	export default {
		components: {
			uniListItem
		},
		data() {
			return {
				p_icon: '../../static/shop/p_001.png',
				carts:[1,2,3]
			};
		}
	}
</script>

<style lang="less">
	.shop-wrapper {
		// height: 260upx;
		width: 100%;

		.header {
			// height: 60upx;
		}

		.product-list {
			display: flex;
			flex-direction: row;
			height: 200upx;
			// padding: 40upx 20upx;
			box-sizing: border-box;
			align-items: center;

			.product-item {
				// height: 192upx;
				width: 160upx;
				padding: 20upx 10upx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				.icon {
					image {
						width: 120upx;
						height: 120upx;
						border: solid 2upx #666;
					}
				}

				.price {
					color: #666;
					font-size: 24upx;
				}
			}
		}
	}
</style>

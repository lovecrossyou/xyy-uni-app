<template>
	<view class="content">
		<view class="shop-wrapper" v-for="(cart,index_cart) in carts" :key='index_cart'>
			<view class="header">
				<uni-list-item title="家乐福"></uni-list-item>
			</view>
			<view class="product-list" v-for="(p,index) in cart.products" :key="index">
				<view class="product-item">
					<view class="icon">
						<image v-bind:src="p.headImage" mode="aspectFit"></image>
					</view>
					<view class="price">
						¥ {{p.price}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import {
		mapGetters
	} from 'vuex'

	export default {
		components: {
			uniListItem
		},
		computed: {
			...mapGetters({
				"carts": 'cart/productsOrderByShop'
			})
		},
		data() {}
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

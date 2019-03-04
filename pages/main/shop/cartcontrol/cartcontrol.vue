<template>
	<view class="control-wrapper">
		<image v-show="food.count>0" class="icon" :src="minus_icon" mode="aspectFit" @click.stop.prevent="decreaseCart"></image>
		<view v-show="food.count > 0" class="number">
			{{food.count}}
		</view>
		<image class="icon" :src="add_icon" mode="aspectFit" @click.stop.prevent="addCart"></image>
	</view>
</template>

<script>
	import Vue from 'vue';
	export default {
		props: {
			food: Object,
			shopInfo: Object
		},
		data() {
			return {
				add_icon: '../../../static/shop/icon_add.png',
				minus_icon: '../../../static/shop/icon_minus.png'
			}
		},
		methods: {
			addCart(event) {
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1); // 向对象/数组添加是非响应的，强制响应
				} else {
					this.food.count++;
				};
				this.$store.commit('cart/addCart', {
					shop: this.shopInfo,
					product: this.food
				});
			},
			decreaseCart() {
				if (this.food.count) {
					this.food.count--;
				}
				this.$store.commit('cart/decrease', {
					shop: this.shopInfo,
					product: this.food
				});
			}
		}

	}
</script>

<style lang="less" scoped>
	.control-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		height: 40upx;
		width: 180upx;

		.icon {
			width: 40upx;
			height: 40upx;
			overflow: hidden;
		}

		.number {
			font-size: 28upx;
			color: #333;
			width: 30%;
			text-align: center;
			line-height: 40upx;
		}
	}
</style>

<template>
	<view class="control-wrapper">
		<image v-show="foods.count>0" class="icon" :src="minus_icon" mode="aspectFit" @click.stop.prevent="decreaseCart"></image>
		<view v-show="foods.count > 0" class="number">
			{{foods.count}}
		</view>
		<image class="icon" :src="add_icon" mode="aspectFit" @click.stop.prevent="addCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, foods.specfoods[0].price, '', foods.specfoods[0].packing_fee, foods.specfoods[0].sku_id, foods.specfoods[0].stock)"></image>
	</view>
</template>

<script>
	import Vue from 'vue';
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		props:['foods', 'shopId'],
		data() {
			return {
				add_icon: '../../../static/shop/icon_add.png',
				minus_icon: '../../../static/shop/icon_minus.png'
			}
		},
		computed: {
			...mapState([
				'cartList'
			]),
		},
		methods: {
			...mapMutations([
				'ADD_CART', 'REDUCE_CART',
			]),
			addCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock) {
				if (!this.foods.count) {
					Vue.set(this.foods, 'count', 1); // 向对象/数组添加是非响应的，强制响应
				} else {
					this.foods.count++;
				};
				this.ADD_CART({
					shopid: this.shopId,
					category_id,
					item_id,
					food_id,
					name,
					price,
					specs,
					packing_fee,
					sku_id,
					stock
				});

				// 				this.$store.commit('cart/addCart', {
				// 					shop: this.shopInfo,
				// 					product: this.food
				// 				});
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

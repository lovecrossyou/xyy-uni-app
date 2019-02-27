<template>
	<view class="control-wrapper">
		<image v-show="food.count>0" class="icon" v-bind:src="minus_icon" mode="aspectFit" @click.stop.prevent="decreaseCart"></image>
		<view v-show="food.count > 0" class="number">
			{{food.count}}
		</view>
		<image class="icon" v-bind:src="add_icon" mode="aspectFit" @click.stop.prevent="addCart"></image>
	</view>
</template>

<script>
	import Vue from 'vue';
	export default {
		props: {
			food: Object
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
				this.$emit('add', event.target); // 触发当前实例上的事件，以便父元素@监听子元素。将点击的元素传入
			},
			decreaseCart() {
				if (this.food.count) {
					this.food.count--;
				}
			}
		}

	}
</script>

<style lang="less">
	.control-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		height: 40upx;
		width: 180upx;

		.icon {
			width: 50upx;
			height: 50upx;
			overflow: hidden;
		}

		.number {
			font-size: 28upx;
			color: #333;
		}
	}
</style>

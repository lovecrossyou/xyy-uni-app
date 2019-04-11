<template>
	<div class="water_store_item">
		<div class="water_store_item_title_c">
			<image class="water_store_item_img" :src="cart.restaurant_info.image_path" />
			<div class="water_store_item_title">{{cart.restaurant_info.name}}</div>
		</div>

		<view class="items">
			<block v-for="(item,index) in cart.groups[0]" v-bind:key="index">
				<div class="water_store_item_count_c">
					<div class="water_store_item_count">{{item.name}}</div>
					<div class="water_store_item_count">x {{item.quantity}}</div>
					<div class="water_store_item_money">¥{{item.price}}</div>
				</div>
			</block>
		</view>

	</div>
</template>

<script>
	export default {
		props: ['shopProduct', 'cart'],
	}
</script>

<style lang="less" scoped>
	.row_center {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.row_between {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.water_store_item {
		// .row_between;
		width: 100%;
		padding-top: 20px;
		box-sizing: border-box;

		.water_store_item_title_c {
			.row_center;
			padding-bottom: 20upx;
			box-sizing: border-box;
			flex: 1;
			.items{
				display: flex;
				flex-direction: column;
				padding: 10upx 0;
			}

			.water_store_item_img {
				width: 88px;
				height: 88px;
			}

			.water_store_item_title {
				margin-left: 20px;
				font-size: 24px;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}
		}

		.water_store_item_count_c {
			.row_between;
			flex: 1;

			.water_store_item_count {
				margin-left: 20px;
				font-size: 24px;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}

			.water_store_item_money {
				font-size: 24px;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}

		}

	}
</style>

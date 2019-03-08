<template>
	<view class="shoppingcar">
		<view class="shopitem" v-for="(shop,index) in carts" :key="index" @click="toDetail(shop.shopId)">
			<view class="shop_header">
				<view class="header-text">{{ shop.shopName }}</view>
				<uni-icon type="arrowright" size="24" color="#9a9a9a"></uni-icon>
			</view>
			<view  class="shop_content" v-for="(product,indexP) in shop.products" :key="indexP" :id="product.id">
						<image :src="product.headImage" mode="aspectFit"></image>
						<view class="product_info">
							<view class="info_top">
								<view class="product_name">{{ product.headName }}</view>
								<view class="product_des">{{ product.productDescribe || "真香" }}</view>
							</view>
							<view class="product_price">￥{{ product.price }}</view>
						</view>
						<view class="delete_product" v-on:click.stop.prevent="deletePro">
							<image src="../../static/img/delete_cart.png"></image>
						</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import checkBox from './custom-checkbox.vue'
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import {
		mapGetters
	} from 'vuex'
export default {
	onShow() {
		
		console.log("cart",JSON.stringify(this.carts))	
	},
	methods: {
		
		// 删除商品
		deletePro(){
			uni.showToast({
				icon:"none",
				title:"删除"
			})
		},
		toDetail(shopId){
// 			uni.showToast({
// 				icon:"none",
// 				title:"去详情"
// 			})
			uni.navigateTo({
				url: "../main/shop/shop?shopId="+shopId
			})
		}
		//?shopId=shop.id
	},
	components:{
		checkBox,
		uniIcon
	},
	computed: {
		
		...mapGetters({
			"carts": 'cart/productsOrderByShop'
		}),
	},
};
</script>

<style lang="less" scoped>
	.numInput {
		overflow: hidden;
		float: right;
		text {
			float: left;
			color: #999;
			font-size: 22upx;
			line-height: 50upx;
		}
		input {
			display: inline-block;
			width: 80upx;
			float: left;
			text-align: center;
			color: #999;
		}
		.numbox-disabled {
			color: #c0c0c0;
		}
	}
	
	.shoppingcar{
		background-color: #F2F2F2;
		width: 100%;
		.shopitem{
			margin: 14upx 20upx;
			border-radius:10upx;
			background-color: #ffffff;
			.shop_header{
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 19upx;
				box-sizing: border-box;
				justify-content: space-between;
				border-bottom: 1upx #E0E0E0 solid;
				.header-text{
					font-size:28px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(34,34,34,1);
				}
			}
			.shop_content{
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 19upx;
				box-sizing: border-box;
				border-bottom: 1upx #E0E0E0 solid;
				image{
					width: 140upx;
					height: 140upx;
				}
				.product_info{
					display: flex;
					flex: 1;
					height: 140upx;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 20upx;
					.info_top{
						.product_name{
							font-size:26px;
							font-family:PingFangSC-Regular;
							font-weight:400;
							color:rgba(51,51,51,1);
						}
						.product_des{
							margin-top: 10upx;
							font-size:22px;
							font-family:PingFangSC-Regular;
							font-weight:400;
							color:rgba(102,102,102,1);
						}
					}
					.product_price{
						font-size:26px;
						font-family:PingFangSC-Regular;
						font-weight:400;
						color:rgba(34,34,34,1);
					}
				}
				.delete_product{
					display: flex;
					width: 36upx;
					height: 140upx;
					image{
						width: 36upx;
						height: 36upx;
						align-self: flex-end;
					}
				}
			}
		}
		
		
		
	}
</style>

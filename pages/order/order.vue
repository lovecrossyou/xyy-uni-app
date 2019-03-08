<template>
	<view class="shoppingcar">
		<view class="shopitem" v-for="(shop,index) in orders" :key="index" @click="toDetail(shop.shopId)">
			<view class="shop_header">
				<view class="order_shop_name">
					<image src="../../static/img/order_shop_icon.png"></image>
					<view class="header-text">{{ shop.shopName }}</view>
				</view>
				<view class="order_status_des">交易完成</view>
			</view>
			
				<view class="shop_content" v-for="(product,indexP) in shop.products" :key="indexP" :id="product.id">
					<view class="product_container">
						<image :src="product.headImage" ></image>
						<view class="product_info">
							<view class="product_name">{{ product.headName }}</view>
							<view class="product_price">￥{{ product.price }}</view>
						</view>
					</view>
					<view v-if="indexP< shop.products.length-1"  class="space_line"></view>
					
				</view>
			
			
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import {
		mapGetters
	} from 'vuex'
export default {
	onShow() {
		
		console.log("cart",JSON.stringify(this.carts))	
	},
	data(){
		return{
			orders:[
				{
					"shopId":"13",
					"shopName":"第一个店铺",
					"products":[
						{
							"id":8,
							"shopId":13,
							"headName":"西腾山区卡滚泉水",
							"price":99,
							"saleAmount":0,
							"spec":"10",
							"headImage":"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1671204792,3567887483&fm=58",
							"productDescribe":"无理由",
							"shopName":"第一个店铺"
						},
						{
							"id":8,
							"shopId":13,
							"headName":"002",
							"price":99,
							"saleAmount":0,
							"spec":"10",
							"headImage":"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1671204792,3567887483&fm=58",
							"productDescribe":"无理由",
							"shopName":"第一个店铺"
						},
						{
							"id":8,
							"shopId":13,
							"headName":"002",
							"price":99,
							"saleAmount":0,
							"spec":"10",
							"headImage":"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1671204792,3567887483&fm=58",
							"productDescribe":"无理由",
							"shopName":"第一个店铺"
						},
						{
							"id":8,
							"shopId":13,
							"headName":"002",
							"price":99,
							"saleAmount":0,
							"spec":"10",
							"headImage":"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1671204792,3567887483&fm=58",
							"productDescribe":"无理由",
							"shopName":"第一个店铺"
						}
					]
				},
				{
					"shopId":"13",
					"shopName":"第一个店铺",
					"products":[
						{
							"id":8,
							"shopId":13,
							"headName":"002",
							"price":99,
							"saleAmount":0,
							"spec":"10",
							"headImage":"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1671204792,3567887483&fm=58",
							"productDescribe":"无理由",
							"shopName":"第一个店铺"
						},
						{
							"id":8,
							"shopId":13,
							"headName":"002",
							"price":99,
							"saleAmount":0,
							"spec":"10",
							"headImage":"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1671204792,3567887483&fm=58",
							"productDescribe":"无理由",
							"shopName":"第一个店铺"
						}
					]
				},
				
			]
		}
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
			uni.navigateTo({
				url: "../main/shop/shop?shopId="+shopId
			})
		}
		//?shopId=shop.id
	},
	components:{
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
				.order_shop_name{
					display: flex;
					flex-direction: row;
					align-items: center;
					image{
						width: 34upx;
						height: 30upx;
						margin-right: 20upx;
					}
					.header-text{
						font-size:28px;
						font-family:PingFangSC-Regular;
						font-weight:400;
						color:rgba(34,34,34,1);
					}
				}
				.order_status_des{
					font-size:28px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(62,135,235,1);
				}
				
			}
			.shop_content{
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 20upx;
				box-sizing: border-box;
				width: 100%;
				
				.space_line{
					margin-top: 20upx;
					width: 100%;
					height: 1upx;
					background-color: #E0E0E0;
				}
				.product_container{
					display: flex;
					flex-direction: row;
					align-items: center;
					width: 100%;
					image{
						width: 140upx;
						height: 140upx;
					}
					.product_info{
						display: flex;
						flex: 1;
						height: 140upx;
						flex-direction: row;
						align-items: center;
						justify-content: space-between;
						margin-left: 20upx;
						.product_name{
							font-size:26px;
							font-family:PingFangSC-Regular;
							font-weight:400;
							color:rgba(51,51,51,1);
						}
						.product_price{
							font-size:26px;
							margin-right: 18upx;
							font-family:PingFangSC-Regular;
							font-weight:400;
							color:rgba(34,34,34,1);
						}
					}
				}
					
			}
		}
	}
</style>

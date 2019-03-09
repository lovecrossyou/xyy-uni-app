<template>
	<view class="shoppingcar">
		<view class="shopitem" v-for="(shop,index) in orders" :key="index" @click="toDetail(shop.shopId)">
			<view class="shop_header">
				<view class="order_shop_name">
					<image src="../../static/img/order_shop_icon.png"></image>
					<view class="header-text">{{ shop.shopName }}</view>
				</view>
				<view class="order_status_des">{{shop.statusContent}}</view>
			</view>
				<view class="shop_content" v-for="(product,indexP) in shop.items" :key="indexP" :id="product.id">
					<view class="product_container">
						<image :src="product.productImage||'https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=1320726089,2981856556&fm=85&s=DA2AA2451411586754BD75F10300C025'" ></image>
						<view class="product_info">
							<view class="product_name">{{ product.productName }}</view>
							<view class="product_price">￥{{ product.productPrice/100 }}</view>
						</view>
					</view>
					<view  v-if="indexP < shop.items.length-1"  class="space_line"></view>
				</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import orderApi from "@/util/apis/order.js"
	import {
		mapGetters
	} from 'vuex'
export default {
	onShow() {
		console.log("cart",JSON.stringify(this.carts))	
	},
	data(){
		return{
			orders:[],
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
		},
		async requestList(){
			const listRes = await orderApi.requestOrderList({});
			console.log("listRes",JSON.stringify(listRes));
			if(listRes.status === 'ok'){
				this.orders = listRes.data.content;
			}
			
		}
		//?shopId=shop.id
	},
	onShow() {
		this.requestList();
	},
	components:{
		uniIcon
	},
	computed: {
// 		getImgStr( imgstr){
// 			return imgstr || "https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=1320726089,2981856556&fm=85&s=DA2AA2451411586754BD75F10300C025"
// 		}
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
				position: relative;
				.space_line{
					position: absolute;
					bottom: 1upx;
					width: calc(100% - 40upx);
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

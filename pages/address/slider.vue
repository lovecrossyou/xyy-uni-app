<template>
	<view class="shoppingcar" :style="minHeight">
		<view class="dianpu" v-for="(item,index) in shopData" :key="index">
			<scroll-view scroll-x="true" class="scrollView" 
			v-for="(ite,ind) in item.data"
			:key="ind"
			:id="ite.pro_id"
			:scroll-left="ite.scrollLeft" 
			@touchstart="touchS"
			@touchend="touchE">
				<view class="viewbox">
					<view class="shangpin" >
						<!-- <view class="shangpin-info">
						</view> -->
					</view>
					<view class="hong" @tap="deletePro(ite.pro_id)">删除</view>
				</view>
			</scroll-view>
			<!-- <view class="jiesuan">
				<view class="yuefei">运费：￥{{ item.yunfei }}</view>
				<view class="zongji">总计：￥{{ item.price | totalprice(item.pro_count)}}</view>
			</view> -->
		</view>
		
		
		<!-- 底部结算 -->
		<view class="bottom-jiesuan">
			<view class="info">
				<view class="allSelectText">
					<checkBox :isselected="isCheckAll" @change="allCheck"></checkBox>
					<view class="allText">全选</view>
				</view>
				<view>
					总计：<text>￥{{ allPrice }}</text>
				</view>
			</view>
			<view class="btn" @tap="jiesuan">结算</view>
		</view>
		
	</view>
</template>

<script>
	import checkBox from './custom-checkbox.vue'
	var startX=0;
	var endX=0;
export default {
	data() {
		return {
			// 全选，返回
			isCheckAll:false,
			allPrice: 0, //所有价格
			allShops: 0, //被选中的商店数量
			allCount: 0, //被选中的产品数量
			shopData:[
					{
						'shop_name':'香奈儿专营店',
						'checked':false,
						'yunfei':10,
						'price':300,
						checkedCount:0,
						'data':[
							{
								pro_id:1,
								pro_name:' 香奈儿可可小姐淡香水 50ml',
								pro_name2:' (又名：香奈儿 可可小姐淡香水（瓶装）50ml)',
								reduce_price:16,
								now_price:100,
								pro_count:1,
								pro_img:'../../static/index/category1.png',
								isChecked:false,
								// 滚动条
								scrollLeft:0,
							},
							{
								pro_id:2,
								pro_name:' 香奈儿可可小姐淡香水 50ml',
								pro_name2:' (又名：香奈儿 可可小姐淡香水（瓶装）50ml)',
								reduce_price:16,
								now_price:100,
								pro_count:1,
								pro_img:'../../static/index/category1.png',
								isChecked:false,
								// 滚动条
								scrollLeft:0,
							}
						],
					},
					{
						'shop_name':'香奈儿专营店',
						'checked':false,
						'yunfei':12,
						'price':500,
						checkedCount:0,
						'data':[
							{
								pro_id:3,
								pro_name:' 香奈儿可可小姐淡香水 50ml',
								pro_name2:' (又名：香奈儿 可可小姐淡香水（瓶装）50ml)',
								reduce_price:16,
								now_price:100,
								pro_count:1,
								pro_img:'../../static/index/category1.png',
								isChecked:false,
								// 滚动条
								scrollLeft:0,
							}
						]
					}
				],
		};
	},
	methods: {
		touchS(e){
			startX=e.mp.changedTouches[0].clientX;
		},
		touchE(e){
			endX=e.mp.changedTouches[0].clientX;
			if(Math.abs(endX-startX)>10){
				if(endX-startX>0){
					this.shopData.forEach((item) => {
						item.data.forEach((goods) => {
							if(goods.pro_id==e.currentTarget.id){
								goods.scrollLeft=0;
							}
						})
					})
				}else{
					this.shopData.forEach((item) => {
						item.data.forEach((goods) => {
							if(goods.pro_id==e.currentTarget.id){
								goods.scrollLeft=100;
							}
						})
					})
				}
			}
		},
		// 单击结算
		jiesuan(){
			console.log('跳转到支付详情页面');
			uni.navigateTo({
				url: '/pages/my/zhifu',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		// 点击选中与取消===店铺,(选中店铺的所有商品)
		shopActive(item) {
			!item.checked ? this._shopTrue(item) : this._shopFalse(item);
		},
		_shopTrue(item) {
			//遍历商店每一个商品，状态为false的改变为true，又在_checkTrue()方法中将商店状态改为true
			item.data.forEach((pro,index) => {
				pro.isChecked === false ? this._checkTrue(item,pro) : ''
			})
		},
		_shopFalse(item) {
			item.data.forEach((pro,index) => {
				pro.isChecked === true ? this._checkFalse(item,pro) : ''
			})
		},
		// 点击取消选中商品
		proActive(item,pro) {
			pro.isChecked ? this._checkFalse(item,pro) : this._checkTrue(item,pro)
		},
		_checkTrue(item,pro) {
			pro.isChecked = true;
			++item.checkedCount == item.data.length ? item.checked = true : ''
			//每选中一个商品，被选中的商品数加一，如果数值等于商品数，商店的全选状态为true
			item.checked ? ++this.allShops === this.shopData.length ? this.isCheckAll = true : this.isCheckAll = false : ''
			//当商店全选状态，每全选一个商店，被选中商店数加一，数值等于所有商店数，全选状态为true
		},
		_checkFalse(item,pro) {
			pro.isChecked = false;
			//被选中的商品数减一
			--item.checkedCount
			if(item.checked) {
				item.checked = false
				--this.allShops 
			}
			this.isCheckAll = false;
		},
		// 全选
		allCheck() {
			this.isCheckAll = !this.isCheckAll;
			this.isCheckAll ? 
			this.shopData.forEach((item) => {this._shopTrue(item)}) : 
			this.shopData.forEach((item) => {this._shopFalse(item)})
		},
		changeCount(val,way) {
			if(way > 0) {
				val.pro_count++;
			} else {
				val.pro_count--;
				if(val.pro_count < 0) {
					val.pro_count = 0;
				}
			}
		},
		// 每次调用此方法，将初始值为0，便利价格并累加
		_totalPrice() {
			this.allPrice = 0;
			this.shopData.forEach(item => {
				let products = item.data;
				products.forEach(pros => {
					if(pros.isChecked) {
						this.allPrice += pros.now_price * pros.pro_count;
					}
				});
			});
		},
		_totalCount() {
			this.allCount = 0;
			this.shopData.forEach(item => {
				this.allCount += item.checkedCount;
			});
		},
		// 删除商品
		deletePro(id){
			
		}
	},
	components:{
		checkBox
	},
	// 单间商品的价格 x 数量
	filters:{
		totalprice(price,count) {
			console.log('当前项',price,count);
			return price * count;
		}
	},
	computed: {
		minHeight() {
			var systemInfo = uni.getSystemInfoSync();
			return `min-height:${systemInfo.windowHeight}px`;
		}
	},
	watch: { //深度监听所有数据，每次改变重新计算总价和总数
		shopData: {
			deep: true,
			handler(val, oldval) {
				this._totalPrice()
				this._totalCount()
			}
		}
	}
};
</script>

<style lang="scss">
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
		background-color: #FAFAFA;
		padding-bottom: 98upx;
	}
	.shoppingcar .dianpu{
		background-color: #FFFFFF;
		margin-bottom: 20upx;
	}
	.shoppingcar .dianpu .dianpu-name{
		height: 70upx;
		box-sizing: border-box;
		padding: 20upx 32upx;
		border-bottom: 1px solid #FAFAFA;
		display: flex;
		margin-top: 1upx;
	}
	.shoppingcar .dianpu .select,
	.shoppingcar .dianpu .select-active{
		flex-shrink:0;
	}
	.shoppingcar .dianpu .dianpu-name .iconfont{
		font-size: 45upx;
		color: #FF6B94;
		line-height: 32upx;
		margin-right: 8upx;
	}
	.shoppingcar .dianpu .dianpu-name .text{
		font-size: 24upx;
		color: #333333;
		line-height: 31upx;
	}
	.shoppingcar .dianpu .shangpin{
		width: 750upx;
		padding: 22upx 32upx;
		display: flex;
		border-bottom: 1px solid #FAFAFA;
	}
	.shoppingcar .dianpu .shangpin .select,
	.shoppingcar .dianpu .shangpin .select-active{
		margin-top: 40upx;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info{
		display: flex;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .img{
		width: 108upx;
		height: 108upx;
		margin-right: 10upx;
		flex-shrink:0;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .img image{
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 8upx;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .text-info .title-text{
		line-height: 34upx;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .text-info .title-text .biaoqian{
		color: #FD395B;
		font-size: 24upx;
		margin-right: 10upx;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .text-info .title-text .name{
		color: #333;
		font-size: 24upx;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .text-info .title-text .bieming{
		color: #333;
		font-size: 20upx;
		margin: 0 6upx;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .text-info .title-text .youhui{
		color: #FD395B;
		font-size: 24upx;
		float: right;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .text-info .jiage{
		font-size: 22upx;
		color: #999999;
		display: inline-block;
	}
	.shoppingcar .dianpu .shangpin .shangpin-info .text-info .jiage .danjia{
		color: #FD395B;
		margin-right: 10upx;
	}
	.shoppingcar .dianpu .jiesuan{
		padding: 30upx 30upx 30upx;
		color: #333333;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		box-sizing: border-box;
	}
	.shoppingcar .dianpu .jiesuan .yuefei,
	.shoppingcar .dianpu .jiesuan .zongji{
		font-size: 22upx;
		lighting-color: 40upx;
	}
	.shoppingcar .bottom-jiesuan{
		width: 100%;
		height: 98upx;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		display: flex;
		box-shadow:0px 0px 4upx 0px rgba(0,0,0,0.1);
	}
	.shoppingcar .bottom-jiesuan .info{
		box-sizing: border-box;
		padding: 0 30upx;
		width: 510upx;
		font-size: 24upx;
		color: #333333;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
	}
	.shoppingcar .bottom-jiesuan .info view{
		line-height: 105upx;
	}
	.shoppingcar .bottom-jiesuan .info .select,
	.shoppingcar .bottom-jiesuan .info .select-active{
		display: inline-block;
		vertical-align: middle;
	}
	.shoppingcar .bottom-jiesuan .info text{
		line-height: 98upx;
		color: #FD395B;
	}
	.shoppingcar .bottom-jiesuan .btn{
		width: 240upx;
		line-height: 98upx;
		color: #FFFFFF;
		font-size: 30upx;
		text-align: center;
		background-color: #FD395B;
	}
	/* 全选的文字 */
	.allSelectText {
		float: left;
		overflow: hidden;
		width: 200upx;
		.allText {
			float: left;
		}
	}
	.allSelectText > view:first-child {
		display: inline-block;
		float: left;
	} 
	.scrollView{
		width: 100%;
	}
	.scrollView .viewbox{
		width:  calc(100% + 200upx) ;
		height: 200upx;
		display: flex;
	}
	.scrollView .hong{
		width: 200upx;
		background-color: red;
		color: #FFFFFF;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>

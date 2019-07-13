<template>
	<view class="content">
		<view v-if="shopDetailData" class="shop-header">
			<view class="bg"></view>
			<view class="left">
				<view class="shop-logo">
					<image v-bind:src="shopDetailData.image_path" mode="aspectFill"></image>
				</view>
				<view class="shop-info">
					<block>
						<view class="name">{{shopDetailData.name||""}}</view>
						<view class="score-wrapper">
							<view class="score">评价{{shopDetailData.rating}}</view>
							<view class="saleinfo">月售{{shopDetailData.recent_order_num}}单</view>
							<!-- <view class="time">30分钟送达</view> -->
						</view>
					</block>
				</view>
			</view>
			<view class="right">
				<image class="share" src="../../../static/main/share.png" mode="aspectFit"></image>
				<image class="fav" src="../../../static/main/favourite.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="shop-content">
			<swiper class="swiper" :current="activeTabIndex" :autoplay="false" @change="swiperChange">
				<block v-if="ratingScoresData">
					<swiper-item>
						<shop-info  :shopInfo="shopDetailData"></shop-info>
					</swiper-item>
				</block>
			</swiper>
		</view>

		<view class="footer">
			
			<view class="confirm-wrapper">
				<view class="limit" @click="toConfirmOrder">
					举报黑店
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import judgement from "./judgement.vue";
	import shopInfo from "./shop-info.vue";
	import goods from "./goods";
	import cartcontrol from "./cartcontrol/cartcontrol.vue"
	import {
		mapGetters,
		mapActions,
		mapMutations,
		mapState
	} from 'vuex'
	import {
		msiteAddress,
		shopDetails,
		foodMenu,
		getRatingList,
		ratingScores,
		ratingTags
	} from '@/util/service/getData.js'


	export default {
		data() {
			return {
				tabs: [{
						title: '购物',
						index: 0
					},
					{
						title: '评价',
						index: 1
					},
					{
						title: '商家',
						index: 2
					}
				],
				activeTabIndex: 0,
				animationData: {},
				showMenu: false,

				geohash: '39.92843,116.35073', //geohash位置信息
				shopId: null, //商店id值
				showLoading: true, //显示加载动画
				changeShowType: 'food', //切换显示商品或者评价
				shopDetailData: null, //商铺详情
				showActivities: false, //是否显示活动详情
				menuList: [], //食品列表
				menuIndex: 0, //已选菜单索引值，默认为0
				menuIndexChange: true, //解决选中index时，scroll监听事件重复判断设置index的bug
				shopListTop: [], //商品列表的高度集合
				TitleDetailIndex: null, //点击展示列表头部详情
				categoryNum: [], //商品类型右上角已加入购物车的数量
				totalPrice: 0, //总共价格
				cartFoodList: [], //购物车商品列表
				showCartList: false, //显示购物车列表
				receiveInCart: false, //购物车组件下落的圆点是否到达目标位置
				ratingList: null, //评价列表
				ratingOffset: 0, //评价获取数据offset值
				ratingScoresData: null, //评价总体分数
				ratingTagsList: null, //评价分类列表
				ratingTageIndex: 0, //评价分类索引
				preventRepeatRequest: false, // 防止多次触发数据请求
				ratingTagName: '', //评论的类型
				loadRatings: false, //加载更多评论是显示加载组件
				foodScroll: null, //食品列表scroll
				showSpecs: false, //控制显示食品规格
				specsIndex: 0, //当前选中的规格索引值
				choosedFoods: null, //当前选中视频数据
				showDeleteTip: false, //多规格商品点击减按钮，弹出提示框
				showMoveDot: [], //控制下落的小圆点显示隐藏
				windowHeight: null, //屏幕的高度
				elLeft: 0, //当前点击加按钮在网页中的绝对top值
				elBottom: 0, //当前点击加按钮在网页中的绝对left值
				ratingScroll: null, //评论页Scroll
			};
		},
		components: {
			judgement,
			shopInfo,
			goods,
			cartcontrol
		},
		watch: {
			shopCart: function(value) {
				this.initCategoryNum();
			},
			//购物车列表发生变化，没有商铺时，隐藏
			cartFoodList: function(value) {
				if (!value.length) {
					this.showCartList = false;
				}
			},
		},
		computed: {
			...mapState([
				'latitude', 'longitude', 'cartList'
			]),
			cart_icon() {
				// if (this.cartFoodList.length === 0) return "../../../static/shop/cart.png"
				return "../../../static/cart/cart.png"
			},
			//             promotionInfo: function (){
			//                 return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。'
			//             },
			//配送费
			deliveryFee: function() {
				if (this.shopDetailData) {
					return this.shopDetailData.float_delivery_fee;
				} else {
					return null;
				}
			},
			//还差多少元起送，为负数时显示去结算按钮
			minimumOrderAmount: function() {
				if (this.shopDetailData) {
					return this.shopDetailData.float_minimum_order_amount - this.totalPrice;
				} else {
					return null;
				}
			},
			//当前商店购物信息
			shopCart: function() {
				return { ...this.cartList[this.shopId]
				};
			},
			//购物车中总共商品的数量
			totalNum: function() {
				let num = 0;
				this.cartFoodList.forEach(item => {
					num += item.num
				})
				return num
			},
		},
		methods: {
			...mapMutations([
				'RECORD_ADDRESS', 'ADD_CART', 'REDUCE_CART', 'INIT_BUYCART', 'CLEAR_CART', 'RECORD_SHOPDETAIL'
			]),
			//初始化时获取基本数据
			async initData() {
				if (!this.latitude) {
					//获取位置信息
					let res = await msiteAddress(this.geohash);
					// 记录当前经度纬度进入vuex
					this.RECORD_ADDRESS(res);
				}
				//获取商铺信息
				this.shopDetailData = await shopDetails(this.shopId, this.latitude, this.longitude);
				//获取商铺食品列表
				this.menuList = await foodMenu(this.shopId);
				//评论列表
				this.ratingList = await getRatingList(this.shopId, this.ratingOffset);
				//商铺评论详情
				this.ratingScoresData = await ratingScores(this.shopId);
				//评论Tag列表
				this.ratingTagsList = await ratingTags(this.shopId);
				this.RECORD_SHOPDETAIL(this.shopDetailData);

				this.initCategoryNum();
			},
			toConfirmOrder() {
				if (this.cartFoodList.length === 0) return;
				uni.navigateTo({
					url: '../../order/makeSureOrder/MakeSureOrder?geohash='+this.geohash+'&shopId='+this.shopId
				})
			},
			popMenu() {
				var animation = uni.createAnimation({
					duration: 500,
					timingFunction: 'ease',
				})
				this.animation = animation
				animation.translateY(-200).step()
				this.animationData = animation.export()
				this.showMenu = true;
			},
			hiddeMenu() {
				var animation = uni.createAnimation({
					duration: 300,
					timingFunction: 'ease-in-out',
				})
				this.animation = animation
				animation.translateY(0).step()
				this.animationData = animation.export()
				this.showMenu = false;
			},
			changeTab(index) {
				this.activeTabIndex = index;
			},
			swiperChange(e) {
				this.activeTabIndex = e.detail.current;
			},

			initCategoryNum() {
				let newArr = [];
				let cartFoodNum = 0;
				this.totalPrice = 0;
				this.cartFoodList = [];
				this.menuList.forEach((item, index) => {
					console.log('item.foods[0] ', item.foods[0]);
					if (this.shopCart && item.foods.length!=0 && this.shopCart[item.foods[0].category_id]) {
						let num = 0;
						Object.keys(this.shopCart[item.foods[0].category_id]).forEach(itemid => {
							Object.keys(this.shopCart[item.foods[0].category_id][itemid]).forEach(foodid => {
								let foodItem = this.shopCart[item.foods[0].category_id][itemid][foodid];
								num += foodItem.num;
								if (item.type == 1) {
									this.totalPrice += foodItem.num * foodItem.price;
									if (foodItem.num > 0) {
										this.cartFoodList[cartFoodNum] = {};
										this.cartFoodList[cartFoodNum].category_id = item.foods[0].category_id;
										this.cartFoodList[cartFoodNum].item_id = itemid;
										this.cartFoodList[cartFoodNum].food_id = foodid;
										this.cartFoodList[cartFoodNum].num = foodItem.num;
										this.cartFoodList[cartFoodNum].price = foodItem.price;
										this.cartFoodList[cartFoodNum].name = foodItem.name;
										this.cartFoodList[cartFoodNum].specs = foodItem.specs;
										cartFoodNum++;
									}
								}
							})
						})
						newArr[index] = num;
					} else {
						newArr[index] = 0;
					}
				})
				this.totalPrice = this.totalPrice.toFixed(2);
				this.categoryNum = [...newArr];
			},
			//控制购物列表是否显示
			toggleCartList() {
				this.cartFoodList.length ? this.showCartList = !this.showCartList : true;
			},
			//清除购物车
			clearCart() {
				// this.toggleCartList();
				this.CLEAR_CART(this.shopId);
			},
		},
		onLoad: function(option) {
			this.shopId = option.shopId;
			this.initData();
		}
	}
</script>

<style lang="less">
	@footerHeight: 98upx;

	.content {
		padding: 0;
		margin: 0;
		position: relative;

		.shop-header {
			padding: 0 24upx;
			box-sizing: border-box;
			height: 240upx;
			background-color: #fff;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			position: relative;
			overflow: hidden;

			.bg {
				position: absolute;
				left: -10upx;
				right: -10upx;
				top: 0;
				height: 240upx;
				// width: 100%;
				filter: blur(8px);
				background: url('http://qnimage.xiteng.com/banner_002.jpg') no-repeat center;
				background-size: cover;
			}

			.left {
				display: flex;
				flex-direction: row;
				filter: blur(0px);

				.shop-logo {
					image {
						width: 140upx;
						height: 140upx;
					}
				}

				.shop-info {
					margin-left: 20upx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.name {
						color: #FFFFFF;
						font-size: 34upx;
					}

					.score-wrapper {
						display: flex;
						flex-direction: row;
						align-items: center;

						.score {
							font-size: 26upx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: #FFFFFF;
						}

						.saleinfo {
							font-size: 26upx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: #FFFFFF;
							padding: 0 16upx;
						}

						.time {
							font-size: 26upx;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: #FFFFFF;
						}
					}
				}

			}

			.right {
				display: inline-block;

				.fav {
					width: 44upx;
					height: 38upx;
				}

				.share {
					width: 40upx;
					height: 40upx;
					margin-right: 36upx;

				}
			}
		}

		.shop-content {
			// display: flex;
			flex: 1;
			// height: 100%;
			padding-bottom: @footerHeight;

			.tab-wrapper {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-around;
				background-color: #fff;
				height: 84upx;
				border-bottom: solid 1upx #E1E1E1;

				.tab-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					height: 84upx;
					position: relative;

					.line {
						position: absolute;
						bottom: 0;
						height: 4px;
						width: 52upx;
						background-color: #7CA7D2;
					}

					.title {
						color: #333;
						font-size: 24upx;
						line-height: 84upx;
					}
				}
			}

			.swiper {
				height: 100%;
				background-color: #fff;
			}
		}

		.footer {
			height: @footerHeight;
			background-color: #3e87eb;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			flex-direction: row;
			justify-content: center;

			.confirm-wrapper {
				width: 232upx;
				height: 100%;
				// background-color: #3e87eb;

				.limit {
					color: #fff;
					font-size: 32upx;
					line-height: @footerHeight;
					text-align: center;
				}

				.gray-limit {
					color: #fff;
					font-size: 32upx;
					line-height: @footerHeight;
					text-align: center;
					background-color: gray;
				}
			}

			.cart-wrapper {
				flex: 1;
				position: relative;
				width: 110upx;
				height: 110upx;

				image {
					margin-left: 24upx;
					width: 110upx;
					height: 110upx;
					position: absolute;
					top: -20upx;
					border-radius: 50%;

				}

				.totalPrice {
					font-size: 32upx;
					color: #fff;
					margin-left: 150upx;
					line-height: @footerHeight;
					// text-align: center;
				}

			}
		}

		.modal-shadow {
			background: rgba(0, 0, 0, .5);
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
		}

		.cart-modal {
			background-color: #fff;
			height: 400upx;
			width: 100%;
			position: fixed;
			bottom: -400upx;


			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 92upx;
				padding: 0 24upx;
				box-sizing: border-box;
				border-bottom: solid #E4E4E4 2upx;

				.left {
					font-weight: 500;
					font-size: 28upx;
					color: #333;
				}

				.right {
					font-size: 24upx;
					color: #3e87eb;
				}
			}

			.cart-list-items {
				// z-index: 11;
				height: 100%;
				padding-bottom: 92upx+24upx;
				box-sizing: border-box;

				.cart-list-item {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					padding: 0 24upx 0 34upx;
					height: 100upx;

					.title {
						font-size: 28upx;
						color: #333;
						font-weight: 400;
					}

					.right {
						// height: 100%;
						display: flex;
						flex-direction: row;
						align-items: center;

						// margin-right: 24upx;
						.price {
							// height: 100%;
							color: #E02C2C;
							font-size: 28upx;
							line-height: 100%;
						}
						.num{
							margin-left: 10upx;
							color: #999999;
							font-size: 24upx;
							line-height: 100%;
						}
					}
				}
			}
		}
	}
</style>

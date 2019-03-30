<template>
	<view>
		<view class="goods">
			<scroll-view scroll-y="true" class="menu-wrapper">
				<view class="menu-item" @click="selectMenu(index)" :class="{'current':currentIndex === index}" v-for="(item,index) in categories"
				 v-bind:key="item.id">
					<view class="title">
						{{item}}
					</view>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="foods-wrapper">
				<view class="title">
					{{currentTitle}}
				</view>
				<view class="food-list" v-for="(p,index) in currentProducts" :key='index'>
					<view class="food-item">
						<view class="icon">
							<image v-bind:src="p.mainImage" mode="aspectFill"></image>
						</view>
						<view class="content">
							<view class="name">
								{{p.name}}
							</view>
							<view class="desc">
								月售{{p.saleAmount}} 好评95%
							</view>
							<view class="price">
								¥{{p.price}}
							</view>
						</view>
						<view class="cartcontrol-wrapper">
							<cartcontrol :food="p"></cartcontrol>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import cartcontrol from "./cartcontrol/cartcontrol.vue"

	export default {
		props: {
			products: Array
		},
		components: {
			cartcontrol
		},
		data() {
			return {
				food:{
					count:10
				},
				currentIndex: 0,
			}
		},
		methods: {
			selectMenu(index) {
				this.currentIndex = index;
			}
		},
		computed: {
			categories(){
				return Object.keys(this.products);
			},
			currentProducts() {
				return this.products[this.currentTitle];
			},
			currentTitle() {
				return this.categories[this.currentIndex];
			}
		}
	}
</script>

<style lang="less">
	.goods {
		display: flex;
		position: absolute;
		top: 0;
		bottom: 96upx;
		width: 100%;

		.menu-wrapper {
			flex: 0 0 160upx;
			width: 160upx;
			background-color: #f3f5f7;
			height: 100%;

			.menu-item {
				display: flex;
				height: 108upx;
				width: 112upx;
				line-height: 108upx;
				padding: 0 24upx;

				.title {
					color: #444;
					font-weight: 400;
					font-size: 24upx;
				}

				&.current {
					position: relative;
					z-index: 10;
					margin-top: -1px;
					background: #fff;

					.text {
						color: #000;
						font-weight: 500;
						font-size: 28upx;
					}
				}
			}
		}

		.foods-wrapper {
			flex: 1;

			.title {
				padding: 0 0 0 28upx;
				border-left: 4upx solid #d9dde1;
				height: 52upx;
				line-height: 52upx;
				background: #f3f5f7;
				font-size: 24upx;
				color: rgb(147, 153, 159);
			}

			.food-list {
				.food-item {
					display: flex;
					margin: 12upx;
					height: 160upx;
					flex-direction: row;
					align-items: center;
					position: relative;

					.icon {
						overflow: hidden;
						image {
							width: 139upx;
							height: 139upx;
							overflow: hidden;
						}
					}

					.content {
						padding: 8upx 0;
						box-sizing: border-box;
						height: 100%;
						margin-left: 16upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.name {
							font-size: 28upx;
							color: #333;
							font-weight: 500;
						}

						.desc {
							font-size: 22upx;
							color: #666;
							font-weight: 400;

						}

						.price {
							font-size: 28upx;
							color: #FF6B6B;
							font-weight: 500;
						}
					}

					.cartcontrol-wrapper {
						position: absolute;
						bottom: 20upx;
						right: 24upx;
						// background-color: aqua;
						height: 40upx;
					}
				}
			}
		}
	}
</style>

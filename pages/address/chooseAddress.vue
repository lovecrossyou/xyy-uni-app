<template>
	<div class="rating_page">
		<head-top head-title="选择地址" go-back='true'></head-top>
		<div class="add_icon_footer" v-on:click="addAddress">
			<img src="../../static/img/add_address.png" class="add_address_img">
			<span>新增收货地址</span>
		</div>
		<section id="scroll_section" class="scroll_container">
			<section class="list_cotainer">
				<ul class="deliverable_address">
					<div class="div_li" v-for="(item,index) in deliverable" :key="index">
						<div class="detail_container" v-on:click="chooseAddress(item,index)">
							<header>
								<span>{{item.name}}</span>
								<span class="space_l_and_r">{{item.sex == 1? '先生' : '女士'}}</span>
								<span>{{item.phone}}</span>
							</header>
							<div class="address_detail ellipsis">
								<span v-if="item.tag" :style="{backgroundColor: iconColor(item.tag)}">{{item.tag}}</span>
								<p>{{item.address}}{{item.address_detail}}</p>
							</div>
						</div>
						<image class="edit_address" src="../../static/img/edit_address.png" v-on:click="editAddress(item)"></image>
					</div>
				</ul>

				<section id="out_delivery" v-if="deliverdisable.length">
					<header class="out_header">以下地址超出配送范围</header>
					<ul class="deliverable_address">
						<li v-for="(item,index) in deliverdisable" :key="index">
							<svg class="choosed_address">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
							</svg>
							<div>
								<header>
									<span>{{item.name}}</span>
									<span>{{item.sex == 1? '先生' : '女士'}}</span>
									<span>{{item.phone}}</span>
								</header>
								<div class="address_detail ellipsis">
									<span v-if="item.tag" :style="{backgroundColor: '#ccc', color: '#fff'}">{{item.tag}}</span>
									<p>{{item.address_detail}}</p>
								</div>
							</div>
						</li>
					</ul>
				</section>
			</section>
		</section>
	</div>
</template>


<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import api from "@/util/api.js";
	import {
		getAddress,
		getAddressList
	} from '@/util/service/getData'
	export default {
		onLoad: function(option) {
			this.isChoose = option.isChoose === 'true';
			this.id = option.id;
			this.sig = option.sig;
		},
		onShow() {
			this.initData();
		},
		data() {
			return {
				addressList: [], //地址列表
				deliverable: [], //有效地址列表
				deliverdisable: [], //无效地址列表
				id: null, //ID
				sig: null,
				showAlert: false,
				alertText: null,
				isChoose: false,
			}
		},
		computed: {
			...mapState([
				'userInfo', 'addressIndex', 'newAddress'
			]),
			isActive: function(index) {
				return {
					activeGrey: index === 1
				};
			},
		},
		methods: {
			...mapMutations([
				'CHOOSE_ADDRESS',
				'EDIT_ADDRESS',
			]),
			async initData() {
				this.addressList = [];
				this.deliverable = [];
				this.deliverdisable = [];

				if (this.userInfo && this.userInfo.user_id) {
					this.addressList = await getAddressList(this.userInfo.user_id);
					//将当前所有地址访问有效无效两种
					this.addressList.forEach(item => {
						if (item.is_deliverable) {
							this.deliverable.push(item);
						} else {
							this.deliverdisable.push(item);
						}
					})
				}
			},
			chooseAddress(address, index) {
				// this.defaultIndex = index;
				if (this.isChoose) {
					this.CHOOSE_ADDRESS({
						address,
						index
					});
					uni.navigateBack({
						delta: 1
					})
				} else {
					this.editAddress(address);
				}

			},
			editAddress(address) {
				this.EDIT_ADDRESS({
					address
				});
				uni.navigateTo({
					url: "addAddress"
				})
			},
			addAddress() {
				this.EDIT_ADDRESS({});
				uni.navigateTo({
					url: "addAddress"
				})
			},

			iconColor(name) {
				switch (name) {
					case '公司':
						return '#4cd964';
					case '学校':
						return '#3190e8';
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../static/style/mixin.scss';

	.add_address_img {
		width: 24upx;
		height: 24upx;
	}

	.container {
		color: #4cd964;
	}

	.activeGrey {
		color: #ff5722;
	}

	.space_l_and_r {
		margin: 0 10upx;
	}

	.rating_page {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #fff;
		z-index: 202;
		padding-top: 20upx;

		p,
		span {
			font-family: Helvetica Neue, Tahoma, Arial;
		}
	}

	.scroll_container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 100upx;
		padding-top: 20upx;
		overflow-y: auto;
	}

	.list_cotainer {
		padding-bottom: 40upx;
	}

	.add_icon_footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100upx;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 204;

		span {
			@include sc(28upx, $blue);
			margin-left: 12upx;
		}
	}

	.deliverable_address {
		background-color: #fff;

		.edit_address {
			width: 40upx;
			height: 40upx;
			margin-left: 20upx;
		}

		.div_li {
			display: flex;
			width: 100%;
			align-items: center;
			border-bottom: 1px solid #f5f5f5;
			padding: 28px;
			box-sizing: border-box;

			.detail_container {
				display: flex;
				flex-direction: column;
				flex: 1;

				header {
					@include sc(28upx, #333);

					span:nth-of-type(1) {
						font-size: 32upx;
						font-weight: bold;
						// margin-left: 12upx;
					}
				}

				.address_detail {
					display: flex;
					align-items: center;

					span {
						@include sc(20upx, #fff);
						border-radius: 6upx;
						background-color: #ff5722;
						height: 24upx;
						line-height: 24upx;
						padding: 0 8upx;
						box-sizing: border-box;

					}

					p {
						@include sc(24upx, #777);
						margin-left: 10upx;
					}
				}
			}

		}
	}

	#out_delivery {
		.out_header {
			@include sc(24upx, #666);
			line-height: 60upx;
			padding-left: 20upx;
			background-color: #f5f5f5;
		}

		* {
			color: #ccc;
		}
	}

	.router-slid-enter-active,
	.router-slid-leave-active {
		transition: all .4s;
	}

	.router-slid-enter,
	.router-slid-leave-active {
		transform: translate3d(80upx, 0, 0);
		opacity: 0;
	}
</style>

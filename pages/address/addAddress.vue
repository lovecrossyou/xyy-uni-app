<template>
	<div class="address_page">
		<!-- <head-top head-title="添加地址" go-back='true'></head-top> -->
		<section class="page_text_container">
			<section class="section_list">
				<span class="section_left">联系人</span>
				<section class="section_right">
					<input type="text" name="name" placeholder="你的名字" v-model="formData.receiverName" class="input_style">
				</section>
			</section>
			<section class="section_list">

				<span class="section_left">联系电话</span>
				<section class="section_right">
					<div class="phone_add">
						<input type="text" name="phone" placeholder="你的手机号" v-model="formData.receiverMobile" class="input_style">
						<img src="../../static/img/add_phone.png" class="add_img" @click="phone_bk = true" />
					</div>
				</section>
			</section>
			<section class="section_list">
				<span class="section_left">送餐地址</span>
				<section class="section_right">
					<div class="choose_address" v-on:click="searchAdd">{{myDeatil}}</div>
					<input type="text" name="address_detail" placeholder="详细地址（如门牌号等）" v-model="formData.receiverAddress" class="input_style">
				</section>
			</section>
		</section>
		<div class="determine" @click="addAddress">确定</div>
	</div>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import {
		getAddress,
		getUser,
		postAddAddress
	} from '../../util/service/getData.js'
	import alertTip from '../../components/alertTip.vue'
	import api from '../../util/api.js'

	export default {
		data() {
			return {
				formData: {
					receiverName: "",
					receiverPhone: "",
					receiverMobile: "",
					receiverProvince: "",
					receiverCity: "",
					receiverDistrict: "",
					receiverAddress: "",
					receiverZip: ""
				}
			}
		},
		onLoad() {
			if (this.editAddress.address) {
				this.name = this.editAddress.address.recievName;
				this.phone = this.editAddress.address.phoneNum;
				this.address_detail = this.editAddress.address.detailAddress;
				this.positionX = this.editAddress.address.positionX;
				this.positionY = this.editAddress.address.positionY
			}

		},
		created() {

		},
		onShow() {
			console.log('editAddress', this.editAddress.address)
		},
		computed: {
			...mapState({
				"editAddress": state => state.address.editAddress,
				"searchAddress": state => state.address.searchAddress,
				"positionX": state => state.address.positionX,
				"positionY": state => state.address.positionY,
				"userInfo": state => state.user.userInfo,
			}),
			myDeatil() {

				let mydistrictAddress = '小区/写字楼/学校等';
				if (this.searchAddress) {
					mydistrictAddress = this.searchAddress.name;
				}
				return mydistrictAddress;
			},
		},
		methods: {
			...mapMutations('address', [
				'CONFIRM_ADDRESS'
			]),
			//选择性别
			chooseSex(sex) {
				this.sex = sex;
			},
			searchAdd() {
				uni.navigateTo({
					url: "searchAddress"
				})
			},
			//保存地址信息
			async addAddress() {
				if (this.searchAddress) {
					const {
						address,
						cityname,
						location,
						name,
						pname
					} = this.searchAddress;
					this.formData.receiverProvince = pname;
					this.formData.receiverCity = cityname;
					this.formData.receiverAddress = address;
				}
				this.formData.receiverPhone = this.formData.receiverMobile; 

				const params = this.formData;
				let res = await api.addAddress(params);
				if (res.status === 0) {
					uni.navigateBack({
						delta: 1
					})
				} else {
					uni.showToast({
						title: res.message,
						icon: 'none',
						duration: 2000
					});
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	// @import '../../common/mixin.less';
	// @import "../../static/css/common.less";
	@import "../../static/style/mixin.scss";

	.add_img {
		width: 24upx;
		height: 24upx;
	}

	.address_page {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #f5f5f5;
		z-index: 204;
		padding-top: 20upx;

		p,
		span,
		input {
			font-family: Helvetica Neue, Tahoma, Arial;
		}
	}

	.page_text_container {
		background-color: #fff;
		padding: 20upx;
	}

	.section_list {
		display: flex;
		border-bottom: 1upx solid #f5f5f5;

		.section_left {
			@include sc(28upx, #333);
			flex: 2;
			line-height: 100upx;
		}

		.section_right {
			flex: 5;

			.input_style {
				width: 100%;
				height: 100upx;
				@include sc(28upx, #999);
			}

			.phone_bk {
				border-top: 1upx solid #f5f5f5;
			}

			.phone_add {
				@include fj;
				align-items: center;
			}

			.choose_sex {
				display: flex;
				line-height: 100upx;
				border-top: 1upx solid #f5f5f5;

				.choose_option {
					@include sc(28upx, #333);
					display: flex;
					align-items: center;
					margin-right: 32upx;

					.address_empty_right {
						margin-right: 12upx;
						@include wh(28upx, 28upx);
						fill: #ccc;
						border-radius: 14upx;
					}

					.choosed {
						background-color: #4cd964;
					}
				}
			}

			.choose_address {
				@include sc(28upx, #999);
				line-height: 100upx;
				border-bottom: 1upx solid #f5f5f5;
			}
		}
	}

	.determine {
		background-color: #4cd964;
		@include sc(28upx, #fff);
		text-align: center;
		margin: 0 28upx;
		line-height: 72upx;
		border-radius: 8upx;
		margin-top: 24upx;
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

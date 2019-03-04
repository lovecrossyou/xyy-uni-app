<template>
	<view class="order_feedback_wrapper">
		<textarea name="remark" placeholder="请输入您的备注" placeholder-style="color:#999;" v-model="remark"></textarea>
		<view  class="submit_btn"  @click="submitAction">提交</view>
	</view>
</template>

<script>
import {mapState, mapMutations,mapGetters} from 'vuex'
export default {
	data() {
		return {
			remark:null,
		};
	},
	onLoad() {
		if(this.orderRemark){
			this.remark = this.orderRemark
		}
	},
	components: {},
	methods: {
		...mapMutations('orderConfirm',['ADD_REMARK']),
		submitAction() {
			
			if(!this.remark){
				uni.showToast({
					icon:"none",
					duration:2000,
					title:"请输入您的备注"
				})
			}else{
				this.ADD_REMARK(this.remark)
				uni.navigateBack({
					delta:1
				})
			}
		}
	},
	computed: {
		...mapState('orderConfirm',['orderRemark'])
	},
};
</script>

<style lang="less" scoped>
.order_feedback_wrapper {
	width: 100%;
	margin: 24upx;
	padding: 24upx;
	box-sizing: border-box;
	.submit_btn {
		width: 100%;
		height: 88upx;
		background-color: #7ca7d2;
		border-radius: 6upx;
		color: #ffffff;
		font-size: 28upx;
		text-align: center;
		line-height: 88upx;
		margin-top: 148upx;
	}
}
.order_feedback_wrapper > textarea {
	width: 100%;
	height: 300upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 6upx;
	border: 1px solid rgba(236, 236, 236, 1);
	font-size: 24upx;
	color: #999999;
	padding: 24upx;
	box-sizing: border-box;
}
</style>

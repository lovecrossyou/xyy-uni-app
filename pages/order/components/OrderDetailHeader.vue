<template>
	<view class="orderdetail_header">
		<img class="header_img" :src="orderInfo.shopImage" />
		<view class="h_payStatus_c">
		  <view class="h_payStatus">{{payStatus}}</view>
		  <!-- <uni-icon type="arrowright" color="#333333" size="20"></uni-icon> -->
		</view>
		<!-- 继续支付按钮 -->
		<!-- <view class="goOnPay_btn">
			继续支付
		</view> -->
		
		<view v-if="orderstatus==='create'" class="h_orderDesc">逾期未支付，订单将自动取消</view>
		<view v-if="orderstatus==='create'" class="orderBtn_c">
			<view class="cancel_left_btn uni-countdown" @click="orderAction('1')">继续支付</view>
			<view class="toPay_btn">
				<uni-countdown
					color="#FFFFFF"
					splitor-color="#FFFFFF"
					background-color="transparent" 
					border-color="transparent"
					:showColon="false"
					:show-day="false" 		 
					:hour="0" 
					:minute="30" 
					:second="0"
					@timeup="timeup">
				</uni-countdown>
			</view>
		</view>
		<view v-else-if="orderstatus==='finish'" class="orderBtn_apprise" @click="orderAction('2')">
			去评价
		</view>
		<view v-else-if="orderstatus==='cancle'" class="orderBtn_apprise" @click="orderAction('3')">
			再来一单
		</view>
		<view v-else-if="orderstatus==='wating_deal'" class="orderBtn_c">
			<view class="orderBtn_apprise_left" @click="orderAction('4')">催单</view>
			<view class="orderBtn_apprise_left" @click="orderAction('1')">取消订单</view>
		</view>
	</view>
</template>

<script>
	import uniCountdown from "../../../components/uniCountDown.vue"
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		props:{
			orderInfo:Object
		},
		components:{
			uniCountdown,
			uniIcon
		},
		computed: {
			payStatus:function(){
				if(this.orderInfo.orderStatus === 'waiting_deal'){
					return '等待商家接单'
				}
				return this.orderInfo.orderStatusContent
			},
			orderstatus:function(){
				return this.orderInfo.orderStatus ;
			}
		},
		methods:{
		
			orderAction(type){
				// type 1取消订单  2去评价  3再来一单 4催单
				this.$emit("orderAction",type)
			},
			timeup(){
				this.$emit("timeup")
			}
		},
		data(){
			// wating
			return{
				// orderstatus:"wating"
			}
		}
	}
</script>

<style lang="less" scoped>
.center_column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.between_center_row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.padding_my (@top: 0, @right: 0, @buttom: 0, @left: 0) {
  box-sizing: border-box;
  padding: @arguments;
}
	
 .orderdetail_header {
	 
  padding: 20px;
  box-sizing: border-box;
  .center_column;
  background-color: white;
  .header_img {
	margin: 16px 0;
	width: 134px;
	height: 88px;
  }
  .h_payStatus_c {
	.between_center_row;
	.h_payStatus {
	  font-size: 34px;
	  font-family: PingFangSC-Medium;
	  font-weight: 500;
	  color: rgba(51, 51, 51, 1);
	}
	.h_pay_arrow {
	  width: 28px;
	  height: 28px;
	}
  }
  .goOnPay_btn{
	  width: 120upx;
	  height: 60upx
  }
  .h_orderDesc {
	margin: 12px 0;
	font-size: 20px;
	font-family: PingFangSC-Regular;
	font-weight: 400;
	color: rgba(102, 102, 102, 1);
  }
  .orderBtn_apprise{
	padding: 0 17px;
	text-align: center;
	box-sizing: border-box;
	height:40px;
	line-height: 40px;
	background:rgba(255,255,255,1);
	border-radius:4px;
	border:1px solid rgba(124,167,210,1);
	font-size: 20px;
	color: #7CA7D2;
	margin-top: 10px;
  }
  .orderBtn_c {
	.between_center_row;
	font-size: 20px;
	color: #7CA7D2;
	margin-top: 10px;
	.orderBtn_apprise_left{
		
		text-align: center;
		height:40px;
		line-height: 40px;
			  background: rgba(255, 255, 255, 1);
		
		
		border-radius:4px;
		border:1px solid rgba(124,167,210,1);
		font-size: 20px;
		color: #7CA7D2;
		.padding_my(0, 17px, 0, 17px);
		margin: 5px 10px;
	}
	.cancel_left_btn {
	  height: 40px;
	  
	  background:rgba(255, 106, 97, 1);
	  // background: rgba(255, 255, 255, 1);
	  border-radius: 4px;
	  border: 1px solid rgba(210, 210, 210, 1);
	  text-align: center;
	  font-size: 20px;
	  font-family: PingFangSC-Regular;
	  font-weight: 400;
	  color: #FFFFFF;
	  line-height: 40px;
	  .padding_my(0, 17px, 0, 17px);
	  margin: 5px 10upx;
	}
	.toPay_btn {
	  .padding_my(0, 10px, 0, 10px);
	  height: 40px;
	  background: rgba(255, 106, 97, 1);
	  border-radius: 4px;
	  text-align: center;
	  font-size: 20px;
	  font-family: PingFangSC-Regular;
	  font-weight: 400;
	  color: rgba(255, 255, 255, 1);
	  line-height: 40px;
	  margin: 5px;
	}
  }
}
</style>

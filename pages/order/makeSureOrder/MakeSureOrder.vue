<template>
	<view class="place-order">
		<div v-if="!showLoading">
			<view class="content">
				<AddressChoose :mydata="choosedAddress" @chooseAddAction="chooseAddAction" ></AddressChoose>
				<ArriveAndPay :mydata="arriveAndPayData1" ></ArriveAndPay>
				<ArriveAndPay :mydata="arriveAndPayData2" ></ArriveAndPay>
				<view class="water_store_info">
					<view class="water_store_h_t" >水站信息</view>
						<view v-for="(listItem,index) in productItemList" :key='index' >
						<WaterStoreItem :shopProduct="listItem"></WaterStoreItem>
					</view>
				</view>
			</view>
			<view class="bottom_white">
			    <OrderInfoItemAction
			      itemTitle="使用优惠卷"
			      itemContent="80"></OrderInfoItemAction>
			    <OrderInfoItemAction itemTitle="立减优惠" itemContent="-¥6" hideArrow="true" ></OrderInfoItemAction>
			    
				<view class="space" />
				
			    <OrderInfoItemAction
			      itemTitle="订单备注"
			      itemContent="xxxxxx"> </OrderInfoItemAction>
			</view>
		</div>
        
		 <loading v-if="showLoading"></loading>
        <BottomBar @toPay="toPay"></BottomBar>
		<alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
      </view>
</template>

<script>
	import Vue from 'vue'
	import {mapState, mapMutations,mapGetters} from 'vuex'
	import AddressChoose from "../components/AddressChoose.vue"
	import WaterStoreItem from "../components/WaterStoreItem.vue"
	import OrderInfoItemAction from "../components/OrderInfoItemAction.vue"
	import ArriveAndPay from "../components/ArriveAndPay.vue"
	import BottomBar from "../components/BottomBar.vue"
	import loading from '../../../components/loading.vue';
	import alertTip from '../../../components/alertTip.vue'
	import api from '@/util/api.js'
	import {
		postRequest
	} from '@/util/network.js'
	export default {
		components:{
			AddressChoose,
			ArriveAndPay,
			WaterStoreItem,
			OrderInfoItemAction,
			BottomBar,
			alertTip,
		},
		computed:{
			...mapState('address',['choosedAddress']),
			...mapGetters('cart',['cartConfirmInfo'])
		},
		methods: {
			chooseAddAction(){
				uni.navigateTo({
					url:"../../address/chooseAddress"
				})
			},
			async requestOrderData(){
				const res = await api.requestCartClient(this.cartConfirmInfo)
				this.info = res.data;
				this.productItemList = res.data.productItemList;
				this.showLoading = false;
			},
			async toPay(){
				
				if(this.choosedAddress.id){
					let params = Object.assign({},this.cartConfirmInfo);
					console.log('choosedAddress=============',JSON.stringify(this.choosedAddress));
					params.deliverAddressId = this.choosedAddress.id;
					const createRes = await api.shopOrderCreate(params);
					console.log("createRes",JSON.stringify(createRes));
					// return ;
				}else{
					this.showAlert=true;
					this.alertText='请选择地址';
				}
				
				
			}
		},
		data(){
			return{
				arriveAndPayData1:{title:"送达时间",value:"尽快送达"},
				arriveAndPayData2:{title:"支付方式",value:"在线支付" },
				addressData:{
					
				},
				info:{},
				showLoading:true,
				showAlert:false,
				alertText:'',
				productItemList:[],
				cartParams:{
					"shopId": 13,
					"userId": 2,
					"products": [
						{
							"quantity": 2,
							"productId": 10
						},
						{
							"quantity": 7,
							"productId": 13
						},
						{
							"quantity": 1,
							"productId": 14
						}
					]
				},
			}
		},
		onLoad() {
			this.requestOrderData();
			console.log('cartConfirmInfo',this.cartConfirmInfo);
		}
	}
</script>
	
<style lang="less" scoped>
	@import '../../../common/theme.less';
	@import '../../../common/mixin.less';
.row_center{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.row_between{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.display_b{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.column_between{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.place-order {
  position: absolute;
  width: 100%;
  background: linear-gradient(to bottom, @primary-color 50%, white 80%, white);
  .content {
	background-color: transparent;
    .water_store_info{
      margin: 20px 24px 0 24px;
      padding: 24px;
      box-sizing: border-box;
      background-color: white;
      .water_store_h_t{
        width:100%;
        height: 80px;
        text-align: left;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        line-height: 80px;
        color:#333333;
        border-bottom: 1px #EDEBEB solid;
      }
    }
   }
   .bottom_white{
   	 width: 100%;
     background-color: white;
     padding: 0 48upx;
	 margin-bottom: 108upx;
   	 box-sizing: border-box;
   	  .space{
   		  width: 100%;
   		  height: 30upx;
   	  }
       }
}

.orderInfo_item_right_v_style{
  color: #D19B5C !important;
}
.orderInfo_item_left_style{
  color: #7CA7D2 !important;
}
.orderInfo_color_red{
  color:rgba(251,81,71,1) !important;
}
.orderInfo_color_gray9{
  color: #999999 !important;
}
.orderInfo_color_gray2e{
  color: #2E2E2E !important;
}

</style>

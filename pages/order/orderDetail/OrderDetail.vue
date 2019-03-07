<template>
    <view class="detail">
		<view v-show="!isLoading">
			<OrderDetailHeader @orderAction="orderAction" />
			<view class="content_detail">
				<view class="item">
				  <view class="img">
					<image :src="orderDetailData.restaurant_img" class="img"></image>
				  </view>
				  <view class="text">{{orderDetailData.restaurant_name}}</view>
				</view>
				<view v-for="foodData in food" :key="foodData.name">
					<view class="item">
						<view class="text">{{foodData.name}}</view>
						<view class="num">x{{foodData.quantity}}</view>
						<view class="price">¥{{foodData.price}}</view>
					</view>
				</view>
				<view class="item">
					<view class="text">配送费</view>
					<view class="price">¥{{orderDetailData.basket && orderDetailData.basket.deliver_fee.price}}</view>
				</view>
				<view v-for="(extraData,index) in extra" :key="index">
					<view class="item">
						<view class="text">{{extraData.name}}</view>
						<view class="price">- ¥{{extraData.price.toString().slice(1)}}</view>
					</view>
				</view>
				<view class="totoal">实付 ¥{{orderDetailData.total_amount}}</view>
			</view>

			<view class="info">
				<view class="title">配送信息</view>
				<view class="desc">
				  <view class="item">
					<view class="label">送达时间</view>
					<view class="text">{{orderDetailData.deliver_time}}</view>
				  </view>
				  <view class="item">
					<view class="label">送货地址</view>
					<view class="text">{{orderDetailData.consignee}}<br />{{orderDetailData.phone}}<br />{{orderDetailData.address}}</view>
				  </view>
				  <view class="item">
					<view class="label">配送方式</view>
					<view class="text">{{desc.delivery_company}}</view>
				  </view>
				  <view class="item">
					<view class="label">配送骑手</view>
					<view class="text">{{desc.rider_name}},{{desc.rider_phone}}</view>
				  </view>
				</view>
			  </view>
			  <view class="info">
				<view class="title">订单信息</view>
				<view class="desc">
				  <view class="item">
					<view class="label">订单号</view>
					<view class="text">{{orderDetailData.id}}</view>
				  </view>
				  <view class="item">
					<view class="label">支付方式</view>
					<view class="text">{{orderDetailData.pay_method}}</view>
				  </view>
				  <view class="item">
					<view class="label">下单时间</view>
					<view class="text">{{orderDetailData.formatted_created_at}}</view>
				  </view>
				</view>
			</view>
		</view>
    </view>
</template>

<script>
// import {uniCountdown} from '@dcloudio/uni-ui'
import OrderDetailHeader from "../components/OrderDetailHeader.vue"
export default {
	components: {
		OrderDetailHeader
	},
  data() {
    return {
		src: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg",
		orders: [
			{
				products: [1, 2, 3]
			},
			{
				products: [1, 2, 3]
			},
			{
				products: [1, 2, 3]
			}
		],
		orderDetailData:{},
		isLoading:true,
		food:[],
		extra:[],
		desc:{
			"delivery_company":"蜂鸟快送",
			"delivery_type":"",
			"has_distribution_info":0,
			"is_position_valid":0,
			"is_rider_valid":0
		},
	};
  },
  onLoad() {
  	this.getData();
  },
  computed:{
	  getfoodKey: function  (index) {
	  	return index + "food"
	  }
  },
  onPullDownRefresh(){
	this.getData();
  },
  methods: {
	
    goOrderDetail() {
      uni.navigateTo({
        url: "orderDetail/OrderDetail"
      });
    },
	orderAction(type){
		// type 1取消订单  2去评价  3再来一单 4催单
		let showMessage = "";
		switch(type){
			case "1":
				showMessage="取消订单"
				break;
			case "2":
				showMessage="去评价"
				break;
			case "3":
				showMessage="再来一单"
				break;
			case "4":
				showMessage="催单"
				break;
			
		}
		uni.showToast({
			icon:"none",
			title:showMessage
		})
	},
	async getData(){
		uni.showLoading({
			title:"加载中..."
		})
		setInterval(()=>{
			uni.hideLoading()
			uni.stopPullDownRefresh()
			const detailData = {
			"address":"粮科大厦(百万庄大街)3楼",
			"basket":{
			    "abandoned_extra":[
			        {
			            "category_id":12,
			            "name":"全店满减",
			            "price":-10,
			            "quantity":1
			        }
			    ],
			    "conditional_extra":[
			
			    ],
			    "deliver_fee":{
			        "category_id":2,
			        "name":"配送费",
			        "price":3,
			        "quantity":1
			    },
			    "extra":[
			        {
			            "category_id":12,
			            "name":"全店满减",
			            "price":-10,
			            "quantity":1
			        }
			    ],
			    "group":[
			        [
			            {
			                "attrs":[
			
			                ],
			                "current_price":10.94,
			                "id":1542771617554892,
			                "ingredient_items":[
			
			                ],
			                "name":"高麦可迷你黄油曲奇饼干51g",
			                "new_specs":[
			
			                ],
			                "price":10.94,
			                "quantity":1,
			                "sku_id":1542771617554892,
			                "sku_id_str":1542771617554892,
			                "specs":[
			
			                ]
			            },
			            {
			                "attrs":[
			
			                ],
			                "current_price":20.6,
			                "id":1542771610553774,
			                "ingredient_items":[
			
			                ],
			                "name":"小牧-酸奶涂层饼（蔓越莓提子味）160g",
			                "new_specs":[
			
			                ],
			                "price":20.6,
			                "quantity":1,
			                "sku_id":1542771610553774,
			                "sku_id_str":1542771610553774,
			                "specs":[
			
			                ]
			            }
			        ]
			    ],
			    "package_group":[
			
			    ],
			    "packing_fee":{
			        "category_id":102,
			        "name":"餐盒",
			        "price":0.5,
			        "quantity":1
			    },
			    "pindan_map":[
			
			    ],
			    "tying_group":[
			
			    ]
			},
			"consignee":"田先生(先生)",
			"deliver_time":"尽快送达",
			"description":"",
			"formatted_created_at":"2019-02-19 16:42",
			"id":2104305524043915500,
			"invoice":"",
			"invoice_scheme":"",
			"is_book":0,
			"is_cancel_tableware":0,
			"is_gifting":0,
			"is_new_restaurant":0,
			"is_ninja":1,
			"is_online_paid":1,
			"is_pindan":0,
			"new_retail_shop_id":2217934056,
			"order_type":0,
			"pay_method":"在线支付",
			"phone":"18301379671",
			"pick_up_code":"",
			"pick_up_time":"",
			"rebuy_scheme":"eleme://retail_store?re_store_id=150075280",
			"rebuy_scheme_v2":"eleme://web?url=https%3A//h5.ele.me/newretail/p/shop/%3Fid%3D2217934056%26cart_sku_ids%3D1542771610553774%2C1542771617554892%26ele_id%3D150075280&navType=3",
			"restaurant_address":"北京市西城区三里河路34号（原鲜驿站店）",
			"restaurant_id":"E17991839890915245586",
			"restaurant_image_hash":"b529d8acfa1656612a493eda02dc992ajpeg",
			"restaurant_mobile":"",
			"restaurant_name":"好邻居(朝阳庵店)",
			"restaurant_phone":"15910516428",
			"restaurant_type":1,
			"scene_id":-1,
			"scheme":"eleme://retail_store?re_store_id=150075280",
			"show_liangpiao_remind":0,
			"total_amount":25.04,
			"tpp_id":"None",
			"unique_id":"2104305524043915418",
			"restaurant_img":"https://cn.vuejs.org/images/logo.png"
			};
			const food = detailData.basket ? detailData.basket.group[0] : []
			const extra = detailData.basket ? detailData.basket.extra : []
			this.orderDetailData = detailData;
			this.food = food;
			this.extra = extra;
			this.isLoading=false;
		},2000)
		
		
	}
	
  }
};
</script>

<style lang="less">
@import "../../../common/theme.less";
@import "../../../common/mixin.less";
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

.detail {
  width: 100%;
  height: 100%;
  background-color: @fill-body-darken;
  .content_detail {
    box-sizing: border-box;
    padding: 0 20px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
    background-color: @fill-body;
	.totoal{
		padding: 12px 0;
		box-sizing: border-box;
	}
    .item {
      display: flex;
      min-height: 88px;
      align-items: center;
	  border-bottom: 1px @border-color solid;
      // box-shadow: 0 1px 1px -1px @border-color;
      .img {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        background-color: @fill-body-darken;
        margin-right: 20px;
        img {
          width: 100%;
          border-radius: 100%;
        }
      }
      .text {
        flex: 1;
        width: 0;
        .no-wrap;
        font-size: @font-size-medium;
        font-weight: @font-weight-small;
        line-height: 40px;
        color: @color-title;
      }
      .num,
      .price {
        text-align: right;
        font-size: @font-size-small;
        font-weight: @font-weight-small;
        line-height: 40px;
        color: @color-title;
        &.red {
          color: #ff5339;
        }
      }
      .num {
        flex: 0 0 80px;
        width: 60px;
      }
      .price {
        flex: 0 0 130px;
        width: 100px;
      }
    }
    .total {
      text-align: right;
      font-size: @font-size-large;
      color: @color-base;
      line-height: 100px;
    }
  }
  .info {
    margin-top: 30px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
    background-color: @fill-body;
    .title {
      box-sizing: border-box;
      padding: 0 30px;
      box-shadow: 0 1px 1px -1px @border-color;
      line-height: 88px;
      font-size: @font-size-medium;
      font-weight: @font-weight-small;
      color: @color-title;
    }
    .desc {
      box-sizing: border-box;
      padding-left: 30px;
      .item {
        display: flex;
        min-height: 68px;
        padding: 10px 0;
        align-items: center;
        border-bottom: 1px @border-color solid;
        .label {
          flex: 0 0 130px;
          width: 130px;
          margin-right: 20px;
          font-size: @font-size-small;
          font-weight: @font-weight-small;
          line-height: 40px;
          color: @color-title;
        }
        .text {
          flex: 1;
          width: 0;
          font-size: @font-size-small;
          font-weight: @font-weight-small;
          line-height: 40px;
          color: @color-base;
          .no-wrap;
        }
      }
    }
  }
}
</style>

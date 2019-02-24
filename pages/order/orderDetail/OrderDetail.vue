<template>
    <view class="detail">
      <view class="content">
        <view class="item">
          <view class="img">
            <!-- <img src="" /> -->
          </view>
          <view class="text">啦啦啦</view>
        </view>
        <view v-for="(order,index) in orders" :key="index">
          <view class="item">
            <view class="text">name</view>
            <view class="num">xquantity</view>
            <view class="price">¥price</view>
          </view>
        </view>
        <view class="item">
          <view class="text">配送费</view>
          <view class="price">¥300.00</view>
        </view>
        <view v-for="(order,index) in orders" :key="index">
          <view class="item">
            <view class="text">name</view>
            <view class="price">- ¥20</view>
          </view>
        </view>
        <view class="totoal">实付 ¥320</view>
      </view>

      <view class="info">
        <view class="title">配送信息</view>
        <view class="desc">
          <view class="item">
            <view class="label">送达时间</view>
            <view class="text">2018-11-24 23:23:44</view>
          </view>
          <view class="item">
            <view class="label">送货地址</view>
            <view class="text">并和洗礼32好楼</view>
          </view>
          <view class="item">
            <view class="label">配送方式</view>
            <view class="text">在线</view>
          </view>
          <view class="item">
            <view class="label">配送骑手</view>
            <view class="text">田豪杰 18301379671</view>
          </view>
        </view>
      </view>
      <view class="info">
        <view class="title">订单信息</view>
        <view class="desc">
          <view class="item">
            <view class="label">订单号</view>
            <view class="text">2335366677</view>
          </view>
          <view class="item">
            <view class="label">支付方式</view>
            <view class="text">在线</view>
          </view>
          <view class="item">
            <view class="label">下单时间</view>
            <view class="text">2018-22-23 18:34:33</view>
          </view>
        </view>
      </view>
    </view>
</template>

<script>
export default {
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
      ]
    };
  },
  methods: {
    goOrderDetail() {
      uni.navigateTo({
        url: "orderDetail/OrderDetail"
      });
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
  .content {
    box-sizing: border-box;
    padding: 0 20px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
    background-color: @fill-body;
    .item {
      display: flex;
      min-height: 88px;
      align-items: center;
	  border-bottom: 1px @border-color solid;
      // box-shadow: 0 1px 1px -1px @border-color;
      .img {
        flex: 0 0 40px;
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
    .h_orderDesc {
      margin: 12px 0;
      font-size: 20px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .orderBtn_c {
      .between_center_row;
      margin-top: 10px;
      .cancel_left_btn {
        height: 40px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(210, 210, 210, 1);
        text-align: center;
        font-size: 20px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 40px;
        .padding_my(0, 10px, 0, 10px);
        margin: 5px;
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
}
</style>

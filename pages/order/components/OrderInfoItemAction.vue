<template>
	<div class="orderInfoItem_action">
        <div class="orderInfo_item_left" :style="{'color':titleColor}">{{itemTitle}}</div>
        <div class="orderInfo_item_right"  v-on:click="callBack" >
          <div class="orderInfo_item_right_value" :style="{'color':valueColor}">
            {{itemContent}}
          </div>
          <image v-if="showArrow" class="address_choose_arrow" src="../../../static/img/right_arrow.png" />
        </div>
    </div>
</template>

<script>
	export default {
		props:{
			itemTitle:String,
			itemContent:String,
			showArrow:Boolean,
			titleColor:String,
			valueColor:String,
		},
		methods:{
			callBack(){
				if (this.showArrow) {
					this.$emit('itemCallBack');
				}
			}
		},
		onLoad() {
			
		}
	}
</script>

<style lang="less" scoped>

	.row_between{
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  justify-content: space-between;
	}
	.row_center{
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	}	
	.orderInfoItem_action{

        .row_between;
        padding: 20px 0;
        box-sizing: border-box;
        width: 100%;
        .orderInfo_item_left{
          font-size:24px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:#7CA7D2;
          line-height: 24px;
        }
        .orderInfo_item_right{
          .row_center;
          .orderInfo_item_right_value{
			min-width: 100px;
            font-size:24px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:#D4660B;
            margin-right: 10px;
            line-height: 24px;
			text-align: right;
          }
          .address_choose_arrow{
            width: 10px;
            height: 18px;
            }
          }
      }
	
</style>

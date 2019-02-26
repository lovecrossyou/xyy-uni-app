<template>
	<div class="water_store_item">
      <div class="water_store_item_title_c">
        <image class="water_store_item_img" :src="shopProduct.shopProduct.headImage" />
        <div class="water_store_item_title">{{shopProduct.shopProduct.headName}}</div>
      </div>
      <div class="water_store_item_count_c">
        <div class="water_store_item_count">{{shopProduct.shopProduct.spec}}</div>
        <div class="water_store_item_money">{{shopProduct.shopProduct.price}}</div>
      </div>
    </div>
</template>

<script>
	export default {
		props: {
			shopProduct:Object
		},
		onLoad() {
			console.log(11111)
			console.log(this.shopProduct)
		}
	}
</script>

<style lang="less" scoped>	
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
	.water_store_item{
	  .row_between;
	  width: 100%;
	  padding-top: 20px;
	  box-sizing: border-box;
	  .water_store_item_title_c{
	    .row_center;
	    flex: 1;
	    .water_store_item_img{
	      width: 88px;
	      height: 88px;
	    }
	    .water_store_item_title{
	      margin-left: 20px;
	      font-size:24px;
	      font-family:PingFangSC-Regular;
	      font-weight:400;
	      color:rgba(51,51,51,1);
	    }
	  }
	  .water_store_item_count_c{
	    .row_between;
	    flex: 1;
	    .water_store_item_count{
	      margin-left: 20px;
	      font-size:24px;
	      font-family:PingFangSC-Regular;
	      font-weight:400;
	      color:rgba(51,51,51,1);
	    }
	    .water_store_item_money{
	      font-size:24px;
	      font-family:PingFangSC-Regular;
	      font-weight:400;
	      color:rgba(51,51,51,1);
	    }
	
	  }
	
	}
	
</style>

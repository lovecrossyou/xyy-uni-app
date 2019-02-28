<template>
	
	<div class="address_choose" v-on:click="chooseAddAction" >
	  
      <div  class="address_choose_left" v-if="mydata.phoneNum">
        <div class="address_choose_mark_c">
          <div class="address_choose_mark_t">订单配送至</div>
          <div class="address_choose_mark">公司</div>
        </div>
        <div class="address_choose_detail">{{mydata.fullAddress}}</div>
        <div class="address_people">
          <div class="address_p_name">{{mydata.recievName}}</div>
          <div class="address_p_phone">{{mydata.phoneNum}}</div>
        </div>
      </div>
	  <div v-else class="add_address">请添加一个收货地址</div>
      <img src="../../../static/img/youjiantou.png" class="address_choose_arrow"/>
    </div>
</template>

<script>
	export default {
		methods:{
			chooseAddAction(){
				this.$emit('chooseAddAction');
			}
		},
		onLoad() {
			console.log('mydata',this.mydata);
		},
		props:{
			mydata:{},
		}
	}
</script>

<style lang="less" scoped>
	.row_center{
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  
	}	
	.address_choose{
	  .row_center;
	  padding: 24px;
	  box-sizing: border-box;
	
	  .add_address{
          font-size: 28upx;
		  color: #fff;
       }
	  .address_choose_arrow{
	    width: 28px;
	    height: 28px;
	  }
	  .address_choose_left{
	    display: flex;
	    flex-direction: column;
	    .address_choose_mark_c{
	      .row_center;
	      .address_choose_mark_t{
	        font-size:26px;
	        font-family:PingFangSC-Regular;
	        font-weight:400;
	        color:rgba(255,255,255,1);
	      }
	      .address_choose_mark{
	        height:30px;
	        background:rgba(132,172,212,1);
	        border-radius:4px;
	        border:1px solid rgba(255,255,255,1);
	        font-size:20px;
	        font-family:PingFangSC-Regular;
	        font-weight:400;
	        color:rgba(255,255,255,1);
	        line-height:30px;
	        text-align: center;
	        padding: 0 12px;
	      }
	    }
	    .address_choose_detail{
	      width:460px;
	      font-size:28px;
	      font-family:PingFangSC-Medium;
	      font-weight:500;
	      color:rgba(255,255,255,1);
	      margin-top: 10px;
	      text-align: left;
	    }
	    .address_people{
	      .row_center;
	      margin-top: 14px;
	      .address_p_name{
	        height:34px;
	        font-size:24px;
	        font-family:PingFangSC-Regular;
	        font-weight:400;
	        color:rgba(255,255,255,1);
	        line-height:34px;
	      }
	      .address_p_phone{
	        height:34px;
	        font-size:24px;
	        font-family:PingFangSC-Regular;
	        font-weight:400;
	        color:rgba(255,255,255,1);
	        line-height:34px;
	        margin-left: 20px;
	      }
	    }
	
	  }
	}
</style>

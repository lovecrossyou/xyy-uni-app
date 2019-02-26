<template>
	<div class="address_choose" v-on:click="chooseAddAction" >
      <div class="address_choose_left">
        <div class="address_choose_mark_c">
          <div class="address_choose_mark_t">订单配送至</div>
          <div class="address_choose_mark">公司</div>
        </div>
        <div class="address_choose_detail">真聂女聂女IE我女诶 v 捏 v聂女</div>
        <div class="address_people">
          <div class="address_p_name">天哈姐</div>
          <div class="address_p_phone">老倪嗯</div>
        </div>
      </div>
      <img src="" class="address_choose_arrow"/>
    </div>
</template>

<script>
	export default {
		methods:{
			chooseAddAction(){
				
			}
		},
		props:{
			mydata:Object
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
	  .address_choose_arrow{
	    width: 14px;
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

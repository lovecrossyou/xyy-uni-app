<template>
	<div class="buttom_container">
      <div class="buttom_container_money">
        <div class="buttom_container_m_title">总额：</div>
        <div class="buttom_container_m_mark">¥</div>
        <div class="buttom_container_m_value">20.00</div>
        <div class="buttom_container_m_ex">已优惠¥6</div>
      </div>
      <div class="buttom_container_pay" >去支付</div>
    </div>
</template>

<script>
	export default {
		onLoad() {
			console.log('bar....')
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
	.buttom_container{
	  .row_between;
	  position: fixed;
	  width: 100%;
	  height:88px;
	  bottom: 0;
	  background:#4D4D4D;
	  box-shadow:0px -1px 0px 0px rgba(236,236,236,0.5);
	  .buttom_container_money{
	    .row_center;
	    .buttom_container_m_title{
	      margin-left: 24px;
	      font-size:28px;
	      font-family:PingFangSC-Regular;
	      font-weight:400;
	      color:#FFFFFF;
	    }
	    .buttom_container_m_mark{
	      font-size:20px;
	      font-family:PingFangSC-Regular;
	      font-weight:400;
	      color:#FFFFFF;
	    }
	    .buttom_container_m_ex{
	      font-size:24px;
	      font-family:PingFangSC-Regular;
	      font-weight:400;
	      color:rgba(175,175,175,1);
	      margin-left: 16px;
	    }
	    .buttom_container_m_value{
	      font-size:34px;
	      font-family:PingFangSC-Medium;
	      font-weight:500;
	      color:#FFFFFF;
	    }
	  }
	  .buttom_container_pay{
	    width:258px;
	    height:88px;
	    text-align: center;
	    background:rgba(124,167,210,1);
	    font-size:28px;
	    font-family:PingFangSC-Medium;
	    font-weight:500;
	    color:rgba(255,255,255,1);
	    line-height:88px;
	  }
	}
	
</style>

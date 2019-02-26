<template>
	<div class="arrive_pay_c">
      <div class="arrive_pay_c_title">{{mydata.title}}</div>
      <div class="arrive_pay_c_value">{{mydata.value}}</div>
    </div>
</template>

<script>
	export default {
		props:{
			mydata:Object
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
	.arrive_pay_c{
      .row_between;
      margin: 0 24px;
      padding: 20px 24px;
      box-sizing: border-box;
      background-color: white;
      .arrive_pay_c_title{
        height:40px;
        font-size:28px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:40px;
      }
      .arrive_pay_c_value{
        height:40px;
        font-size:28px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(126,168,210,1);
        line-height:40px;
      }
    }
</style>

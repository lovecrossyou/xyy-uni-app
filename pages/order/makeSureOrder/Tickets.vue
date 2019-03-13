<template>
	<view class="tickets_container">
		<View class="ticket_list_container">
			<view v-for="(ticket,index) in tickets" :key='index' v-on:click="ticketChoose(ticket,index)">
				<Ticket v-bind:ticketData="ticket" v-bind:index="index" :chooseIndex="chooseIndex" ></Ticket>
			</view>
		</view>
		
		<view class="bottomBtn_c">
			<view class="bottomBtn" >保存</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations,mapGetters} from 'vuex'
	import Ticket from "../components/Ticket.vue"
	export default {
		components:{
			Ticket
		},
		onLoad(option) {
			this.isChoose = option.isChoose === "true"
		},
		data() {
			return {
				tickets:["","","","","","","","","",""],
				chooseIndex:0,
				isChoose:false,
			}
		},
		computed: {
			...mapState({
				ticket:'orderConfirm/ticket',
			}),
		},
		methods: {
			...mapMutations({
				CHOOSETICKET:'orderConfirm/CHOOSETICKET'
			}),
			ticketChoose(ticket,index){
				if(this.isChoose){
					this.CHOOSETICKET({money:30,name:"新人首单"})
					uni.navigateBack({
						delta:1
					})
				}
				
			}
		},
	}
</script>

<style lang="less" scoped>
	@import '../../../common/mixin.less';
	@import '../../../common/theme.less';
	
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
.tickets_container{

    width: 100%;
    height: 100%;
    background-color: @fill-body-darken;
	.ticket_list_container{
		width: 100%;
		margin-bottom: 120px;
	}
    .bottomBtn_c{
        position: fixed;
        width:100%;
        height:100px;
        background:rgba(255,255,255,1);
        padding: 12px 24px 16px 24px;
        box-sizing: border-box;
        bottom: 0;
        .bottomBtn{
            width:100%;
            background:#3e87eb;
            border-radius:6px;
            font-size:28px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height:72px;
            text-align: center;
        }
      }
}
.horizontal_line{

    border-top: 1px#D2D2D2 dashed;
    width: 100%;
    height: 1px;
}
</style>

<template>
	<view class="ticket_container">
		<view class="ticket_container_sub1">
			<view class="ticket_container_sub2">
				<view class="ticket_container_sub_show_c" >
					<view class="ticket_container_sub_show_l">
						<view class="ticket_sale_money">立减20</view>
						<view class="vertical_line" />
						<view class="ticket_sale_des_c">
						  <view class="ticket_des">新人首单免减</view>
						  <view class="ticket_date">有效期至2019-01-21</view>
						</view>
					</view>
					<view class="ticket_choose_icon_container" @click="ticketChoose">
						<dic class="ticket_choose_icon" :class="{ticket_choose_icon_s:isChoose}" />
					</view>
					<view class="ticket_show_rule" @click="showDetail">
						<view class="ticket_rule_btn">使用规则</view>
						<uni-icon :type="icon_showdetail" color="#999999" size="14"></uni-icon>
						
					</view>
				</view>
				<view class="ticket_show_content_c" v-show="isShowDetail">
					<view class="horizontal_line"/>
					<view class="ticket_show_content">
						本优惠为新人专享，不限任何商品，订单金额满减免金额即可，自领取日起30天有效
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components:{
			uniIcon
		},
		data() {
			return {
				isShowDetail:false,
				icon_showdetail:"arrowdown"
			}
		},
		methods: {
			showDetail() {
				this.isShowDetail = !this.isShowDetail;
				this.icon_showdetail = this.isShowDetail ? "arrowup":"arrowdown"
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
.ticket_container{
	  margin:12px 20px;
	  background-color: white;
	  padding: 12px;
	  box-sizing: border-box;
	  .ticket_container_sub1{
		background:rgba(255,255,255,1);
		border:1px solid rgba(124,167,210,1);
		padding: 8px;
		box-sizing: border-box;
		.ticket_container_sub2{

			background:rgba(255,255,255,1);
			border:1px solid rgba(212,232,252,1);

			.ticket_container_sub_show_c{
				.row_between;
				position: relative;
				padding: 30px 28px 28px 26px;
				box-sizing: border-box;
				height: 172px;

				.ticket_container_sub_show_l{
					.row_center;
					height: 100%;
					.ticket_sale_money{
						font-size:32px;
						font-family:PingFangSC-Medium;
						font-weight:500;
						color:rgba(124,167,210,1);
					   }
					   .vertical_line{
							border-left: 1px#D2D2D2 dashed;
							width: 1px;
							height: 100%;
							margin: 0 34px 0 40px;
					   }
					   .ticket_sale_des_c{
						   .ticket_des{
							font-size:28px;
							font-family:PingFangSC-Regular;
							font-weight:400;
							color:rgba(51,51,51,1);
						   }
						   .ticket_date{
							margin-top: 22px;
							font-size:22px;
							font-family:PingFangSC-Regular;
							font-weight:400;
							color:rgba(153,153,153,1);
						   }
					   }
				}
				.ticket_choose_icon_container{

					.row_center;
					justify-content: flex-end;
					width: 80px;
					height: 80px;
					.ticket_choose_icon{
						width:24px;
						height:24px;
						background:rgba(255,255,255,1);
						border-radius: 13px;
						border:1px solid rgba(124,167,210,1);
					}
					.ticket_choose_icon_s{
						.ticket_choose_icon;
						background:rgba(124,167,210,1);
					}
				}

				.ticket_show_rule{
					.row_center;
					position: absolute;
					right: 28px;
					bottom: 28px;
					.ticket_rule_btn{
					font-size:20px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(153,153,153,1);
					}
					.ticket_rule_icon{
						width: 14px;
						margin-left: 6px;
					}
				}
			}
			.ticket_show_content_c{
				padding: 0 28px 8px 26px;
				box-sizing: border-box;
				width: 100%;
				.ticket_show_content{
					font-size:22px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:32px;
					margin-top: 10px;
				}
			}

		}
	}
}
.horizontal_line{

    border-top: 1px#D2D2D2 dashed;
    width: 100%;
    height: 1px;
}
</style>

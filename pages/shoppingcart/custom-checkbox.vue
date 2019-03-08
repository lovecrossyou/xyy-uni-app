<template>
	<view>
		<view class="select-active" v-if="isselected" @tap="onchange">
			<image src="../../static/img/sure_circle.png" mode="aspectFill" class="img"></image>
		</view>
		<view class="select" v-else @tap="onchange"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			onchange() {
				this.$emit('change');
			}
		},
		props: {
			isselected: {
				type: Boolean,
				default: false
			},
		},
	}
</script>

<style>
	.select{
		width: 32upx;
		height: 32upx;
		border: 1upx solid #CCC;
		margin-right: 20upx;
		border-radius: 16upx;
	}
	.select-active{
		width: 32upx;
		height: 32upx;
		margin-right: 20upx;
		border-radius: 16upx;
		border: 1upx solid transparent;
	}
	.select-active .img{
		display: block;
		width: 32upx;
		height: 32upx;
		border-radius: 16upx;
	}
</style>

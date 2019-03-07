<template>
	<view>
		<view class="select-active" v-if="isselected" @tap="onchange">
			<image src="../../static/duigou.png" mode="aspectFill" class="img"></image>
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
		width: 31upx;
		height: 31upx;
		border: 1upx solid #CCC;
		margin-right: 20upx;
		border-radius: 4upx;
	}
	.select-active{
		width: 31upx;
		height: 31upx;
		margin-right: 20upx;
		border-radius: 4upx;
		border: 1upx solid transparent;
	}
	.select-active .img{
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 4upx;
	}
</style>

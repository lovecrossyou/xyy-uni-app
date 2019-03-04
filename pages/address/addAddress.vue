 <template>
    <div class="address_page">
        <!-- <head-top head-title="添加地址" go-back='true'></head-top> -->
        <section class="page_text_container">
            <section class="section_list">
                <span class="section_left">联系人</span>
                <section class="section_right">
                    <input type="text" name="name" placeholder="你的名字" v-model="name" class="input_style">
                    <div class="choose_sex">
                        <div class="choose_option" @click="chooseSex(1)">
                            <div class="address_empty_right"  :class="{choosed: sex == 1}">
                            </div>
                            <span>先生</span>
                        </div>
                        <div class="choose_option" @click="chooseSex(2)">
                            <div class="address_empty_right"  :class="{choosed: sex == 2}">
                               
                            </div>
                            <span>女士</span>
                        </div>
                    </div>
                </section>
            </section>
            <section class="section_list">
				
                <span class="section_left">联系电话</span>
                <section class="section_right">
                    <div class="phone_add">
                        <input type="text" name="phone" placeholder="你的手机号" v-model="phone" class="input_style">
                        <img src="../../static/img/add_phone.png" class="add_img" @click="phone_bk = true" />
                    </div>
                    <input v-if="phone_bk" type="text" name="anntherPhoneNumber" placeholder="备选电话" v-model="anntherPhoneNumber" class="input_style phone_bk">
                </section>
            </section>
            <section class="section_list">
                <span class="section_left">送餐地址</span>
                <section class="section_right">
                    <div class="choose_address" v-on:click="searchAdd" >{{myDeatil}}</div>
                    <input type="text" name="address_detail" placeholder="详细地址（如门牌号等）" v-model="address_detail" class="input_style">

                </section>
            </section>
            <section class="section_list">
                <span class="section_left">标签</span>
                <section class="section_right">
                    <input type="text" name="tag" placeholder="无/家/学校/公司" v-model="tag" class="input_style">
                </section>
            </section>
        </section>
        <div class="determine" @click="addAddress">确定</div>
    </div>
</template>

<script>

    import {mapState, mapMutations} from 'vuex'
    import {getAddress, getUser, postAddAddress} from '../../util/service/getData.js'
    import alertTip from '../../components/alertTip.vue'
	import api from '../../util/api.js'

    export default {
      data(){
            return{

                name: null, //姓名
                sex: 1, //性别
                phone: null, //电话
                address_detail: null, //详细地址
                tag: '', //备注
                tag_type: 1, //备注类型
                phone_bk: false, //是否选择备注电话
                anntherPhoneNumber: '', //备注电话
                poi_type: 0, //地址类型
            }
        },
		onLoad() {
			if(this.editAddress.address){
				this.name = this.editAddress.address.recievName ;
				this.phone = this.editAddress.address.phoneNum ;
				this.address_detail = this.editAddress.address.detailAddress;
				this.positionX = this.editAddress.address.positionX;
				this.positionY = this.editAddress.address.positionY
			}
			
		},
        created(){
			
        },
		onShow() {
			console.log('editAddress',this.editAddress.address)
		},
        computed: {
            ...mapState({
				"editAddress":state => state.address.editAddress,
				"searchAddress":state => state.address.searchAddress,
				"positionX":state => state.address.positionX,
				"positionY":state => state.address.positionY,
				"userInfo": state => state.user.userInfo,
			}),
			myDeatil() {
			
				let mydistrictAddress = '小区/写字楼/学校等';
				if(this.searchAddress){
					mydistrictAddress = this.searchAddress.name;
				}else if(this.editAddress.address){
					mydistrictAddress = this.editAddress.address.districtAddress||'小区/写字楼/学校等';
				}
				 return mydistrictAddress;
			},
        },
        methods: {
            ...mapMutations('address',[
                'CONFIRM_ADDRESS'
            ]),
            //选择性别
            chooseSex(sex){			
                this.sex = sex;
            },
			searchAdd(){
				uni.navigateTo({
					url:"searchAddress"
				})
			},
            //保存地址信息
            async addAddress(){
                if (!(this.userInfo && this.userInfo.userId)) {
					uni.showToast({
						title: '请登录',
						icon:'none',
						duration: 2000
					});
					return;
                }else if(!this.name){
					uni.showToast({
						title: '请输入姓名',
						icon:'none',
						duration: 2000
					});
					return;
                }else if(!this.phone){
					uni.showToast({
						title: '请输入电话号码',
						icon:'none',
						duration: 2000
					});
					return;
                }
				else if(!this.searchAddress){
                   uni.showToast({
                   	title: '请选择地址',
                   	icon:'none',
                   	duration: 2000
                   });
					return;
                }else if(!this.address_detail){
                   uni.showToast({
                   	title: '请输入详细地址',
                   	icon:'none',
                   	duration: 2000
                   });
					return;
                }
                if (this.tag == '家') {
                    this.tag_type = 2;
                }else if(this.tag == '学校'){
                    this.tag_type = 3;
                }else if(this.tag == '公司'){
                    this.tag_type = 4;
                }
				const fullAddress = this.myDeatil + this.address_detail
				let params = {
						"phoneNum": this.phone,
						"detailAddress": this.address_detail,
						"recievName": this.name,
						"positionX": this.positionX,
						"positionY": this.positionY,
						"userId": 13,
						"provinceId": 4101,
						"cityId": 410100,
						"isDefault": 0,
						"districtAddress": this.myDeatil,
						"fullAddress": fullAddress,

					}
					if ( this.editAddress.address) {
						params.id = this.editAddress.address.id;
					}
					let res =  this.editAddress.address? await api.deliveryAddressEdit(params) : await api.deliveryAddressCreate(params);
					console.log('添加地址res===',JSON.stringify(res));
					if(res.status==='ok'){
						uni.navigateBack({
							delta:1
						})
					}else{
						 uni.showToast({
							title: res.message,
							icon:'none',
							duration: 2000
						});
					}
            },
        }
    }
</script>

<style lang="scss" scoped>
	// @import '../../common/mixin.less';
    // @import "../../static/css/common.less";
	@import "../../static/style/mixin.scss";
	.add_img{
		width: 24upx;
		height: 24upx;
	}
    .address_page{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 204;
        padding-top: 20upx;
        p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .page_text_container{
        background-color: #fff;
        padding: 20upx;
    }
    .section_list{
        display: flex;
        border-bottom: 1upx solid #f5f5f5;
        .section_left{
            @include sc(28upx, #333);
            flex: 2;
            line-height: 100upx;
        }
        .section_right{
            flex: 5;
            .input_style{
                width: 100%;
                height: 100upx;
                @include sc(28upx, #999);
            }
            .phone_bk{
                border-top: 1upx solid #f5f5f5;
            }
            .phone_add{
                @include fj;
                align-items: center;
            }
            .choose_sex{
                display: flex;
                line-height: 100upx;
                border-top: 1upx solid #f5f5f5;
                .choose_option{
                    @include sc(28upx, #333);
                    display: flex;
                    align-items: center;
                    margin-right: 32upx;
                    .address_empty_right{
                        margin-right: 12upx;
                        @include wh(28upx, 28upx);
                        fill: #ccc;
						border-radius: 14upx;
                    }
                    .choosed{
                        background-color: #4cd964;
                    }
                }
            }
            .choose_address{
                @include sc(28upx, #999);
                line-height: 100upx;
                border-bottom: 1upx solid #f5f5f5;
            }
        }
    }
    .determine{
        background-color: #4cd964;
        @include sc(28upx, #fff);
        text-align: center;
        margin: 0 28upx;
        line-height: 72upx;
        border-radius: 8upx;
        margin-top: 24upx;
    }
    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(80upx, 0, 0);
        opacity: 0;
    }
	
</style>
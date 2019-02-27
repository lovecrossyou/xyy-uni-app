 <template>
    <div class="search_address_page">
        <section>
            <div class="search_form">
                <input type="search" name="search" placeholder="请输入小区/写字楼/学校等" v-model="searchValue">
                <button @click.prevent="searchPlace()">搜索</button>
            </div>
            <ul class="address_list" v-if="searchData">
                <li v-for="(item, index) in searchData" :key="index" @click="choooedAddress(item)">
                    <h4>{{item.name}}</h4>
                    <p>{{item.address}}</p>
                </li>
            </ul>
            <div v-else class="empty_tips">
                <p>找不到地址？</p>
                <p>尝试输入小区、写字楼或学校名</p>
                <p>详细地址（如门牌号等）可稍后输入哦</p>
            </div>
        </section>
    </div>
</template>

<script>
    import {searchNearby} from '../../util/service/getData.js'
    import {mapMutations} from 'vuex'

    export default {
      data(){
            return{
               	searchValue: null, //输入的搜索内容
                searchData: null, //搜索的结果
            }
        },
        props:[],
        methods: {
            ...mapMutations([
                'CHOOSE_SEARCH_ADDRESS'
            ]),
            //搜索
            async searchPlace(){
                if (this.searchValue) {
                    this.searchData = await searchNearby(this.searchValue);
                }
            },
            //选择搜素结果
            choooedAddress(item){
                this.CHOOSE_SEARCH_ADDRESS(item);
                this.$router.go(-1);
            },

        }
    }
</script>
  
<style lang="scss" scoped>
    @import "../../static/style/mixin.scss";
    .search_address_page{
		position: absolute;
       width: 100%;
	   height:100%;
       padding-top: 20upx;
		box-sizing: border-box;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
    }
    .search_form{
        display: flex;
		flex-direction: row;
		width: 100%;
        padding: 10upx;
		box-sizing: border-box;
        input{
            @include sc(.65rem, #999);
            flex: 4;
            background-color: #f1f1f1;
            margin-right: 8upx;
            height: 40upx;
            border-radius: 5upx;
            padding: 0 10upx;
        }
        button{
            flex: 1;
            @include sc(.65rem, #fff);
            background-color: $blue;
            border-radius: 0.15rem;
        }
    }
    .address_list{
        padding: .7rem;
        li{
            padding: .7rem 0;
            border-bottom: 0.025rem solid #f5f5f5;
            line-height: 1rem;
            h4{
                @include sc(.75rem, #555);
            }
            p{
                @include sc(.65rem, #999);
            }
        }
    }
    .empty_tips{
        @include center;
        width: 100%;
        p{
            @include sc(.5rem, #aaa);
            line-height: .7rem;
            text-align: center;

        }
    }
</style>

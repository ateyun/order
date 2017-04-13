<template>
    <div>
        <div class="user-center">
            <img :src="microShop.logo">
            <p>{{microShop.name}}</p>
        </div>
        <group>
            <x-input title='当前买单用户'
                     disabled
                     v-model="userList.username"></x-input>
            <x-input title='输入买单金额'
                     v-model="numPrice"
                     type="number"
                     placeholder="请输入您的买单金额"></x-input>
        </group>
    
        <box gap="20px 10px">
            <icon type="info"></icon>
            <span class="user-tip">请向收银员询问收款金额并填写</span>
        </box>
    
        <box gap="20px 10px">
            <x-button type="primary"
                      @click.native="toPay"
                      :disabled="!(allStates.enterPriseStatus && allStates.appPromissStatus && allStates.userInfoStatus && allStates.businessInfoStatus && allStates.deskInfo && numPrice)">去支付</x-button>
        </box>
    </div>
</template>

<script>
import { XHeader, Group, Cell, XInput, Box, Icon, XButton } from 'vux'
import urlHash from '../../../../config/loginConfig'
import storage from '../../../../config/storage'

export default {
    components: {
        XHeader,
        Group,
        Cell,
        XInput,
        Box,
        Icon,
        XButton
    },
    data() {
        return {
            numPrice: 0,
            showPositionValue: false,
            position: 'default',
            msgError: ''
        }
    },
    computed: {
        userList() {
            return this.$store.state.userInfo
        },
        microShop() {
            return this.$store.state.businessInfo
        },
        allStates() {
            return this.$store.state.allStates
        },
        nexttick() {
            return this.$store.state.orderSumit
        }
    },
    created() {

        // 判断参数是否正确
        if (urlHash.request.company_id) {
            var company_ids = urlHash.request.company_id

            var code = urlHash.getCookieAuth(urlHash.typePay(), company_ids, window.location.href)

            if (!code) {
                return
            }
        }

        if (urlHash.request.weidian_id && urlHash.request.company_id && urlHash.request.desk_id) {

            // 去掉#号
            var weidian_ids = urlHash.request.weidian_id

            var desk_ids = urlHash.request.desk_id

            // 企业信息
            var exterPrise = {
                apiName: 'getEnterPriseStatus',
                params: {
                    company_id: company_ids
                }
            }

            this.$store.dispatch('getEnterPrise', exterPrise)

            // 应用权限
            var appPromiss = {
                apiName: 'getAppPromiss',
                params: {
                    app_code: 'ecash',
                    company_id: company_ids
                }
            }
            this.$store.dispatch('getAppPromiss', appPromiss)


            // 收银桌
            var deskParam = {
                apiName: 'getdesk',
                params: {
                    company_id: company_ids,
                    id: desk_ids
                }
            }
            this.$store.dispatch('getDeskInfo', deskParam)



            // 判断本地是否已经保存token

            storage.setIds({ weidian_id: weidian_ids, company_id: company_ids, desk_id: desk_ids })
        } else {
            this.$store.commit('editMsg', { msgError: '参数错误', showPositionValue: true })
            return
        }



        // 请求两个接口  商家：用户
        var param = {
            apiName: 'getUserInfo',
            params: {
            }
        }

        var weiParam = {
            apiName: 'getMicroShop',
            params: {
                weidian_id: storage.getIds().weidian_id
            }
        }

        this.$store.dispatch('getUserInfo', param)
        this.$store.dispatch('getMicroShop', weiParam)
    },
    methods: {
        toPay() {
            // this.$router.push({ name: 'userpay' })
            var params = {
                apiName: 'submitUserOrder',
                method: 'post',
                data: {
                    order_type: '买单订单',
                    uid: this.userList.uid,
                    weidian_id: storage.getIds().weidian_id,
                    company_id: storage.getIds().company_id,
                    cash_amount: parseFloat(this.numPrice),
                    payment_name: 'cash'
                }
            }
            this.$store.dispatch('submitOrder', params)
        }
    },
    watch: {
        'nexttick': {
            handler: function (val) {
                if (JSON.stringify(val) != "{}") {
                    this.$router.push({ name: 'userpay', query: { order_id: this.$store.state.orderSumit.order_id } })
                }
            }
        }
    }
}
</script>

<style lang="sass">
    $baseFontSize: 100;

    .user-center{
        margin-top: 15px;
        text-align: center;
        img{
            width:180rem / $baseFontSize;
            height: 180rem / $baseFontSize;
            border-radius: 50%;
        }
        p{
            color: #666;
            line-height: 40px;
            font-size: 30rem / $baseFontSize;
        }
    }
    .user-tip{
        font-size:25rem / $baseFontSize;
        color: #333333;
    }

    .weui-cell .weui-cells{
        font-size: 30rem / $baseFontSize!important;
    }

</style>
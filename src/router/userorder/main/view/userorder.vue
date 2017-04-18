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
            msgError: '',
            companyIds: ''
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
        }
    },
    mounted() {
        // 判断参数是否正确
        if (urlHash.request.company_id) {

            var company_ids = urlHash.request.company_id
            this.companyIds = company_ids
            var code = urlHash.getCookieAuth(urlHash.typePay(), company_ids, window.location.href)

            if (!code) {
                return
            }
        }

        if (urlHash.request.weidian_id && urlHash.request.company_id && urlHash.request.desk_id) {

            // 去掉#号
            var weidian_ids = urlHash.request.weidian_id

            var desk_ids = urlHash.request.desk_id

            // 请求接口用户

            this.$store.dispatch('getUserInfo', {apiName: 'getUserInfo', companyId: company_ids})

            // 企业信息
            var exterPrise = {
                apiName: 'getEnterPriseStatus',
                params: {
                    company_id: company_ids
                },
                companyId: company_ids
            }

            this.$store.dispatch('getEnterPrise', exterPrise).then((res) => {

                if (res.code === 200) {
                    // 微店信息
                    console.log('企业信息成功:' + JSON.stringify(res))

                    var weiParam = {
                        apiName: 'getMicroShop',
                        params: {
                            weidian_id: storage.getIds().weidian_id
                        },
                        companyId: company_ids
                    }
                    this.$store.dispatch('getMicroShop', weiParam).then((weires) => {
                        if (weires.code === 200) {
                            // 应用权限
                            console.log('微店信息成功：' + JSON.stringify(weires))
                            var appPromiss = {
                                apiName: 'getAppPromiss',
                                params: {
                                    app_code: 'ecash',
                                    company_id: company_ids
                                },
                                companyId: company_ids
                            }
                            this.$store.dispatch('getAppPromiss', appPromiss).then((appres) => {
                                if (appres.code === 200 && appres.data.ecash != '-1') {
                                    // 收银桌
                                    console.log('应用权限成功：' + JSON.stringify(appres))
                                    var deskParam = {
                                        apiName: 'getdesk',
                                        params: {
                                            company_id: company_ids,
                                            id: desk_ids
                                        },
                                        companyId: company_ids
                                    }
                                    this.$store.dispatch('getDeskInfo', deskParam).then((deskres) => {
                                        if (deskres.code === 200) {
                                            console.log('收银桌成功：' + JSON.stringify(deskres))
                                        }
                                    })

                                }
                            })

                        }
                    })
                }
            })

            storage.setIds({ weidian_id: weidian_ids, company_id: company_ids, desk_id: desk_ids })
        } else {
            this.$store.commit('editMsg', { msgError: '参数错误', showPositionValue: true })
            return
        }
    },
    methods: {
        toPay() {
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
                },
                companyId: this.companyIds
            }
            this.$store.dispatch('submitOrder', params).then((res) => {
                if (res.code === 200) {
                    this.$router.push({ name: 'userpay', query: { order_id: this.$store.state.orderSumit.order_id } })
                }
            })
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
<template>
    <div>
        <!--个人信息-->
        <divider>{{microShop.name}}</divider>
        <div class="userpay-user">
            <p class="userpay-type">订单类型：买单</p>
            <div class="userpay-info">
                <div class="userpay-img">
                    <img :src="userList.headimgurl">
                </div>
                <div class="userpay-name">
                    <p>{{userList.username}} <span v-if="false">13852226521</span></p>
                    <p class="userpay-address"
                       v-if="false">地址：上海市宝山区长江南路258号创意智慧园5楼208室</p>
                </div>
                <div class="userpay-member"
                     v-if="false">
                    白金会员
                </div>
            </div>
        </div>
        <!--判断如果是外卖订单，则显示-->
        <card :header="{title:'商品详情'}"
              v-if="false">
            <p slot="content"
               class="card-padding"
               is-link>
                <img src="../../../../assets/img/2017040521491832.jpg">
                <img src="../../../../assets/img/2017040521491832.jpg">
                <img src="../../../../assets/img/2017040521491832.jpg">
                <span>等3件商品</span>
            </p>
        </card>
        <!--会员优惠部分-->
        <group v-if="!appState.card">
            <!--<cell title="优惠券/优惠码"
                                                                              value="1张可用"
                                                                              is-link></cell>
                                                                        <cell title="积分"
                                                                              value="100"
                                                                              is-link></cell>-->
            <cell title="礼品卡"
                  :value="cardTip"
                  is-link
                  @click.native="giftChoose"></cell>
        </group>
        <!--商品信息-->
        <group>
            <cell title="商品金额"
                  :value="totle_amount"></cell>
            <div class="weui-cell vux-cell-form-preview">
                <div class="weui-form-preview__bd">
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">优惠</label>
                        <span class="weui-form-preview__value">{{youhui}}</span>
                    </div>
                </div>
            </div>
            <cell-form-preview :list="list"></cell-form-preview>
        </group>
        <!--优惠金额-->
        <div class="userpay-discount">
            <p>已优惠：{{allAmount}}元 <span>还需支付：{{lost_amount}}</span></p>
        </div>
        <!--余额部分-->
        <!--<div class="userpay-discount border-top">
                    <p>当前余额：50 <span>￥50</span></p>
                </div>-->
        <!--点击按钮去支付 根据订单类型判断文字信息-->
        <box gap="20px 10px">
            <x-button type="primary"
                      @click.native="payOver" :disabled="!(allStates.enterPriseStatus && allStates.appPromissStatus && allStates.userInfoStatus && allStates.businessInfoStatus)">微信支付</x-button>
        </box>
    
        <actionsheet v-model="show4"
                     :menus="menus1"
                     :componentHtml="sheetDown"
                     show-cancel
                     @on-click-card="toclick"
                     @on-click-menu="click">
        </actionsheet>
    
    </div>
</template>

<script>
import { XHeader, Panel, Group, Cell, CellFormPreview, XButton, Box, Card, Divider, Loading } from 'vux'
import reqs from '../../../../api/userorder/depdata'
import actionsheet from '../../../../components/actionsheet'
import urlHash from '../../../../config/loginConfig'
import storage from '../../../../config/storage'
export default {
    components: {
        XHeader,
        Panel,
        Group,
        Cell,
        CellFormPreview,
        XButton,
        Box,
        Card,
        Divider,
        actionsheet,
        Loading
    },
    data() {
        return {
            show4: false,
            cancelText: '取消',
            sheetDown: JSON.stringify(this.$refs.cardList),
            menus1: [],
            list: [],
            cardArr: []
        }
    },
    computed: {
        totle_amount() {
            return '￥' + this.orderList.total_amount
        },
        youhui() {
            return this.orderList.total_amount - this.orderList.cash_original_amount
        },
        lost_amount() {
            return this.orderList.cash_amount
        },
        allAmount() {
            var lost_amountall = ''
            if (this.orderList.order_discount.length != 0) {
                var discount = this.orderList.order_discount
                for (let i = 0; i < discount.length; i++) {
                    this.list.push({ label: discount[i].name, value: discount[i].amount })
                    lost_amountall += discount[i].amount
                }

            }
            return lost_amountall + this.lost_amount
        },
        userList() {
            return this.$store.state.userInfo
        },
        microShop() {
            return this.$store.state.businessInfo
        },
        orderList() {
            return this.$store.state.userOrder
        },
        appState() {
            return this.$store.state.appState
        },
        allStates() {
            return this.$store.state.allStates
        },
        cardTip() {
            var count = 0
            if (JSON.stringify(this.orderList) != '{}') {
                const cards = this.orderList.cards
                for (let i = 0; i < cards.length; i++) {
                    count += parseFloat(cards[i].use)
                }
            }

            if (count == 0) {
                count = '未使用礼品卡'
            } else {
                count = '-' + count
            }
            return count
        }
    },
    mounted() {
        document.body.style.backgroundColor = '#f5f5f5'

        // 判断参数是否正确
        if (urlHash.request.order_id || this.$route.query.order_id) {

            var order_ids = this.$route.query.order_id || urlHash.request.order_id

            var code = urlHash.getCookieAuth(urlHash.typePay(), '1', window.location.href)

            if (!code) {
                return
            }

        }

        // 获取用户订单信息
        var orderParam = {
            apiName: 'getUserOrder',
            params: {
                order_id: order_ids
            },
            companyId: '1'
        }

        this.$store.dispatch('getUserOrder', orderParam).then((res) => {
            if (res.code === 200 && res.data.status === 0) {
                if (res.data.cards.length != 0) {
                    for (let i = 0; i < res.data.cards.length; i++) {
                        this.cardArr.push(res.data.cards[i].code)
                    }
                }
                // 判断订单用户信息与获取的用户信息是否一致
                this.$store.dispatch('getUserInfo', { apiName: 'getUserInfo', companyId: this.orderList.company_id }).then((userres) => {
                    if (userres.code === 200) {
                        if (res.data.uid != userres.data.uid) {
                            var refreshOrder = {
                                apiName: 'refreshUserOrder',
                                params: {
                                    order_id: order_ids,
                                    uid: userres.data.uid
                                },
                                companyId: this.orderList.company_id
                            }
                            this.$store.dispatch('getOrderRefersh', refreshOrder).then((freshres) => {
                                this.getAllajax()
                            })
                        } else {
                            this.getAllajax()
                        }
                    }
                })
            }
        })
    },
    methods: {
        click(key) {

            if (key != 'ok' && key != 'cancel') {
                if (urlHash.contains(this.cardArr, key.code)) {
                    urlHash.removeByValue(this.cardArr, key.code)
                } else {
                    this.cardArr.push(key.code)
                }
            } else if (key == 'ok') {
                this.$ate.loading.show({
                    text: 'Loading'
                })
                var cards = []
                for (var i = 0; i < this.cardArr.length; i++) {
                    cards.push({ code: this.cardArr[i], use: '0' })
                }
                const refreshOrder = {
                    apiName: 'refreshUserOrder',
                    params: {
                        order_id: this.orderList.order_id,
                        cards: JSON.stringify(cards)
                    },
                    companyId: this.orderList.company_id
                }
                this.$store.dispatch('getOrderRefersh', refreshOrder).then((freshres) => {
                    this.$ate.loading.hide();
                    // this.getAllajax()
                }).catch(() => {
                    this.$ate.loading.hide();
                })
            }
            console.log(this.cardArr)
        },
        // 获取企业信息等
        getAllajax() {
            this.$ate.loading.hide();
            var exterPrise = {
                apiName: 'getEnterPriseStatus',
                params: {
                    company_id: this.orderList.company_id
                },
                companyId: this.orderList.company_id
            }

            this.$store.dispatch('getEnterPrise', exterPrise).then((companyres) => {
                if (companyres.code === 200) {
                    // 微店信息
                    console.log('企业信息成功:' + JSON.stringify(companyres))

                    var weiParam = {
                        apiName: 'getMicroShop',
                        params: {
                            weidian_id: this.orderList.weidian_id
                        },
                        companyId: this.orderList.company_id
                    }
                    this.$store.dispatch('getMicroShop', weiParam).then((weires) => {
                        if (weires.code === 200) {
                            // 应用权限
                            console.log('微店信息成功：' + JSON.stringify(weires))
                            var appPromiss = {
                                apiName: 'getAppPromiss',
                                params: {
                                    app_code: 'card',
                                    company_id: this.orderList.company_id
                                },
                                companyId: this.orderList.company_id
                            }
                            this.$store.dispatch('getAppPromiss', appPromiss).then((appres) => {
                                if (appres.code === 200 && appres.data.ecash != '-1') {
                                    // 收银桌
                                    console.log('应用权限成功：' + JSON.stringify(appres))

                                }
                            })
                        }
                    })
                }
            })
        },
        giftChoose() {
            // if (this.$store.state.cardInfo.length != 0) {
            //     this.show4 = true
            //     this.menus1 = this.$store.state.cardInfo
            // } else {
            this.getGift()
            // }
        },
        getGift(val) {
            var cardParam = {
                apiName: 'getCardInfo',
                params: {
                    app_code: 'card',
                    action: 'lists',
                    sort: 'active_time',
                    order: 'DESC',
                    offset: 0,
                    limit: 10,
                    filter_by: JSON.stringify([{
                        field: 'company_id', opt: 'EQ', value: this.orderList.company_id
                    }, {
                        field: 'uid', opt: 'EQ', value: this.orderList.uid
                    }, {
                        field: 'expire_time', opt: 'EGT', value: urlHash.getNowFormatDate()
                    }, {
                        field: 'amount', opt: 'GT', value: 0
                    }, {
                        field: 'is_print', opt: 'EQ', value: 1
                    }, {
                        field: 'active_time', opt: 'NOT NULL', value: null
                    }]),
                    search_by: {},
                    order_by: { active_time: 'DESC' }
                }
            }
            this.$store.dispatch('getCardInfo', cardParam).then((res) => {
                this.cardArr = []
                if (res.code === 200) {
                    this.$store.commit('saveCardCode', '')
                    this.show4 = true
                    var rows = res.rows
                    var orderCards = this.orderList.cards
                    for (var i = 0; i < rows.length; i++) {

                        if (orderCards.length != 0) {
                            for (var j = 0; j < orderCards.length; j++) {

                                if (rows[i].code == orderCards[j].code) {
                                    this.cardArr.push(rows[i].code)
                                    rows[i].state = true
                                } else {
                                    rows[i].state = false
                                }
                            }
                        } else {
                            rows[i].state = false
                        }

                        if (val && val == rows[i].code) {
                            this.cardArr.push(rows[i].code)
                            rows[i].state = true
                        }
                    }
                    this.menus1 = rows
                    console.log('礼品卡------------' + JSON.stringify(rows))
                }
                console.log(res)
            })
        },
        toclick(val) {

            var cardParam = {
                apiName: 'bindUserCode',
                params: {
                    uid: this.orderList.uid,
                    card_code: val,
                    company_id: this.orderList.company_id
                }
            }
            reqs.send(cardParam).then((res) => {
                if (res.data.code == 200) {
                    this.$store.commit('editMsg', { msgError: '绑定成功', showPositionValue: true })
                    this.getGift(val)
                } else {
                    this.$store.commit('editMsg', { msgError: res.data.msg, showPositionValue: true })
                    setTimeout(() => {
                        this.$store.commit('editMsg', { msgError: '', showPositionValue: false })
                    }, 1000)
                }
            })
        },
        payOver() {
            var payParams = {
                apiName: 'weiToPay',
                params: {
                    company_id: this.orderList.company_id,
                    order_id: this.orderList.order_id,
                    type: 'JSAPI'
                }
            }
            this.$store.dispatch('getPayOver', payParams).then((res) => {

            })


        }
    }
}
</script>
<style lang="sass">
    $baseFontSize: 100;
    .card-padding{
        position: relative;
        padding: 15px;
        &:after{
            content: '';
            display: block;
            clear: both;
        }
        span{
            float: right;
            position: absolute;
            top: 50%;
            right: 30rem / $baseFontSize;
            margin-top: -20rem / $baseFontSize;
            font-size: 30rem / $baseFontSize;
        }
        img{
            width: 100rem / $baseFontSize;
            height: 100rem / $baseFontSize;
            border-radius: 50%;
            float: left;
            margin-right: 15rem / $baseFontSize;
        }
     }
    .userpay-user{
        background: #ffffff;
        padding: 20rem / $baseFontSize;
        p.userpay-type{
            padding: 20rem / $baseFontSize;
            border-bottom: 1px solid #f5f5f5;
        }
        .userpay-info{
            position: relative;
            padding: 20rem / $baseFontSize;
            &:after{
                content: '';
                display: block;
                clear: both;
            }
            .userpay-img{
                float:left;
                img{
                    width: 100rem / $baseFontSize;
                    height: 100rem / $baseFontSize;
                    border-radius: 50%;
                }
            }
            .userpay-member{
                color: green;
            }
            .userpay-name{
                float: left;
                width: 500rem / $baseFontSize;
                margin-left: 40rem / $baseFontSize;
                font-size: 30rem / $baseFontSize;
                span{
                    color: #666666;
                }
                p.userpay-address{
                    color: #666666;
                    margin-top: 10rem / $baseFontSize;
                    font-size: 25rem / $baseFontSize;
                }
            }
            .userpay-member{
                position: absolute;
                right: 0;
                background: #f5f5f5;
                padding: 5px;
                border-radius: 5px;
                top: 8rem / $baseFontSize;
            }
        }
    }
    .userpay-discount{
        padding: 30rem / $baseFontSize;
        background: #ffffff;
        font-size: 30rem / $baseFontSize;
        &:after{
            content: '';
            display: block;
            clear: both;
        }
        p{
            span{
                float: right;
            }
        }
        &+.border-top{
            border-top: 1px solid #d9d9d9;
        }
    }
    
</style>
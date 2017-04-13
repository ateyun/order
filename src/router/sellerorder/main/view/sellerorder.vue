<template>
    <div v-if="isToken">
        <x-header :left-options="{backText: ''}">收银买单：{{userInfo.username}}</x-header>
        <div class="seller-center">
            <img :src="weiDianInfo.logo">
            <p>{{weiDianInfo.name}}</p>
        </div>
        <group>
            <x-input title='当前买单用户' disabled value="暂无"></x-input>
            <x-input title='设置本单金额' v-model="numPrice" type="number" placeholder="请输入买单金额"></x-input>
        </group>
        <box gap="20px 10px">
            <icon type="info"></icon>
            <span class="seller-tip">请输入需要买单的金额，金额将同步给用户</span>
        </box>
        <box gap="20px 10px">
            <x-button type="primary" @click.native="toPay">设置并去支付</x-button>
        </box>
    </div>
</template>

<script>
import { XHeader, Group, Cell, XInput, Box, Icon, XButton } from 'vux'
import server from '../../../../api/sellerorder/depdata'
import {saveCookie , getCookie , removeCookie , getCookieAuth} from '../../../../libs/auth'
import {ssoLogin , getCompanyId , getWeiDianId , getDeskId , getUrlParameter} from '../../../../libs/common'
import axios from 'axios'

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
            sellerName: '尤子墨',
            numPrice: 0,
            isToken : false,
            showPositionValue: false,
            position: 'default',
            msgError: ''
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo
        },
        weiDianInfo() {
            return this.$store.state.weiDianInfo
        },
        companyInfo() {
            return this.$store.state.companyInfo
        },
        ecashConfig() {
            return this.$store.state.ecashConfig
        },
        cashierDeskInfo() {
            return this.$store.state.cashierDeskInfo
        },
        cashierAuth() {
            return this.$store.state.cashierAuth
        },
        fixedAmountOrder() {
            return this.$store.state.fixedAmountOrder
        }
    },
    watch : {
        'companyInfo' : {
            handler : function(val){
                aLog('企业', val)
                if(val != null){
                    if(val.status == 1){
                        this.getWeiDianInfo();
                    }else{
                        this.$store.commit('editMsg', {msgError: '企业已关闭', showPositionValue: true})
                    }
                }else{
                    this.$store.commit('editMsg', {msgError: '请输入正确的企业id', showPositionValue: true})
                }
            }
        },
        'weiDianInfo' : {
            handler : function(val){
                if(val != null){
                    if(val.status == 1){
                        //获取ecash配置
                        this.getEcashConfig();
                    }else{
                        this.$store.commit('editMsg', {msgError: '店铺已关闭', showPositionValue: true})
                    }
                }else{
                    this.$store.commit('editMsg', {msgError: '请输入正确的微店id', showPositionValue: true})
                }
            }
        },
        'ecashConfig' : {
            handler : function(val){
                if(val != null){
                    if(val.ecash != -1 && val.ecash.state.state == 1 && val.ecash.config.is_open == 1){
                        //获取收银桌信息
                        this.getCashierDeskInfo()
                    }else{
                        this.$store.commit('editMsg', {msgError: '该应用未购买或未开通', showPositionValue: true})
                    }
                }
            }
        },
        'cashierDeskInfo' : {
            handler : function(val){
                if(val != null){
                    //获取当前用户信息
                    this.getUserInfo()
                }else{
                    this.$store.commit('editMsg', {msgError: '收银桌不存在', showPositionValue: true})
                }
            }
        },
        'userInfo' : {
            handler : function(val){
                if(val != null){
                    //获取用户权限
                    this.getCashierAuth()
                    //this.isToken = true;
                }
            }
        },
        'cashierAuth' : {
            handler : function(val){
                if(val != null){
                    if(val.length == 0){
                        this.$store.commit('editMsg', {msgError: '您还不是收银员暂没有权限哦', showPositionValue: true})
                    }else{
                        this.isToken = true;
                    }
                }
            }
        },
        'fixedAmountOrder' : {
            handler : function(val){
                if(val != null){
                    //this.$router.push({name:'sellerpay'})
                    let reurl = (location.href).substring(0 , location.href.indexOf('?'))
                    window.location.href = reurl + '#/sellerpay?order_id='+val.order_id;
                }
            }
        }
    },
    mounted () {
        let _token = getUrlParameter("token");
        aLog('_token',_token)
        if(_token != null){
            saveCookie(_global.token_name, _token);
            this.hasLogin();
        }else{
            //debugger
            this.hasLogin();
        }
    },
    methods: {
        hasLogin () {
            if(getCompanyId() != null && getWeiDianId() != null && getDeskId() != null){
                aLog('company_id',getCompanyId(),'weidian_id',getWeiDianId(),'desk_id',getDeskId())
                if(getCookieAuth() != ''){
                    aLog('是否存在cookie','存在cookie')
                    //存token到请求的头部
                    axios.defaults.headers.common['Authorization'] = getCookieAuth()
                    this.getCompanyInfo()
                }else{
                    //TODO 判断客户端类型
                    ssoLogin('weixin');
                }
            }else{
                this.$store.commit('editMsg', {msgError: '请输入正确的地址', showPositionValue: true})
            }
        },
        toPay() {
            //this.$router.push({name:'sellerpay'})
            let orderParam = {
                apiName : 'submitFixedAmountOrder',
                params : {
                    'cash_amount' : this.numPrice,
                    'payment_name' : 'cash',
                    'order_type' : '买单订单',
                    'weidian_id' : getWeiDianId()
                }
            }
            this.$store.dispatch('submitFixedAmountOrder' , orderParam);
        },
        getCompanyInfo () {
            //获取企业信息
            let companyParam = {
                apiName : 'getCompanyInfo'
            }
            this.$store.dispatch('getCompanyInfo' , companyParam);

        },
        getWeiDianInfo () {
            let weidianParam = {
                apiName: 'getWeiDianInfo',
                params: {
                    weidian_id: getWeiDianId()
                }
            }
            this.$store.dispatch('getWeiDianInfo' , weidianParam)
        },
        getEcashConfig () {
            let configParam = {
                apiName : 'getEcashConfig',
                params : {
                    app_code : 'ecash'
                }
            }
            this.$store.dispatch('getEcashConfig' , configParam)
        },
        getCashierDeskInfo () {
            let deskParam = {
                apiName : 'getCashierDeskInfo',
                params : {
                    app_code: 'ecash',
                    action: 'get_desk',
                    id : getDeskId()
                }
            }
            this.$store.dispatch('getCashierDeskInfo' , deskParam)
        },
        getUserInfo () {
            let userParam = {
                apiName : 'getUserInfo'
            }
            this.$store.dispatch('getUserInfo' , userParam)
        },
        getCashierAuth () {
            let userAuthParam = {
                apiName : 'getCashierAuth',
                params : {
                    app_code : 'ecash',
                    action : 'get_pos_cashier_list',
                    filter_by : JSON.stringify([
                            {"field":"AppExtendEcashPosCashier.uid","opt":"EQ","value":this.userInfo.uid},
                            {"field":"AppExtendEcashPosCashier.weidian_id","opt":"EQ","value":getWeiDianId()},
                            {"field":"AppExtendEcashPosCashier.company_id","opt":"EQ","value":getCompanyId()}
                        ])
                }
            }
            this.$store.dispatch('getCashierAuth', userAuthParam)
        },
    }
}
</script>

<style lang="sass">
    $baseFontSize: 100;

    .seller-center{
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
    .seller-tip{
        font-size:25rem / $baseFontSize;
        color: #333333;
    }

    .weui-cell .weui-cells{
        font-size: 30rem / $baseFontSize!important;
    }

</style>
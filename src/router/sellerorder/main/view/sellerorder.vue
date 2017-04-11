<template>
    <div>
        <x-header :left-options="{backText: ''}">收银买单：{{sellerName}}</x-header>
        <div class="seller-center">
            <img src="../../../../assets/img/2017040521491832.jpg">
            <p>沙县小吃漕宝路店</p>
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
import {ssoLogin} from '../../../../libs/common'

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
            numPrice: 0
        }
    },
    mounted () {
        this.getWeiDianInfo();
        aLog(getCookieAuth() )
        if(getCookieAuth() != ''){
            //
            aLog('存在cookie')
        }else{
            ssoLogin('weixin');
        }
    },
    methods: {
        toPay() {
            this.$router.push({name:'sellerpay'})
        },
        getWeiDianInfo() {
            server.send({
                apiName: 'getWeiDianInfo',
                method: 'get',
                params: {
                    company_id : _global.company_id,
                    weidian_id : this.$route.params.weidian_id
                }
            }).then((req)=>{
                aLog(req)
            })
        }
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
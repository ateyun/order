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
                      @click.native="toPay">去支付</x-button>
        </box>
    </div>
</template>

<script>
import { XHeader, Group, Cell, XInput, Box, Icon, XButton } from 'vux'
import server from '../../../../api/userorder/depdata'
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
      }
    },
    mounted() {
        // 判断登陆状态
        if (!urlHash.request.token && !storage.getToken('_token')) {
            urlHash.login(urlHash.isWeiXin(), urlHash.request.company_id ? urlHash.request.company_id : '2', window.location.href)
        } else if (!storage.getToken('_token')) {
            if (urlHash.request.token) {
                const tokenCode = urlHash.request.token.substring(0, urlHash.request.token.indexOf("#"))
                storage.setToken(tokenCode)
                console.log(tokenCode)
            }
        }
        var param = {
            apiName: 'getUserInfo',
            params: {
                token: storage.getToken()
            }
        }
        var weiParam = {
            apiName: 'getMicroShop',
            params: {
                weidian_id: this.$route.params.weidian_id
            }
        }
        this.$store.dispatch('getUserInfo', param)
        this.$store.dispatch('getMicroShop', weiParam)
    },
    methods: {
        toPay() {
            this.$router.push({ name: 'userpay' })
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
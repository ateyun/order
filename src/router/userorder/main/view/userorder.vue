<template>
    <div>
        <x-header :left-options="{backText: ''}">买单</x-header>
        <div class="user-center">
            <img src="../../../../assets/img/2017040521491832.jpg">
            <p>沙县小吃漕宝路店</p>
        </div>
        <group>
            <x-input title='当前买单用户'
                     disabled
                     v-model="userName"></x-input>
        </group>
    
        <group>
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
            <x-button type="primary" @click.native="toPay">去支付</x-button>
        </box>
    </div>
</template>

<script>
import { XHeader, Group, Cell, XInput, Box, Icon, XButton } from 'vux'

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
            userName: '尤子墨',
            numPrice: 0
        }
    },
    mounted () {
        
    },
    methods: {
        toPay() {
            this.$router.push({name:'userpay'})
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
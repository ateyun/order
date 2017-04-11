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
        <group>
            <cell title="优惠券/优惠码"
                  value="1张可用"
                  is-link></cell>
            <cell title="积分"
                  value="100"
                  is-link></cell>
            <cell title="礼品卡"
                  value="3张可用"
                  is-link
                  @click.native="giftChoose"></cell>
        </group>
        <!--商品信息-->
        <group>
            <cell title="商品金额"
                  value="￥100"></cell>
            <cell-form-preview :list="list"></cell-form-preview>
        </group>
        <!--优惠金额-->
        <div class="userpay-discount">
            <p>已优惠：10元 <span>还需支付：90</span></p>
        </div>
        <!--余额部分-->
        <div class="userpay-discount border-top">
            <p>当前余额：50 <span>￥50</span></p>
        </div>
        <!--点击按钮去支付 根据订单类型判断文字信息-->
        <box gap="20px 10px">
            <x-button type="primary">微信支付(￥40)</x-button>
        </box>
    
        <actionsheet v-model="show4"
                     :menus="menus1"
                     show-cancel
                     @on-click-menu="click">
        </actionsheet>
    </div>
</template>

<script>
import { XHeader, Panel, Group, Cell, CellFormPreview, XButton, Box, Card, Divider } from 'vux'
import actionsheet from '../../../../components/actionsheet'
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
        actionsheet
    },
    data() {
        return {
            show4: false,
            cancelText:'取消',
            menus1: {
                'title.noop': 'Are you sure?<br/><span style="color:#666;font-size:12px;">Once deleted, you will never find it.</span>',
                menu1: 'Share to friends',
                menu2: 'Share to timeline'
            },
            list: [{
                label: '生日优惠',
                value: '-10'
            }]
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
        document.body.style.backgroundColor = '#f5f5f5'
    },
    methods: {
        click(key) {
            console.log(key)
        },
        giftChoose() {
            this.show4 = true
        },
        toclick() {
            alert('111')
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
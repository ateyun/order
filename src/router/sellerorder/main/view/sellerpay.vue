<template>
	<div class="seller-bg-f5f5f5 margin-bottom-50">
		<x-header :left-options="{backText: ''}">商家收银台：{{sellerName}}</x-header>
		<div class="seller-pay-header-content">
			<p>订单类型：外卖订单</p>
			<div class="seller-address">
				<span>沙县小吃漕宝路店沙县小吃漕宝路店沙县</span>
			</div>
			<div class="seller-m-t-10">
				<divider>会员识别</divider>
				<br>
	      		<button-tab v-model="type">
	        		<button-tab-item @on-item-click="setIdentifyType()">扫码识别</button-tab-item>
	        		<button-tab-item @on-item-click="setIdentifyType()">手机号码识别</button-tab-item>
	      		</button-tab>
	      	</div>
		</div>
		<!--商品信息-->
  		<card :header="{title:'商品详情'}">
            <p slot="content" class="seller-pay-card-padding" is-link>
                <img src="../../../../assets/img/2017040521491832.jpg">
                <img src="../../../../assets/img/2017040521491832.jpg">
                <img src="../../../../assets/img/2017040521491832.jpg">
                <span>等3件商品</span>
            </p>
		</card>
		<!--礼品卡-->
		<group>
			<cell title="礼品卡" value="3张可用" class="font-size-12" is-link></cell>
		</group>
		<group>
            <cell title="商品金额" value="￥100" class="font-size-12"></cell>
            <cell-form-preview :list="discountList" class="font-size-12"></cell-form-preview>
        </group>
        <div class="seller-pay-discount">
            <p>已优惠：￥10 <span>还需支付：￥90</span></p>
        </div>
        <div class="seller-pay-type">
	        <box gap="30px 20px">
		        <flexbox>
			        <flexbox-item>
			          	<x-button type="primary">微信支付</x-button>
			        </flexbox-item>
			        <flexbox-item>
			          	<x-button type="primary">支付宝支付</x-button>
			        </flexbox-item>
		      	</flexbox>
		    </box>
		    <box gap="30px 20px">
		        <flexbox>
			        <flexbox-item>
			          	<x-button type="primary">现金支付</x-button>
			        </flexbox-item>
			        <flexbox-item>
			          	<x-button type="primary">直接支付</x-button>
			        </flexbox-item>
		      	</flexbox>
		    </box>
		</div>
	</div>
</template>

<script>
import {XHeader, ButtonTab, ButtonTabItem, Divider, Card , Group , Cell , CellFormPreview , Flexbox, FlexboxItem , XButton , Box} from 'vux'
export default{
	components : {
		XHeader,
		ButtonTab,
		ButtonTabItem,
		Divider,
		Card,
		Group,
		Cell,
		CellFormPreview,
		Flexbox, 
		FlexboxItem,
		XButton,
		Box
	},
	data(){
		return {
			sellerName : '尤子墨',
			type : 2,
			discountList: [{
                label: '礼品卡',
                value: '-￥10'
            }]
		}
	},
	methods : {
		setIdentifyType () {

		}
	}
}
</script>

<style lang="sass">
	$baseFontSize: 100;

	.seller-pay-header-content{
		margin: 15px;
		font-size: 25rem / $baseFontSize;
		color: #666;
		position: relative;
		a{
			text-decoration: none;
		}
	}
	.seller-address{
		position: absolute;
		right: 10px;
		top: 0px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width:150px;
		text-align: right;
	}
	.seller-m-t-10{
		margin-top: 10px;
	}
	.seller-pay-card-padding{
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
    .seller-bg-f5f5f5{
    	background-color: #f5f5f5;
    }
    .margin-bottom-50{
    	margin-bottom: 50px;
    }
    .font-size-12{
    	font-size: 12rem / $baseFontSize !important;
    }
    .seller-pay-discount{
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
    .seller-pay-type{
    	.weui-btn{
    		font-size: 14px;
    		padding-left: 8px;
    		padding-right: 8px;
    	}
    }
</style>
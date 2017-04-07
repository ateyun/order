<template>
	<div>
		<x-header :left-options="{backText: ''}">收银买单：{{sellerName}}</x-header>
	</div>
</template>

<script>
import {XHeader} from 'vux'
export default{
	components : {
		XHeader
	},
	data(){
		return {
			sellerName : '尤子墨'
		}
	}
}
</script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../../vuex/sellerorder'
import router from './main/routes'
import './../../assets/css/index.css'
import './../../assets/js/rem'
import {aLog} from '../../libs/common'

Vue.use(VueRouter)

// 添加Fastclick移除移动端点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)

window.aLog = aLog;

new Vue({
	router,
	store
}).$mount('#app')
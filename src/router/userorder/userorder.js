import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../../vuex/userorder'
import router from './main/routes'
import './../../assets/css/index.css'
import './../../assets/js/rem'

Vue.use(VueRouter)

// 添加Fastclick移除移动端点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)

new Vue({
	router,
	store
}).$mount('#app')
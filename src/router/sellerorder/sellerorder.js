import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../../vuex/sellerorder'
import router from './main/routes'
import './../../assets/css/index.css'
import './../../assets/js/rem'

Vue.use(VueRouter)

new Vue({
	router,
	store
}).$mount('#app')
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../../vuex/menu'
import router from './main/routes'

Vue.use(VueRouter)


new Vue({
	router,
	store
}).$mount('#app')
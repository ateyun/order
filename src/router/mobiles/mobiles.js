import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../../vuex/mobiles'
import router from './main/routes'

//使用插件
Vue.use(VueRouter);


//启动应用
new Vue({
	router,
	store
}).$mount('#app')
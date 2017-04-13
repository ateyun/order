import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../../vuex/userorder'
import router from './main/routes'
import './../../assets/css/index.css'
import './../../assets/js/rem'
import {Toast} from 'vux'

Vue.use(VueRouter)

Vue.use(require('vue-wechat-title'))

// 添加Fastclick移除移动端点击延迟
// const FastClick = require('fastclick')
// FastClick.attach(document.body)

new Vue({
  computed: {
    showPositionValue () {
      return this.$store.state.msgTitle.showPositionValue
    },
    msgError () {
      return this.$store.state.msgTitle.msgError
    },
    position () {
      return this.$store.state.msgTitle.position
    }
  },
  components: {
    Toast
  },
  router,
  store
}).$mount('#app')

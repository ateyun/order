import VueRouter from 'vue-router'

const routes = [
  {
    name: 'userorder',
    path: '/',
    meta: {
      title: '买单'
    },
    component: resolve => require(['./view/userorder.vue'], resolve)
  },
  {
    name: 'userpay',
    path: '/userpay',
    meta: {
      title: '收银台'
    },
    component: resolve => require(['./view/userpay.vue'], resolve)
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})

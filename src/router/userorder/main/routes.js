import VueRouter from 'vue-router'
import UserOrder from './view/userorder.vue'

const routes = [
  {
    name: 'userorder',
    path: '/',
    component: UserOrder
  }
]

export default new VueRouter({
  routes
})

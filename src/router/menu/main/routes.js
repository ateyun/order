import VueRouter from 'vue-router'
import Menu from './view/menu'

const routes = [
  {
    name: 'menu',
    path: '/',
    component: Menu
  }
]

export default new VueRouter({
  history: true,
  routes
})

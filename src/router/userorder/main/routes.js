import VueRouter from 'vue-router';

const routes = [
  {
    name: 'userorder',
    path: '/',
    component: resolve => require(['./view/userorder.vue'], resolve),
  },
  {
    name: 'userpay',
    path: '/userpay',
    component: resolve => require(['./view/userpay.vue'], resolve),
  },
];

export default new VueRouter({
  routes,
});

import VueRouter from 'vue-router'

const routes = [
    {
        name: 'sellerorder',
        path: '/',
        component: (resolve)=> require(['./view/sellerorder.vue'],resolve)
    },
    {
        name: 'sellerpay',
        path: '/sellerpay',
        component: (resolve)=> require(['./view/sellerpay.vue'],resolve)
    }
]

export default new VueRouter({
    mode : 'history',
    routes
})
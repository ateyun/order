import VueRouter from 'vue-router'

const routes = [
    {
        name: 'sellerorder',
        path: '/i/:weidian_id',
        component: (resolve)=> require(['./view/sellerorder.vue'],resolve)
    },
    {
        name: 'sellerpay',
        path: '/sellerpay',
        component: (resolve)=> require(['./view/sellerpay.vue'],resolve)
    },
    {
        name: 'login',
        path: '/i/:weidian_id/login',
        component : (resolve)=> require(['./view/login.vue'],resolve)
    }
]

export default new VueRouter({
    routes
})

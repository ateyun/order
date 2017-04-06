import VueRouter from 'vue-router'
import Home from './view/home.vue'

const routes = [
	{
		name: 'home',
		path: '/',
		component: Home
	}
]

export default new VueRouter({
	routes
})
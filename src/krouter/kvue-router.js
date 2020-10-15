import Link from "./krouter-link";
import View from "./krouter-view";
let Vue

// 1.实现一个插件：挂载$router
class KVueRouter {
	constructor(options) {
		// 拿到用户配置的路由表routes
		this.$options = options
		// this.current = '/'
		// 需要创建响应式的current属性
		// 利用Vue提供的defineReactive做响应化
		// 响应式写法一 
		// 这样将来current变化的时候，依赖的组件会重新render,刷新router-view的组件变换 下面render用到了current，所以会被收集起来
		// Vue.util.defineReactive(this, 'current', '/')
		// 响应式写法二
		// this.app = new Vue({
		//   data() {
		//     return {
		//       current: '/'
		//     }
		//   }
		// })	

		//嵌套路由部分
		this.current = window.location.hash.slice(1) || '/'
		Vue.util.defineReactive(this, 'matched', [])
		//match方法可以递归遍历路由表，获得匹配关系数组,只第一次加载,下面配置更新就加载
		this.match()
		// 

		// 监控url变化
		window.addEventListener('hashchange', this.onHashChange.bind(this))
		window.addEventListener('load', this.onHashChange.bind(this))

		// 创建一个路由映射表
		// this.routeMap = {}
		// options.routes.forEach(route => {
		// 	this.routeMap[route.path] = route
		// })
		// console.log(this.routeMap);
		// /: {path: "/", name: "Home", component: {…}}
		// /about: {path: "/about", name: "About", children: Array(1)}
	}
	onHashChange() {
		console.log(window.location.hash);
		this.current = window.location.hash.slice(1)
		// 每次变换就再执行一次
		this.matched = []
		this.match()
	}
// 嵌套路由部分
	match(routes) {
		// 没传就用默认的路由表
		routes = routes || this.$options.routes
		for (let route of routes) {
			// 匹配主页的情况
			if (route.path === '/' && this.current === '/') {
				this.matched.push(route)
				return
			}
			// 非主页 如 this.current="/about/info"   route.path="/about"
			if (route.path!=='/'&&this.current.indexOf(route.path)!==-1){
				this.matched.push(route)
				//有children就去递归
				if (route.children) {
					this.match(route.children)
				}
				return
			}
		}
	}
}

KVueRouter.install = function (_Vue) {
	// 保存构造函数，在KVueRouter里面使用
	Vue = _Vue
	// 挂载$router
	// 怎么获取根实例中的router选项
	Vue.mixin({
		beforeCreate() {
			// 确保根实例的时候才执行
			if (this.$options.router) {
				console.log(this.$options);
				Vue.prototype.$router = this.$options.router 
				// console.log(Vue.prototype.$router);
			}
		}
	})
	//实现两个全局组件router-link和router-view
	Vue.component('router-link',Link)
	Vue.component('router-view',View)
}

export default KVueRouter

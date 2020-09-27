let Vue
// 1.实现一个插件：挂载$router
class KVueRouter {
	constructor(options) {
		this.$options = options
		// 下面创建了，不需要了
		// this.current = '/'

		// 需要创建响应式的current属性
		// 利用Vue提供的defineReactive做响应化
		// 这样将来current变化的时候，依赖的组件会重新render
		Vue.util.defineReactive(this, 'current', '/')
		// this.app = new Vue({
		//   data() {
		//     return {
		//       current: '/'
		//     }
		//   }
		// })	
		// 监控url变化
		window.addEventListener('hashchange', this.onHashChange.bind(this))
		window.addEventListener('load', this.onHashChange.bind(this))

		// 创建一个路由映射表
		this.routeMap = {}
		options.routes.forEach(route => {
			this.routeMap[route.path] = route
		})
		console.log(this.routeMap);
	}
	onHashChange() {
		console.log(window.location.hash);

		this.current = window.location.hash.slice(1)
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
			// $options.router在main中挂载全局
			if (this.$options.router) {
				console.log(this.$options);
				Vue.prototype.$router = this.$options.router
			}
		}
	})
	//实现两个全局组件router-link和router-view
	Vue.component('router-link', {
		props: {
			to: {
				type: String,
				required: true
			}
		},
		render(h) {
			console.log(this.$slots);
			return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
			// return <a href={'#' + this.to}>{this.$slots.default}</a>
		}
	})
	Vue.component('router-view', {
		render(h) {
			// return h('div','router')
			//获取path对应的component
			const { routeMap, current } = this.$router
			let component = routeMap[current].component || null
			// this.$router.$options.routes.forEach(route => {
			// 	if (route.path === this.$router.current) {
			// 		component=route.component
			// 	}
			// })

			return h(component)
		}
	})
}

export default KVueRouter

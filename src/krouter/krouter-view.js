export default {
	render(h) {
		// 嵌套路由部分
		//标记当前router-view深度
		this.$vnode.data.routerView = true
		// console.log(this.$vnode);
		let depth = 0
		let parent = this.$parent
		while (parent) {
			const vnodeData = parent.$vnode && parent.$vnode.data
			if (vnodeData) {
				if (vnodeData.routerView) {
					depth++
				}
			}
			parent = parent.$parent
		}
		// 


		// return h('div','router')
		//获取path对应的component
		// const { routeMap, current } = this.$router
		// let component = routeMap[current].component || null
		// 优化问题，不能每次都遍历,在上面创建映射表
		// this.$router.$options.routes.forEach(route => {
		// 	if (route.path === this.$router.current) {
		// 		component=route.component
		// 	}
		// })

		//嵌套部分
		let component = null
		// matched在router上创建了
		const route = this.$router.matched[depth]
		if (route) {
			component = route.component
		}
		return h(component)
	}
}

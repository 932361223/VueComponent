// 保存构造函数引用，避免import
let Vue;
class Store {
	// kstore/index 传来的表
	constructor(options) {
		this._mutations = options.mutations
		this._actions = options.actions
		this._wrappedGetters = options.getters

		//定义computed选项
		const computed = {}
		this.getters = {}
		// index.js定义
		// getters: {
		// 	doubleCounter(state) {}
		// },
		const store = this
		Object.keys(this._wrappedGetters).forEach(key => {
			// 获取用户定义的getter
			console.log(key);
			const fn = store._wrappedGetters[key]
			// 转换为computed可以使用无参数形式
			computed[key] = function () {
				return fn(store.state)
			}
			// 为getters定义只读属性
			Object.defineProperty(store.getters, key, {
				// computed是挂载到_vm的，所以得从里面获取值
				get: () => store._vm[key]
			})

		})




		// 响应化处理state
		// this.state = new Vue({
		// 	data: options.state
		// })
		this._vm = new Vue({
			data: {
				// 加两个$，Vue不做代理,不能被外部访问
				$$state: options.state
			},
			computed
		})
		// 绑定commit、dispatch的上下文文store实例
		this.commit = this.commit.bind(this)
		this.dispatch = this.dispatch.bind(this)
	}
	// 存取器， store.state
	get state() {
		// console.log(this._vm);
		return this._vm._data.$$state
	}

	set state(v) {
		console.error('不能乱改人家哦');
	}
	// store.commit('add',1)
	// type: mutation的类型
	// payload：载荷，是参数
	commit(type, payload) {
		const entry = this._mutations[type]
		if (entry) {
			entry(this.state, payload)
		}
	}
	dispatch(type, payload) {
		const entry = this._actions[type]
		if (entry) {
			entry(this, payload)
		}
	}
}
function install(_Vue) {
	Vue = _Vue

	Vue.mixin({
		beforeCreate() {
			// $options.store在main中挂载全局 
			if (this.$options.store) {
				Vue.prototype.$store = this.$options.store
			}
		}
	})
}
// Vuex
export default {
	Store,
	install
}

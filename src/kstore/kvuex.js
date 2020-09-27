let Vue;
class Store {
	// kstore/index 传来的表
	constructor(options) {
		this._mutations=options.mutations
		this._actions=options.actions
		// this.state = new Vue({
		// 	data: options.state
		// })
		this._vm = new Vue({
			data: {
				$$state:options.state
			}
		})

		this.commit=this.commit.bind(this)
		this.dispatch=this.dispatch.bind(this)
	}
	get state() {
		console.log(this._vm);
		return this._vm._data.$$state
	}

	set state(v) {
	console.error('不能乱改人家哦');
	}
// store.commit('add',1)
	commit(type,payload) {
		const entry = this._mutations[type]
		if (entry) {
			entry(this.state, payload)
		}
	}
	dispatch(type,payload) {
		const entry = this._actions[type]
		if (entry) {
		entry(this,payload)
		}
	}
}
function install(_Vue){
	Vue = _Vue
	
	Vue.mixin({
		beforeCreate() {
			// $options.store在main中挂载全局 
			if (this.$options.store) {
				Vue.prototype.$store=this.$options.store
			}
		}
	})
}
// Vuex
export default {
	Store,
	install
}

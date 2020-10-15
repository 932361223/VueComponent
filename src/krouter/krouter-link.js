export default {
	props: {
		to: {
			type: String,
			required: true
		}
	},
	render(h) {
		// 不能写template,因为平时开发用webpack是预编译，提前打包完了，不会再编译template,runtime-only没有编译器
		return h('a', { attrs: { href: '#' + this.to } }, this.$slots.default)
		// return <a href={'#' + this.to}>{this.$slots.default}</a>
	}
}

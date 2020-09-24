import Vue from 'vue'
import Notice from '@/components/Notice.vue'
function create(Component, props) {
  // 组件构造函数如何获取？
  // 1.Vue.extend()
  const Ctor = Vue.extend(Component)
  // 创建组件实例
  const comp = new Ctor({ propsData: props })
  comp.$mount()
  document.body.appendChild(comp.$el)
  comp.remove = function() {
      document.body.removeChild(comp.$el)
      comp.$destroy()
    }
  // 2.render
  // const vm = new Vue({
  //   // h是createElement, 返回VNode，是虚拟dom
  //   // 需要挂载才能变成真实dom
  //   render: h => h(Component, {props}),
  // }).$mount() // 不指定宿主元素，则会创建真实dom，但是不会追加操作

  // 获取真实dom
  // document.body.appendChild(vm.$el)

  // const comp = vm.$children[0]

  // 删除
  // comp.remove = function() {
  //   document.body.removeChild(vm.$el)
  //   vm.$destroy()
  // }

  return comp

}

// export default create
// 函数柯里化
export default {
  install(Vue) {
    Vue.prototype.$notice=function (options) {
      return create(Notice,options)
    }
  }
}

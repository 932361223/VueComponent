
function defineReactive (obj, key, val) {
  // 递归 可能传入的是数组或者对象
  observe(val)
  // 对传入obj进行访问拦截
  Object.defineProperty(obj, key, {
    get () {
      console.log('get' + key);
      return val
    },
    set (newVal) {
      if (newVal !== val) {
        console.log('set' + key + ":" + newVal);
        // 如果传入的newVal依然是obj，需要做响应化处理
        observe(newVal)
        val = newVal
        // update()
      }
    }
  })
}

function observe (obj) {
  // 不是数组对象就返回
  if (typeof obj !== 'object' || obj == null) {
    return
  }
  // 不能直接响应，要判断
  // Object.keys(obj).forEach(key => {
  //   defineReactive(obj, key, obj[key])
  // })
  new Observer(obj)
}
// 根据对象类型决定如何做响应化(判断是数组还是对象)
class Observer {
  constructor(value) {
    this.value = value
    // 判断其类型
    if (typeof value === 'object') {
      this.walk(value)
    }
  }
  // 对象数据响应化
  walk (obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }

  // 数组数据响应化，待补充
}

// 代理函数，方便用户直接访问$data中的数据
// proxy(this, '$data')
function proxy (vm, sourceKey) {
  // vm[sourceKey]就是vm[$data]
  Object.keys(vm[sourceKey]).forEach(key => {
    // 将$data中的key代理到vm属性中
    Object.defineProperty(vm, key, {
      get () {
        return vm[sourceKey][key]
      },
      set (newVal) {
        vm[sourceKey][key] = newVal
      }
    })
  })
}

// 创建KVue构造函数
class KVue {
  constructor(options) {
    // 保存选项
    this.$options = options
    this.$data = options.data

    // 响应化处理
    observe(this.$data)

    // 代理
    proxy(this, '$data')

    // 创建编译器
    // console.log(options);
    new Compiler(options.el, this)
  }
}


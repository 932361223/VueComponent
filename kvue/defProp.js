
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
// function update () {
//   app.innerText = obj.foo
// }

function observe (obj) {
  // 不是数组对象就返回
  if (typeof obj !== 'object' || obj == null) {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}
//简单的set方法，实际源码中对obj进行各种操作
function set (obj, key, val) {
  defineReactive(obj, key, val)
}
// const obj = {}
// defineReactive(obj, 'foo', 'foo')
// foo.foo
// foo.foo = '666666'
const obj = { foo: 'foo', bar: 'bar', baz: { a: 1 }, arr: [1, 2, 3] }
observe(obj)
// obj.baz.a = 10 // no ok
obj.baz = { a: 100 }
obj.baz.a = 100000
// defineReactive(obj, 'foo', '')
// obj.foo = new Date().toLocaleTimeString()

// setInterval(() => {
//   obj.foo = new Date().toLocaleTimeString()
// }, 1000);
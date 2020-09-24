<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'KForm',
  componentName:'KForm',
  provide() {
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate(cb) {
      // 获取所有孩子KFormItem
      // [resultPromise]
      // const tasks = this.$children
      //   .filter(item => item.prop) // 过滤掉没有prop属性的Item
        // .map(item => item.validate());
    const tasks=this.fields.map(item => item.validate())
      // 统一处理所有Promise结果
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  },
  created () {
    this.fields=[]
    this.$on('form.addField',item=>{
      this.fields.push(item)
    })
  }
};
</script>

<style scoped>
</style>

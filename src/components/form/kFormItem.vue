<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Schema from 'async-validator'
export default {
  inject:['form'],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop:{
      type: String,
      default: "",
    }
  },
  components: {},
  data() {
    return {
      error: "",
    };
  },
  computed: {},
  mounted () {
    this.$on('validate',()=>{
      this.validate()
    })
  },
  methods: {
    validate(){
      const value=this.form.model[this.prop]
      const rules=this.form.rules[this.prop]
      const des={[this.prop]:rules}
      const schema =new Schema(des)
      return schema.validate({[this.prop]:value},errors=>{
        if(errors){
          this.error=errors[0].message
        }else{
          this.error=''
        }
      })

    }
  }
};
</script>
<style scoped>
</style>

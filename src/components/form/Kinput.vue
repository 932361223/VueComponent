<template>
  <div>
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs"/>
  </div>
</template>

<script>
export default {
  inheritAttrs:false,
  name:'Kinput',
  props: {
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
      this.$parent.$emit('validate')
    },
  },
  mounted() {},
};
</script>
<style scoped></style>

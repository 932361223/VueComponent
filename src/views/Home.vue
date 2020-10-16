<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <index></index>
    <p @click="$store.commit('add')">couter:{{$store.state.counter}}</p>
    <p @click="$store.dispatch('add')">asyncCounter:{{$store.state.counter}}</p>
    <p>double Counter:{{$store.getters.doubleCounter}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import index from '@/components/form/index.vue'
export default {
  name: 'Home',
  components: {
    index
  },
  // created () {
  //   this.$store.state=1
  // }
}
</script>

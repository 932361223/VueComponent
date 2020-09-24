<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <main-index></main-index>
  </div>
</template>

<script>
import mainIndex  from '@/components/form/index.vue'
export default {
  name: 'App',
  components: {
    mainIndex
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <index></index>
  </div>
</template>

<script>
// @ is an alias to /src
import index from '@/components/form/index.vue'
export default {
  name: 'Home',
  components: {
    index
  }
}
</script>

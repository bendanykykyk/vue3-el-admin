<template>
  <div id="nav"></div>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  props: {
    name: {
      type: String
    }
  }
  // setup(props) {
  //   // 有提示
  //   console.log(props.name)
  // }
})
</script>
<style lang="less"></style>

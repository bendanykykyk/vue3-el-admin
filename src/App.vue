<template>
  <el-config-provider :locale="locale">
    <div id="nav"></div>
    <router-view />
  </el-config-provider>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
// import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default defineComponent({
  name: 'App',
  props: {
    name: {
      type: String
    }
  },
  setup() {
    return {
      locale: zhCn
    }
  }
  // setup(props) {
  //   // 有提示
  //   console.log(props.name)
  // }
})
</script>
<style lang="less"></style>

<template>
  <el-breadcrumb separator="/">
    <template v-for="item in breadcrumbs" :key="item.name">
      <el-breadcrumb-item :to="{ path: item.path }">{{
        item.name
      }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { IBreadcrumb } from '../types'
export default defineComponent({
  name: 'breadcrumb',
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  //这里存放数据
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped></style>

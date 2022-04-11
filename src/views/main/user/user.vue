<template>
  <div class="user">
    <div class="search">
      <UForm :formOptions="searchFormConfig"></UForm>
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UForm from '@/base-ui/form'
// 数据
import { searchFormConfig } from './config/search.config'
export default defineComponent({
  name: 'user',
  components: {
    UForm
  },
  setup() {
    return {
      searchFormConfig
    }
  }
})
</script>

<style lang="less" scoped>
.search {
}
.content {
}
</style>

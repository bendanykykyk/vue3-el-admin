<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @search="onSearch"
    ></page-search>
    <div class="content">
      <page-content
        :contentTableConfig="contentTableConfig"
        pageName="merchant"
      ></page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
// import UTable from '@/base-ui/table'
// 数据
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
// 常量名字
import { GLOBAL_FILTER_UTC_TIME } from '@/global/const'
// import PageButtonGroup from '@/components/page-button-group/src/page-button-group.vue'
export default defineComponent({
  name: 'User',
  components: {
    PageSearch,
    PageContent
    // UTable,
    // PageButtonGroup
  },
  setup() {
    const filterTime: any = inject(GLOBAL_FILTER_UTC_TIME)
    console.log(filterTime('2020-08-12 23:23:59'))
    const onSearch = (formData: any) => {
      console.log(formData)
    }
    return {
      contentTableConfig,
      searchFormConfig,
      onSearch
    }
  }
})
</script>

<style lang="less" scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
.image-slot {
  width: 50px;
  height: 50px;
}

.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>

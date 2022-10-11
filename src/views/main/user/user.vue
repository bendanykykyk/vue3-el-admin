<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @search="onSearch"
      @reset="onReset"
    ></page-search>
    <div class="content">
      <page-content
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        pageName="merchant"
        @onAddClick="onAddClick"
        @onEditClick="onEditClick"
      >
      </page-content>
    </div>
    <div class="page-modal">
      <PageModal
        ref="pageModalRef"
        :modalFormConfig="modalFormConfig"
        :defaultInfo="defaultInfo"
      ></PageModal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
// import UTable from '@/base-ui/table'

// 数据
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalFormConfig } from './config/modal.config'
// 常量名字
import { GLOBAL_FILTER_UTC_TIME } from '@/global/const'

// hook
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'User',
  components: {
    PageSearch,
    PageContent,
    PageModal
    // UTable,
    // PageButtonGroup
  },
  setup() {
    const filterTime: any = inject(GLOBAL_FILTER_UTC_TIME)
    console.log(filterTime('2020-08-12 23:23:59'))

    const [onSearch, onReset, pageContentRef] = usePageSearch()

    const newCallBack = () => {}
    const editCallBack = () => {}
    // pageModal相关hook
    const [pageModalRef, defaultInfo, onAddClick, onEditClick] = usePageModal(
      newCallBack,
      editCallBack
    )

    return {
      contentTableConfig,
      searchFormConfig,
      modalFormConfig,
      onSearch,
      onReset,
      pageContentRef,
      pageModalRef,
      onAddClick,
      onEditClick,
      defaultInfo
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

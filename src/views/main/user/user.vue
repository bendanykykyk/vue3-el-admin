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
        pageName="merchant"
        :modalFormConfig="modalFormConfigRef"
        :defaultInfo="defaultInfo"
      ></PageModal>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'

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
import { useStore } from '@/store'

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

    const newCallBack = () => {
      // 找到password项
      let passwordItem = modalFormConfig.formItems.find(
        (item) => item.type === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallBack = () => {
      // 找到password项
      let passwordItem = modalFormConfig.formItems.find(
        (item) => item.type === 'password'
      )
      passwordItem!.isHidden = true
    }
    // pageModal相关hook
    const [pageModalRef, defaultInfo, onAddClick, onEditClick] = usePageModal(
      newCallBack,
      editCallBack
    )

    // 返回数据的时候用computed 副作用监听到store.state.entireDepartments变化了，就会重新来一遍；要不然由于请求是异步的 而setup只相当于create生命周期，
    // 只会执行一次，这样只会把store.state.entireDepartments的初始值拿到[]
    // 2.ajax请求数据，给typeData赋值
    const store = useStore()
    store.dispatch('getEntireDataAction', {
      pathName: 'department',
      queryInfo: {
        offset: 0,
        size: 1000
      }
    })
    store.dispatch('getEntireDataAction', {
      pathName: 'duty',
      queryInfo: {
        offset: 0,
        size: 1000
      }
    })
    const modalFormConfigRef = computed(() => {
      // 更改配置文件中modalFormConfig.formItems.xx.options的内容
      // 1.找到departmentIdItems和dutyIdItems
      const departmentIdItems = modalFormConfig.formItems.find((item) => {
        return item.key === 'departmentId'
      })
      // 2.找到dutyIdItems
      const dutyIdItems = modalFormConfig.formItems.find((item) => {
        return item.key === 'dutyId'
      })
      const entireDepartments = store.state.entireDepartments

      departmentIdItems!.typeData = entireDepartments.map((item) => {
        return { label: item.name, value: item.id }
      })

      const entireDuties = store.state.entireDuties

      dutyIdItems!.typeData = entireDuties.map((item) => {
        return { label: item.name, value: item.id }
      })

      return modalFormConfig
    })

    return {
      contentTableConfig,
      searchFormConfig,
      modalFormConfigRef,
      // modalFormConfig,
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

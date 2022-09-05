<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @search="onSearch"
    ></page-search>
    <div class="content">
      <u-table
        :title="title"
        :propList="propList"
        :listData="userList"
        :isColumnIndexShow="isColumnIndexShow"
        :isColumnSelectorShow="isColumnSelectorShow"
        @selection-change="handleSelectionChange"
      >
        <template #operations>
          <page-button-group
            @handle-click="handleButtonGroupClick"
          ></page-button-group>
        </template>
        <template #footer>
          <el-pagination
            v-model:currentPage="currentPage1"
            :page-size="10"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, prev, pager, next"
            :total="200"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </template>
        <template #enable="scope">
          <el-button
            plain
            size="small"
            :type="scope.row.enable ? 'success' : 'danger'"
          >
            {{ scope.row.enable ? '可用' : '禁用' }}
          </el-button>
        </template>
        <template #avatar="scope">
          <el-image
            class="image-slot"
            fit="cover"
            :src="scope.row.avatar"
            :preview-src-list="[scope.row.avatar]"
            :preview-teleported="true"
          ></el-image>
        </template>
        <template #handler="scope">
          <el-button link type="primary" size="small" plain>Detail</el-button>
          <el-button link type="primary" size="small" plain>Edit</el-button>
        </template>
        <!-- <template #createTime="scope">
          {{ $filters.formatTime(scope.row.createTime) }}
        </template> -->
      </u-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject, ref } from 'vue'
import { useStore } from 'vuex'
import PageSearch from '@/components/page-search'
import UTable from '@/base-ui/table'
// 数据
import { searchFormConfig } from './config/search.config'
// 常量名字
import { GLOBAL_FILTER_UTC_TIME } from '@/global/const'
import PageButtonGroup from '@/components/page-button-group/src/page-button-group.vue'
export default defineComponent({
  name: 'User',
  components: {
    PageSearch,
    UTable,
    PageButtonGroup
  },
  setup() {
    const filterTime: any = inject(GLOBAL_FILTER_UTC_TIME)
    console.log(filterTime('2020-08-12 23:23:59'))
    const store = useStore()
    const userList = computed(() => store.state.system.userList)
    store.dispatch('system/getPageListAction', {
      url: '/api/user/query',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const propList: any[] = [
      // { prop: 'id', label: '编号', minWidth: '100' },
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'avatar', label: '头像', minWidth: '200', slotName: 'avatar' },
      {
        prop: 'enable',
        label: '是否可用',
        minWidth: '100',
        slotName: 'enable'
      },
      {
        prop: 'createTime',
        label: '创建时间',
        minWidth: '250'
        // slotName: 'createTime'
      },
      { label: '操作', minWidth: '150', slotName: 'handler', fixed: 'right' }
    ]

    const onSearch = (formData: any) => {
      console.log(formData)
    }
    const title = '用户列表'
    const isColumnIndexShow = true
    const isColumnSelectorShow = true

    const handleSelectionChange = (val: any) => {
      console.log(val)
    }
    const handleButtonGroupClick = (operationName: string) => {
      console.log(operationName)
    }

    const currentPage1 = ref(5)

    const small = ref(false)
    const background = ref(false)
    const disabled = ref(false)

    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
    }
    return {
      title,
      searchFormConfig,
      userList,
      propList,
      onSearch,
      isColumnIndexShow,
      isColumnSelectorShow,
      handleSelectionChange,
      handleButtonGroupClick,
      currentPage1,
      small,
      background,
      disabled,
      handleSizeChange,
      handleCurrentChange
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

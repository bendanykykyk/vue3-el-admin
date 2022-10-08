<template>
  <div class="page-content-container">
    <u-table
      v-model:pageInfo="pageInfo"
      :list-data="dataList"
      :list-count="dataCount"
      v-bind="contentTableConfig"
      @selection-change="handleSelectionChange"
      @handle-size-change="handleSizeChange"
      @handle-current-change="handleCurrentChange"
    >
      <template #operations>
        <page-button-group @handle-click="handleButtonGroupClick">
        </page-button-group>
      </template>
      <!-- <template #footer>
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
        </template> -->
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
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import PageButtonGroup from '@/components/page-button-group/src/page-button-group.vue'
import UTable from '@/base-ui/table'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'page-content',
  components: {
    UTable,
    PageButtonGroup
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const dataList = computed(() => store.state.system[props.pageName + 'List'])
    const dataCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )

    const pageInfo = ref({ pageSize: 10, currentPage: 0 })
    watch(pageInfo, () => getPageData())
    const getPageData = (queryInfo: any = {}) => {
      console.log('请求接口')
      store.dispatch('system/getPageListAction', {
        // url: '/api/user/query',
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    const handleSelectionChange = (val: any) => {
      console.log(val)
    }
    const handleCurrentChange = (val: number) => {
      pageInfo.value.currentPage = val
    }
    const handleSizeChange = (val: number) => {
      pageInfo.value.pageSize = val
    }
    const handleButtonGroupClick = (operationName: string) => {
      console.log(operationName)
    }

    return {
      // userList,
      dataList,
      handleSelectionChange,
      handleButtonGroupClick,
      getPageData,
      dataCount,
      pageInfo,
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>

<style lang="less" scoped></style>

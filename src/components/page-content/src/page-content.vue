<template>
  <div class="page-content-container">
    <u-table
      :list-data="dataList"
      v-bind="contentTableConfig"
      @selection-change="handleSelectionChange"
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
import { defineComponent, computed } from 'vue'
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
    store.dispatch('system/getPageListAction', {
      // url: '/api/user/query',
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const handleSelectionChange = (val: any) => {
      console.log(val)
    }
    const handleButtonGroupClick = (operationName: string) => {
      console.log(operationName)
    }

    return {
      // userList,
      dataList,
      handleSelectionChange,
      handleButtonGroupClick
    }
  }
})
</script>

<style lang="less" scoped></style>

<template>
  <div class="page-content-container">
    <u-table
      v-bind="contentTableConfig"
      v-model:pageInfo="pageInfo"
      :list-data="dataList"
      :list-count="dataCount"
      @selection-change="handleSelectionChange"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template #operations>
        <page-button-group
          @handle-click="handleButtonGroupClick"
          :isEditShow="isEditShow"
          :isCreateShow="isCreateShow"
        >
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

      <template #handler="scope">
        <el-button link type="primary" size="small" plain>Edit</el-button>
        <el-popconfirm
          title="Are you sure to delete this?"
          @confirm="handleDeleteClick(scope.row)"
        >
          <template #reference>
            <el-button link type="primary" size="small" plain>Delete</el-button>
          </template>
        </el-popconfirm>
      </template>
      <template #avatar="scope">
        <el-image
          class="image-slot"
          fit="cover"
          :src="scope.row.avatar"
          :preview-src-list="[scope.row.avatar]"
          :preview-teleported="true"
        >
        </el-image>
      </template>
      <!-- 动态的插槽，不含一些通用的，可以让页面内去重写一些东西 -->
      <template
        v-for="item in dynamicPropsSlots"
        :key="item.slotName"
        #[item.slotName]="scope"
      >
        <slot
          v-if="item.slotName"
          :name="item.slotName"
          :row="scope.row"
        ></slot>
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
import { usePermissions } from '@/hooks/use-permissions'

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

    const pageInfo = ref({ pageSize: 10, currentPage: 1 })
    watch(pageInfo, () => getPageData())
    const getPageData = (queryInfo: any = {}) => {
      console.log('请求接口')
      store.dispatch('system/getPageListAction', {
        // url: '/api/user/query',
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    const handleSelectionChange = (val: any) => {
      console.log(val)
    }
    const handleSizeChange = (pageSize: number) => {
      pageInfo.value.pageSize = pageSize
    }
    const handleCurrentChange = (currentPage: number) => {
      pageInfo.value.currentPage = currentPage
    }

    const handleButtonGroupClick = (operationName: string) => {
      console.log(operationName)
    }

    // 4.获取动态插槽的名字
    const dynamicPropsSlots = props.contentTableConfig.propList.filter(
      (item: any) => {
        if (['handler', 'enable'].indexOf(item.slotName) == -1) {
          return true
        } else {
          return false
        }
      }
    )
    // 获取按钮权限
    console.log('权限：' + usePermissions(props.pageName, 'create'))
    const isCreateShow = computed(() =>
      usePermissions(props.pageName, 'create')
    )
    const isEditShow = computed(() => usePermissions(props.pageName, 'edit'))

    // 删除
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        queryInfo: {
          id: item.id
        }
      })
    }
    return {
      // userList,
      dataList,
      handleSelectionChange,
      handleButtonGroupClick,
      getPageData,
      dataCount,
      pageInfo,
      handleSizeChange,
      handleCurrentChange,
      dynamicPropsSlots,
      isCreateShow,
      isEditShow,
      handleDeleteClick
    }
  }
})
</script>

<style lang="less" scoped></style>

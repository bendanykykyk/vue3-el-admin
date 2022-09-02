<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @search="onSearch"
    ></page-search>
    <div class="content">
      <u-table :propList="propList" :listData="userList">
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
        <!-- <template #createTime="scope">
          {{ $filters.formatTime(scope.row.createTime) }}
        </template> -->
      </u-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue'
import { useStore } from 'vuex'
import PageSearch from '@/components/page-search'
import UTable from '@/base-ui/table'
// 数据
import { searchFormConfig } from './config/search.config'
// 常量名字
import { GLOBAL_FILTER_UTC_TIME } from '@/global/const'
export default defineComponent({
  name: 'User',
  components: {
    PageSearch,
    UTable
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
      { prop: 'id', label: '编号', minWidth: '100' },
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
      }
    ]

    const onSearch = (formData: any) => {
      console.log(formData)
    }

    return {
      searchFormConfig,
      userList,
      propList,
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
</style>

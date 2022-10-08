<template>
  <div class="u-table">
    <div class="header-container">
      <div class="title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="operations">
        <slot name="operations"></slot>
      </div>
    </div>
    <el-table :data="listData" border style="width: 100%" v-bind="$attrs">
      <el-table-column
        type="selection"
        width="60"
        v-if="isColumnSelectorShow"
        align="center"
      />
      <el-table-column
        type="index"
        width="80"
        v-if="isColumnIndexShow"
        label="序号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        v-for="propItem in propList"
        :key="propItem.prop"
        v-bind="propItem"
        align="center"
      >
        <template #default="scope">
          <slot :name="propItem.slotName" :row="scope.row">
            {{ scope.row[propItem.prop] }}
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer-container">
      <slot name="footer">
        <el-pagination
          :currentPage="pageInfo.currentPage"
          :page-size="pageInfo.currentPageSize"
          :page-sizes="[10, 20, 50, 100]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total,sizes, prev, pager, next"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'UTable',
  props: {
    title: {
      type: String,
      default: ''
    },
    propList: {
      type: Array as PropType<any[]>,
      default() {
        return []
      }
      // required: true
    },
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    isColumnIndexShow: {
      type: Boolean
    },
    isColumnSelectorShow: {
      type: Boolean
    },
    pageInfo: {
      type: Object,
      default: () => ({ pageSize: 10, currentPage: 0 })
    }
  },
  setup(props, { emit }) {
    const small = ref(false)
    const background = ref(false)
    const disabled = ref(false)

    const handleSizeChange = (val: number) => {
      emit('handleSizeChange', val)
    }
    const handleCurrentChange = (val: number) => {
      emit('handleCurrentChange', val)
    }
    return {
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
.header-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  .title {
    font-size: 18px;
    font-weight: 700;
  }
}
</style>

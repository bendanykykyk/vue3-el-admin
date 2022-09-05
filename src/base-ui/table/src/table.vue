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
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'UTable',
  props: {
    title: {
      type: String,
      default: ''
    },
    propList: {
      type: Array as PropType<any[]>,
      required: true
    },
    listData: {
      type: Array,
      required: true
    },
    isColumnIndexShow: {
      type: Boolean
    },
    isColumnSelectorShow: {
      type: Boolean
    }
  },
  setup(props, { emit }) {
    return {}
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

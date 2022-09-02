<template>
  <div class="u-table">
    <el-table :data="listData" border style="width: 100%">
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
    propList: {
      type: Array as PropType<any[]>,
      required: true
    },
    listData: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    return {}
  }
})
</script>

<style lang="less" scoped></style>

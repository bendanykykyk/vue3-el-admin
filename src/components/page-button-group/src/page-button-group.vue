<template>
  <div class="page-button-group-container">
    <el-button type="primary" @click="$emit('handleClick', 'create')"
      >新建</el-button
    >
    <el-dropdown>
      <el-button type="primary">
        其他操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="$emit('handleClick', 'upload')">
            上传
          </el-dropdown-item>
          <el-dropdown-item @click="$emit('handleClick', 'download')">
            下载
          </el-dropdown-item>
          <el-dropdown-item @click="$emit('handleClick', 'delete')">
            删除
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'page-button-group',
  components: {},
  emits: ['handleClick'],
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.page-button-group-container {
  display: flex;
  justify-content: space-between;
  .el-button {
    margin-right: 20px;
  }
}
</style>

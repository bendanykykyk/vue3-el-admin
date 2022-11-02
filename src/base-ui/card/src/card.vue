<template>
  <div class="card-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
          <!-- <el-button class="button" text>Operation button</el-button> -->
        </div>
      </template>
      <slot></slot>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
withDefaults(defineProps<{ title: string }>(), {
  title: '默认标题'
})
</script>

<style lang="less" scoped>
.card-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>

<!--
 * @Author: [yuuki]
 * @Date: 2022-10-25 10:59:38
 * @LastEditors: [you name]
 * @LastEditTime: 2022-10-25 10:59:39
 * @Description:
-->
<template>
  <div class="dashboard-container">
    <!-- 数据展示 -->
    <div class="number-analysis-area">
      <PageCountTo
        v-for="(config, index) in configs"
        :key="index"
        v-bind="config"
      ></PageCountTo>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import PageCountTo from '@/components/page-count-to'
import { countUpConfig } from './config/countUp.config'
import { queryStatistics } from '@/service/dashboard/dashboard'
export default defineComponent({
  name: 'dashboard',
  components: {
    PageCountTo
  },
  setup() {
    const { data: configs } = countUpConfig
    // 请求
    onMounted(async () => {
      let { data: statistics } = await queryStatistics({})
      // 修改配置文件
      configs.map((item, index) => {
        return { ...item, number: statistics[index].number }
      })
    })
    return {
      configs
    }
  }
})
</script>

<style lang="less" scoped>
.dashboard-container {
  background: #f0f2f5;
  .number-analysis-area {
    display: flex;
  }
}
</style>

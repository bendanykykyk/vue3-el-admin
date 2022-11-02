<template>
  <div class="dashboard-container">
    <el-row :gutter="10">
      <el-col :span="7">
        <UCard title="分类商品数量(柱状图)">
          <ChartBar
            width="100%"
            height="200px"
            :barData="barData"
            :xAxisData="xAxisData"
          ></ChartBar>
        </UCard>
      </el-col>
      <el-col :span="10">
        <UCard title="分类商品数量(饼图)">
          <!-- <Echarts></Echarts> -->
        </UCard>
      </el-col>
      <el-col :span="7">
        <UCard title="分类商品数量(饼图)">
          <!-- <Echarts></Echarts> -->
        </UCard>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <UCard title="分类商品数量(饼图)">
          <ChartPie width="100%" height="360px" :pieData="pieData"></ChartPie>
        </UCard>
      </el-col>
      <el-col :span="12">
        <UCard title="分类商品数量(饼图)">
          <!-- <Echarts></Echarts> -->
        </UCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ChartPie, ChartBar } from '@/components/page-charts'
import UCard from '@/base-ui/card'
import { EChartsOption } from 'echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    ChartPie,
    ChartBar,
    UCard
  },
  setup() {
    const barOptions: EChartsOption = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    }
    const pieData = [
      { value: 1048, name: 'Search Engine' },
      { value: 735, name: 'Direct' },
      { value: 580, name: 'Email' },
      { value: 484, name: 'Union Ads' },
      { value: 300, name: 'Video Ads' }
    ]

    const barData = [1, 2, 3, 4, 5]
    const xAxisData = ['A', 'B', 'C', 'D', 'E']
    return {
      barOptions,
      pieData,
      barData,
      xAxisData
    }
  }
})
</script>

<style lang="less" scoped>
.dashboard-container {
  background: #f0f2f5;
}
</style>
